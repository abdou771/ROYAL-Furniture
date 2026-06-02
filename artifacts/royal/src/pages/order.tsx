import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Send, MapPin, User, Phone, Package, CalendarDays, CheckCircle, ChevronLeft, ChevronRight as ChevronRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/use-language";
import logoPath from "@assets/IMG_20260529_004439_015_1780015083267.jpg";

const SHEETS_URL = import.meta.env.VITE_GOOGLE_SHEETS_URL as string | undefined;
const WA_NUMBER = "213549032671";
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
    deliveryTime: "تاريخ الاستلام المفضل",
    pickDate: "اختر تاريخاً",
    noDate: "بدون تفضيل",
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
    deliveryTime: "Date de livraison souhaitée",
    pickDate: "Choisir une date",
    noDate: "Sans préférence",
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

  // --- Calendar state ---
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [calView, setCalView] = useState(() => {
    const d = new Date();
    return { year: d.getFullYear(), month: d.getMonth() };
  });
  const [showCal, setShowCal] = useState(false);

  const arMonths = ["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"];
  const frMonths = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];
  const months = lang === "ar" ? arMonths : frMonths;
  const arDays = ["أح","اث","ثل","أر","خم","جم","سب"];
  const frDays = ["Di","Lu","Ma","Me","Je","Ve","Sa"];
  const dayLabels = lang === "ar" ? arDays : frDays;

  const firstDayOfMonth = new Date(calView.year, calView.month, 1).getDay();
  const daysInMonth = new Date(calView.year, calView.month + 1, 0).getDate();

  const prevMonth = () => setCalView(v => {
    if (v.month === 0) return { year: v.year - 1, month: 11 };
    return { year: v.year, month: v.month - 1 };
  });
  const nextMonth = () => setCalView(v => {
    if (v.month === 11) return { year: v.year + 1, month: 0 };
    return { year: v.year, month: v.month + 1 };
  });

  const selectDate = (day: number) => {
    const d = new Date(calView.year, calView.month, day);
    if (d < today) return;
    const formatted = d.toLocaleDateString(lang === "ar" ? "ar-DZ" : "fr-DZ", {
      weekday: "long", year: "numeric", month: "long", day: "numeric",
    });
    setForm(f => ({ ...f, deliveryTime: formatted }));
    setShowCal(false);
  };

  const isPast = (day: number) => new Date(calView.year, calView.month, day) < today;
  const isSelected = (day: number) => {
    if (!form.deliveryTime) return false;
    const d = new Date(calView.year, calView.month, day);
    return d.toLocaleDateString(lang === "ar" ? "ar-DZ" : "fr-DZ", {
      weekday: "long", year: "numeric", month: "long", day: "numeric",
    }) === form.deliveryTime;
  };

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

                  {/* Delivery date — calendar picker */}
                  <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                    <div className={labelBase}>
                      <CalendarDays className="w-3 h-3" />
                      {t.deliveryTime}
                    </div>

                    {/* Trigger button */}
                    <button
                      type="button"
                      onClick={() => setShowCal(v => !v)}
                      className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl border transition-all duration-300 text-sm ${
                        form.deliveryTime
                          ? "border-primary/60 text-foreground bg-primary/8"
                          : "border-primary/20 text-foreground/30 bg-card/50 hover:border-primary/40"
                      }`}
                    >
                      <span>{form.deliveryTime || t.pickDate}</span>
                      <div className="flex items-center gap-2">
                        {form.deliveryTime && (
                          <span
                            role="button"
                            onClick={e => { e.stopPropagation(); setForm(f => ({ ...f, deliveryTime: "" })); }}
                            className="text-foreground/30 hover:text-primary text-lg leading-none"
                          >×</span>
                        )}
                        <CalendarDays className="w-4 h-4 text-primary/50" />
                      </div>
                    </button>

                    {/* Calendar dropdown */}
                    <AnimatePresence>
                      {showCal && (
                        <motion.div
                          initial={{ opacity: 0, y: -6, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -6, scale: 0.97 }}
                          transition={{ duration: 0.18 }}
                          className="mt-2 bg-card border border-primary/20 rounded-2xl p-4 shadow-[0_8px_40px_rgba(0,0,0,0.4)]"
                        >
                          {/* Month nav */}
                          <div className="flex items-center justify-between mb-3">
                            <button type="button" onClick={prevMonth}
                              className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-primary/15 text-primary/60 hover:text-primary transition-colors">
                              {lang === "ar" ? <ChevronRightIcon className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                            </button>
                            <span className="text-sm font-semibold text-primary">
                              {months[calView.month]} {calView.year}
                            </span>
                            <button type="button" onClick={nextMonth}
                              className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-primary/15 text-primary/60 hover:text-primary transition-colors">
                              {lang === "ar" ? <ChevronLeft className="w-4 h-4" /> : <ChevronRightIcon className="w-4 h-4" />}
                            </button>
                          </div>

                          {/* Day headers */}
                          <div className="grid grid-cols-7 mb-1">
                            {dayLabels.map(d => (
                              <div key={d} className="text-center text-[10px] text-primary/40 font-semibold py-1 uppercase tracking-wide">
                                {d}
                              </div>
                            ))}
                          </div>

                          {/* Days grid */}
                          <div className="grid grid-cols-7 gap-y-1">
                            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                              <div key={`e-${i}`} />
                            ))}
                            {Array.from({ length: daysInMonth }).map((_, i) => {
                              const day = i + 1;
                              const past = isPast(day);
                              const sel = isSelected(day);
                              return (
                                <button
                                  key={day}
                                  type="button"
                                  disabled={past}
                                  onClick={() => selectDate(day)}
                                  className={`h-8 w-full rounded-lg text-xs font-medium transition-all duration-200 ${
                                    sel
                                      ? "bg-primary text-black shadow-[0_0_10px_rgba(212,175,55,0.4)]"
                                      : past
                                        ? "text-foreground/15 cursor-not-allowed"
                                        : "text-foreground/70 hover:bg-primary/20 hover:text-primary"
                                  }`}
                                >
                                  {day}
                                </button>
                              );
                            })}
                          </div>

                          {/* No preference link */}
                          <div className="mt-3 pt-3 border-t border-primary/10 text-center">
                            <button type="button"
                              onClick={() => { setForm(f => ({ ...f, deliveryTime: "" })); setShowCal(false); }}
                              className="text-xs text-foreground/35 hover:text-primary transition-colors">
                              {t.noDate}
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
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
