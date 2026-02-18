// ============================================================
// Multi-language System (AR / FR / EN)
// ============================================================

const TRANSLATIONS = {
  ar: {
    // Navigation
    'nav.about': 'من نحن',
    'nav.services': 'الخدمات',
    'nav.projects': 'المشاريع',
    'nav.quote': 'عرض سعر',
    'nav.faq': 'أسئلة شائعة',
    'nav.contact': 'اتصل بنا',
    'nav.langSwitch': 'EN / FR / AR',
    
    // Hero
    'hero.title': 'مستقبل التكنولوجيا',
    'hero.titleSpan': 'بين يديك',
    'hero.desc': 'حلول متكاملة في تكنولوجيا المعلومات والاتصالات، شبكات الألياف البصرية، أنظمة الأمان والمراقبة',
    'hero.btnQuote': 'طلب عرض سعر',
    'hero.btnServices': 'اكتشف خدماتنا',
    
    // About
    'about.title': 'من',
    'about.titleSpan': 'نحن',
    'about.heading': 'فريق من الخبراء المتميزين',
    'about.p1': 'فريق من المهندسين والخبراء والفنيين خريجي الجامعات والمعاهد الوطنية والدولية المتخصصة في مجال الاتصالات وتكنولوجيا المعلومات.',
    'about.p2': 'فريق أثبت كفاءته في إدارة تكنولوجيا المعلومات والاتصالات وأمن الممتلكات من خلال تنفيذ مشاريع ضخمة لصالح كبار المشغلين في الجزائر.',
    
    // Mission
    'mission.title': 'مهمتنا',
    'mission.p1': 'هدفنا المساهمة في إنشاء ومساعدتك على تحسين الأنظمة التي تمتلكها من حيث شبكات البنية التحتية للاتصالات والمعلوماتية وكذلك الحلول في مجال التحكم في الوصول وتأمين الممتلكات.',
    'mission.p2': 'واجبنا تزويدك بمرافقة عالية الجودة في تنفيذ هذه المنصات من خلال نشر معدات متطورة تتوافق مع متطلبات عملك.',
    
    // Services
    'services.title': 'خدماتنا',
    'services.titleSpan': 'المتخصصة',
    
    // Activities
    'activities.title': 'محاور',
    'activities.titleSpan': 'أنشطتنا',
    'activity.1': 'الشبكات المحلية والواسعة LAN/WAN',
    'activity.2': 'إدارة قوائم الانتظار والعملاء',
    'activity.3': 'أنظمة الحضور والانصراف',
    'activity.4': 'المؤتمرات المرئية',
    'activity.5': 'الشبكات الهاتفية العامة',
    'activity.6': 'تمديد وتوصيل الألياف البصرية',
    'activity.7': 'الكابلات النحاسية متعددة الأزواج',
    'activity.8': 'هواتف IP وأنظمة PABX',
    'activity.9': 'أنظمة الصوتيات والتوزيع الصوتي',
    'activity.10': 'كاميرات المراقبة عن بُعد',
    'activity.11': 'كاشفات الحريق والغاز',
    'activity.12': 'الشبكة الهيدروليكية لمكافحة الحريق',
    
    // Owner
    'owner.title': 'عن',
    'owner.titleSpan': 'المؤسس',
    
    // Projects
    'projects.title': 'سجل',
    'projects.titleSpan': 'أعمالنا',
    'projects.viewDetails': 'عرض التفاصيل',
    
    // Partners
    'partners.title': 'شركاؤنا',
    'partners.titleSpan': 'وعملاؤنا',
    
    // FAQ
    'faq.title': 'الأسئلة',
    'faq.titleSpan': 'الشائعة',
    
    // Posts
    'posts.title': 'أحدث',
    'posts.titleSpan': 'المنشورات',
    
    // Testimonials
    'testimonials.title': 'آراء',
    'testimonials.titleSpan': 'عملائنا',
    
    // Quote Form
    'quote.title': 'طلب',
    'quote.titleSpan': 'عرض سعر',
    'quote.heading': 'احصل على عرض سعر',
    'quote.headingSpan': 'مجاني',
    'quote.desc': 'أرسل لنا تفاصيل مشروعك وسيتواصل معك فريقنا خلال 24 ساعة بأفضل عرض يناسب احتياجاتك وميزانيتك.',
    'quote.feature1': 'رد في أقل من 24 ساعة',
    'quote.feature2': 'مجاني بدون أي التزام',
    'quote.feature3': 'نخدم جميع ولايات الجزائر',
    'quote.feature4': 'ضمان جودة على جميع الأعمال',
    'quote.name': 'الاسم الكامل',
    'quote.phone': 'رقم الهاتف',
    'quote.email': 'البريد الإلكتروني',
    'quote.wilaya': 'الولاية',
    'quote.wilayaSelect': '-- اختر الولاية --',
    'quote.service': 'نوع الخدمة',
    'quote.serviceSelect': '-- اختر الخدمة --',
    'quote.budget': 'الميزانية التقريبية',
    'quote.budgetSelect': '-- اختياري --',
    'quote.details': 'تفاصيل المشروع',
    'quote.detailsPlaceholder': 'اشرح مشروعك بإيجاز...',
    'quote.submit': 'إرسال الطلب',
    'quote.success': 'تم إرسال طلبك بنجاح! سنتواصل معك خلال 24 ساعة ✓',
    
    // Contact
    'contact.title': 'تواصل',
    'contact.titleSpan': 'معنا',
    'contact.directTitle': 'أو تواصل معنا',
    'contact.directTitleSpan': 'مباشرة',
    'contact.name': 'الاسم الكامل',
    'contact.email': 'البريد الإلكتروني',
    'contact.phone': 'رقم الهاتف',
    'contact.message': 'رسالتك...',
    'contact.submit': 'إرسال الرسالة',
    'contact.success': 'تم إرسال رسالتك بنجاح ✓',
    'contact.facebook': 'فيسبوك',
    
    // Footer
    'footer.rights': 'جميع الحقوق محفوظة',
    
    // Common
    'loading': 'جاري التحميل...',
    'location': 'الجزائر',
  },
  
  fr: {
    'nav.about': 'Qui sommes-nous',
    'nav.services': 'Services',
    'nav.projects': 'Réalisations',
    'nav.quote': 'Devis',
    'nav.faq': 'FAQ',
    'nav.contact': 'Contact',
    'nav.langSwitch': 'EN / AR / FR',
    
    'hero.title': "L'avenir de la technologie",
    'hero.titleSpan': 'entre vos mains',
    'hero.desc': 'Solutions complètes en TIC, réseaux fibre optique, systèmes de sécurité et surveillance',
    'hero.btnQuote': 'Demander un devis',
    'hero.btnServices': 'Nos services',
    
    'about.title': 'Qui',
    'about.titleSpan': 'Sommes-Nous',
    'about.heading': "Une équipe d'experts distingués",
    'about.p1': "Équipe issue des universités et instituts spécialisés dans le domaine des télécommunications et des TIC.",
    'about.p2': "Une équipe ayant prouvé ses compétences en TIC par la réalisation de projets d'envergure pour les grands opérateurs en Algérie.",
    
    'mission.title': 'Notre Mission',
    'mission.p1': "Notre objectif est de contribuer dans la mise en place et de vous aider à améliorer vos systèmes en matière de réseaux, infrastructures télécommunications et informatiques.",
    'mission.p2': "Notre devoir est de vous fournir un accompagnement de qualité par le déploiement des équipements de pointe.",
    
    'services.title': 'Nos Services',
    'services.titleSpan': 'Spécialisés',
    
    'activities.title': "Axes",
    'activities.titleSpan': "d'Activité",
    'activity.1': 'Réseaux LAN et WAN',
    'activity.2': "Files d'attente et gestion clientèle",
    'activity.3': "Gestion de pointage et accès",
    'activity.4': 'Visioconférences',
    'activity.5': 'Réseaux téléphoniques publics',
    'activity.6': 'Pose et raccordement fibre optique',
    'activity.7': 'Câbles multi-paires cuivre',
    'activity.8': 'Téléphonie IP et PABX',
    'activity.9': 'Systèmes de sonorisation',
    'activity.10': 'Caméras de surveillance',
    'activity.11': "Détecteurs d'incendie et de gaz",
    'activity.12': 'Réseau hydraulique lutte incendie',
    
    'owner.title': 'À propos du',
    'owner.titleSpan': 'Fondateur',
    
    'projects.title': 'Nos',
    'projects.titleSpan': 'Réalisations',
    'projects.viewDetails': 'Voir détails',
    
    'partners.title': 'Nos',
    'partners.titleSpan': 'Partenaires & Clients',
    
    'faq.title': 'Questions',
    'faq.titleSpan': 'Fréquentes',
    
    'posts.title': 'Dernières',
    'posts.titleSpan': 'Actualités',
    
    'testimonials.title': 'Avis de nos',
    'testimonials.titleSpan': 'Clients',
    
    'quote.title': 'Demande de',
    'quote.titleSpan': 'Devis',
    'quote.heading': 'Obtenez un devis',
    'quote.headingSpan': 'gratuit',
    'quote.desc': "Envoyez-nous les détails de votre projet et notre équipe vous contactera dans les 24h avec la meilleure offre.",
    'quote.feature1': 'Réponse en moins de 24h',
    'quote.feature2': 'Gratuit sans engagement',
    'quote.feature3': 'Toutes les wilayas couvertes',
    'quote.feature4': 'Garantie qualité sur tous les travaux',
    'quote.name': 'Nom complet',
    'quote.phone': 'Téléphone',
    'quote.email': 'Email',
    'quote.wilaya': 'Wilaya',
    'quote.wilayaSelect': '-- Choisir la wilaya --',
    'quote.service': 'Type de service',
    'quote.serviceSelect': '-- Choisir le service --',
    'quote.budget': 'Budget approximatif',
    'quote.budgetSelect': '-- Optionnel --',
    'quote.details': 'Détails du projet',
    'quote.detailsPlaceholder': 'Décrivez votre projet...',
    'quote.submit': 'Envoyer la demande',
    'quote.success': 'Demande envoyée! Nous vous contacterons dans les 24h ✓',
    
    'contact.title': 'Contactez',
    'contact.titleSpan': 'Nous',
    'contact.directTitle': 'Ou contactez-nous',
    'contact.directTitleSpan': 'directement',
    'contact.name': 'Nom Complet',
    'contact.email': 'Email',
    'contact.phone': 'Téléphone',
    'contact.message': 'Votre message...',
    'contact.submit': 'Envoyer',
    'contact.success': 'Message envoyé avec succès ✓',
    'contact.facebook': 'Facebook',
    
    'footer.rights': 'Tous droits réservés',
    
    'loading': 'Chargement...',
    'location': 'Algérie',
  },
  
  en: {
    'nav.about': 'About Us',
    'nav.services': 'Services',
    'nav.projects': 'Portfolio',
    'nav.quote': 'Get Quote',
    'nav.faq': 'FAQ',
    'nav.contact': 'Contact',
    'nav.langSwitch': 'AR / FR / EN',
    
    'hero.title': 'The Future of Technology',
    'hero.titleSpan': 'In Your Hands',
    'hero.desc': 'Complete solutions in ICT, fiber optic networks, security and surveillance systems',
    'hero.btnQuote': 'Request Quote',
    'hero.btnServices': 'Explore Services',
    
    'about.title': 'About',
    'about.titleSpan': 'Us',
    'about.heading': 'A Team of Distinguished Experts',
    'about.p1': 'Team of engineers and experts from national and international universities specialized in telecommunications and ICT.',
    'about.p2': 'A team that has proven its competence in ICT management through major projects for leading operators in Algeria.',
    
    'mission.title': 'Our Mission',
    'mission.p1': 'Our goal is to help establish and improve your telecommunications and IT infrastructure systems, as well as access control and property security solutions.',
    'mission.p2': 'Our duty is to provide quality support through deployment of cutting-edge equipment that meets your business requirements.',
    
    'services.title': 'Our',
    'services.titleSpan': 'Specialized Services',
    
    'activities.title': 'Main',
    'activities.titleSpan': 'Activities',
    'activity.1': 'LAN and WAN Networks',
    'activity.2': 'Queue and Customer Management',
    'activity.3': 'Attendance and Access Systems',
    'activity.4': 'Video Conferencing',
    'activity.5': 'Public Telephone Networks',
    'activity.6': 'Fiber Optic Installation',
    'activity.7': 'Multi-pair Copper Cables',
    'activity.8': 'IP Telephony and PABX',
    'activity.9': 'Sound Systems',
    'activity.10': 'Surveillance Cameras',
    'activity.11': 'Fire and Gas Detectors',
    'activity.12': 'Hydraulic Fire Fighting Network',
    
    'owner.title': 'About the',
    'owner.titleSpan': 'Founder',
    
    'projects.title': 'Our',
    'projects.titleSpan': 'Portfolio',
    'projects.viewDetails': 'View Details',
    
    'partners.title': 'Our',
    'partners.titleSpan': 'Partners & Clients',
    
    'faq.title': 'Frequently Asked',
    'faq.titleSpan': 'Questions',
    
    'posts.title': 'Latest',
    'posts.titleSpan': 'News',
    
    'testimonials.title': 'Client',
    'testimonials.titleSpan': 'Reviews',
    
    'quote.title': 'Request a',
    'quote.titleSpan': 'Quote',
    'quote.heading': 'Get a free',
    'quote.headingSpan': 'quote',
    'quote.desc': "Send us your project details and our team will contact you within 24 hours with the best offer.",
    'quote.feature1': 'Response in less than 24h',
    'quote.feature2': 'Free with no obligation',
    'quote.feature3': 'All wilayas covered',
    'quote.feature4': 'Quality guarantee on all work',
    'quote.name': 'Full Name',
    'quote.phone': 'Phone Number',
    'quote.email': 'Email',
    'quote.wilaya': 'Wilaya',
    'quote.wilayaSelect': '-- Select wilaya --',
    'quote.service': 'Service Type',
    'quote.serviceSelect': '-- Select service --',
    'quote.budget': 'Approximate Budget',
    'quote.budgetSelect': '-- Optional --',
    'quote.details': 'Project Details',
    'quote.detailsPlaceholder': 'Describe your project briefly...',
    'quote.submit': 'Submit Request',
    'quote.success': 'Request sent successfully! We will contact you within 24h ✓',
    
    'contact.title': 'Contact',
    'contact.titleSpan': 'Us',
    'contact.directTitle': 'Or contact us',
    'contact.directTitleSpan': 'directly',
    'contact.name': 'Full Name',
    'contact.email': 'Email',
    'contact.phone': 'Phone',
    'contact.message': 'Your message...',
    'contact.submit': 'Send Message',
    'contact.success': 'Message sent successfully ✓',
    'contact.facebook': 'Facebook',
    
    'footer.rights': 'All Rights Reserved',
    
    'loading': 'Loading...',
    'location': 'Algeria',
  }
};

// Algerian Wilayas (all 58)
const WILAYAS = {
  ar: [
    'أدرار', 'الشلف', 'الأغواط', 'أم البواقي', 'باتنة', 'بجاية', 'بسكرة', 'بشار',
    'البليدة', 'البويرة', 'تمنراست', 'تبسة', 'تلمسان', 'تيارت', 'تيزي وزو', 'الجزائر',
    'الجلفة', 'جيجل', 'سطيف', 'سعيدة', 'سكيكدة', 'سيدي بلعباس', 'عنابة', 'قالمة',
    'قسنطينة', 'المدية', 'مستغانم', 'المسيلة', 'معسكر', 'ورقلة', 'وهران', 'البيض',
    'إليزي', 'برج بوعريريج', 'بومرداس', 'الطارف', 'تندوف', 'تيسمسيلت', 'الوادي',
    'خنشلة', 'سوق أهراس', 'تيبازة', 'ميلة', 'عين الدفلى', 'النعامة', 'عين تموشنت',
    'غرداية', 'غليزان', 'تيميمون', 'برج باجي مختار', 'أولاد جلال', 'بني عباس',
    'عين صالح', 'عين قزام', 'تقرت', 'جانت', 'المغير', 'المنيعة'
  ],
  fr: [
    'Adrar', 'Chlef', 'Laghouat', 'Oum El Bouaghi', 'Batna', 'Béjaïa', 'Biskra', 'Béchar',
    'Blida', 'Bouira', 'Tamanrasset', 'Tébessa', 'Tlemcen', 'Tiaret', 'Tizi Ouzou', 'Alger',
    'Djelfa', 'Jijel', 'Sétif', 'Saïda', 'Skikda', 'Sidi Bel Abbès', 'Annaba', 'Guelma',
    'Constantine', 'Médéa', 'Mostaganem', 'M\'Sila', 'Mascara', 'Ouargla', 'Oran', 'El Bayadh',
    'Illizi', 'Bordj Bou Arréridj', 'Boumerdès', 'El Tarf', 'Tindouf', 'Tissemsilt', 'El Oued',
    'Khenchela', 'Souk Ahras', 'Tipaza', 'Mila', 'Aïn Defla', 'Naâma', 'Aïn Témouchent',
    'Ghardaïa', 'Relizane', 'Timimoun', 'Bordj Badji Mokhtar', 'Ouled Djellal', 'Béni Abbès',
    'In Salah', 'In Guezzam', 'Touggourt', 'Djanet', 'El M\'Ghair', 'El Meniaa'
  ],
  en: [
    'Adrar', 'Chlef', 'Laghouat', 'Oum El Bouaghi', 'Batna', 'Bejaia', 'Biskra', 'Bechar',
    'Blida', 'Bouira', 'Tamanrasset', 'Tebessa', 'Tlemcen', 'Tiaret', 'Tizi Ouzou', 'Algiers',
    'Djelfa', 'Jijel', 'Setif', 'Saida', 'Skikda', 'Sidi Bel Abbes', 'Annaba', 'Guelma',
    'Constantine', 'Medea', 'Mostaganem', 'M\'Sila', 'Mascara', 'Ouargla', 'Oran', 'El Bayadh',
    'Illizi', 'Bordj Bou Arreridj', 'Boumerdes', 'El Tarf', 'Tindouf', 'Tissemsilt', 'El Oued',
    'Khenchela', 'Souk Ahras', 'Tipaza', 'Mila', 'Ain Defla', 'Naama', 'Ain Temouchent',
    'Ghardaia', 'Relizane', 'Timimoun', 'Bordj Badji Mokhtar', 'Ouled Djellal', 'Beni Abbes',
    'In Salah', 'In Guezzam', 'Touggourt', 'Djanet', 'El M\'Ghair', 'El Meniaa'
  ]
};

// Current language (default: ar)
let currentLang = localStorage.getItem('dft_lang') || 'ar';

// Get translation
function t(key) {
  return TRANSLATIONS[currentLang]?.[key] || key;
}

// Get wilayas for current language
function getWilayas() {
  return WILAYAS[currentLang] || WILAYAS.ar;
}

// Change language
function changeLang(lang) {
  if (!['ar', 'fr', 'en'].includes(lang)) return;
  currentLang = lang;
  localStorage.setItem('dft_lang', lang);
  
  const html = document.getElementById('html') || document.documentElement;
  html.setAttribute('lang', lang);
  html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  
  // Update all translatable elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = t(key);
    } else {
      el.textContent = t(key);
    }
  });
  
  // Update wilaya dropdown if exists
  const wilayaSelect = document.getElementById('qw');
  if (wilayaSelect) {
    const selected = wilayaSelect.value;
    const wilayas = getWilayas();
    wilayaSelect.innerHTML = `<option value="">${t('quote.wilayaSelect')}</option>` +
      wilayas.map(w => `<option value="${w}">${w}</option>`).join('');
    if (selected) wilayaSelect.value = selected;
  }
  
  // Reload dynamic content if needed
  if (window.loadSite) window.loadSite();
}

// Cycle through languages (AR → FR → EN → AR)
function toggleLang() {
  const langs = ['ar', 'fr', 'en'];
  const idx = langs.indexOf(currentLang);
  const next = langs[(idx + 1) % langs.length];
  changeLang(next);
  
  // Reinit plugins if needed
  setTimeout(() => {
    if (window.initSwiper) window.initSwiper();
    if (window.AOS) window.AOS.refresh();
  }, 100);
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
  changeLang(currentLang);
});

// Export for global use
window.t = t;
window.changeLang = changeLang;
window.toggleLang = toggleLang;
window.getWilayas = getWilayas;
window.currentLang = () => currentLang;
