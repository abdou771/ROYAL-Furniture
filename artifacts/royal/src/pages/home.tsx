import { useLanguage } from "@/hooks/use-language";
import { translations, products } from "@/lib/data";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SiWhatsapp } from "react-icons/si";
import { MapPin, Phone } from "lucide-react";
import logoPath from "@assets/IMG_20260529_004439_015_1780015083267.jpg";

export default function Home() {
  const { lang, toggleLang } = useLanguage();

  const t = (key: keyof typeof translations) => {
    return translations[key][lang];
  };

  const isRTL = lang === "ar";
  const whatsappNumber = "212600000000";

  const handleWhatsApp = (text: string) => {
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="min-h-[100dvh] w-full bg-black text-foreground font-sans overflow-x-hidden">
      
      {/* Sticky Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full overflow-hidden flex items-center justify-center border border-primary/30 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
              <img src={logoPath} alt="Royal Home Logo" className="h-full w-full object-cover scale-150" />
            </div>
            <span className="font-serif text-xl text-primary font-bold hidden md:block">
              {t("hero.title")}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest text-white/70">
            <a href="#home" className="hover:text-primary transition-colors">{t("nav.home")}</a>
            <a href="#gallery" className="hover:text-primary transition-colors">{t("nav.gallery")}</a>
            <a href="#about" className="hover:text-primary transition-colors">{t("nav.about")}</a>
            <a href="#contact" className="hover:text-primary transition-colors">{t("nav.contact")}</a>
          </div>

          <button 
            onClick={toggleLang}
            className="flex items-center gap-2 px-4 py-2 border border-primary/30 text-primary hover:bg-primary/10 transition-colors uppercase tracking-wider text-sm font-semibold"
          >
            {lang === "ar" ? "FR" : "AR"}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-[100dvh] flex flex-col items-center justify-center px-6 pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05)_0%,transparent_60%)] pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="max-w-4xl text-center z-10"
        >
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-serif text-white mb-6 tracking-tight drop-shadow-2xl">
            {lang === 'ar' ? 'البيت الملكي' : 'Royal Home'}
          </h1>
          
          <div className="flex items-center justify-center gap-4 mb-8 opacity-80">
            <div className="h-[1px] w-12 md:w-24 bg-gradient-to-r from-transparent to-primary" />
            <span className="text-primary text-2xl">♦</span>
            <div className="h-[1px] w-12 md:w-24 bg-gradient-to-l from-transparent to-primary" />
          </div>

          <p className="text-lg md:text-2xl text-white/60 font-light mb-12 max-w-2xl mx-auto leading-relaxed">
            {t("hero.subtitle")}
          </p>

          <Button 
            onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-primary text-black hover:bg-primary/90 px-8 py-6 text-lg font-serif tracking-widest rounded-none shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all hover:shadow-[0_0_30px_rgba(212,175,55,0.5)]"
          >
            {t("hero.cta")}
          </Button>
        </motion.div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-32 px-6 bg-black">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {products.map((product, i) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className="group flex flex-col bg-white/5 border border-white/10 hover:border-primary/50 transition-all duration-500 overflow-hidden"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-zinc-900">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent z-10 transition-colors duration-500" />
                  <img 
                    src={product.image} 
                    alt={product.name[lang]} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
                
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-serif text-white mb-3 group-hover:text-primary transition-colors">
                    {product.name[lang]}
                  </h3>
                  <p className="text-white/60 mb-8 flex-grow font-light leading-relaxed">
                    {product.desc[lang]}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/10">
                    <span className="text-xl text-primary font-medium tracking-wider">
                      {product.price} {t("product.price")}
                    </span>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleWhatsApp(`${t("product.inquiry")}: ${product.name[lang]}`)}
                      className="text-white/50 hover:text-[#25D366] hover:bg-[#25D366]/10 rounded-full h-12 w-12 transition-all"
                    >
                      <SiWhatsapp className="w-6 h-6" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 relative border-y border-white/5 bg-zinc-950">
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
            <p className="text-lg md:text-2xl text-white/70 font-light leading-loose">
              {t("about.text")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 bg-black">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif text-primary mb-4">
              {t("contact.title")}
            </h2>
            <div className="w-16 h-[1px] bg-primary mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center bg-white/5 border border-white/10 p-8 md:p-16">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="p-4 bg-primary/10 rounded-none border border-primary/30 text-primary">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white/50 text-sm uppercase tracking-widest mb-1">{t("contact.phone")}</h4>
                  <p className="text-xl text-white font-serif" dir="ltr">
                    +212 600 000 000
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-4 bg-primary/10 rounded-none border border-primary/30 text-primary">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white/50 text-sm uppercase tracking-widest mb-1">{t("contact.address")}</h4>
                  <p className="text-xl text-white font-serif">
                    {t("contact.address.val")}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-center md:justify-end">
              <Button 
                onClick={() => handleWhatsApp("مرحباً البيت الملكي، أود الاستفسار عن")}
                className="bg-[#25D366] hover:bg-[#25D366]/90 text-white px-8 py-8 h-auto w-full md:w-auto text-lg rounded-none shadow-[0_0_30px_rgba(37,211,102,0.2)] hover:shadow-[0_0_40px_rgba(37,211,102,0.4)] transition-all flex items-center justify-center gap-3"
              >
                <SiWhatsapp className="w-6 h-6" />
                <span>{t("contact.whatsapp")}</span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10 bg-black text-center">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="h-16 w-16 mb-6 rounded-full overflow-hidden flex items-center justify-center border border-primary/30 opacity-50 hover:opacity-100 transition-opacity">
            <img src={logoPath} alt="Royal Home Logo" className="h-full w-full object-cover scale-150 grayscale hover:grayscale-0 transition-all" />
          </div>
          <p className="text-white/40 text-sm font-light">
            © {new Date().getFullYear()} {t("footer.rights")}
          </p>
        </div>
      </footer>

    </div>
  );
}
