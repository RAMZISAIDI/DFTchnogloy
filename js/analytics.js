// ============================================================
// DF Technology — Analytics & Visit Tracking
// ============================================================

const Analytics = {
  // Track page visit
  trackVisit() {
    const now = Date.now();
    const today = new Date().toISOString().split('T')[0];
    
    // Get existing data
    let data = this._getData();
    
    // Total visits
    data.total = (data.total || 0) + 1;
    
    // Today's visits
    if (!data.daily) data.daily = {};
    data.daily[today] = (data.daily[today] || 0) + 1;
    
    // Unique visitors (using localStorage flag)
    const isUnique = !localStorage.getItem('dft_visited');
    if (isUnique) {
      data.unique = (data.unique || 0) + 1;
      localStorage.setItem('dft_visited', now);
    }
    
    // Last 30 days chart data
    this._updateChart(data, today);
    
    // Browser info
    const ua = navigator.userAgent;
    let browser = 'Other';
    if (ua.includes('Chrome') && !ua.includes('Edge')) browser = 'Chrome';
    else if (ua.includes('Safari') && !ua.includes('Chrome')) browser = 'Safari';
    else if (ua.includes('Firefox')) browser = 'Firefox';
    else if (ua.includes('Edge')) browser = 'Edge';
    
    if (!data.browsers) data.browsers = {};
    data.browsers[browser] = (data.browsers[browser] || 0) + 1;
    
    // Device type
    const isMobile = /iPhone|iPad|iPod|Android/i.test(ua);
    if (!data.devices) data.devices = { mobile: 0, desktop: 0 };
    if (isMobile) data.devices.mobile++;
    else data.devices.desktop++;
    
    // Page views
    const page = location.pathname;
    if (!data.pages) data.pages = {};
    data.pages[page] = (data.pages[page] || 0) + 1;
    
    // Referrer
    if (document.referrer && !document.referrer.includes(location.hostname)) {
      if (!data.referrers) data.referrers = {};
      try {
        const ref = new URL(document.referrer).hostname;
        data.referrers[ref] = (data.referrers[ref] || 0) + 1;
      } catch(e) {}
    }
    
    // Save
    this._saveData(data);
    
    // Send to Supabase if connected
    if (window.DB && !window.DB._isFallback) {
      this._sendToSupabase(data, { browser, isMobile, page, today });
    }
  },
  
  _updateChart(data, today) {
    if (!data.chart) data.chart = {};
    const d = new Date();
    for (let i = 29; i >= 0; i--) {
      const date = new Date(d.getTime() - i * 86400000).toISOString().split('T')[0];
      if (!data.chart[date]) data.chart[date] = 0;
    }
    data.chart[today] = (data.chart[today] || 0) + 1;
    
    // Keep only last 30 days
    const dates = Object.keys(data.chart).sort();
    if (dates.length > 30) {
      dates.slice(0, dates.length - 30).forEach(d => delete data.chart[d]);
    }
  },
  
  async _sendToSupabase(local, info) {
    try {
      // Store visit in Supabase (we'll create a visits table)
      await fetch(`${window.DB_CONFIG.url}/rest/v1/visits`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': window.DB_CONFIG.anonKey,
          'Authorization': `Bearer ${window.DB_CONFIG.anonKey}`,
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({
          date: info.today,
          browser: info.browser,
          device: info.isMobile ? 'mobile' : 'desktop',
          page: info.page,
          referrer: document.referrer || null
        })
      });
    } catch(e) {
      console.warn('Analytics sync failed:', e);
    }
  },
  
  // Get stats for admin dashboard
  getStats() {
    const data = this._getData();
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    
    return {
      total: data.total || 0,
      unique: data.unique || 0,
      today: data.daily?.[today] || 0,
      yesterday: data.daily?.[yesterday] || 0,
      chart: data.chart || {},
      browsers: data.browsers || {},
      devices: data.devices || { mobile: 0, desktop: 0 },
      pages: data.pages || {},
      referrers: data.referrers || {}
    };
  },
  
  // Get chart data for last 30 days
  getChartData() {
    const data = this._getData();
    const chart = data.chart || {};
    const dates = Object.keys(chart).sort();
    return dates.map(d => ({ date: d, visits: chart[d] }));
  },
  
  _getData() {
    try {
      return JSON.parse(localStorage.getItem('dft_analytics') || '{}');
    } catch {
      return {};
    }
  },
  
  _saveData(data) {
    try {
      localStorage.setItem('dft_analytics', JSON.stringify(data));
    } catch(e) {
      console.warn('Analytics save failed:', e);
    }
  }
};

// Auto-track on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => Analytics.trackVisit());
} else {
  Analytics.trackVisit();
}

window.Analytics = Analytics;
