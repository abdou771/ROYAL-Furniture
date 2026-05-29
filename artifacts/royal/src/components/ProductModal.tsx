import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Product, translations } from "@/lib/data";
import { useLanguage } from "@/hooks/use-language";
import { useEffect } from "react";

interface Props {
  product: Product | null;
  onClose: () => void;
  onWhatsApp: (text: string) => void;
}

export function ProductModal({ product, onClose, onWhatsApp }: Props) {
  const { lang } = useLanguage();
  const t = (key: keyof typeof translations) => translations[key][lang];

  useEffect(() => {
    if (!product) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", handleKey);
    };
  }, [product, onClose]);

  return (
    <AnimatePresence>
      {product && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[1000] bg-black/80 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 60, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 bottom-0 top-[4rem] z-[1001] flex flex-col bg-background rounded-t-3xl overflow-hidden border-t border-primary/20 shadow-[0_-8px_60px_rgba(212,175,55,0.12)]"
            style={{ maxHeight: "calc(100dvh - 4rem)" }}
          >
            {/* Header */}
            <div className="flex-shrink-0 flex items-center justify-between px-6 md:px-10 py-5 border-b border-primary/15 bg-background/90 backdrop-blur-sm">
              <div>
                <h2 className="text-2xl md:text-3xl font-serif text-primary">
                  {product.name[lang]}
                </h2>
                <p className="text-sm text-foreground/50 mt-0.5">
                  {t("modal.choose")}
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full border border-primary/25 flex items-center justify-center text-foreground/60 hover:text-primary hover:border-primary/60 hover:bg-primary/10 transition-all duration-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Variants grid */}
            <div className="flex-1 overflow-y-auto px-4 md:px-10 py-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 max-w-7xl mx-auto">
                {product.variants.map((v, i) => (
                  <motion.div
                    key={v.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.45, ease: "easeOut" }}
                    className="group flex flex-col bg-card/80 backdrop-blur-sm border border-primary/15 hover:border-primary/50 rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_32px_rgba(212,175,55,0.15)] transition-all duration-400"
                  >
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent z-10 transition-colors duration-500" />
                      <img
                        src={v.image}
                        alt={v.name[lang]}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                      {/* Price badge */}
                      <div className="absolute top-3 end-3 z-20 bg-black/70 backdrop-blur-sm border border-primary/40 text-primary text-xs font-semibold px-2.5 py-1 rounded-full">
                        {v.price} {t("product.price")}
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-5 flex flex-col flex-grow">
                      <h3 className="font-serif text-base text-foreground group-hover:text-primary transition-colors duration-300 mb-2 leading-snug">
                        {v.name[lang]}
                      </h3>
                      <p className="text-foreground/55 text-xs font-light leading-relaxed flex-grow mb-4">
                        {v.desc[lang]}
                      </p>
                      <Button
                        onClick={() => onWhatsApp(`${t("modal.inquire")}: ${v.name[lang]} — ${product.name[lang]}`)}
                        className="w-full bg-[#25D366]/10 hover:bg-[#25D366] text-[#25D366] hover:text-white border border-[#25D366]/30 hover:border-[#25D366] rounded-xl gap-2 text-sm transition-all duration-300"
                        variant="ghost"
                      >
                        <SiWhatsapp className="w-4 h-4" />
                        {t("modal.inquire")}
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
