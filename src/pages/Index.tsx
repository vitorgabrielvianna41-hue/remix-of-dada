import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-transformation.jpg";
import transformationImage from "@/assets/transformation-result.png";
import vivanAvatar from "@/assets/vivan-avatar.png";
import avatarEduarda from "@/assets/avatar-eduarda.png";
import avatarSandra from "@/assets/avatar-sandra.png";
import avatarRegina from "@/assets/avatar-regina.png";
import { quizSteps } from "@/data/quizData";
import QuizStep from "@/components/QuizStep";
import LoadingScreen from "@/components/LoadingScreen";
import CauseScreen from "@/components/CauseScreen";
import MidLoadingScreen from "@/components/MidLoadingScreen";
import VideoScreen from "@/components/VideoScreen";
import ResultsScreen from "@/components/ResultsScreen";
import ProductScreen from "@/components/ProductScreen";

type QuizPhase = "intro" | "quiz" | "transformation" | "loading" | "mid-loading" | "cause" | "mid-analysis" | "pre-results-loading" | "pre-results" | "video" | "product";

const testimonials = [
  {
    name: "Eduarda Fonseca",
    role: "Vendedora",
    text: "Depois da gestação e após os 40 anos, meu corpo não respondia. Todo mundo me falava que na menopausa era só cirurgi. No desafio eu eliminei",
    highlight: "14kg nos primeiros 3 meses estou me sentindo ótima.",
    avatarKey: "eduarda" as const,
  },
  {
    name: "Sandra Oliveira",
    role: "Professora – 58 anos",
    text: "Já tinha desistido de emagrecer. Achava que depois dos 55 não tinha mais jeito. Comecei o protocolo sem acreditar e",
    highlight: "perdi 11kg em 2 meses sem sair de casa.",
    avatarKey: "sandra" as const,
  },
  {
    name: "Regina Costa",
    role: "Aposentada – 62 anos",
    text: "Minhas dores no joelho me impediam de fazer qualquer exercício. Com o pilates adaptado consegui me movimentar e",
    highlight: "eliminei 9kg em 6 semanas. Minha vida mudou!",
    avatarKey: "regina" as const,
  },
];

const TransformationCarousel = ({
  onContinue,
  transformationImage,
  avatarEduarda,
  avatarSandra,
  avatarRegina,
}: {
  onContinue: () => void;
  transformationImage: string;
  avatarEduarda: string;
  avatarSandra: string;
  avatarRegina: string;
}) => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const avatars = { eduarda: avatarEduarda, sandra: avatarSandra, regina: avatarRegina };

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const current = testimonials[activeTestimonial];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-4 py-4"
    >
      <div className="text-center">
        <h2 className="font-display text-lg font-bold mb-1" style={{ color: "var(--dark)" }}>
          Sua meta é super possível de alcançar, em menos tempo que você imagina.
        </h2>
        <p className="text-sm font-semibold mb-3" style={{ color: "var(--amber-dark)" }}>
          Olha esse exemplo real:
        </p>
      </div>
      <div className="overflow-hidden rounded-2xl" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
        <img
          src={transformationImage}
          alt="Resultado real de transformação com pilates"
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Testimonial carousel */}
      <div className="bg-card rounded-xl p-4 text-left" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
        <motion.div
          key={activeTestimonial}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <img
              src={avatars[current.avatarKey]}
              alt={current.name}
              className="w-[42px] h-[42px] rounded-full object-cover flex-shrink-0"
            />
            <div>
              <p className="text-xs" style={{ color: "var(--amber-dark)" }}>⭐⭐⭐⭐⭐</p>
              <p className="text-sm font-bold" style={{ color: "var(--dark)" }}>{current.name}</p>
              <p className="text-xs text-muted-foreground">{current.role}</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {current.text}{" "}
            <strong style={{ color: "var(--dark)" }}>{current.highlight}</strong>
          </p>
        </motion.div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-[7px]">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveTestimonial(i)}
            className="w-2.5 h-2.5 rounded-full transition-all"
            style={{
              background: i === activeTestimonial ? "var(--amber)" : "hsl(var(--border))",
              transform: i === activeTestimonial ? "scale(1.2)" : "scale(1)",
            }}
          />
        ))}
      </div>

      <button
        onClick={onContinue}
        className="w-full py-4 rounded-[var(--radius)] text-base font-extrabold uppercase tracking-wide transition-all hover:-translate-y-0.5"
        style={{
          background: "linear-gradient(135deg, var(--amber), var(--amber-dark))",
          color: "var(--dark)",
          boxShadow: "0 4px 20px rgba(245,166,35,0.35)",
        }}
      >
        CONTINUAR →
      </button>
    </motion.div>
  );
};

const Index = () => {
  const [phase, setPhase] = useState<QuizPhase>("intro");
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const advanceStep = useCallback(() => {
    if (quizSteps[currentStep]?.id === "weight-goal") {
      setPhase("transformation");
      return;
    }
    if (quizSteps[currentStep]?.id === "belly-fat") {
      setPhase("mid-loading");
      return;
    }
    if (quizSteps[currentStep]?.id === "food-habits") {
      setPhase("pre-results-loading");
      return;
    }
    if (currentStep < quizSteps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setPhase("loading");
    }
  }, [currentStep]);

  const handleIntroStart = () => {
    setPhase("quiz");
  };

  const handleIntroSelect = (value: string) => {
    setAnswers({ age: value });
    setSelectedOption(null);
    setCurrentStep(1);
    setPhase("quiz");
  };

  const handleQuizSelect = (value: string) => {
    setSelectedOption(value);
    const step = quizSteps[currentStep];

    setTimeout(() => {
      setAnswers((prev) => ({ ...prev, [step.id]: value }));
      setSelectedOption(null);
      advanceStep();
    }, 350);
  };

  const handleMultiSubmit = (values: string[]) => {
    const step = quizSteps[currentStep];
    setAnswers((prev) => ({ ...prev, [step.id]: values }));
    advanceStep();
  };

  const handleSliderSubmit = (value: number) => {
    const step = quizSteps[currentStep];
    setAnswers((prev) => ({ ...prev, [step.id]: String(value) }));
    advanceStep();
  };

  const handleLoadingComplete = useCallback(() => {
    setPhase("product");
  }, []);

  const handleMidLoadingComplete = useCallback(() => {
    setPhase("mid-analysis");
  }, []);

  const handlePreResultsLoadingComplete = useCallback(() => {
    setPhase("pre-results");
  }, []);

  const handlePreResultsContinue = () => {
    setCurrentStep((prev) => prev + 1);
    setPhase("quiz");
  };

  const handleTransformationContinue = () => {
    setCurrentStep((prev) => prev + 1);
    setPhase("quiz");
  };

  const handleMidAnalysisContinue = () => {
    setCurrentStep((prev) => prev + 1);
    setPhase("quiz");
  };

  return (
    <div className="flex min-h-[100svh] flex-col items-center justify-between p-3 md:p-5" style={{ background: "var(--cream)" }}>
      <div className="w-full max-w-[560px] mx-auto flex flex-col gap-4">
        {phase === "intro" && (
          <>
            {/* Badge */}
            <div className="text-center mt-4">
              <span
                className="inline-block rounded-full border-[1.5px] px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider"
                style={{
                  background: "var(--amber-light)",
                  borderColor: "var(--amber)",
                  color: "var(--amber-dark)",
                }}
              >
                ✨ Teste Gratuito & Personalizado
              </span>
            </div>

            {/* Title */}
            <div className="text-center">
              <h1 className="font-display text-[clamp(24px,6vw,40px)] font-black leading-[1.15]" style={{ color: "var(--dark)" }}>
                Elimine 1kg por Semana e Tonifique os Músculos na{" "}
                <span style={{ color: "var(--amber-dark)", textDecoration: "underline", textDecorationColor: "var(--amber)" }}>
                  Menopausa
                </span>
              </h1>
            </div>

            {/* Subtitle highlight */}
            <div className="flex justify-center">
              <span
                className="inline-block rounded-lg px-5 py-2.5 text-center text-[15px] font-bold leading-relaxed"
                style={{ background: "var(--amber)", color: "var(--dark)" }}
              >
                COM APENAS 10 MINUTOS POR DIA DE PILATES EM CASA 🏠
              </span>
            </div>

            {/* Hero Image */}
            <div className="relative w-full overflow-hidden rounded-2xl" style={{ paddingBottom: "125%", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
              <img
                src={heroImage}
                alt="Transformação corporal com pilates"
                className="absolute inset-0 h-full w-full object-cover"
                loading="eager"
              />
            </div>

            {/* Intro text */}
            <p className="text-sm text-center text-muted-foreground leading-relaxed">
              Responda 15 perguntas rápidas e receba um plano 100% personalizado para o seu corpo e objetivos.
            </p>

            {/* Info box */}
            <div
              className="w-full rounded-xl p-4 text-center"
              style={{ background: "hsl(var(--muted))", border: "1.5px solid hsl(var(--border))" }}
            >
              <p className="text-sm font-semibold leading-relaxed" style={{ color: "var(--dark)" }}>
                Faça esse teste para ter um protocolo específico para seu caso. Ao final você ganha seu diagnóstico grátis.
              </p>
              <p className="text-xs font-bold mt-2 flex items-center justify-center gap-1.5" style={{ color: "var(--text)" }}>
                ✅ TEMPO ESTIMADO: 49 SEGUNDOS
              </p>
            </div>

            {/* CTA Button */}
            <button
              onClick={handleIntroStart}
              className="w-full py-[17px] rounded-[var(--radius)] text-[17px] font-extrabold uppercase tracking-wide transition-all hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg, var(--amber), var(--amber-dark))",
                color: "var(--dark)",
                boxShadow: "0 4px 20px rgba(245,166,35,0.35)",
                letterSpacing: "0.03em",
              }}
            >
              🎯 INICIAR MEU TESTE GRATUITO
            </button>

            {/* Privacy */}
            <div className="flex items-center gap-3 bg-card rounded-[var(--radius)] p-3.5" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
              <span className="text-xl flex-shrink-0">🔒</span>
              <div>
                <p className="text-[13px] font-bold" style={{ color: "var(--text)" }}>100% Privado e Gratuito</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Suas respostas são usadas apenas para personalizar seu plano. Sem spam, sem custo.
                </p>
              </div>
            </div>

            {/* Social proof */}
            <p className="text-center text-sm text-muted-foreground font-medium">
              +4.800 mulheres já transformaram seus corpos ⭐⭐⭐⭐⭐
            </p>
          </>
        )}

        {phase === "quiz" && (
          <QuizStep
            step={quizSteps[currentStep]}
            selected={selectedOption}
            multiSelected={[]}
            onSelect={handleQuizSelect}
            onMultiSubmit={handleMultiSubmit}
            onSliderSubmit={handleSliderSubmit}
            stepIndex={currentStep}
            totalSteps={quizSteps.length}
          />
        )}

        {phase === "transformation" && (
          <TransformationCarousel
            onContinue={handleTransformationContinue}
            transformationImage={transformationImage}
            avatarEduarda={avatarEduarda}
            avatarSandra={avatarSandra}
            avatarRegina={avatarRegina}
          />
        )}

        {phase === "loading" && (
          <LoadingScreen onComplete={handleLoadingComplete} />
        )}

        {phase === "mid-loading" && (
          <MidLoadingScreen onComplete={handleMidLoadingComplete} />
        )}

        {phase === "mid-analysis" && (
          <CauseScreen onContinue={handleMidAnalysisContinue} />
        )}

        {phase === "pre-results-loading" && (
          <MidLoadingScreen onComplete={handlePreResultsLoadingComplete} />
        )}

        {phase === "pre-results" && (
          <ResultsScreen onContinue={handlePreResultsContinue} />
        )}

        {phase === "product" && <ProductScreen />}

        {/* Footer */}
        <footer className="text-center text-xs text-muted-foreground pb-4 pt-2">
          <p>
            © 2026 – Programa Pilates em Casa |{" "}
            <a href="#" className="text-muted-foreground hover:underline">Política de Privacidade</a> |{" "}
            <a href="#" className="text-muted-foreground hover:underline">Termos de Uso</a>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
