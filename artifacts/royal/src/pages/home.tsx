import { useState } from "react";
import { useLanguage } from "@/hooks/use-language";
import { translations, products, Product } from "@/lib/data";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SiWhatsapp } from "react-icons/si";
import { MapPin, Phone, Star, Shield, Users, Armchair, ChevronRight, ShoppingBag } from "lucide-react";
import logoPath from "@assets/IMG_20260529_004439_015_1780015083267.jpg";
import { ProductModal } from "@/components/ProductModal";
import { OrderForm } from "@/components/OrderForm";
import { useRef } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Home() {
  const { lang, toggleLang } = useLanguage();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [orderProduct, setOrderProduct] = useState("");

  const heroRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const rawY = useTransform(scrollY, [0, 600], [0, 140]);
  const heroY = useSpring(rawY, { stiffness: 80, damping: 20 });
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const navBg = useTransform(scrollY, [0, 80], ["rgba(0,0,0,0)", "rgba(0,0,0,0.35)"]);

  const t = (key: keyof typeof translations) => translations[key][lang];
  const whatsappNumber = "213541465201";
  const handleWhatsApp = (text: string) =>
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`, "_blank");

  const whyUs = [
    { icon: <Star className="w-7 h-7" />, title: t("whyus.quality.title"), desc: t("whyus.quality.desc") },
    { icon: <Armchair className="w-7 h-7" />, title: t("whyus.comfort.title"), desc: t("whyus.comfort.desc") },
    { icon: <Shield className="w-7 h-7" />, title: t("whyus.warranty.title"), desc: t("whyus.warranty.desc") },
    { icon: <Users className="w-7 h-7" />, title: t("whyus.trust.title"), desc: t("whyus.trust.desc") },
  ];

  return (
    <div className="min-h-[100dvh] w-full bg-background text-foreground font-sans overflow-x-hidden">

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onWhatsApp={handleWhatsApp}
        onOrder={(variantName) => { setSelectedProduct(null); setOrderProduct(variantName); }}
      />
      <OrderForm
        open={!!orderProduct}
        onClose={() => setOrderProduct("")}
        defaultProduct={orderProduct}
      />

      {/* Sticky Nav — fades in backdrop on scroll */}
      <motion.nav
        style={{ backgroundColor: navBg }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-primary/10 shadow-lg shadow-black/20 transition-[border-color] duration-500"
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between relative">
          <div className="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest text-foreground/60">
            {(["nav.home", "nav.gallery", "nav.about", "nav.contact"] as const).map((key) => (
              <a
                key={key}
                href={`#${key.split(".")[1]}`}
                className="relative group py-1 hover:text-primary transition-colors duration-300"
              >
                {t(key)}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-500 ease-out" />
              </a>
            ))}
          </div>

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <motion.div
              whileHover={{ scale: 1.08 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              className="h-14 w-14 rounded-full overflow-hidden border-2 border-primary/40 shadow-[0_0_20px_rgba(212,175,55,0.25)]"
            >
              <img src={logoPath} alt="Royal Home Logo" className="h-full w-full object-cover scale-150" />
            </motion.div>
          </div>

          <button
            onClick={toggleLang}
            className="relative flex items-center gap-2 px-5 py-2 rounded-lg border border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/60 hover:shadow-[0_0_12px_rgba(212,175,55,0.2)] transition-all duration-300 uppercase tracking-wider text-sm font-semibold backdrop-blur-sm overflow-hidden w-16 justify-center"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={lang}
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -12, opacity: 0 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="absolute"
              >
                {lang === "ar" ? "FR" : "AR"}
              </motion.span>
            </AnimatePresence>
            <span className="invisible">{lang === "ar" ? "FR" : "AR"}</span>
          </button>
        </div>
      </motion.nav>

      {/* Hero — parallax scroll */}
      <section ref={heroRef} id="home" className="relative min-h-[100dvh] flex flex-col items-center justify-center px-6 pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.08)_0%,transparent_65%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(61,40,23,0.6)_0%,transparent_70%)] pointer-events-none" />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="max-w-4xl text-center z-10"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease }}
            className="w-24 h-24 mx-auto mb-8 rounded-full overflow-hidden border-2 border-primary/50 shadow-[0_0_40px_rgba(212,175,55,0.3)]"
          >
            <img src={logoPath} alt="Royal Home Logo" className="h-full w-full object-cover scale-150" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.15, ease }}
            className="text-5xl md:text-7xl lg:text-9xl font-serif text-foreground mb-6 tracking-tight drop-shadow-2xl"
          >
            {lang === "ar" ? "البيت الملكي" : "Royal Home"}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 0.8, scaleX: 1 }}
            transition={{ duration: 0.9, delay: 0.4, ease }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <div className="h-[1px] w-12 md:w-24 bg-gradient-to-r from-transparent to-primary" />
            <span className="text-primary text-2xl">♦</span>
            <div className="h-[1px] w-12 md:w-24 bg-gradient-to-l from-transparent to-primary" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.55, ease }}
            className="text-lg md:text-2xl text-foreground/60 font-light mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            {t("hero.subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.75, ease }}
          >
            <Button
              onClick={() => document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-primary text-black hover:bg-primary/90 px-10 py-6 text-lg font-serif tracking-widest rounded-xl shadow-[0_0_25px_rgba(212,175,55,0.35)] hover:shadow-[0_0_40px_rgba(212,175,55,0.55)] transition-all duration-500"
            >
              {t("hero.cta")}
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          style={{ opacity: useTransform(scrollY, [0, 200], [1, 0]) }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-primary/60 to-transparent animate-pulse" />
        </motion.div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="py-32 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease }}
              className="text-3xl md:text-5xl font-serif text-primary mb-4"
            >
              {t("gallery.title")}
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2, ease }}
              className="w-16 h-[1px] bg-primary mx-auto origin-center"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.08, duration: 0.7, ease }}
                whileHover={{ y: -8, transition: { type: "spring", stiffness: 260, damping: 20 } }}
                onClick={() => setSelectedProduct(product)}
                className="group flex flex-col bg-card/80 backdrop-blur-sm border border-primary/15 hover:border-primary/50 rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.3)] hover:shadow-[0_16px_50px_rgba(212,175,55,0.18)] transition-[box-shadow,border-color] duration-500 cursor-pointer"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-muted rounded-t-2xl">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 z-10 transition-colors duration-600" />
                  <motion.img
                    src={product.image}
                    alt={product.name[lang]}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                  />
                  <div className="absolute top-3 start-3 z-20 bg-black/65 backdrop-blur-sm border border-primary/35 text-primary text-xs font-semibold px-3 py-1.5 rounded-full">
                    {product.variants.length} {lang === "ar" ? "أنواع" : "modèles"}
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-serif text-foreground mb-3 group-hover:text-primary transition-colors duration-400">
                    {product.name[lang]}
                  </h3>
                  <p className="text-foreground/55 mb-6 flex-grow font-light leading-relaxed">
                    {product.desc[lang]}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-5 border-t border-primary/15">
                    <span className="flex items-center gap-1.5 text-primary/70 text-xs font-semibold uppercase tracking-widest group-hover:gap-3 transition-all duration-300">
                      {t("product.view")}
                      <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180" />
                    </span>
                    <button
                      onClick={(e) => { e.stopPropagation(); setOrderProduct(product.name[lang]); }}
                      className="flex items-center gap-1.5 bg-primary hover:bg-primary/90 text-black text-xs font-bold px-4 py-2 rounded-xl shadow-[0_0_14px_rgba(212,175,55,0.25)] hover:shadow-[0_0_24px_rgba(212,175,55,0.45)] transition-all duration-300 uppercase tracking-wider"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      {lang === "ar" ? "اطلب الآن" : "Commander"}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-32 px-6 relative border-y border-primary/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.05)_0%,transparent_70%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease }}
          >
            <h2 className="text-3xl md:text-5xl font-serif text-primary mb-12">{t("about.title")}</h2>
            <p className="text-lg md:text-2xl text-foreground/65 font-light leading-loose">{t("about.text")}</p>
          </motion.div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-32 px-6 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease }}
              className="text-3xl md:text-5xl font-serif text-primary mb-4"
            >
              {t("whyus.title")}
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2, ease }}
              className="w-16 h-[1px] bg-primary mx-auto origin-center"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.1, duration: 0.7, ease }}
                whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 22 } }}
                className="group flex flex-col items-center text-center p-8 rounded-2xl bg-card/70 backdrop-blur-sm border border-primary/15 hover:border-primary/45 hover:bg-card shadow-[0_4px_20px_rgba(0,0,0,0.25)] hover:shadow-[0_12px_35px_rgba(212,175,55,0.14)] transition-[box-shadow,background-color,border-color] duration-500"
              >
                <motion.div
                  whileHover={{ rotate: [0, -8, 8, 0], transition: { duration: 0.5 } }}
                  className="w-16 h-16 rounded-full bg-primary/10 border border-primary/25 flex items-center justify-center text-primary mb-6 group-hover:bg-primary/20 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.25)] transition-all duration-500"
                >
                  {item.icon}
                </motion.div>
                <h3 className="text-xl font-serif text-primary mb-3">{item.title}</h3>
                <p className="text-foreground/60 font-light leading-relaxed text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-32 px-6 bg-background border-t border-primary/10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease }}
              className="text-3xl md:text-5xl font-serif text-primary mb-4"
            >
              {t("contact.title")}
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2, ease }}
              className="w-16 h-[1px] bg-primary mx-auto origin-center"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease }}
            className="grid md:grid-cols-2 gap-12 items-center bg-card/60 backdrop-blur-md border border-primary/15 rounded-2xl p-8 md:p-16 shadow-[0_8px_40px_rgba(0,0,0,0.3)]"
          >
            <div className="space-y-8">
              {[
                { icon: <Phone className="w-6 h-6" />, label: t("contact.phone"), value: "+213 541 465 201", dir: "ltr" as const },
                { icon: <MapPin className="w-6 h-6" />, label: t("contact.address"), value: t("contact.address.val"), dir: undefined },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: lang === "ar" ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.7, ease }}
                  className="flex items-start gap-4"
                >
                  <div className="p-4 bg-primary/10 rounded-xl border border-primary/25 text-primary flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-foreground/50 text-sm uppercase tracking-widest mb-1">{item.label}</h4>
                    <p className="text-xl text-foreground font-serif" dir={item.dir}>{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center md:justify-end">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 280, damping: 18 }}>
                <Button
                  onClick={() => handleWhatsApp("مرحباً البيت الملكي، أود الاستفسار عن")}
                  className="bg-[#25D366] hover:bg-[#25D366]/90 text-white px-8 py-8 h-auto w-full md:w-auto text-lg rounded-xl shadow-[0_0_30px_rgba(37,211,102,0.2)] hover:shadow-[0_0_50px_rgba(37,211,102,0.45)] transition-shadow duration-500 flex items-center justify-center gap-3"
                >
                  <SiWhatsapp className="w-6 h-6" />
                  <span>{t("contact.whatsapp")}</span>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-primary/10 bg-background text-center">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 280, damping: 18 }}
            className="h-16 w-16 mb-6 rounded-full overflow-hidden border border-primary/30 opacity-60 hover:opacity-100 transition-opacity duration-300 shadow-[0_0_15px_rgba(212,175,55,0.15)]"
          >
            <img src={logoPath} alt="Royal Home Logo" className="h-full w-full object-cover scale-150 grayscale hover:grayscale-0 transition-all duration-500" />
          </motion.div>
          <p className="text-foreground/40 text-sm font-light">
            © {new Date().getFullYear()} {t("footer.rights")}
          </p>
        </div>
      </footer>

    </div>
  );
}
