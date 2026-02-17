-- ============================================================
-- DF Technology — Supabase Database Schema
-- قم بنسخ هذا الكود وتشغيله في Supabase SQL Editor
-- ============================================================

-- تفعيل UUID
create extension if not exists "uuid-ossp";

-- ============================================================
-- 1. الإعدادات العامة للموقع
-- ============================================================
create table if not exists settings (
  id           serial primary key,
  key          text unique not null,
  value        text,
  updated_at   timestamptz default now()
);

insert into settings (key, value) values
  ('siteName',      'DF Technology'),
  ('taglineAr',     'مستقبل التكنولوجيا بين يديك'),
  ('taglineFr',     'L''avenir de la technologie entre vos mains'),
  ('descAr',        'حلول متكاملة في تكنولوجيا المعلومات والاتصالات، شبكات الألياف البصرية، أنظمة الأمان والمراقبة للمؤسسات العامة والخاصة'),
  ('descFr',        'Solutions complètes en TIC, réseaux fibre optique, systèmes de sécurité et surveillance'),
  ('phone',         '+213 XXX XXX XXX'),
  ('email',         'contact@dftechnology.dz'),
  ('whatsapp',      '213XXXXXXXXX'),
  ('facebook',      'https://facebook.com/dftechnology'),
  ('address',       'الجزائر العاصمة، الجزائر'),
  ('founderAr',     'المهندس عيد الياسط زرقون'),
  ('founderFr',     'Ing. Eid Elyasst Zargoune'),
  ('founderBioAr',  'خبير في تكنولوجيا الاتصالات بخبرة تزيد عن 12 عاماً في السوق الجزائري'),
  ('founderBioFr',  'Expert en télécommunications avec plus de 12 ans d''expérience'),
  ('metaDesc',      'DF Technology - حلول الألياف البصرية وكاميرات المراقبة والشبكات في الجزائر'),
  ('metaKeywords',  'الألياف البصرية،كاميرات المراقبة،شبكات،الجزائر,fibre optique,CCTV,Algérie'),
  ('siteUrl',       'https://dftechnology.dz'),
  ('adminEmail',    'admin@dftechnology.dz'),
  ('stat1Num',      '12+'),  ('stat1Ar', 'سنوات خبرة'),  ('stat1Fr', 'Années d''expérience'),
  ('stat2Num',      '500+'), ('stat2Ar', 'مشروع منجز'), ('stat2Fr', 'Projets réalisés'),
  ('stat3Num',      '100%'),  ('stat3Ar', 'رضا العملاء'), ('stat3Fr', 'Satisfaction client')
on conflict (key) do nothing;

-- ============================================================
-- 2. المشاريع
-- ============================================================
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

insert into projects (title_ar, title_fr, category, sort_order) values
  ('تمديد شبكة ألياف بصرية', 'Installation de Fibre Optique', 'fiber', 1),
  ('نظام مراقبة متطور', 'Système CCTV Avancé', 'cctv', 2),
  ('تجهيز مراكز بيانات', 'Aménagement Data Centers', 'network', 3);

-- ============================================================
-- 3. الخدمات
-- ============================================================
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

insert into services (icon, title_ar, title_fr, desc_ar, desc_fr, items_ar, items_fr, sort_order) values
  ('fas fa-network-wired',
   'هندسة الشبكات والأنظمة', 'Ingénierie des Réseaux',
   'حلول شاملة لتصميم وتركيب وصيانة جميع أنواع الشبكات',
   'Solutions complètes pour la conception et maintenance de réseaux',
   array['شبكات LAN و WAN','الألياف البصرية','هواتف IP و PABX','شبكات VDI','المؤتمرات المرئية'],
   array['Réseaux LAN et WAN','Fibre optique','Téléphonie IP et PABX','Réseaux VDI','Visioconférences'],
   1),
  ('fas fa-shield-alt',
   'أنظمة الأمن والمراقبة', 'Systèmes de Sécurité',
   'حلول أمنية متكاملة لحماية منشآتك',
   'Solutions de sécurité complètes',
   array['كاميرات CCTV','التحكم في الوصول','كاشفات الحريق','مكافحة التسلل','أتمتة الأبواب'],
   array['Caméras CCTV','Contrôle d''accès','Détecteurs incendie','Anti-intrusion','Automatisme portes'],
   2),
  ('fas fa-laptop',
   'بيع المعدات والتجهيزات', 'Vente Matériels',
   'توريد أحدث المعدات التقنية',
   'Fourniture des derniers équipements',
   array['معدات IT','أجهزة الاتصالات','معدات الصوت والفيديو','أنظمة الأمان'],
   array['Équipements IT','Télécommunications','Sonorisation AV','Sécurité'],
   3),
  ('fas fa-bullhorn',
   'الاتصال والإعلان', 'Communication & Publicité',
   'خدمات تسويقية وإعلانية شاملة',
   'Services marketing complets',
   array['تصميم المواقع','الشعارات','اللافتات','تنظيم الفعاليات'],
   array['Création sites web','Logos','Bannières','Organisation événements'],
   4);

-- ============================================================
-- 4. المنشورات
-- ============================================================
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

-- ============================================================
-- 5. الأسئلة الشائعة
-- ============================================================
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

insert into faq (question_ar, question_fr, answer_ar, answer_fr, sort_order) values
  ('ما هي مناطق تغطية خدماتكم؟', 'Quelles sont vos zones de couverture?',
   'نعمل في جميع ولايات الجزائر مع فرق متخصصة في العاصمة والمناطق الكبرى.',
   'Nous opérons dans toutes les wilayas d''Algérie.', 1),
  ('كم يستغرق تركيب نظام المراقبة؟', 'Combien de temps pour installer un système CCTV?',
   'يعتمد على حجم المشروع. عادةً من يوم واحد حتى أسبوع للمشاريع الكبيرة.',
   'Cela dépend de la taille du projet. Généralement 1 à 7 jours.', 2),
  ('هل تقدمون ضمان على الخدمات؟', 'Offrez-vous une garantie?',
   'نعم، نقدم ضمان شامل على جميع التركيبات وخدمة ما بعد البيع لمدة سنة.',
   'Oui, nous offrons une garantie complète et un SAV d''un an.', 3),
  ('هل تعملون مع الجهات الحكومية؟', 'Travaillez-vous avec les organismes publics?',
   'نعم، لدينا خبرة واسعة في المشاريع الحكومية والمؤسسات العامة والخاصة.',
   'Oui, nous avons une large expérience avec les projets gouvernementaux.', 4),
  ('كيف أطلب عرض سعر؟', 'Comment demander un devis?',
   'يمكنك تعبئة نموذج طلب عرض السعر في الموقع أو الاتصال بنا مباشرة.',
   'Vous pouvez remplir le formulaire de devis sur le site ou nous contacter directement.', 5);

-- ============================================================
-- 6. الشركاء
-- ============================================================
create table if not exists partners (
  id          uuid default uuid_generate_v4() primary key,
  name        text not null,
  logo_url    text,
  website     text,
  sort_order  int default 0,
  active      boolean default true,
  created_at  timestamptz default now()
);

insert into partners (name, sort_order) values
  ('Algérie Télécom', 1), ('Ooredoo Algérie', 2),
  ('Mobilis', 3), ('Djezzy', 4);

-- ============================================================
-- 7. آراء العملاء
-- ============================================================
create table if not exists testimonials (
  id          uuid default uuid_generate_v4() primary key,
  client_name text not null,
  company     text,
  review      text not null,
  rating      int default 5 check (rating between 1 and 5),
  approved    boolean default true,
  created_at  timestamptz default now()
);

-- ============================================================
-- 8. الرسائل
-- ============================================================
create table if not exists messages (
  id          uuid default uuid_generate_v4() primary key,
  name        text not null,
  email       text,
  phone       text,
  message     text not null,
  is_read     boolean default false,
  created_at  timestamptz default now()
);

-- ============================================================
-- 9. طلبات عروض الأسعار
-- ============================================================
create table if not exists quote_requests (
  id            uuid default uuid_generate_v4() primary key,
  name          text not null,
  phone         text not null,
  email         text,
  wilaya        text,
  service_type  text not null,
  budget        text,
  details       text,
  status        text default 'new',   -- new / contacted / closed
  is_read       boolean default false,
  created_at    timestamptz default now()
);

-- ============================================================
-- 10. Row Level Security — السماح بالقراءة العامة فقط
-- ============================================================
alter table settings      enable row level security;
alter table projects       enable row level security;
alter table services       enable row level security;
alter table posts          enable row level security;
alter table faq            enable row level security;
alter table partners       enable row level security;
alter table testimonials   enable row level security;
alter table messages       enable row level security;
alter table quote_requests enable row level security;

-- قراءة عامة (anon) للجداول العامة
create policy "public read settings"    on settings      for select using (true);
create policy "public read projects"    on projects      for select using (true);
create policy "public read services"    on services      for select using (active = true);
create policy "public read posts"       on posts         for select using (published = true);
create policy "public read faq"         on faq           for select using (active = true);
create policy "public read partners"    on partners      for select using (active = true);
create policy "public read testimonials" on testimonials for select using (approved = true);

-- السماح بإدراج الرسائل وطلبات العروض من الزوار
create policy "insert messages"      on messages       for insert with check (true);
create policy "insert quote_requests" on quote_requests for insert with check (true);

-- السماح الكامل للمسؤول (service_role)
create policy "admin all settings"    on settings      for all using (auth.role() = 'service_role');
create policy "admin all projects"    on projects      for all using (auth.role() = 'service_role');
create policy "admin all services"    on services      for all using (auth.role() = 'service_role');
create policy "admin all posts"       on posts         for all using (auth.role() = 'service_role');
create policy "admin all faq"         on faq           for all using (auth.role() = 'service_role');
create policy "admin all partners"    on partners      for all using (auth.role() = 'service_role');
create policy "admin all testimonials" on testimonials for all using (auth.role() = 'service_role');
create policy "admin all messages"    on messages      for all using (auth.role() = 'service_role');
create policy "admin all quotes"      on quote_requests for all using (auth.role() = 'service_role');

-- ============================================================
-- تم! قاعدة البيانات جاهزة ✓
-- ============================================================
