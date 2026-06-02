import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Phone, User, Package, Calendar, Hash, ChevronDown, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/data";
import { useLanguage } from "@/hooks/use-language";

const SHEETS_URL = "https://script.google.com/macros/s/AKfycbzu5uHjKylC97idB1Td6EDV4SKr-UBNU65Eax0r3pLdMQwOpV0lkqsIAE9X4esjqN__/exec";
const WA_NUMBER = "213541465201";

const copy = {
  ar: {
    title: "نموذج الطلب",
    subtitle: "سنتواصل معك لتأكيد طلبك في أقرب وقت",
    firstName: "الاسم",
    lastName: "اللقب",
    phone: "رقم هاتفك",
    address: "العنوان",
    mapBtn: "تحديد موقعي على خرائط جوجل",
    addressManual: "أو اكتب عنوانك يدوياً...",
    product: "المنتج",
    selectProduct: "اختر المنتج...",
    quantity: "الكمية",
    deliveryDate: "متى تريد التسليم؟",
    notes: "ملاحظات إضافية",
    notesPlaceholder: "لون، مقاس، تفاصيل...",
    submit: "إرسال الطلب",
    submitting: "جاري الإرسال...",
    success: "تم إرسال طلبك بنجاح!",
    successSub: "سنتصل بك قريباً لتأكيد الطلب.",
    required: "*",
    pieces: "قطعة",
  },
  fr: {
    title: "Formulaire de Commande",
    subtitle: "Nous vous contacterons pour confirmer votre commande",
    firstName: "Prénom",
    lastName: "Nom",
    phone: "Votre téléphone",
    address: "Adresse",
    mapBtn: "Me localiser sur Google Maps",
    addressManual: "Ou tapez votre adresse manuellement...",
    product: "Produit",
    selectProduct: "Choisir le produit...",
    quantity: "Quantité",
    deliveryDate: "Quand souhaitez-vous la livraison?",
    notes: "Remarques supplémentaires",
    notesPlaceholder: "Couleur, dimension, détails...",
    submit: "Envoyer la commande",
    submitting: "Envoi en cours...",
    success: "Commande envoyée avec succès!",
    successSub: "Nous vous contacterons bientôt.",
    required: "*",
    pieces: "pcs",
  },
};

interface Props {
  open: boolean;
  onClose: () => void;
  defaultProduct?: string;
}

const today = new Date().toISOString().split("T")[0];

export function OrderForm({ open, onClose, defaultProduct = "" }: Props) {
  const { lang } = useLanguage();
  const t = copy[lang];

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    product: defaultProduct,
    quantity: "1",
    deliveryDate: "",
    notes: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  useEffect(() => {
    if (open) {
      setForm(f => ({ ...f, product: defaultProduct }));
      setStatus("idle");
    }
  }, [open, defaultProduct]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  const set = (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm(prev => ({ ...prev, [field]: e.target.value }));

  const productOptions = products.flatMap(p => [
    { label: `── ${p.name[lang]} ──`, value: "", disabled: true },
    ...p.variants.map(v => ({
      label: `${p.name[lang]} — ${v.name[lang]}`,
      value: v.name[lang],
      disabled: false,
    })),
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const payload = {
      firstName: form.firstName,
      lastName: form.lastName,
      phone: form.phone,
      location: form.address || "—",
      product: form.product,
      duration: form.deliveryDate || "—",
    };

    // Send to Google Sheets (no-cors required — opaque response is expected)
    try {
      await fetch(SHEETS_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(payload),
      });
    } catch {
      // network error — still show success to user, data may not have arrived
    }

    setStatus("success");
    setTimeout(() => { onClose(); }, 3500);
  };

  const inputBase =
    "w-full bg-card/60 border border-primary/20 focus:border-primary/60 focus:ring-1 focus:ring-primary/25 rounded-xl px-4 py-3 text-foreground placeholder:text-foreground/30 outline-none transition-all duration-300 text-sm";
  const label =
    "flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-primary/60 mb-1.5";

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="order-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[1100] bg-black/88 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            key="order-panel"
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 220, damping: 26, mass: 0.85 }}
            className="fixed inset-x-3 top-16 bottom-3 z-[1101] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-xl flex flex-col bg-background rounded-3xl border border-primary/20 overflow-hidden shadow-[0_0_100px_rgba(212,175,55,0.2)]"
          >
            {/* Gold top accent */}
            <div className="h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent flex-shrink-0" />

            {/* Header */}
            <div className="flex-shrink-0 px-6 md:px-8 pt-5 pb-4 border-b border-primary/12 bg-gradient-to-b from-primary/6 to-transparent">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-serif text-primary leading-tight">{t.title}</h2>
                  <p className="text-[11px] text-foreground/40 mt-0.5">{t.subtitle}</p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-0.5 w-8 h-8 rounded-full border border-primary/25 flex items-center justify-center text-foreground/50 hover:text-primary hover:border-primary/55 transition-all duration-300"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 md:px-8 py-5">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center h-full text-center gap-5 py-20"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 280, damping: 18, delay: 0.1 }}
                      className="w-24 h-24 rounded-full bg-primary/12 border-2 border-primary/40 flex items-center justify-center"
                    >
                      <span className="text-primary text-4xl font-serif">✓</span>
                    </motion.div>
                    <div>
                      <p className="text-lg font-serif text-primary">{t.success}</p>
                      <p className="text-sm text-foreground/50 mt-1">{t.successSub}</p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    {/* Name */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <div className={label}>
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
                      </div>
                      <div>
                        <div className={label}>
                          {t.lastName} <span className="text-primary">{t.required}</span>
                        </div>
                        <input
                          required
                          value={form.lastName}
                          onChange={set("lastName")}
                          placeholder={lang === "ar" ? "بن علي" : "Ben Ali"}
                          className={inputBase}
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <div className={label}>
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
                    </div>

                    {/* Address */}
                    <div>
                      <div className={label}>
                        <MapPin className="w-3 h-3" />
                        {t.address}
                      </div>
                      <button
                        type="button"
                        onClick={() => window.open("https://maps.google.com", "_blank")}
                        className="w-full mb-2 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-primary/28 text-primary text-[11px] font-semibold uppercase tracking-widest hover:bg-primary/8 hover:border-primary/55 transition-all duration-300"
                      >
                        <MapPin className="w-3.5 h-3.5" />
                        {t.mapBtn}
                      </button>
                      <textarea
                        rows={2}
                        value={form.address}
                        onChange={set("address")}
                        placeholder={t.addressManual}
                        className={`${inputBase} resize-none`}
                      />
                    </div>

                    {/* Product */}
                    <div>
                      <div className={label}>
                        <Package className="w-3 h-3" />
                        {t.product} <span className="text-primary">{t.required}</span>
                      </div>
                      <div className="relative">
                        <select
                          required
                          value={form.product}
                          onChange={set("product")}
                          className={`${inputBase} appearance-none pe-9`}
                        >
                          <option value="" disabled>{t.selectProduct}</option>
                          {productOptions.map((opt, i) =>
                            opt.disabled ? (
                              <option key={i} disabled value="">
                                {opt.label}
                              </option>
                            ) : (
                              <option key={i} value={opt.value}>
                                {opt.label}
                              </option>
                            )
                          )}
                        </select>
                        <ChevronDown className="absolute end-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/40 pointer-events-none" />
                      </div>
                    </div>

                    {/* Quantity + Date */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <div className={label}>
                          <Hash className="w-3 h-3" />
                          {t.quantity} <span className="text-primary">{t.required}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setForm(f => ({ ...f, quantity: String(Math.max(1, +f.quantity - 1)) }))}
                            className="w-9 h-[46px] flex-shrink-0 rounded-xl border border-primary/25 text-primary hover:bg-primary/10 transition-colors text-lg font-bold"
                          >
                            −
                          </button>
                          <input
                            required
                            type="number"
                            min="1"
                            max="99"
                            value={form.quantity}
                            onChange={set("quantity")}
                            className={`${inputBase} text-center`}
                          />
                          <button
                            type="button"
                            onClick={() => setForm(f => ({ ...f, quantity: String(Math.min(99, +f.quantity + 1)) }))}
                            className="w-9 h-[46px] flex-shrink-0 rounded-xl border border-primary/25 text-primary hover:bg-primary/10 transition-colors text-lg font-bold"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div>
                        <div className={label}>
                          <Calendar className="w-3 h-3" />
                          {t.deliveryDate}
                        </div>
                        <input
                          type="date"
                          value={form.deliveryDate}
                          onChange={set("deliveryDate")}
                          min={today}
                          className={`${inputBase} [color-scheme:dark]`}
                        />
                      </div>
                    </div>

                    {/* Notes */}
                    <div>
                      <div className={label}>{t.notes}</div>
                      <textarea
                        rows={2}
                        value={form.notes}
                        onChange={set("notes")}
                        placeholder={t.notesPlaceholder}
                        className={`${inputBase} resize-none`}
                      />
                    </div>

                    {/* Submit */}
                    <motion.div
                      whileHover={{ scale: 1.015 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="pt-1 pb-2"
                    >
                      <Button
                        type="submit"
                        disabled={status === "loading"}
                        className="w-full bg-primary hover:bg-primary/90 text-black font-bold text-[15px] py-6 rounded-xl shadow-[0_0_30px_rgba(212,175,55,0.28)] hover:shadow-[0_0_50px_rgba(212,175,55,0.48)] transition-all duration-500 gap-2.5 tracking-wide"
                      >
                        {status === "loading" ? (
                          <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        ) : (
                          <Send className="w-4 h-4" />
                        )}
                        {status === "loading" ? t.submitting : t.submit}
                      </Button>
                    </motion.div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
