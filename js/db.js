// ============================================================
// DF Technology — Database Layer v4.1 (Supabase + Fallback)
// ============================================================
// تعديل: ضع بيانات Supabase مشروعك هنا
// أو استخدم صفحة "إعداد قاعدة البيانات" في لوحة التحكم

const DB_CONFIG = {
  url:     '',   // https://xxxx.supabase.co
  anonKey: '',   // eyJhbGci...
};

// ──────────────────────────────────────────────
// تحميل الإعداد المحفوظ من المتصفح (إن وُجد)
// ──────────────────────────────────────────────
;(function loadSavedConfig() {
  try {
    const c = JSON.parse(localStorage.getItem('dft_db_config') || '{}');
    if (c.url)  DB_CONFIG.url     = c.url;
    if (c.key)  DB_CONFIG.anonKey = c.key;
  } catch(e) {}
})();

// ══════════════════════════════════════════════
// Supabase REST Client — Pure Vanilla JS
// ══════════════════════════════════════════════
class SbClient {
  constructor(url, key) {
    this.base = url.replace(/\/$/, '') + '/rest/v1';
    this.stor = url.replace(/\/$/, '') + '/storage/v1';
    this.h = {
      'Content-Type':  'application/json',
      'apikey':        key,
      'Authorization': `Bearer ${key}`,
    };
  }

  /* GET */
  async select(table, { select='*', filters=[], order='', limit=0 } = {}) {
    let u = `${this.base}/${table}?select=${select}`;
    filters.forEach(f => { u += `&${f}`; });
    if (order) u += `&order=${order}`;
    if (limit) u += `&limit=${limit}`;
    const r = await fetch(u, { headers: this.h });
    if (!r.ok) throw new Error(`${table} select: HTTP ${r.status}`);
    return r.json();
  }

  /* INSERT — returns first row */
  async insert(table, data) {
    const r = await fetch(`${this.base}/${table}`, {
      method: 'POST',
      headers: { ...this.h, Prefer: 'return=representation' },
      body: JSON.stringify(data),
    });
    if (!r.ok) { const e=await r.json().catch(()=>({})); throw new Error(e.message||`insert ${table} failed`); }
    const rows = await r.json();
    return Array.isArray(rows) ? rows[0] : rows;
  }

  /* INSERT — no return (lighter) */
  async insertMin(table, data) {
    const r = await fetch(`${this.base}/${table}`, {
      method: 'POST',
      headers: { ...this.h, Prefer: 'return=minimal' },
      body: JSON.stringify(data),
    });
    if (!r.ok) { const e=await r.json().catch(()=>({})); throw new Error(e.message||`insert ${table} failed`); }
    return true;
  }

  /* PATCH (update by id) */
  async update(table, id, data) {
    const r = await fetch(`${this.base}/${table}?id=eq.${id}`, {
      method: 'PATCH',
      headers: { ...this.h, Prefer: 'return=representation' },
      body: JSON.stringify(data),
    });
    if (!r.ok) { const e=await r.json().catch(()=>({})); throw new Error(e.message||`update ${table} failed`); }
    return r.json();
  }

  /* PATCH by key=value */
  async patchWhere(table, where, data) {
    const qs = Object.entries(where).map(([k,v])=>`${k}=eq.${encodeURIComponent(v)}`).join('&');
    const r = await fetch(`${this.base}/${table}?${qs}`, {
      method: 'PATCH',
      headers: { ...this.h, Prefer: 'return=minimal' },
      body: JSON.stringify(data),
    });
    if (!r.ok) { const e=await r.json().catch(()=>({})); throw new Error(e.message||`patch ${table} failed`); }
    return true;
  }

  /* DELETE by id */
  async delete(table, id) {
    const r = await fetch(`${this.base}/${table}?id=eq.${id}`, {
      method: 'DELETE', headers: this.h,
    });
    if (!r.ok) throw new Error(`delete ${table}: HTTP ${r.status}`);
    return true;
  }

  /* STORAGE upload → returns public URL */
  async upload(bucket, path, file) {
    const r = await fetch(`${this.stor}/object/${bucket}/${path}`, {
      method: 'POST',
      headers: {
        apikey: this.h.apikey,
        Authorization: this.h.Authorization,
        'Content-Type': file.type,
        'Cache-Control': '3600',
        'x-upsert': 'true',
      },
      body: file,
    });
    if (!r.ok) { const e=await r.json().catch(()=>({})); throw new Error(e.error||'Upload failed'); }
    return `${this.stor.replace('/storage/v1','/storage/v1/object/public')}/${bucket}/${path}`;
  }
}

// ══════════════════════════════════════════════
// Main DB object
// ══════════════════════════════════════════════
const DB = {
  _sb: null,
  _isFallback: true,

  init() {
    const { url, anonKey } = DB_CONFIG;
    if (!url || !anonKey || url.includes('YOUR_PROJECT')) {
      this._sb = null;
      this._isFallback = true;
      return false;
    }
    this._sb = new SbClient(url, anonKey);
    this._isFallback = false;
    return true;
  },

  get isOnline() { return !this._isFallback; },

  // ── Settings ─────────────────────────────
  async getSettings() {
    if (this._isFallback) return this._fbGet('settings') || {};
    try {
      const rows = await this._sb.select('settings');
      return rows.reduce((a, r) => { a[r.key] = r.value; return a; }, {});
    } catch(e) { console.warn('getSettings:', e); return {}; }
  },

  async saveSetting(key, value) {
    if (this._isFallback) {
      const s = this._fbGet('settings') || {}; s[key] = value; this._fbSet('settings', s); return;
    }
    await this._sb.patchWhere('settings', { key }, { value, updated_at: new Date().toISOString() });
  },

  async saveAllSettings(obj) {
    if (this._isFallback) {
      const s = { ...(this._fbGet('settings')||{}), ...obj }; this._fbSet('settings', s); return;
    }
    // sequential to avoid rate limit
    for (const [k, v] of Object.entries(obj)) {
      try { await this._sb.patchWhere('settings', { key: k }, { value: String(v??''), updated_at: new Date().toISOString() }); }
      catch(e) { console.warn('saveSetting', k, e); }
    }
  },

  // ── Projects ─────────────────────────────
  async getProjects() {
    if (this._isFallback) return this._fbGet('projects') || [];
    try { return await this._sb.select('projects', { order: 'sort_order.asc,created_at.desc' }); }
    catch(e) { console.warn(e); return []; }
  },
  async addProject(d) {
    if (this._isFallback) return this._fbAdd('projects', d);
    return this._sb.insert('projects', d);
  },
  async updateProject(id, d) {
    d.updated_at = new Date().toISOString();
    if (this._isFallback) { this._fbUpdate('projects', id, d); return; }
    await this._sb.update('projects', id, d);
  },
  async deleteProject(id) {
    if (this._isFallback) { this._fbDel('projects', id); return; }
    await this._sb.delete('projects', id);
  },

  // ── Services ─────────────────────────────
  async getServices() {
    if (this._isFallback) return this._fbGet('services') || [];
    try { return await this._sb.select('services', { filters:['active=eq.true'], order:'sort_order.asc' }); }
    catch(e) { return []; }
  },
  async addService(d) {
    if (this._isFallback) return this._fbAdd('services', d);
    return this._sb.insert('services', d);
  },
  async updateService(id, d) {
    if (this._isFallback) { this._fbUpdate('services', id, d); return; }
    await this._sb.update('services', id, d);
  },
  async deleteService(id) {
    if (this._isFallback) { this._fbDel('services', id); return; }
    await this._sb.delete('services', id);
  },

  // ── Posts ─────────────────────────────────
  async getPosts() {
    if (this._isFallback) return this._fbGet('posts') || [];
    try { return await this._sb.select('posts', { filters:['published=eq.true'], order:'created_at.desc' }); }
    catch(e) { return []; }
  },
  async addPost(d) {
    if (this._isFallback) return this._fbAdd('posts', d);
    return this._sb.insert('posts', d);
  },
  async updatePost(id, d) {
    d.updated_at = new Date().toISOString();
    if (this._isFallback) { this._fbUpdate('posts', id, d); return; }
    await this._sb.update('posts', id, d);
  },
  async deletePost(id) {
    if (this._isFallback) { this._fbDel('posts', id); return; }
    await this._sb.delete('posts', id);
  },

  // ── FAQ ───────────────────────────────────
  async getFaq() {
    if (this._isFallback) return this._fbGet('faq') || [];
    try { return await this._sb.select('faq', { filters:['active=eq.true'], order:'sort_order.asc' }); }
    catch(e) { return []; }
  },
  async addFaq(d) {
    if (this._isFallback) return this._fbAdd('faq', d);
    return this._sb.insert('faq', d);
  },
  async updateFaq(id, d) {
    if (this._isFallback) { this._fbUpdate('faq', id, d); return; }
    await this._sb.update('faq', id, d);
  },
  async deleteFaq(id) {
    if (this._isFallback) { this._fbDel('faq', id); return; }
    await this._sb.delete('faq', id);
  },

  // ── Partners ──────────────────────────────
  async getPartners() {
    if (this._isFallback) return this._fbGet('partners') || [];
    try { return await this._sb.select('partners', { filters:['active=eq.true'], order:'sort_order.asc' }); }
    catch(e) { return []; }
  },
  async addPartner(d) {
    if (this._isFallback) return this._fbAdd('partners', d);
    return this._sb.insert('partners', d);
  },
  async deletePartner(id) {
    if (this._isFallback) { this._fbDel('partners', id); return; }
    await this._sb.delete('partners', id);
  },

  // ── Testimonials ──────────────────────────
  async getTestimonials() {
    if (this._isFallback) return this._fbGet('testimonials') || [];
    try { return await this._sb.select('testimonials', { filters:['approved=eq.true'], order:'created_at.desc' }); }
    catch(e) { return []; }
  },
  async addTestimonial(d) {
    if (this._isFallback) return this._fbAdd('testimonials', d);
    return this._sb.insert('testimonials', d);
  },
  async deleteTestimonial(id) {
    if (this._isFallback) { this._fbDel('testimonials', id); return; }
    await this._sb.delete('testimonials', id);
  },

  // ── Messages ──────────────────────────────
  async getMessages() {
    if (this._isFallback) return this._fbGet('messages') || [];
    try { return await this._sb.select('messages', { order:'created_at.desc' }); }
    catch(e) { return []; }
  },
  async addMessage(d) {
    if (this._isFallback) return this._fbAdd('messages', d);
    return this._sb.insertMin('messages', d);
  },
  async markMsgRead(id) {
    if (this._isFallback) { this._fbUpdate('messages', id, { is_read: true }); return; }
    await this._sb.update('messages', id, { is_read: true });
  },
  async deleteMessage(id) {
    if (this._isFallback) { this._fbDel('messages', id); return; }
    await this._sb.delete('messages', id);
  },

  // ── Quote Requests ────────────────────────
  async getQuotes() {
    if (this._isFallback) return this._fbGet('quote_requests') || [];
    try { return await this._sb.select('quote_requests', { order:'created_at.desc' }); }
    catch(e) { return []; }
  },
  async addQuote(d) {
    if (this._isFallback) return this._fbAdd('quote_requests', d);
    return this._sb.insertMin('quote_requests', d);
  },
  async markQuoteRead(id, status = 'contacted') {
    if (this._isFallback) { this._fbUpdate('quote_requests', id, { is_read: true, status }); return; }
    await this._sb.update('quote_requests', id, { is_read: true, status });
  },
  async deleteQuote(id) {
    if (this._isFallback) { this._fbDel('quote_requests', id); return; }
    await this._sb.delete('quote_requests', id);
  },

  // ── Image Upload ──────────────────────────
  async uploadImage(file, folder = 'images') {
    if (!this._isFallback && this._sb) {
      // Try Supabase Storage first
      try {
        const ext  = file.name.split('.').pop().toLowerCase();
        const name = `${folder}/${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;
        return await this._sb.upload('media', name, file);
      } catch(e) {
        console.warn('Supabase storage failed, falling back to base64:', e);
      }
    }
    // Fallback: base64 (works offline, stored in localStorage)
    return new Promise((res, rej) => {
      const reader = new FileReader();
      reader.onload  = e => res(e.target.result);
      reader.onerror = rej;
      reader.readAsDataURL(file);
    });
  },

  // ── Unread count ──────────────────────────
  async unreadCount() {
    const [msgs, quotes] = await Promise.all([this.getMessages(), this.getQuotes()]);
    return msgs.filter(m => !m.is_read).length + quotes.filter(q => !q.is_read).length;
  },

  // ══════════════════════════════════════════
  // localStorage Fallback helpers
  // ══════════════════════════════════════════
  _fbGet(k)   { try { const r=localStorage.getItem('dft_'+k); return r?JSON.parse(r):null; } catch{return null;} },
  _fbSet(k,v) { try { localStorage.setItem('dft_'+k, JSON.stringify(v)); } catch(e){console.warn('localStorage full',e);} },

  _fbAdd(k, data) {
    const list = this._fbGet(k) || [];
    const item = { ...data, id: Date.now().toString(), created_at: new Date().toISOString() };
    list.unshift(item);
    this._fbSet(k, list);
    return item;
  },
  _fbUpdate(k, id, d) {
    this._fbSet(k, (this._fbGet(k)||[]).map(x => String(x.id)===String(id) ? {...x,...d} : x));
  },
  _fbDel(k, id) {
    this._fbSet(k, (this._fbGet(k)||[]).filter(x => String(x.id)!==String(id)));
  },
};

// Auto-init on load
DB.init();
window.DB = DB;
window.DB_CONFIG = DB_CONFIG;
