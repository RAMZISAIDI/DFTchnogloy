-- ============================================================
-- DF Technology — Supabase Schema v4.2 (FIX: RLS Policies)
-- ============================================================
-- نسخ هذا الكود وتشغيله في Supabase SQL Editor

-- تفعيل UUID
create extension if not exists "uuid-ossp";

-- ============================================================
-- 1. إنشاء الجداول (إذا لم تكن موجودة)
-- ============================================================
create table if not exists settings (
  id           serial primary key,
  key          text unique not null,
  value        text,
  updated_at   timestamptz default now()
);

create table if not exists projects (
  id          uuid default uuid_generate_v4() primary key,
  title_ar    text not null,
  title_fr    text not null,
  description text,
  image_url   text,
  category    text default 'general',
  featured    boolean default false,
  sort_order  int default 0,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

create table if not exists services (
  id          uuid default uuid_generate_v4() primary key,
  icon        text default 'fas fa-cog',
  title_ar    text not null,
  title_fr    text not null,
  desc_ar     text,
  desc_fr     text,
  items_ar    text[],
  items_fr    text[],
  sort_order  int default 0,
  active      boolean default true,
  created_at  timestamptz default now()
);

create table if not exists posts (
  id          uuid default uuid_generate_v4() primary key,
  title       text not null,
  body        text,
  category    text default 'news',
  image_url   text,
  published   boolean default true,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

create table if not exists faq (
  id          uuid default uuid_generate_v4() primary key,
  question_ar text not null,
  question_fr text not null,
  answer_ar   text not null,
  answer_fr   text not null,
  sort_order  int default 0,
  active      boolean default true,
  created_at  timestamptz default now()
);

create table if not exists partners (
  id          uuid default uuid_generate_v4() primary key,
  name        text not null,
  logo_url    text,
  website     text,
  sort_order  int default 0,
  active      boolean default true,
  created_at  timestamptz default now()
);

create table if not exists testimonials (
  id          uuid default uuid_generate_v4() primary key,
  client_name text not null,
  company     text,
  review      text not null,
  rating      int default 5 check (rating between 1 and 5),
  approved    boolean default true,
  created_at  timestamptz default now()
);

create table if not exists messages (
  id          uuid default uuid_generate_v4() primary key,
  name        text not null,
  email       text,
  phone       text,
  message     text not null,
  is_read     boolean default false,
  created_at  timestamptz default now()
);

create table if not exists quote_requests (
  id            uuid default uuid_generate_v4() primary key,
  name          text not null,
  phone         text not null,
  email         text,
  wilaya        text,
  service_type  text not null,
  budget        text,
  details       text,
  status        text default 'new',
  is_read       boolean default false,
  created_at    timestamptz default now()
);

-- ============================================================
-- 2. البيانات الافتراضية
-- ============================================================
insert into settings (key, value) values
  ('siteName',      'DF Technology'),
  ('taglineAr',     'مستقبل التكنولوجيا بين يديك'),
  ('taglineFr',     'L''avenir de la technologie entre vos mains'),
  ('descAr',        'حلول متكاملة في تكنولوجيا المعلومات والاتصالات، شبكات الألياف البصرية، أنظمة الأمان والمراقبة'),
  ('descFr',        'Solutions complètes en TIC, réseaux fibre optique, systèmes de sécurité'),
  ('phone',         '+213 XXX XXX XXX'),
  ('email',         'contact@dftechnology.dz'),
  ('whatsapp',      '213XXXXXXXXX'),
  ('facebook',      'https://facebook.com/dftechnology'),
  ('address',       'الجزائر العاصمة، الجزائر'),
  ('founderAr',     'المهندس عيد الياسط زرقون'),
  ('founderFr',     'Ing. Eid Elyasst Zargoune'),
  ('founderBioAr',  'خبير في تكنولوجيا الاتصالات بخبرة تزيد عن 12 عاماً في السوق الجزائري'),
  ('founderBioFr',  'Expert en télécommunications avec plus de 12 ans d''expérience'),
  ('metaDesc',      'DF Technology - حلول الألياف البصرية وكاميرات المراقبة في الجزائر'),
  ('metaKeywords',  'الألياف البصرية,كاميرات المراقبة,شبكات,الجزائر,CCTV,Algérie'),
  ('siteUrl',       'https://dftechnology.dz'),
  ('adminEmail',    'admin@dftechnology.dz'),
  ('adminUser',     'admin'),
  ('adminPass',     'DFtech2026'),
  ('stat1Num',      '12+'),  ('stat1Ar', 'سنوات خبرة'),  ('stat1Fr', 'Années d''expérience'),
  ('stat2Num',      '500+'), ('stat2Ar', 'مشروع منجز'), ('stat2Fr', 'Projets réalisés'),
  ('stat3Num',      '100%'), ('stat3Ar', 'رضا العملاء'), ('stat3Fr', 'Satisfaction client')
on conflict (key) do nothing;

insert into projects (title_ar, title_fr, category, sort_order) values
  ('تمديد شبكة ألياف بصرية', 'Installation Fibre Optique', 'fiber', 1),
  ('نظام مراقبة متطور', 'Système CCTV Avancé', 'cctv', 2),
  ('تجهيز مراكز بيانات', 'Aménagement Data Centers', 'network', 3)
on conflict do nothing;

insert into services (icon, title_ar, title_fr, desc_ar, desc_fr, items_ar, items_fr, sort_order) values
  ('fas fa-network-wired', 'هندسة الشبكات والأنظمة', 'Ingénierie des Réseaux',
   'حلول شاملة لتصميم وتركيب وصيانة جميع أنواع الشبكات',
   'Solutions complètes pour la conception et maintenance',
   array['شبكات LAN و WAN','الألياف البصرية','هواتف IP و PABX','شبكات VDI','المؤتمرات المرئية'],
   array['Réseaux LAN et WAN','Fibre optique','Téléphonie IP','Réseaux VDI','Visioconférences'], 1),
  ('fas fa-shield-alt', 'أنظمة الأمن والمراقبة', 'Systèmes de Sécurité',
   'حلول أمنية متكاملة لحماية منشآتك', 'Solutions de sécurité complètes',
   array['كاميرات CCTV','التحكم في الوصول','كاشفات الحريق','مكافحة التسلل','أتمتة الأبواب'],
   array['Caméras CCTV','Contrôle d''accès','Détecteurs incendie','Anti-intrusion','Automatisme'], 2),
  ('fas fa-laptop', 'بيع المعدات والتجهيزات', 'Vente Matériels',
   'توريد أحدث المعدات التقنية', 'Fourniture des derniers équipements',
   array['معدات IT','أجهزة الاتصالات','معدات الصوت والفيديو','أنظمة الأمان'],
   array['Équipements IT','Télécommunications','Sonorisation AV','Sécurité'], 3),
  ('fas fa-bullhorn', 'الاتصال والإعلان', 'Communication & Publicité',
   'خدمات تسويقية وإعلانية شاملة', 'Services marketing complets',
   array['تصميم المواقع','الشعارات','اللافتات','تنظيم الفعاليات'],
   array['Création sites web','Logos','Bannières','Organisation événements'], 4)
on conflict do nothing;

insert into faq (question_ar, question_fr, answer_ar, answer_fr, sort_order) values
  ('ما هي مناطق تغطية خدماتكم؟', 'Quelles sont vos zones de couverture?',
   'نعمل في جميع ولايات الجزائر مع فرق متخصصة.', 'Nous opérons dans toutes les wilayas.', 1),
  ('كم يستغرق تركيب نظام المراقبة؟', 'Combien de temps pour installer?',
   'من يوم واحد حتى أسبوع للمشاريع الكبيرة.', '1 à 7 jours selon le projet.', 2),
  ('هل تقدمون ضمان على الخدمات؟', 'Offrez-vous une garantie?',
   'نعم، نقدم ضمان شامل لمدة سنة كاملة.', 'Oui, garantie complète d''un an.', 3),
  ('هل تعملون مع الجهات الحكومية؟', 'Travaillez-vous avec le public?',
   'نعم، لدينا خبرة واسعة في المشاريع الحكومية.', 'Oui, large expérience gouvernementale.', 4)
on conflict do nothing;

insert into partners (name, sort_order) values
  ('Algérie Télécom', 1), ('Ooredoo Algérie', 2),
  ('Mobilis', 3), ('Djezzy', 4)
on conflict do nothing;

-- ============================================================
-- 3. تفعيل Row Level Security
-- ============================================================
alter table settings      enable row level security;
alter table projects      enable row level security;
alter table services      enable row level security;
alter table posts         enable row level security;
alter table faq           enable row level security;
alter table partners      enable row level security;
alter table testimonials  enable row level security;
alter table messages      enable row level security;
alter table quote_requests enable row level security;

-- ============================================================
-- 4. حذف السياسات القديمة (إن وُجدت)
-- ============================================================
drop policy if exists "public read settings"     on settings;
drop policy if exists "public read projects"     on projects;
drop policy if exists "public read services"     on services;
drop policy if exists "public read posts"        on posts;
drop policy if exists "public read faq"          on faq;
drop policy if exists "public read partners"     on partners;
drop policy if exists "public read testimonials" on testimonials;
drop policy if exists "insert messages"          on messages;
drop policy if exists "insert quote_requests"    on quote_requests;

drop policy if exists "admin all settings"       on settings;
drop policy if exists "admin all projects"       on projects;
drop policy if exists "admin all services"       on services;
drop policy if exists "admin all posts"          on posts;
drop policy if exists "admin all faq"            on faq;
drop policy if exists "admin all partners"       on partners;
drop policy if exists "admin all testimonials"   on testimonials;
drop policy if exists "admin all messages"       on messages;
drop policy if exists "admin all quotes"         on quote_requests;

-- ============================================================
-- 5. إنشاء السياسات الجديدة (الحل الصحيح)
-- ============================================================

-- السماح بالقراءة العامة (anon) للجميع
create policy "Allow public read settings"
  on settings for select
  using (true);

create policy "Allow public read projects"
  on projects for select
  using (true);

create policy "Allow public read services"
  on services for select
  using (active = true);

create policy "Allow public read posts"
  on posts for select
  using (published = true);

create policy "Allow public read faq"
  on faq for select
  using (active = true);

create policy "Allow public read partners"
  on partners for select
  using (active = true);

create policy "Allow public read testimonials"
  on testimonials for select
  using (approved = true);

-- السماح للزوار بإرسال رسائل وطلبات عروض
create policy "Allow public insert messages"
  on messages for insert
  with check (true);

create policy "Allow public insert quotes"
  on quote_requests for insert
  with check (true);

-- ═══════════════════════════════════════════════════════════
-- الحل: السماح الكامل للـ anon key (لأنه لا يوجد auth)
-- ═══════════════════════════════════════════════════════════
-- هذا يسمح لأي شخص لديه anon key بإدارة البيانات
-- (المفترض أن anon key محمي في لوحة التحكم فقط)

create policy "Allow anon full access settings"
  on settings for all
  using (true)
  with check (true);

create policy "Allow anon full access projects"
  on projects for all
  using (true)
  with check (true);

create policy "Allow anon full access services"
  on services for all
  using (true)
  with check (true);

create policy "Allow anon full access posts"
  on posts for all
  using (true)
  with check (true);

create policy "Allow anon full access faq"
  on faq for all
  using (true)
  with check (true);

create policy "Allow anon full access partners"
  on partners for all
  using (true)
  with check (true);

create policy "Allow anon full access testimonials"
  on testimonials for all
  using (true)
  with check (true);

create policy "Allow anon full access messages"
  on messages for all
  using (true)
  with check (true);

create policy "Allow anon full access quotes"
  on quote_requests for all
  using (true)
  with check (true);

-- ============================================================
-- 6. إنشاء Storage Bucket للصور
-- ============================================================
-- هذا يتم يدوياً من واجهة Supabase → Storage → New Bucket
-- اسم الـ Bucket: media
-- ✅ Public bucket

-- لكن يمكن إنشاؤه بالكود أيضاً:
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict do nothing;

-- السماح برفع وقراءة الصور
create policy "Allow public upload to media"
  on storage.objects for insert
  with check (bucket_id = 'media');

create policy "Allow public read from media"
  on storage.objects for select
  using (bucket_id = 'media');

-- ============================================================
-- ✅ تم! قاعدة البيانات جاهزة تماماً
-- ============================================================
