import salon1 from "@assets/IMG_20260529_004438_904_1780021117998.jpg";
import salon2 from "@assets/IMG_20260529_004438_345_1780021117998.jpg";
import salon3 from "@assets/IMG_20260529_031758_082_1780021117988.jpg";
import salon4 from "@assets/gemini-2.5-flash-image_Luxury_furniture_showroom_professional__1780021117990.jpg";
import salonCover from "@assets/gemini-2.5-flash-image_Luxury_furniture_showroom_professional__1780021117990.jpg";

import table1 from "@assets/IMG_20260529_031757_900_1780021117989.jpg";
import table2 from "@assets/IMG_20260529_031757_993_1780021117989.jpg";
import table3 from "@assets/IMG_20260529_031758_326_1780021117988.jpg";
import table4 from "@assets/IMG_20260529_031758_395_1780021117986.jpg";
import table5 from "@assets/IMG_20260529_031758_280_1780021117988.jpg";

import bed1 from "@assets/IMG_20260529_031758_370_1780021117987.jpg";
import bed2 from "@assets/IMG_20260529_031758_562_1780021117986.jpg";
import bed3 from "@assets/IMG_20260529_031758_664_1780021117986.jpg";
import bed4 from "@assets/IMG_20260529_031758_810_1780021117985.jpg";
import bed5 from "@assets/IMG_20260529_031758_370_1780021117987.jpg";
import bed6 from "@assets/IMG_20260529_031758_562_1780021117986.jpg";
import bed7 from "@assets/IMG_20260529_031758_664_1780021117986.jpg";

const px = (id: string, w = 700) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

export const translations = {
  "nav.home": { ar: "الرئيسية", fr: "Accueil" },
  "nav.gallery": { ar: "المجموعة", fr: "Collection" },
  "nav.about": { ar: "عن الدار", fr: "À Propos" },
  "nav.contact": { ar: "تواصل معنا", fr: "Contact" },
  "hero.title": { ar: "البيت الملكي", fr: "Royal Home" },
  "hero.subtitle": {
    ar: "حيث تلتقي الفخامة بالأصالة في كل تفصيلة من منزلك",
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

export const products: Product[] = [
  {
    id: 1,
    name: { ar: "الصالونات", fr: "Salons" },
    desc: { ar: "مجموعة متنوعة من الصالونات الفاخرة", fr: "Collection de salons de luxe" },
    price: "65,000",
    image: salonCover,
    variants: [
      {
        id: 11,
        name: { ar: "صالون كريمي كلاسيك", fr: "Salon Crème Classique" },
        desc: { ar: "طقم كامل من القماش الكريمي مع وسائد برتقالية وطاولة خشبية", fr: "Ensemble tissu crème avec coussins orangés et table en bois" },
        price: "85,000",
        image: salon1,
      },
      {
        id: 12,
        name: { ar: "صالون رمادي مودرن", fr: "Salon Gris Moderne" },
        desc: { ar: "طقم رمادي عصري مع طاولات بيضاوية داكنة وتصميم منظم", fr: "Salon gris contemporain avec tables ovales sombres" },
        price: "72,000",
        image: salon2,
      },
      {
        id: 13,
        name: { ar: "صالون L-شكل بيج", fr: "Salon L-Shape Beige" },
        desc: { ar: "صالون بيج فاخر على شكل L مع وسائد كبيرة مريحة", fr: "Canapé L-shape beige luxueux avec grands coussins confortables" },
        price: "78,000",
        image: salon3,
      },
      {
        id: 14,
        name: { ar: "صالون معرض الدار", fr: "Salon Showroom Royal" },
        desc: { ar: "صالون الدار الفاخر كما يبدو في معرضنا بالقليعة", fr: "Salon Royal tel qu'exposé dans notre showroom à El Qlea" },
        price: "95,000",
        image: salon4,
      },
    ],
  },
  {
    id: 2,
    name: { ar: "طاولات الطعام", fr: "Tables à Manger" },
    desc: { ar: "طاولات طعام فاخرة لكل المقاسات", fr: "Tables à manger luxueuses pour toutes les tailles" },
    price: "38,000",
    image: table1,
    variants: [
      {
        id: 21,
        name: { ar: "طاولة مستطيلة كلاسيك", fr: "Table Rectangulaire Classique" },
        desc: { ar: "خشب بني داكن مع كراسي مبطنة بالقماش، تتسع لـ 6 أشخاص", fr: "Bois brun foncé + chaises rembourrées en tissu, 6 personnes" },
        price: "168,000",
        image: table1,
      },
      {
        id: 22,
        name: { ar: "طاولة البيضاوي", fr: "Table Ovale Élégance" },
        desc: { ar: "طاولة بيضاوية لامعة مع كراسي عصرية ذات أرجل خشبية، 6 أشخاص", fr: "Table ovale brillante + chaises modernes pieds bois, 6 personnes" },
        price: "189,000",
        image: table2,
      },
      {
        id: 23,
        name: { ar: "طاولة دائرية بيضاء", fr: "Table Ronde Blanche" },
        desc: { ar: "طاولة دائرية بيضاء مع دوّار مركزي وكراسي مخملية، 4 أشخاص", fr: "Table ronde blanche avec plateau tournant + chaises velours, 4 personnes" },
        price: "179,000",
        image: table3,
      },
      {
        id: 24,
        name: { ar: "طاولة دائرية كبيرة", fr: "Grande Table Ronde" },
        desc: { ar: "طاولة دائرية ضخمة من خشب الجوز تتسع لـ 12 شخص، مثالية للمناسبات", fr: "Grande table ronde en noyer pour 12 personnes, idéale pour les fêtes" },
        price: "178,000",
        image: table4,
      },
      {
        id: 25,
        name: { ar: "طاولة رويال مستطيلة", fr: "Table Rectangulaire Royal" },
        desc: { ar: "طاولة بلاط زجاجي مع كراسي مدورة الظهر، أناقة راقية، 6 أشخاص", fr: "Plateau verre + chaises dossier arrondi, raffinement rare, 6 personnes" },
        price: "178,000",
        image: table5,
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
    image: bed1,
    variants: [
      {
        id: 52,
        name: { ar: "غرفة Eyeglass — أسود لاكيه", fr: "Chambre Eyeglass — Noir Laqué" },
        desc: { ar: "غرفة Eyeglass أسود لامع مع مرآة تبرج بإضاءة LED زرقاء وإكسسوارات ذهبية فاخرة", fr: "Chambre Eyeglass noir brillant + miroir coiffeuse LED bleu + accessoires dorés luxueux" },
        price: "298,000",
        image: bed2,
      },
      {
        id: 54,
        name: { ar: "غرفة CLARA PLUS — جناح فاخر", fr: "Chambre CLARA PLUS — Suite Luxe" },
        desc: { ar: "طقم أبيض بتفاصيل ذهبية أنيقة، خزانة بمرايا سوداء وإضاءة ذهبية", fr: "Ensemble blanc aux détails dorés élégants + armoire miroirs noirs et éclairage doré" },
        price: "189,000",
        image: bed4,
      },
      {
        id: 55,
        name: { ar: "غرفة DREAM 3 — ممتازة", fr: "Chambre DREAM 3 — Excellence" },
        desc: { ar: "طقم كلاسيكي أبيض ناصع مع لوح رأس مبطن، مرآة تبرج بإضاءة LED وخزانة أنيقة بثلاثة أبواب", fr: "Ensemble classique blanc nacré, tête de lit capitonnée, coiffeuse LED et armoire 3 portes" },
        price: "165,000",
        image: bed5,
      },
      {
        id: 56,
        name: { ar: "غرفة Cristal — فاخرة", fr: "Chambre Cristal — Luxe" },
        desc: { ar: "غرفة Cristal بلوح رأس عمودي مضيء وخزانة مرايا واسعة رباعية الأبواب، أناقة عصرية راقية", fr: "Chambre Cristal, tête de lit verticale lumineuse + grande armoire miroirs 4 portes, élégance contemporaine" },
        price: "189,000",
        image: bed6,
      },
      {
        id: 57,
        name: { ar: "غرفة LINA — أبيض بيج حديث", fr: "Chambre LINA — Beige Moderne" },
        desc: { ar: "غرفة LINA بتصميم عصري مميز، لوح رأس مبطن دائري مع خزانتين بإضاءة برتقالية وديكور أزهار ذهبي", fr: "Chambre LINA au design contemporain, tête de lit arrondie capitonnée + armoires éclairage orange et décor floral doré" },
        price: "198,000",
        image: bed7,
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
        name: { ar: "مرآة تبرج LED", fr: "Miroir Coiffeuse LED" },
        desc: { ar: "مرآة تبرج مع إضاءة LED ذهبية وطاولة خشبية فاخرة", fr: "Miroir de maquillage avec éclairage LED doré et table en bois" },
        price: "32,000",
        image: px("2079249"),
      },
    ],
  },
];
