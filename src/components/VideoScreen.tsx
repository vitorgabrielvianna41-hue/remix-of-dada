import { motion } from "framer-motion";

interface VideoScreenProps {
  onSkip: () => void;
}

const VideoScreen = ({ onSkip }: VideoScreenProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col gap-5"
    >
      <p
        className="text-xs font-bold uppercase tracking-wider text-center"
        style={{ color: "var(--text)" }}
      >
        AGORA É HORA DE PERSONALIZAR A SOLUÇÃO PARA VOCÊ 👇
      </p>

      <h2
        className="font-display text-xl font-black text-center leading-tight"
        style={{ color: "var(--dark)" }}
      >
        ASSISTA ESSE VÍDEO RÁPIDO PARA LIBERAR SEU PROTOCOLO
      </h2>

      <div className="flex justify-center">
        <span
          className="inline-block rounded-lg px-5 py-2.5 text-center text-[15px] font-bold leading-relaxed"
          style={{ background: "var(--amber)", color: "var(--dark)" }}
        >
          E ELIMINE 1KG POR SEMANA COM PILATES EM CASA
        </span>
      </div>

      {/* Video player placeholder (9:16) */}
      <div
        className="relative w-full rounded-2xl overflow-hidden flex items-center justify-center cursor-pointer"
        style={{
          aspectRatio: "9/16",
          background: "linear-gradient(135deg, #1a1410, #3d2b1f)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
        }}
      >
        <div className="flex flex-col items-center gap-3">
          <div
            className="w-[72px] h-[72px] rounded-full flex items-center justify-center text-3xl"
            style={{
              background: "rgba(245,166,35,0.9)",
              boxShadow: "0 0 30px rgba(245,166,35,0.4)",
            }}
          >
            ▶
          </div>
          <div className="text-center">
            <p className="text-white text-sm font-semibold">Toque para assistir o vídeo</p>
            <p className="text-white/60 text-xs mt-0.5">eu vou te explicar tudo</p>
          </div>
        </div>
      </div>

      <button
        onClick={onSkip}
        className="w-full py-3.5 rounded-[var(--radius)] text-sm font-medium text-muted-foreground border-2 border-border transition-all hover:border-[var(--amber)]"
      >
        Pular vídeo e ver meu resultado →
      </button>
    </motion.div>
  );
};

export default VideoScreen;
