import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useCallback, useEffect } from "react";
import { QuizStep as QuizStepType } from "@/data/quizData";
import vivanAvatar from "@/assets/vivan-avatar.png";

interface QuizStepProps {
  step: QuizStepType;
  selected: string | null;
  multiSelected?: string[];
  onSelect: (value: string) => void;
  onMultiSubmit?: (values: string[]) => void;
  onSliderSubmit?: (value: number) => void;
  stepIndex: number;
  totalSteps: number;
}

const QuizStep = ({
  step,
  selected,
  multiSelected = [],
  onSelect,
  onMultiSubmit,
  onSliderSubmit,
  stepIndex,
  totalSteps,
}: QuizStepProps) => {
  const [localMulti, setLocalMulti] = useState<string[]>(multiSelected);
  const [sliderValue, setSliderValue] = useState(step?.sliderConfig?.default ?? 70);
  const [useAltUnit, setUseAltUnit] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  // Reset local state when step changes
  useEffect(() => {
    setLocalMulti([]);
    setSliderValue(step?.sliderConfig?.default ?? 70);
    setUseAltUnit(false);
  const handleSliderMove = useCallback(
    (clientX: number) => {
      if (!trackRef.current || !step?.sliderConfig) return;
      const rect = trackRef.current.getBoundingClientRect();
      const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const { min, max } = step.sliderConfig;
      const val = Math.round(min + pct * (max - min));
      setSliderValue(val);
    },
    [step?.sliderConfig]
  );

  if (!step) return null;

  const toggleMulti = (value: string) => {
    setLocalMulti((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const onPointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    handleSliderMove(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (isDragging.current) handleSliderMove(e.clientX);
  };

  const onPointerUp = () => {
    isDragging.current = false;
  };

  const displayValue = () => {
    if (!step.sliderConfig) return "";
    if (useAltUnit && step.sliderConfig.unit === "kg") {
      return `${Math.round(sliderValue * 2.205)}lb`;
    }
    if (useAltUnit && step.sliderConfig.unit === "cm") {
      const totalInches = sliderValue / 2.54;
      const feet = Math.floor(totalInches / 12);
      const inches = Math.round(totalInches % 12);
      return `${feet}'${inches}"`;
    }
    return `${sliderValue}${step.sliderConfig.unit}`;
  };

  const sliderPct = step.sliderConfig
    ? ((sliderValue - step.sliderConfig.min) / (step.sliderConfig.max - step.sliderConfig.min)) * 100
    : 0;

  const isMulti = step.type === "multi" || step.multiSelect;
  const isSlider = step.type === "slider";

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step.id}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -40 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="flex flex-col gap-4"
      >
        {/* Progress bar */}
        <div className="flex items-center gap-2">
          <div className="h-[5px] flex-1 rounded-full bg-border overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, var(--amber), var(--amber-dark))" }}
              initial={{ width: 0 }}
              animate={{ width: `${((stepIndex + 1) / totalSteps) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
          <span className="text-xs text-muted-foreground font-medium font-display">
            {stepIndex + 1}/{totalSteps}
          </span>
        </div>

        {/* Question */}
        <div className="text-center">
          <h2 className="font-display text-lg md:text-xl font-bold leading-tight" style={{ color: "var(--dark)" }}>
            {step.question}
          </h2>
          {step.subtitle && (
            <p className="mt-1 text-sm text-muted-foreground">{step.subtitle}</p>
          )}
        </div>

        {/* Slider type */}
        {isSlider && step.sliderConfig && (
          <div className="flex flex-col items-center gap-2 w-full">
            {/* Unit toggle */}
            {step.sliderConfig.altUnit && (
              <div className="flex gap-2 justify-center">
                <button
                  onClick={() => setUseAltUnit(false)}
                  className={`px-5 py-1.5 rounded-full text-sm font-semibold transition-all ${!useAltUnit ? "text-foreground" : "bg-border text-muted-foreground"}`}
                  style={!useAltUnit ? { background: "var(--amber)", color: "var(--dark)" } : {}}
                >
                  {step.sliderConfig.unit}
                </button>
                <button
                  onClick={() => setUseAltUnit(true)}
                  className={`px-5 py-1.5 rounded-full text-sm font-semibold transition-all ${useAltUnit ? "text-foreground" : "bg-border text-muted-foreground"}`}
                  style={useAltUnit ? { background: "var(--amber)", color: "var(--dark)" } : {}}
                >
                  {step.sliderConfig.altUnit}
                </button>
              </div>
            )}

            {/* Value display */}
            <div className="font-display text-5xl font-black" style={{ color: "var(--dark)" }}>
              {displayValue()}
            </div>

            {/* Slider track */}
            <div
              ref={trackRef}
              className="relative w-full h-[5px] rounded-full bg-border mt-8 mb-2 cursor-pointer"
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
            >
              <div
                className="absolute left-0 top-0 h-full rounded-full"
                style={{ width: `${sliderPct}%`, background: "var(--amber)" }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 w-[26px] h-[26px] rounded-full border-[3px] border-white cursor-grab active:cursor-grabbing"
                style={{
                  left: `${sliderPct}%`,
                  transform: `translate(-50%, -50%)`,
                  background: "var(--amber)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                }}
              >
                {/* Tooltip */}
                <div
                  className="absolute -top-8 left-1/2 -translate-x-1/2 text-[11px] font-bold text-white px-2 py-0.5 rounded-full whitespace-nowrap"
                  style={{ background: "var(--dark)" }}
                >
                  Você está aqui
                  <div className="absolute -bottom-[5px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[5px] border-l-transparent border-r-transparent" style={{ borderTopColor: "var(--dark)" }} />
                </div>
              </div>
            </div>

            {/* Labels */}
            <div className="flex justify-between w-full text-xs text-muted-foreground">
              <span>{step.sliderConfig.min}</span>
              <span>{Math.round((step.sliderConfig.min + step.sliderConfig.max) / 2)}</span>
              <span>{step.sliderConfig.max}</span>
            </div>
            <p className="text-xs text-muted-foreground">Arraste para ajustar</p>

            {/* Continue button */}
            <button
              onClick={() => onSliderSubmit?.(sliderValue)}
              className="w-full py-4 mt-2 rounded-[var(--radius)] text-base font-extrabold uppercase tracking-wide transition-all hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg, var(--amber), var(--amber-dark))",
                color: "var(--dark)",
                boxShadow: "0 4px 20px rgba(245,166,35,0.35)",
              }}
            >
              Continuar →
            </button>
          </div>
        )}

        {/* Options */}
        {!isSlider && (
          <div className={`grid gap-[11px] ${step.twoCol && step.options.length > 2 ? "grid-cols-2" : "grid-cols-1"}`}>
            {step.options.map((option) => {
              const isActive = isMulti
                ? localMulti.includes(option.value)
                : selected === option.value;

              return (
                <motion.button
                  key={option.value}
                  onClick={() => (isMulti ? toggleMulti(option.value) : onSelect(option.value))}
                  whileTap={{ scale: 0.97 }}
                  className={`relative flex items-center gap-3 rounded-[var(--radius)] border-2 px-4 py-[15px] text-left font-medium transition-all duration-200 text-[15px] ${
                    isActive
                      ? "border-[var(--amber)] bg-[var(--amber-light)]"
                      : "border-border bg-card hover:border-[var(--amber)] hover:bg-[var(--amber-light)]"
                  }`}
                  style={isActive ? { boxShadow: "0 0 0 3px rgba(245,166,35,0.15)" } : {}}
                >
                  {/* Radio or Checkbox */}
                  {isMulti ? (
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-[5px] border-2 transition-all ${
                        isActive ? "border-[var(--amber)] bg-[var(--amber)]" : "border-border"
                      }`}
                    >
                      {isActive && <span className="text-white text-xs font-bold">✓</span>}
                    </span>
                  ) : (
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                        isActive ? "border-[var(--amber)] bg-[var(--amber)]" : "border-border"
                      }`}
                    >
                      {isActive && <span className="h-2 w-2 rounded-full bg-white" />}
                    </span>
                  )}
                  <span style={{ color: "var(--text)" }}>{option.label}</span>
                  {option.emoji && (
                    <span className="text-xl ml-auto flex-shrink-0">{option.emoji}</span>
                  )}
                </motion.button>
              );
            })}
          </div>
        )}

        {/* Multi-select continue button */}
        {isMulti && (
          <button
            onClick={() => onMultiSubmit?.(localMulti)}
            disabled={localMulti.length === 0}
            className="w-full py-4 rounded-[var(--radius)] text-base font-extrabold uppercase tracking-wide transition-all hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              background: "linear-gradient(135deg, var(--amber), var(--amber-dark))",
              color: "var(--dark)",
              boxShadow: "0 4px 20px rgba(245,166,35,0.35)",
            }}
          >
            {stepIndex === totalSteps - 1 ? "Analisar minhas respostas →" : "Continuar →"}
          </button>
        )}

        {/* Testimonial */}
        {step.testimonial && (
          <div className="bg-card rounded-[var(--radius)] p-[18px] mt-2" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
            <div className="flex items-center gap-3 mb-2.5">
              <img
                src={vivanAvatar}
                alt={step.testimonial.name}
                className="w-[42px] h-[42px] rounded-full object-cover flex-shrink-0"
              />
              <div>
                <div className="font-bold text-[15px]" style={{ color: "var(--dark)" }}>
                  {step.testimonial.name}
                </div>
                <div className="text-xs text-muted-foreground">{step.testimonial.role}</div>
                <div className="text-[13px] tracking-wider" style={{ color: "var(--amber)" }}>
                  ★★★★★
                </div>
              </div>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text)" }}>
              {step.testimonial.text}
              {step.testimonial.highlight && (
                <strong style={{ color: "var(--amber-dark)" }}>{step.testimonial.highlight}</strong>
              )}
            </p>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default QuizStep;
