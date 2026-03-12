import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import avatarCarminha from "@/assets/avatar-carminha.png";
import avatarLuciana from "@/assets/avatar-luciana.png";
import transformationResult from "@/assets/transformation-result.png";

interface ResultsScreenProps {
  onContinue?: () => void;
}

const transformations = [
  { image: transformationResult, caption: "📸 Resultado Real: -9kg em 8 semanas (54 anos)" },
  { image: transformationResult, caption: "📸 Resultado Real: -14kg em 3 meses (49 anos)" },
  { image: transformationResult, caption: "📸 Resultado Real: -24kg em 5 meses (64 anos)" },
  { image: transformationResult, caption: "📸 Resultado Real: -8kg em 8 semanas (56 anos)" },
];

const ResultsScreen = ({ onContinue }: ResultsScreenProps) => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % transformations.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col gap-5"
    >
      {/* Result banner */}
      <div
        className="rounded-[var(--radius)] p-[18px] text-center border-2"
        style={{
          background: "linear-gradient(135deg, #e8f5e9, #c8e6c9)",
          borderColor: "#81c784",
        }}
      >
        <p className="text-xs font-bold uppercase tracking-wider" style={{ color: "#2e7d32" }}>
          🎉 Parabéns! Seu teste identificou um
        </p>
        <p className="font-display text-[22px] font-black mt-1.5 leading-tight" style={{ color: "var(--dark)" }}>
          Bom Potencial de Emagrecimento
        </p>
      </div>

      {/* Description */}
      <p className="text-sm text-center leading-relaxed" style={{ color: "var(--text)" }}>
        Com base nas suas respostas você pode eliminar{" "}
        <strong style={{ color: "var(--dark)" }}>1 kg por semana</strong>, após ativar a reposição natural hormonal.
      </p>

      {/* Rate bar */}
      <div className="bg-card rounded-[var(--radius)] p-5" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
        <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-1">
          Sua estimativa de emagrecimento
        </p>
        <div className="relative mt-8 mb-2">
          <div className="h-[14px] bg-border rounded-lg overflow-visible relative">
            <div
              className="h-full rounded-lg relative"
              style={{ width: "50%", background: "linear-gradient(90deg, #4caf50, #81c784)" }}
            >
              <div
                className="absolute -top-7 right-0 translate-x-1/2 text-[11px] font-bold text-white px-2 py-0.5 rounded-full whitespace-nowrap"
                style={{ background: "#2e7d32" }}
              >
                Você está aqui
                <div className="absolute -bottom-[5px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[5px] border-l-transparent border-r-transparent" style={{ borderTopColor: "#2e7d32" }} />
              </div>
            </div>
          </div>
          <div className="flex justify-between text-[11px] text-muted-foreground mt-1.5">
            <span>0.5kg/sem</span>
            <span>1kg/sem</span>
            <span>1.5kg/sem</span>
          </div>
        </div>
      </div>

      {/* Social proof */}
      <p className="text-sm text-center font-semibold" style={{ color: "var(--text)" }}>
        Veja você mesmo resultados reais 👇
      </p>

      {/* Result photos carousel */}
      <div className="overflow-hidden rounded-[var(--radius)]" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
        <img
          src={transformations[activeSlide].image}
          alt={transformations[activeSlide].caption}
          className="w-full h-auto object-cover"
        />
      </div>
      <p className="text-xs text-center font-semibold text-muted-foreground">
        {transformations[activeSlide].caption}
      </p>

      {/* Carousel dots */}
      <div className="flex justify-center gap-[7px]">
        {transformations.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveSlide(i)}
            className="w-2.5 h-2.5 rounded-full transition-all"
            style={{
              background: i === activeSlide ? "var(--amber)" : "hsl(var(--border))",
              transform: i === activeSlide ? "scale(1.2)" : "scale(1)",
            }}
          />
        ))}
      </div>

      {/* Testimonials */}
      <div className="bg-card rounded-[var(--radius)] p-[18px]" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
        <div className="flex items-center gap-3 mb-2.5">
          <img
            src={avatarCarminha}
            alt="Carminha S."
            className="w-[42px] h-[42px] rounded-full object-cover flex-shrink-0"
          />
          <div>
            <div className="font-bold text-[15px]" style={{ color: "var(--dark)" }}>Carminha S.</div>
            <div className="text-xs text-muted-foreground">56 anos – Aposentada</div>
            <div className="text-[13px] tracking-wider" style={{ color: "var(--amber)" }}>★★★★★</div>
          </div>
        </div>
        <p className="text-sm leading-relaxed" style={{ color: "var(--text)" }}>
          Perdi <strong style={{ color: "var(--amber-dark)" }}>8kg em 8 semanas</strong> e nem acreditava que era possível depois dos 55. A barriga da menopausa foi embora!
        </p>
      </div>

      <div className="bg-card rounded-[var(--radius)] p-[18px]" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
        <div className="flex items-center gap-3 mb-2.5">
          <img
            src={avatarLuciana}
            alt="Luciana M."
            className="w-[42px] h-[42px] rounded-full object-cover flex-shrink-0"
          />
          <div>
            <div className="font-bold text-[15px]" style={{ color: "var(--dark)" }}>Luciana M.</div>
            <div className="text-xs text-muted-foreground">49 anos – Professora</div>
            <div className="text-[13px] tracking-wider" style={{ color: "var(--amber)" }}>★★★★★</div>
          </div>
        </div>
        <p className="text-sm leading-relaxed" style={{ color: "var(--text)" }}>
          Já tinha tentado de tudo. Com apenas 10 min por dia consegui <strong style={{ color: "var(--amber-dark)" }}>-14kg em 3 meses</strong> e mais disposição do que tinha aos 30!
        </p>
      </div>

      {/* CTA */}
      {onContinue ? (
        <>
          <p className="text-sm text-center font-bold" style={{ color: "var(--dark)" }}>
            Faltam apenas 2 perguntas para finalizar seu plano personalizado 👇
          </p>
          <button
            onClick={onContinue}
            className="w-full py-[17px] rounded-[var(--radius)] text-[17px] font-extrabold uppercase tracking-wide transition-all hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg, var(--amber), var(--amber-dark))",
              color: "var(--dark)",
              boxShadow: "0 4px 20px rgba(245,166,35,0.35)",
            }}
          >
            CONTINUAR MEU PLANO →
          </button>
        </>
      ) : null}
    </motion.div>
  );
};

export default ResultsScreen;
