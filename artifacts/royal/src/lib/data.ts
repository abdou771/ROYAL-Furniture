import salonImg from "@/assets/images/salon.png";
import tableImg from "@/assets/images/table.png";
import fauteuilImg from "@/assets/images/fauteuil.png";
import enfantImg from "@/assets/images/enfant.png";
import princesseImg from "@/assets/images/princesse.png";
import miroirImg from "@/assets/images/miroir.png";

export const translations = {
  "nav.home": { ar: "الرئيسية", fr: "Accueil" },
  "nav.gallery": { ar: "المجموعة", fr: "Collection" },
  "nav.about": { ar: "عن الدار", fr: "À Propos" },
  "nav.contact": { ar: "تواصل معنا", fr: "Contact" },
  "hero.title": { ar: "البيت الملكي", fr: "Royal Home" },
  "hero.subtitle": { 
    ar: "حيث يلتقي الفخامة بالأصالة في كل تفصيلة من منزلك", 
    fr: "Où le luxe rencontre l'authenticité dans chaque détail de votre maison" 
  },
  "hero.cta": { ar: "استكشف المجموعة", fr: "Découvrir la Collection" },
  "gallery.title": { ar: "مجموعتنا الحصرية", fr: "Notre Collection Exclusive" },
  "about.title": { ar: "فلسفة الدار", fr: "Notre Philosophie" },
  "about.text": { 
    ar: "في البيت الملكي، نؤمن بأن الأثاث ليس مجرد قطع خشبية، بل هو تعبير عن الذوق الرفيع والهوية الفريدة. كل قطعة في معرضنا تُختار بعناية فائقة لتضفي لمسة من الفخامة الملكية على مساحتك الخاصة، مضاءة كتحفة فنية في متحف يعكس أسلوب حياتك الاستثنائي.", 
    fr: "Chez Royal Home, nous croyons que le mobilier n'est pas seulement fait de pièces de bois, mais l'expression d'un goût raffiné et d'une identité unique. Chaque pièce de notre galerie est soigneusement sélectionnée pour ajouter une touche de luxe royal à votre espace privé, éclairée comme un chef-d'œuvre dans un musée qui reflète votre style de vie exceptionnel." 
  },
  "contact.title": { ar: "حدد موعداً لزيارتنا", fr: "Prenez Rendez-vous" },
  "contact.whatsapp": { ar: "تواصل معنا عبر واتساب", fr: "Contactez-nous sur WhatsApp" },
  "contact.phone": { ar: "الهاتف", fr: "Téléphone" },
  "contact.address": { ar: "العنوان", fr: "Adresse" },
  "contact.address.val": { ar: "الجزائر العاصمة، الجزائر", fr: "Alger, Algérie" },
  "footer.rights": { ar: "جميع الحقوق محفوظة للبيت الملكي.", fr: "Tous droits réservés à Royal Home." },
  "product.price": { ar: "درهم", fr: "MAD" },
  "product.inquiry": { ar: "استفسار عن هذا المنتج", fr: "Se renseigner sur ce produit" },
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

export const products = [
  {
    id: 1,
    name: { ar: "صالون كلاسيك إيلغانس", fr: "Salon Classic Élégance" },
    desc: { ar: "أريكة من المخمل الداكن مع أرجل من البرونز الذهبي", fr: "Canapé en velours sombre + pieds en bronze doré" },
    price: "12,900",
    image: salonImg,
  },
  {
    id: 2,
    name: { ar: "طاولة طعام نوفا", fr: "Table à Manger Nova" },
    desc: { ar: "خشب الجوز الداكن مع حافة ذهبية دقيقة، تتسع لـ 6 أشخاص", fr: "Bois de noyer foncé + bordure dorée fine, 6 personnes" },
    price: "8,400",
    image: tableImg,
  },
  {
    id: 3,
    name: { ar: "كرسي بريستيج", fr: "Fauteuil Prestige" },
    desc: { ar: "جلد طبيعي أسود مع قاعدة كروم ذهبية", fr: "Cuir naturel noir + base chromée dorée" },
    price: "4,200",
    image: fauteuilImg,
  },
  {
    id: 4,
    name: { ar: "غرفة أطفال ستار", fr: "Chambre Enfant Star" },
    desc: { ar: "سرير + مكتب + مكتبة مزينة بنجوم ذهبية", fr: "Lit + bureau + bibliothèque avec étoiles dorées" },
    price: "15,800",
    image: enfantImg,
  },
  {
    id: 5,
    name: { ar: "غرفة نوم أميرة", fr: "Chambre à Coucher Princesse" },
    desc: { ar: "طقم كامل مع لوح رأس مبطن + خزانة + 2 طاولات سرير", fr: "Ensemble complet avec tête de lit capitonnée + armoire + 2 tables de chevet" },
    price: "22,500",
    image: princesseImg,
  },
  {
    id: 6,
    name: { ar: "مرآة رويال", fr: "Miroir Royal" },
    desc: { ar: "إطار معدني ذهبي منحوت، حجم كبير", fr: "Cadre en métal doré sculpté, grand format" },
    price: "3,600",
    image: miroirImg,
  },
];
