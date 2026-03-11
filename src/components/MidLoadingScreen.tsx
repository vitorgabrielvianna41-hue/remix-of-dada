import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import avatarLucia from "@/assets/avatar-lucia.png";
import avatarMarcia from "@/assets/avatar-marcia.png";
import avatarRegina from "@/assets/avatar-regina.png";

interface MidLoadingScreenProps {
  onComplete: () => void;
}

const loadingSteps = [
  "Analisando perfil hormonal",
  "Calculando taxa metabólica basal",
  "Identificando causa raiz",
  "Montando plano personalizado",
];

const testimonials = [
  {
    name: "Lucia Ribeiro",
    role: "Atendente em loja",
    avatar: avatarLucia,
    text: "Desde que comecei estou eliminando uma média de",
    highlight: "1kg por semana, totalizando 10,5kg.",
  },
  {
    name: "Márcia Tavares",
    role: "Dona de casa – 55 anos",
    avatar: avatarMarcia,
    text: "Achava que era impossível depois dos 50. Em 6 semanas",
    highlight: "perdi 7kg e minhas dores nas costas sumiram!",
  },
  {
    name: "Regina Costa",
    role: "Aposentada – 62 anos",
    avatar: avatarRegina,
    text: "O protocolo é tão simples que faço em casa mesmo. Resultado:",
    highlight: "9kg eliminados em 2 meses sem academia.",
  },
];

const MidLoadingScreen = ({ onComplete }: MidLoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const hasCompleted = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          if (!hasCompleted.current) {
            hasCompleted.current = true;
            setTimeout(onComplete, 500);
          }
          return 100;
        }
        return prev + 1;
      });
    }, 80);
    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCompletedSteps((prev) => {
        if (prev >= loadingSteps.length) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const current = testimonials[activeTestimonial];

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center gap-6 py-12"
    >
      {/* Spinner */}
      <div className="relative w-16 h-16">
        <div
          className="absolute inset-0 rounded-full border-4 border-t-transparent animate-spin"
          style={{ borderColor: "var(--amber)", borderTopColor: "transparent" }}
        />
        <div className="absolute inset-0 flex items-center justify-center text-2xl">⚙️</div>
      </div>

      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
          PREPARANDO SEU PROTOCOLO
        </p>
        <p className="text-base font-bold" style={{ color: "var(--dark)" }}>
          Analisando suas respostas — {Math.min(Math.round(progress), 100)}%
        </p>
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-[320px] h-[10px] bg-border rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{
            width: `${Math.min(progress, 100)}%`,
            background: "linear-gradient(90deg, var(--amber), var(--amber-dark))",
          }}
        />
      </div>

      {/* Steps */}
      <div className="flex flex-col gap-3 w-full max-w-[300px]">
        {loadingSteps.map((label, i) => {
          const done = i < completedSteps;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0.4 }}
              animate={{ opacity: done ? 1 : 0.4 }}
              className={`flex items-center gap-3 text-sm ${done ? "font-semibold" : ""}`}
              style={{ color: done ? "var(--text)" : undefined }}
            >
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0"
                style={
                  done
                    ? { background: "#2e7d32", color: "#fff" }
                    : { background: "hsl(var(--border))", color: "var(--muted-raw)" }
                }
              >
                {done ? "✓" : i + 1}
              </div>
              {label}
            </motion.div>
          );
        })}
      </div>

      {/* Testimonial carousel */}
      <div className="w-full bg-card rounded-[var(--radius)] p-4 mt-2" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
        <motion.div
          key={activeTestimonial}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <img
              src={current.avatar}
              alt={current.name}
              className="w-[42px] h-[42px] rounded-full object-cover flex-shrink-0"
            />
            <div>
              <p className="text-sm font-bold" style={{ color: "var(--dark)" }}>{current.name}</p>
              <p className="text-xs text-muted-foreground">{current.role}</p>
              <p className="text-xs" style={{ color: "var(--amber-dark)" }}>⭐⭐⭐⭐⭐</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {current.text}{" "}
            <strong style={{ color: "var(--amber-dark)" }}>{current.highlight}</strong>
          </p>
        </motion.div>

        {/* Dots */}
        <div className="flex justify-center gap-[6px] mt-3">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveTestimonial(i)}
              className="w-2 h-2 rounded-full transition-all"
              style={{
                background: i === activeTestimonial ? "var(--amber)" : "hsl(var(--border))",
                transform: i === activeTestimonial ? "scale(1.3)" : "scale(1)",
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default MidLoadingScreen;
