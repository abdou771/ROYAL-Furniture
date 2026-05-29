import { useState } from "react";
import { useLanguage } from "@/hooks/use-language";
import { translations, products, Product } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SiWhatsapp } from "react-icons/si";
import { MapPin, Phone, Star, Shield, Users, Armchair, ChevronRight } from "lucide-react";
import logoPath from "@assets/IMG_20260529_004439_015_1780015083267.jpg";
import { ProductModal } from "@/components/ProductModal";

export default function Home() {
  const { lang, toggleLang } = useLanguage();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const t = (key: keyof typeof translations) => translations[key][lang];

  const whatsappNumber = "213549032671";

  const handleWhatsApp = (text: string) => {
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`, "_blank");
  };

  const whyUs = [
    {
      icon: <Star className="w-7 h-7" />,
      title: t("whyus.quality.title"),
      desc: t("whyus.quality.desc"),
    },
    {
      icon: <Armchair className="w-7 h-7" />,
      title: t("whyus.comfort.title"),
      desc: t("whyus.comfort.desc"),
    },
    {
      icon: <Shield className="w-7 h-7" />,
      title: t("whyus.warranty.title"),
      desc: t("whyus.warranty.desc"),
    },
    {
      icon: <Users className="w-7 h-7" />,
      title: t("whyus.trust.title"),
      desc: t("whyus.trust.desc"),
    },
  ];

  return (
    <div className="min-h-[100dvh] w-full bg-background text-foreground font-sans overflow-x-hidden">

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onWhatsApp={handleWhatsApp}
      />

      {/* Sticky Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/75 backdrop-blur-xl border-b border-primary/10 shadow-lg shadow-black/20">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between relative">

          {/* Left: nav links */}
          <div className="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest text-foreground/60">
            <a href="#home" className="hover:text-primary transition-colors duration-300">{t("nav.home")}</a>
            <a href="#gallery" className="hover:text-primary transition-colors duration-300">{t("nav.gallery")}</a>
            <a href="#about" className="hover:text-primary transition-colors duration-300">{t("nav.about")}</a>
            <a href="#contact" className="hover:text-primary transition-colors duration-300">{t("nav.contact")}</a>
          </div>

          {/* Center: logo (absolute) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="h-14 w-14 rounded-full overflow-hidden border-2 border-primary/40 shadow-[0_0_20px_rgba(212,175,55,0.25)] hover:shadow-[0_0_30px_rgba(212,175,55,0.45)] transition-shadow duration-500">
              <img src={logoPath} alt="Royal Home Logo" className="h-full w-full object-cover scale-150" />
            </div>
          </div>

          {/* Right: lang toggle */}
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
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-[100dvh] flex flex-col items-center justify-center px-6 pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.08)_0%,transparent_65%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(61,40,23,0.6)_0%,transparent_70%)] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="max-w-4xl text-center z-10"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-24 h-24 mx-auto mb-8 rounded-full overflow-hidden border-2 border-primary/50 shadow-[0_0_40px_rgba(212,175,55,0.3)]"
          >
            <img src={logoPath} alt="Royal Home Logo" className="h-full w-full object-cover scale-150" />
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-9xl font-serif text-foreground mb-6 tracking-tight drop-shadow-2xl">
            {lang === "ar" ? "البيت الملكي" : "Royal Home"}
          </h1>

          <div className="flex items-center justify-center gap-4 mb-8 opacity-80">
            <div className="h-[1px] w-12 md:w-24 bg-gradient-to-r from-transparent to-primary" />
            <span className="text-primary text-2xl">♦</span>
            <div className="h-[1px] w-12 md:w-24 bg-gradient-to-l from-transparent to-primary" />
          </div>

          <p className="text-lg md:text-2xl text-foreground/60 font-light mb-12 max-w-2xl mx-auto leading-relaxed">
            {t("hero.subtitle")}
          </p>

          <Button
            onClick={() => document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-primary text-black hover:bg-primary/90 px-10 py-6 text-lg font-serif tracking-widest rounded-xl shadow-[0_0_25px_rgba(212,175,55,0.35)] hover:shadow-[0_0_40px_rgba(212,175,55,0.55)] transition-all duration-500"
          >
            {t("hero.cta")}
          </Button>
        </motion.div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-32 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-serif text-primary mb-4"
            >
              {t("gallery.title")}
            </motion.h2>
            <div className="w-16 h-[1px] bg-primary mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                onClick={() => setSelectedProduct(product)}
                className="group flex flex-col bg-card/80 backdrop-blur-sm border border-primary/15 hover:border-primary/50 rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_40px_rgba(212,175,55,0.15)] transition-all duration-500 cursor-pointer"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-muted rounded-t-2xl">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/5 z-10 transition-colors duration-500" />
                  <img
                    src={product.image}
                    alt={product.name[lang]}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  {/* Variants count badge */}
                  <div className="absolute top-3 start-3 z-20 bg-black/65 backdrop-blur-sm border border-primary/35 text-primary text-xs font-semibold px-3 py-1.5 rounded-full">
                    {product.variants.length} {lang === "ar" ? "أنواع" : "modèles"}
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-serif text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {product.name[lang]}
                  </h3>
                  <p className="text-foreground/55 mb-6 flex-grow font-light leading-relaxed">
                    {product.desc[lang]}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-primary/15">
                    <span className="text-sm text-foreground/40 uppercase tracking-widest">
                      {lang === "ar" ? "يبدأ من" : "à partir de"}
                    </span>
                    <button
                      className="flex items-center gap-2 text-primary text-sm font-semibold uppercase tracking-widest group-hover:gap-3 transition-all duration-300"
                    >
                      {t("product.view")}
                      <ChevronRight className="w-4 h-4 rtl:rotate-180" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 relative border-y border-primary/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.05)_0%,transparent_70%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-3xl md:text-5xl font-serif text-primary mb-12">
              {t("about.title")}
            </h2>
            <p className="text-lg md:text-2xl text-foreground/65 font-light leading-loose">
              {t("about.text")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-32 px-6 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-serif text-primary mb-4"
            >
              {t("whyus.title")}
            </motion.h2>
            <div className="w-16 h-[1px] bg-primary mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.7 }}
                className="group flex flex-col items-center text-center p-8 rounded-2xl bg-card/70 backdrop-blur-sm border border-primary/15 hover:border-primary/45 hover:bg-card shadow-[0_4px_20px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_35px_rgba(212,175,55,0.12)] transition-all duration-500"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/25 flex items-center justify-center text-primary mb-6 group-hover:bg-primary/20 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.25)] transition-all duration-500">
                  {item.icon}
                </div>
                <h3 className="text-xl font-serif text-primary mb-3">
                  {item.title}
                </h3>
                <p className="text-foreground/60 font-light leading-relaxed text-sm">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 bg-background border-t border-primary/10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif text-primary mb-4">
              {t("contact.title")}
            </h2>
            <div className="w-16 h-[1px] bg-primary mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center bg-card/60 backdrop-blur-md border border-primary/15 rounded-2xl p-8 md:p-16 shadow-[0_8px_40px_rgba(0,0,0,0.3)]">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="p-4 bg-primary/10 rounded-xl border border-primary/25 text-primary flex-shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-foreground/50 text-sm uppercase tracking-widest mb-1">{t("contact.phone")}</h4>
                  <p className="text-xl text-foreground font-serif" dir="ltr">
                    +213 549 032 671
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-4 bg-primary/10 rounded-xl border border-primary/25 text-primary flex-shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-foreground/50 text-sm uppercase tracking-widest mb-1">{t("contact.address")}</h4>
                  <p className="text-xl text-foreground font-serif">
                    {t("contact.address.val")}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-center md:justify-end">
              <Button
                onClick={() => handleWhatsApp("مرحباً البيت الملكي، أود الاستفسار عن")}
                className="bg-[#25D366] hover:bg-[#25D366]/90 text-white px-8 py-8 h-auto w-full md:w-auto text-lg rounded-xl shadow-[0_0_30px_rgba(37,211,102,0.2)] hover:shadow-[0_0_45px_rgba(37,211,102,0.4)] transition-all duration-500 flex items-center justify-center gap-3"
              >
                <SiWhatsapp className="w-6 h-6" />
                <span>{t("contact.whatsapp")}</span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-primary/10 bg-background text-center">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="h-16 w-16 mb-6 rounded-full overflow-hidden border border-primary/30 opacity-60 hover:opacity-100 transition-opacity duration-300 shadow-[0_0_15px_rgba(212,175,55,0.15)]">
            <img src={logoPath} alt="Royal Home Logo" className="h-full w-full object-cover scale-150 grayscale hover:grayscale-0 transition-all duration-500" />
          </div>
          <p className="text-foreground/40 text-sm font-light">
            © {new Date().getFullYear()} {t("footer.rights")}
          </p>
        </div>
      </footer>

    </div>
  );
}
