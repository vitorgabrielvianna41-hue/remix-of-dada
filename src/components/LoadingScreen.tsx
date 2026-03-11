import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import avatarLucia from "@/assets/avatar-lucia.png";
import avatarVivan from "@/assets/vivan-avatar.png";
import avatarCarminha from "@/assets/avatar-carminha.png";
import avatarLuciana from "@/assets/avatar-luciana.png";

interface LoadingScreenProps {
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
    text: "Desde que comecei estou eliminando uma média de ",
    highlight: "1kg por semana, totalizando 10,5kg.",
  },
  {
    name: "Vivan Almeida",
    role: "Autônoma",
    avatar: avatarVivan,
    text: "Quando passei dos 40 meu corpo piorou muito na pré-menopausa. Em 3 meses consegui ",
    highlight: "perder 5kg em 2 meses.",
  },
  {
    name: "Carminha S.",
    role: "56 anos – Aposentada",
    avatar: avatarCarminha,
    text: "Perdi ",
    highlight: "8kg em 8 semanas",
    textAfter: " e nem acreditava que era possível depois dos 55. A barriga da menopausa foi embora!",
  },
  {
    name: "Luciana M.",
    role: "49 anos – Professora",
    avatar: avatarLuciana,
    text: "Já tinha tentado de tudo. Com apenas 10 min por dia consegui ",
    highlight: "-14kg em 3 meses",
    textAfter: " e mais disposição do que tinha aos 30!",
  },
];

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const hasCompleted = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          if (!hasCompleted.current) {
            hasCompleted.current = true;
            setTimeout(onComplete, 600);
          }
          return 100;
        }
        return prev + 1.5;
      });
    }, 60);
    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCompletedSteps((prev) => {
        if (prev >= loadingSteps.length) {
          clearInterval(stepInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 1200);
    return () => clearInterval(stepInterval);
  }, []);

  useEffect(() => {
    const testiInterval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 2200);
    return () => clearInterval(testiInterval);
  }, []);

  const testi = testimonials[currentTestimonial];

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center gap-6 py-16"
    >
      <div className="text-center">
        <span className="text-3xl mb-3 block">⚙️</span>
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
          PREPARANDO SEU PROTOCOLO
        </p>
      </div>

      {/* Progress label */}
      <div className="text-center w-full">
        <p className="text-base font-semibold mb-2.5" style={{ color: "var(--text)" }}>
          Analisando suas respostas — {Math.min(Math.round(progress), 100)}%
        </p>
        <div className="w-full h-[10px] bg-border rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{
              width: `${Math.min(progress, 100)}%`,
              background: "linear-gradient(90deg, var(--amber), var(--amber-dark))",
            }}
          />
        </div>
      </div>

      {/* Steps */}
      <div className="flex flex-col gap-3 w-full max-w-[340px] mt-4">
        {loadingSteps.map((label, i) => {
          const done = i < completedSteps;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0.5 }}
              animate={{ opacity: done ? 1 : 0.5 }}
              className={`flex items-center gap-3 text-sm transition-all ${done ? "font-semibold" : ""}`}
              style={{ color: done ? "var(--text)" : "var(--muted-raw)" }}
            >
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] flex-shrink-0 transition-all"
                style={
                  done
                    ? { background: "#2e7d32", color: "#fff" }
                    : { background: "hsl(var(--border))" }
                }
              >
                {done ? "✓" : i + 1}
              </div>
              {label}
            </motion.div>
          );
        })}
      </div>

      {/* Rotating Testimonial */}
      <div className="w-full mt-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTestimonial}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="bg-card rounded-[var(--radius)] p-[18px]"
            style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}
          >
            <div className="flex items-center gap-3 mb-2.5">
              <img
                src={testi.avatar}
                alt={testi.name}
                className="w-[42px] h-[42px] rounded-full object-cover flex-shrink-0"
              />
              <div>
                <div className="font-bold text-[15px]" style={{ color: "var(--dark)" }}>
                  {testi.name}
                </div>
                <div className="text-xs text-muted-foreground">{testi.role}</div>
                <div className="text-[13px] tracking-wider" style={{ color: "var(--amber)" }}>
                  ★★★★★
                </div>
              </div>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text)" }}>
              {testi.text}
              <strong style={{ color: "var(--amber-dark)" }}>{testi.highlight}</strong>
              {(testi as any).textAfter || ""}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
