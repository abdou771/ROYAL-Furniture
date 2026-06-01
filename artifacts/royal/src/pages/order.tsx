import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Send, MapPin, User, Phone, Package, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/use-language";
import logoPath from "@assets/IMG_20260529_004439_015_1780015083267.jpg";

const SHEETS_URL = import.meta.env.VITE_GOOGLE_SHEETS_URL as string | undefined;
const WA_NUMBER = "213541465201";
const LS_KEY = "royal-customer-info";

const copy = {
  ar: {
    title: "طلب المنتج",
    subtitle: "أكمل بياناتك وسنتواصل معك لتأكيد الطلب",
    back: "العودة للمتجر",
    firstName: "الاسم",
    lastName: "اللقب",
    location: "الموقع / العنوان",
    locationBtn: "تحديد موقعي على خرائط Google",
    locationPlaceholder: "ولاية، بلدية، حي...",
    product: "المنتج المطلوب",
    productPlaceholder: "اسم المنتج...",
    phone: "رقم الهاتف",
    deliveryTime: "مدة الاستلام",
    day: "يوم واحد",
    week: "أسبوع",
    month: "شهر",
    flexible: "حسب التوفر",
    submit: "إرسال الطلب",
    submitting: "جاري الإرسال...",
    successTitle: "تم إرسال طلبك!",
    successSub: "سنتصل بك في أقرب وقت لتأكيد الطلب وتحديد موعد التسليم.",
    newOrder: "طلب جديد",
    required: "*",
    note: "جميع الحقول المميزة بـ * إلزامية",
  },
  fr: {
    title: "Commander un Produit",
    subtitle: "Complétez vos informations et nous vous contacterons pour confirmer",
    back: "Retour au magasin",
    firstName: "Prénom",
    lastName: "Nom",
    location: "Localisation / Adresse",
    locationBtn: "Me localiser sur Google Maps",
    locationPlaceholder: "Wilaya, commune, quartier...",
    product: "Produit souhaité",
    productPlaceholder: "Nom du produit...",
    phone: "Numéro de téléphone",
    deliveryTime: "Délai de livraison",
    day: "Un jour",
    week: "Une semaine",
    month: "Un mois",
    flexible: "Selon disponibilité",
    submit: "Envoyer la commande",
    submitting: "Envoi en cours...",
    successTitle: "Commande envoyée!",
    successSub: "Nous vous contacterons très prochainement pour confirmer la commande.",
    newOrder: "Nouvelle commande",
    required: "*",
    note: "Les champs marqués * sont obligatoires",
  },
};

const ease = [0.16, 1, 0.3, 1] as const;

export default function OrderPage() {
  const { lang } = useLanguage();
  const t = copy[lang];
  const [, navigate] = useLocation();

  const productFromUrl = new URLSearchParams(window.location.search).get("product") || "";
  const saved = (() => {
    try { return JSON.parse(localStorage.getItem(LS_KEY) || "{}"); }
    catch { return {}; }
  })();

  const [form, setForm] = useState({
    firstName: saved.firstName || "",
    lastName: saved.lastName || "",
    location: saved.location || "",
    product: productFromUrl || saved.product || "",
    phone: saved.phone || "",
    deliveryTime: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  useEffect(() => {
    window.scrollTo({ top: 0 });
    document.title = lang === "ar" ? "طلب المنتج — البيت الملكي" : "Commander — Royal Home";
  }, [lang]);

  const set = (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm(p => ({ ...p, [field]: e.target.value }));

  const saveToStorage = () => {
    localStorage.setItem(LS_KEY, JSON.stringify({
      firstName: form.firstName,
      lastName: form.lastName,
      location: form.location,
      phone: form.phone,
      product: form.product,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    saveToStorage();

    const now = new Date();
    const payload = {
      الاسم: form.firstName,
      اللقب: form.lastName,
      الموقع: form.location || "—",
      المنتج: form.product,
      الرقم: form.phone,
      المدة: form.deliveryTime || "—",
      التاريخ: now.toLocaleDateString("ar-DZ") + " " + now.toLocaleTimeString("ar-DZ"),
      الحالة: "طلب جديد",
    };

    let sent = false;
    if (SHEETS_URL) {
      try {
        await fetch(SHEETS_URL, { method: "POST", body: JSON.stringify(payload) });
        sent = true;
      } catch { /* fallthrough */ }
    }

    if (sent) {
      setStatus("success");
    } else {
      const msg = [
        `🛒 *طلب جديد — البيت الملكي*`,
        `👤 ${form.firstName} ${form.lastName}`,
        `📞 ${form.phone}`,
        `📍 ${form.location || "—"}`,
        `🛋️ ${form.product}`,
        `⏱️ ${form.deliveryTime || "—"}`,
      ].join("\n");
      window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
      setStatus("idle");
      navigate("/");
    }
  };

  const inputBase =
    "w-full bg-card/50 border border-primary/20 focus:border-primary/60 focus:ring-2 focus:ring-primary/15 rounded-2xl px-4 py-3.5 text-foreground placeholder:text-foreground/25 outline-none transition-all duration-300 text-sm";
  const labelBase = "flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-primary/60 mb-2 font-medium";

  const deliveryOptions = [
    { value: t.day, key: "day" },
    { value: t.week, key: "week" },
    { value: t.month, key: "month" },
    { value: t.flexible, key: "flexible" },
  ];

  return (
    <div className="min-h-[100dvh] bg-background text-foreground" dir={lang === "ar" ? "rtl" : "ltr"}>
      {/* Top gold accent */}
      <div className="h-[3px] bg-gradient-to-r from-transparent via-primary to-transparent" />

      {/* Nav bar */}
      <div className="sticky top-0 z-50 bg-background/90 backdrop-blur-xl border-b border-primary/10 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm text-foreground/50 hover:text-primary transition-colors duration-300"
          >
            <ArrowRight className={`w-4 h-4 ${lang === "ar" ? "" : "rotate-180"}`} />
            {t.back}
          </button>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full overflow-hidden border border-primary/30">
              <img src={logoPath} alt="logo" className="h-full w-full object-cover scale-150" />
            </div>
            <span className="text-sm font-serif text-primary hidden sm:block">
              {lang === "ar" ? "البيت الملكي" : "Royal Home"}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-5 py-10">
        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 24 }}
              className="flex flex-col items-center text-center py-20 gap-6"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
                className="w-28 h-28 rounded-full bg-primary/10 border-2 border-primary/40 flex items-center justify-center"
              >
                <CheckCircle className="w-14 h-14 text-primary" />
              </motion.div>
              <div>
                <h2 className="text-2xl font-serif text-primary mb-2">{t.successTitle}</h2>
                <p className="text-foreground/50 text-sm max-w-xs mx-auto leading-relaxed">{t.successSub}</p>
              </div>
              <div className="flex gap-3 mt-4">
                <Button
                  onClick={() => { setStatus("idle"); setForm(f => ({ ...f, product: "", deliveryTime: "" })); }}
                  variant="outline"
                  className="border-primary/30 text-primary hover:bg-primary/10 rounded-xl"
                >
                  {t.newOrder}
                </Button>
                <Button
                  onClick={() => navigate("/")}
                  className="bg-primary hover:bg-primary/90 text-black rounded-xl font-semibold"
                >
                  {t.back}
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
            >
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-serif text-primary mb-2">{t.title}</h1>
                <p className="text-sm text-foreground/45">{t.subtitle}</p>
                <div className="flex items-center justify-center gap-3 mt-4">
                  <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/50" />
                  <span className="text-primary text-lg">♦</span>
                  <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/50" />
                </div>
              </div>

              {/* Card */}
              <div className="bg-card/60 backdrop-blur-sm border border-primary/15 rounded-3xl p-6 md:p-8 shadow-[0_8px_40px_rgba(0,0,0,0.3)]">
                <form onSubmit={handleSubmit} className="space-y-5">

                  {/* Name row */}
                  <div className="grid grid-cols-2 gap-4">
                    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
                      <div className={labelBase}>
                        <User className="w-3 h-3" />
                        {t.firstName} <span className="text-primary">{t.required}</span>
                      </div>
                      <input
                        required
                        value={form.firstName}
                        onChange={set("firstName")}
                        placeholder={lang === "ar" ? "محمد" : "Mohammed"}
                        className={inputBase}
                      />
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
                      <div className={labelBase}>
                        {t.lastName} <span className="text-primary">{t.required}</span>
                      </div>
                      <input
                        required
                        value={form.lastName}
                        onChange={set("lastName")}
                        placeholder={lang === "ar" ? "بن علي" : "Ben Ali"}
                        className={inputBase}
                      />
                    </motion.div>
                  </div>

                  {/* Phone */}
                  <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.11 }}>
                    <div className={labelBase}>
                      <Phone className="w-3 h-3" />
                      {t.phone} <span className="text-primary">{t.required}</span>
                    </div>
                    <input
                      required
                      type="tel"
                      value={form.phone}
                      onChange={set("phone")}
                      placeholder="05 XX XX XX XX"
                      dir="ltr"
                      className={inputBase}
                    />
                  </motion.div>

                  {/* Location */}
                  <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14 }}>
                    <div className={labelBase}>
                      <MapPin className="w-3 h-3" />
                      {t.location}
                    </div>
                    <button
                      type="button"
                      onClick={() => window.open("https://maps.google.com", "_blank")}
                      className="w-full mb-2 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-primary/25 text-primary text-[11px] font-semibold uppercase tracking-widest hover:bg-primary/8 hover:border-primary/55 transition-all duration-300"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      {t.locationBtn}
                    </button>
                    <textarea
                      rows={2}
                      value={form.location}
                      onChange={set("location")}
                      placeholder={t.locationPlaceholder}
                      className={`${inputBase} resize-none`}
                    />
                  </motion.div>

                  {/* Product */}
                  <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.17 }}>
                    <div className={labelBase}>
                      <Package className="w-3 h-3" />
                      {t.product} <span className="text-primary">{t.required}</span>
                    </div>
                    <input
                      required
                      value={form.product}
                      onChange={set("product")}
                      placeholder={t.productPlaceholder}
                      className={inputBase}
                    />
                  </motion.div>

                  {/* Delivery time */}
                  <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                    <div className={labelBase}>
                      <Clock className="w-3 h-3" />
                      {t.deliveryTime}
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {deliveryOptions.map(opt => (
                        <button
                          key={opt.key}
                          type="button"
                          onClick={() => setForm(f => ({ ...f, deliveryTime: f.deliveryTime === opt.value ? "" : opt.value }))}
                          className={`px-3 py-2.5 rounded-xl border text-xs font-medium transition-all duration-250 ${
                            form.deliveryTime === opt.value
                              ? "bg-primary text-black border-primary shadow-[0_0_12px_rgba(212,175,55,0.3)]"
                              : "border-primary/25 text-foreground/60 hover:border-primary/50 hover:text-primary"
                          }`}
                        >
                          {opt.value}
                        </button>
                      ))}
                    </div>
                  </motion.div>

                  {/* Note */}
                  <p className="text-[11px] text-foreground/30 text-center">{t.note}</p>

                  {/* Submit */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full bg-primary hover:bg-primary/90 text-black font-bold text-base py-6 rounded-2xl shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:shadow-[0_0_50px_rgba(212,175,55,0.5)] transition-all duration-500 gap-2.5 tracking-wide"
                    >
                      {status === "loading"
                        ? <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        : <Send className="w-4 h-4" />
                      }
                      {status === "loading" ? t.submitting : t.submit}
                    </Button>
                  </motion.div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
