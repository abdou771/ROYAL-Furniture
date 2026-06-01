import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const TRAIL_COUNT = 10;

export function GoldenCursor() {
  const [visible, setVisible] = useState(false);
  const [trail, setTrail] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const counterRef = useRef(0);
  const isTouchDevice = typeof window !== "undefined" && window.matchMedia("(hover: none)").matches;

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  const x = useSpring(rawX, { stiffness: 350, damping: 28, mass: 0.5 });
  const y = useSpring(rawY, { stiffness: 350, damping: 28, mass: 0.5 });

  useEffect(() => {
    if (isTouchDevice) return;

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      setVisible(true);
      counterRef.current += 1;
      const id = counterRef.current;
      setTrail(prev => [...prev.slice(-(TRAIL_COUNT - 1)), { x: e.clientX, y: e.clientY, id }]);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [rawX, rawY, isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <>
      {trail.map((point, i) => {
        const progress = i / TRAIL_COUNT;
        const size = 4 + progress * 10;
        return (
          <div
            key={point.id}
            className="fixed pointer-events-none"
            style={{
              zIndex: 9997,
              left: point.x,
              top: point.y,
              transform: "translate(-50%, -50%)",
              width: size,
              height: size,
              borderRadius: "50%",
              background: `rgba(212, 175, 55, ${progress * 0.5})`,
              boxShadow: `0 0 ${progress * 12}px rgba(212, 175, 55, ${progress * 0.35})`,
              transition: "opacity 0.3s ease",
              opacity: visible ? 1 : 0,
            }}
          />
        );
      })}

      <motion.div
        className="fixed pointer-events-none"
        style={{ x, y, zIndex: 9999, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <div
          style={{
            width: 22,
            height: 22,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(212,175,55,1) 0%, rgba(212,175,55,0.4) 50%, transparent 100%)",
            boxShadow:
              "0 0 8px rgba(212,175,55,0.9), 0 0 20px rgba(212,175,55,0.5), 0 0 40px rgba(212,175,55,0.2)",
            border: "1px solid rgba(212,175,55,0.7)",
          }}
        />
      </motion.div>

      <motion.div
        className="fixed pointer-events-none"
        style={{ x, y, zIndex: 9998, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: visible ? 0.4 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            border: "1px solid rgba(212,175,55,0.35)",
            boxShadow: "0 0 15px rgba(212,175,55,0.15)",
          }}
        />
      </motion.div>
    </>
  );
}
