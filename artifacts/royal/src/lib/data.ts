export const translations = {
  "nav.home": { ar: "الرئيسية", fr: "Accueil" },
  "nav.gallery": { ar: "المجموعة", fr: "Collection" },
  "nav.about": { ar: "عن الدار", fr: "À Propos" },
  "nav.contact": { ar: "تواصل معنا", fr: "Contact" },
  "hero.title": { ar: "البيت الملكي", fr: "Royal Home" },
  "hero.subtitle": {
    ar: "حيث يلتقي الفخامة بالأصالة في كل تفصيلة من منزلك",
    fr: "Où le luxe rencontre l'authenticité dans chaque détail de votre maison",
  },
  "hero.cta": { ar: "استكشف المجموعة", fr: "Découvrir la Collection" },
  "gallery.title": { ar: "مجموعتنا الحصرية", fr: "Notre Collection Exclusive" },
  "about.title": { ar: "فلسفة الدار", fr: "Notre Philosophie" },
  "about.text": {
    ar: "في البيت الملكي، نؤمن بأن الأثاث ليس مجرد قطع خشبية، بل هو تعبير عن الذوق الرفيع والهوية الفريدة. كل قطعة في معرضنا تُختار بعناية فائقة لتضفي لمسة من الفخامة الملكية على مساحتك الخاصة.",
    fr: "Chez Royal Home, nous croyons que le mobilier est l'expression d'un goût raffiné et d'une identité unique. Chaque pièce est soigneusement sélectionnée pour ajouter une touche de luxe royal à votre espace privé.",
  },
  "contact.title": { ar: "حدد موعداً لزيارتنا", fr: "Prenez Rendez-vous" },
  "contact.whatsapp": { ar: "تواصل معنا عبر واتساب", fr: "Contactez-nous sur WhatsApp" },
  "contact.phone": { ar: "الهاتف", fr: "Téléphone" },
  "contact.address": { ar: "العنوان", fr: "Adresse" },
  "contact.address.val": { ar: "القليعة، تيبازة، الجزائر", fr: "El Qlea, Tipaza, Algérie" },
  "footer.rights": { ar: "جميع الحقوق محفوظة للبيت الملكي.", fr: "Tous droits réservés à Royal Home." },
  "product.price": { ar: "د.ج", fr: "DZD" },
  "product.inquiry": { ar: "استفسار عن هذا المنتج", fr: "Se renseigner sur ce produit" },
  "product.view": { ar: "عرض الأنواع", fr: "Voir les modèles" },
  "modal.choose": { ar: "اختر النوع المناسب لك", fr: "Choisissez le style qui vous convient" },
  "modal.inquire": { ar: "اطلب هذا الطراز", fr: "Demander ce modèle" },
  "whyus.title": { ar: "لماذا تختارنا؟", fr: "Pourquoi Nous Choisir ?" },
  "whyus.quality.title": { ar: "الجودة", fr: "Qualité" },
  "whyus.quality.desc": { ar: "مواد فاخرة وتصنيع متقن يدوم لأجيال قادمة", fr: "Matériaux de luxe et fabrication soignée qui durent des générations" },
  "whyus.comfort.title": { ar: "الراحة", fr: "Confort" },
  "whyus.comfort.desc": { ar: "تصاميم عصرية تجمع بين الجمال الأصيل والراحة المثالية", fr: "Designs modernes alliant esthétique authentique et confort idéal" },
  "whyus.warranty.title": { ar: "الضمان", fr: "Garantie" },
  "whyus.warranty.desc": { ar: "ضمان شامل على جميع منتجاتنا لراحة بالك التامة", fr: "Garantie complète sur tous nos produits pour votre tranquillité d'esprit" },
  "whyus.trust.title": { ar: "الثقة", fr: "Confiance" },
  "whyus.trust.desc": { ar: "آلاف العملاء الراضين يثقون بنا في الجزائر", fr: "Des milliers de clients satisfaits nous font confiance en Algérie" },
};

export type Lang = "ar" | "fr";

export interface Variant {
  id: number;
  name: { ar: string; fr: string };
  desc: { ar: string; fr: string };
  price: string;
  image: string;
}

export interface Product {
  id: number;
  name: { ar: string; fr: string };
  desc: { ar: string; fr: string };
  price: string;
  image: string;
  variants: Variant[];
}

const px = (id: string, w = 700) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

export const products: Product[] = [
  {
    id: 1,
    name: { ar: "الصالونات", fr: "Salons" },
    desc: { ar: "مجموعة متنوعة من الصالونات الفاخرة", fr: "Collection de salons de luxe" },
    price: "65,000",
    image: px("1571460"),
    variants: [
      {
        id: 11,
        name: { ar: "صالون كلاسيك إيلغانس", fr: "Salon Classic Élégance" },
        desc: { ar: "أريكة من المخمل الداكن مع أرجل من البرونز الذهبي، 7 مقاعد", fr: "Canapé en velours sombre + pieds bronze doré, 7 places" },
        price: "85,000",
        image: px("1571460"),
      },
      {
        id: 12,
        name: { ar: "صالون أوريانتال رويال", fr: "Salon Oriental Royal" },
        desc: { ar: "طراز شرقي أصيل بنقوشات ذهبية وأقمشة فاخرة", fr: "Style oriental authentique avec motifs dorés et tissus luxueux" },
        price: "95,000",
        image: px("276583"),
      },
      {
        id: 13,
        name: { ar: "صالون مودرن لوكس", fr: "Salon Modern Luxe" },
        desc: { ar: "تصميم عصري أنيق بألوان محايدة وخطوط نظيفة", fr: "Design contemporain élégant en tons neutres et lignes épurées" },
        price: "75,000",
        image: px("1457842"),
      },
      {
        id: 14,
        name: { ar: "صالون إمبريال", fr: "Salon Impérial" },
        desc: { ar: "إلهام من القصور الملكية، مخمل أزرق داكن وتفاصيل ذهبية", fr: "Inspiré des palais royaux, velours bleu nuit et détails dorés" },
        price: "120,000",
        image: px("2079249"),
      },
      {
        id: 15,
        name: { ar: "صالون نيو كلاسيك", fr: "Salon Néo-Classique" },
        desc: { ar: "مزيج بين الكلاسيكية والحداثة بجلد طبيعي فاتح", fr: "Mélange classique-moderne en cuir naturel clair" },
        price: "68,000",
        image: px("1866149"),
      },
    ],
  },
  {
    id: 2,
    name: { ar: "طاولات الطعام", fr: "Tables à Manger" },
    desc: { ar: "طاولات طعام فاخرة لكل المقاسات", fr: "Tables à manger luxueuses pour toutes les tailles" },
    price: "45,000",
    image: px("1080721"),
    variants: [
      {
        id: 21,
        name: { ar: "طاولة نوفا مستطيلة", fr: "Table Nova Rectangulaire" },
        desc: { ar: "خشب الجوز الداكن مع حافة ذهبية، 6 أشخاص", fr: "Noyer foncé + bordure dorée, 6 personnes" },
        price: "45,000",
        image: px("1080721"),
      },
      {
        id: 22,
        name: { ar: "طاولة بيضاوية رويال", fr: "Table Ovale Royal" },
        desc: { ar: "شكل بيضاوي أنيق من المرمر الأبيض وأرجل ذهبية، 8 أشخاص", fr: "Forme ovale en marbre blanc + pieds dorés, 8 personnes" },
        price: "65,000",
        image: px("1350789"),
      },
      {
        id: 23,
        name: { ar: "طاولة مستديرة سلطانية", fr: "Table Ronde Sultane" },
        desc: { ar: "طاولة مستديرة من الخشب المحفور، 4 أشخاص", fr: "Table ronde en bois sculpté, 4 personnes" },
        price: "38,000",
        image: px("3201921"),
      },
      {
        id: 24,
        name: { ar: "طاولة جراند إمبريال", fr: "Table Grand Impérial" },
        desc: { ar: "طاولة كبيرة للمناسبات، 12 شخص، خشب ماهوجاني", fr: "Grande table de cérémonie 12 personnes, bois mahogany" },
        price: "95,000",
        image: px("1457842"),
      },
    ],
  },
  {
    id: 3,
    name: { ar: "الكراسي والفوتيات", fr: "Chaises & Fauteuils" },
    desc: { ar: "كراسي وفوتيات فاخرة لكل الأذواق", fr: "Chaises et fauteuils luxueux pour tous les goûts" },
    price: "18,000",
    image: px("1571453"),
    variants: [
      {
        id: 31,
        name: { ar: "فوتيا بريستيج جلد", fr: "Fauteuil Prestige Cuir" },
        desc: { ar: "جلد طبيعي أسود مع قاعدة كروم ذهبية", fr: "Cuir naturel noir + base chromée dorée" },
        price: "22,000",
        image: px("1571453"),
      },
      {
        id: 32,
        name: { ar: "كرسي مخمل ريجنسي", fr: "Fauteuil Velours Régence" },
        desc: { ar: "مخمل بردقوشي غني مع أرجل منحوتة بذهب عيار 24", fr: "Velours bordeaux riche + pieds sculptés dorés 24 carats" },
        price: "18,000",
        image: px("1148955"),
      },
      {
        id: 33,
        name: { ar: "كرسي باروك سلطاني", fr: "Chaise Baroque Sultane" },
        desc: { ar: "نقوشات كلاسيكية بالأبيض والذهب الفاخر", fr: "Motifs classiques blanc et or luxueux" },
        price: "28,000",
        image: px("2747448"),
      },
      {
        id: 34,
        name: { ar: "كنبة ثنائية كلاسيك", fr: "Canapé Duo Classic" },
        desc: { ar: "كنبة ثنائية دافئة من القماش الفاخر", fr: "Canapé deux places en tissu luxueux chaleureux" },
        price: "35,000",
        image: px("1866149"),
      },
    ],
  },
  {
    id: 4,
    name: { ar: "غرف الأطفال", fr: "Chambres Enfants" },
    desc: { ar: "غرف أطفال ساحرة بتصاميم فريدة", fr: "Chambres enfants enchanteresses aux designs uniques" },
    price: "85,000",
    image: px("1648776"),
    variants: [
      {
        id: 41,
        name: { ar: "غرفة ستار النجوم", fr: "Chambre Star des Étoiles" },
        desc: { ar: "سرير + مكتب + مكتبة مزينة بنجوم ذهبية، مناسبة للجنسين", fr: "Lit + bureau + bibliothèque étoiles dorées, mixte" },
        price: "85,000",
        image: px("1648776"),
      },
      {
        id: 42,
        name: { ar: "غرفة الأميرة الوردية", fr: "Chambre Princesse Rose" },
        desc: { ar: "عالم وردي ساحر بتفاصيل ذهبية للبنات", fr: "Univers rose enchanté avec détails dorés pour filles" },
        price: "92,000",
        image: px("3652222"),
      },
      {
        id: 43,
        name: { ar: "غرفة الأمير الأزرق", fr: "Chambre Prince Bleu" },
        desc: { ar: "تصميم ملكي بألوان الكحلي والذهبي للأولاد", fr: "Design royal bleu marine et or pour garçons" },
        price: "88,000",
        image: px("1743229"),
      },
    ],
  },
  {
    id: 5,
    name: { ar: "غرف النوم", fr: "Chambres à Coucher" },
    desc: { ar: "غرف نوم فاخرة لراحة ملكية", fr: "Chambres à coucher luxueuses pour un repos royal" },
    price: "120,000",
    image: px("1743229"),
    variants: [
      {
        id: 51,
        name: { ar: "غرفة نوم أميرة", fr: "Chambre Princesse" },
        desc: { ar: "طقم كامل مع لوح رأس مبطن + خزانة + 2 طاولات سرير", fr: "Ensemble complet tête de lit capitonnée + armoire + 2 chevets" },
        price: "120,000",
        image: px("1743229"),
      },
      {
        id: 52,
        name: { ar: "غرفة السلطان الذهبية", fr: "Chambre Sultan Dorée" },
        desc: { ar: "أثاث ذهبي اللون مع نقوشات ملكية وإضاءة دافئة", fr: "Mobilier doré avec gravures royales et éclairage chaleureux" },
        price: "185,000",
        image: px("271624"),
      },
      {
        id: 53,
        name: { ar: "غرفة مودرن إيلغانس", fr: "Chambre Modern Élégance" },
        desc: { ar: "تصميم عصري بألوان رمادية داكنة وتفاصيل ذهبية خفية", fr: "Design moderne gris foncé avec détails dorés subtils" },
        price: "145,000",
        image: px("164595"),
      },
      {
        id: 54,
        name: { ar: "غرفة رويال كلاسيك", fr: "Chambre Royal Classic" },
        desc: { ar: "خشب الجوز الداكن مع أقمشة قطيفة رائعة", fr: "Noyer foncé avec tissus veloutés somptueux" },
        price: "160,000",
        image: px("1457842"),
      },
    ],
  },
  {
    id: 6,
    name: { ar: "المرايا والديكور", fr: "Miroirs & Déco" },
    desc: { ar: "مرايا وقطع ديكور ذهبية فاخرة", fr: "Miroirs et pièces de décoration dorées luxueuses" },
    price: "18,000",
    image: px("2062431"),
    variants: [
      {
        id: 61,
        name: { ar: "مرآة رويال مستطيلة", fr: "Miroir Royal Rectangulaire" },
        desc: { ar: "إطار معدني ذهبي منحوت، حجم كبير 120×80 سم", fr: "Cadre métal doré sculpté, grand format 120×80 cm" },
        price: "18,000",
        image: px("2062431"),
      },
      {
        id: 62,
        name: { ar: "مرآة دائرية كلاسيك", fr: "Miroir Rond Classique" },
        desc: { ar: "مرآة دائرية بإطار زهور ذهبية، قطر 90 سم", fr: "Miroir rond cadre fleurs dorées, diamètre 90 cm" },
        price: "14,500",
        image: px("1571460"),
      },
      {
        id: 63,
        name: { ar: "مرآة كاملة الطول", fr: "Miroir Pleine Longueur" },
        desc: { ar: "مرآة كاملة الطول بإطار برونزي فاخر 180×60 سم", fr: "Miroir pleine longueur cadre bronze luxueux 180×60 cm" },
        price: "22,000",
        image: px("276583"),
      },
      {
        id: 64,
        name: { ar: "مرآة رسم الوجه", fr: "Miroir de Coiffeuse" },
        desc: { ar: "مرآة تبرج مع إضاءة LED ذهبية وطاولة خشبية", fr: "Miroir de maquillage avec éclairage LED doré et table en bois" },
        price: "32,000",
        image: px("2079249"),
      },
    ],
  },
];
