import { motion } from "framer-motion";

interface CauseScreenProps {
  onContinue: () => void;
}

const CauseScreen = ({ onContinue }: CauseScreenProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col gap-5"
    >
      {/* Cause banner */}
      <div
        className="rounded-[var(--radius)] p-[18px] text-center border-[2.5px]"
        style={{
          background: "linear-gradient(135deg, #fff3f3, #ffe5e5)",
          borderColor: "#ff6b6b",
        }}
      >
        <p className="text-[13px] font-extrabold uppercase tracking-wider" style={{ color: "#c62828" }}>
          ⚠️ CAUSA RAIZ IDENTIFICADA ⚠️
        </p>
        <p className="font-display text-[22px] font-black mt-1.5" style={{ color: "var(--dark)" }}>
          Seu problema é:{" "}
          <span style={{ color: "#c62828" }}>BAIXA HORMONAL</span>
        </p>
        <p className="text-sm text-muted-foreground mt-1">Veja seu estado atual:</p>
      </div>

      {/* Metabolism metric */}
      <div className="bg-card rounded-[var(--radius)] p-5" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
        <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-1">
          1 – Metabolismo
        </p>
        <p className="text-base font-bold leading-tight mb-4" style={{ color: "var(--dark)" }}>
          Trabalhando em apenas 27% da sua capacidade
        </p>
        <div className="relative mt-7 mb-2">
          <div className="h-[14px] bg-border rounded-lg overflow-visible relative">
            <div
              className="h-full rounded-lg relative"
              style={{ width: "27%", background: "linear-gradient(90deg, #ff6b6b, #c62828)" }}
            >
              <div
                className="absolute -top-7 right-0 translate-x-1/2 text-[11px] font-bold text-white px-2 py-0.5 rounded-full whitespace-nowrap"
                style={{ background: "var(--dark)" }}
              >
                Você está aqui
                <div className="absolute -bottom-[5px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[5px] border-l-transparent border-r-transparent" style={{ borderTopColor: "var(--dark)" }} />
              </div>
            </div>
          </div>
          <div className="flex justify-between text-[11px] text-muted-foreground mt-1.5">
            <span>Lento</span>
            <span>27%</span>
            <span>Acelerado</span>
          </div>
        </div>
      </div>

      {/* Hormonal Production */}
      <div className="bg-card rounded-[var(--radius)] p-5" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
        <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-1">
          2 – Produção Hormonal
        </p>
        <p className="text-base font-bold leading-tight mb-4" style={{ color: "var(--dark)" }}>
          Seus hormônios estão em baixa — apenas 32% da produção máxima
        </p>

        {/* SVG Chart */}
        <div className="w-full">
          <svg viewBox="0 0 300 160" className="w-full">
            {/* Grid lines */}
            <line x1="40" y1="20" x2="280" y2="20" stroke="#E8DDD0" strokeWidth="0.5" />
            <line x1="40" y1="50" x2="280" y2="50" stroke="#E8DDD0" strokeWidth="0.5" />
            <line x1="40" y1="80" x2="280" y2="80" stroke="#E8DDD0" strokeWidth="0.5" />
            <line x1="40" y1="110" x2="280" y2="110" stroke="#E8DDD0" strokeWidth="0.5" />

            {/* Y labels */}
            <text x="30" y="24" fontSize="9" fill="#8C7B6E" textAnchor="end">80</text>
            <text x="30" y="54" fontSize="9" fill="#8C7B6E" textAnchor="end">60</text>
            <text x="30" y="84" fontSize="9" fill="#8C7B6E" textAnchor="end">40</text>
            <text x="30" y="114" fontSize="9" fill="#8C7B6E" textAnchor="end">20</text>

            {/* Minimum ideal line */}
            <line x1="40" y1="50" x2="280" y2="50" stroke="#4caf50" strokeWidth="1.5" strokeDasharray="6,4" />
            <text x="283" y="54" fontSize="8" fill="#4caf50">Mínimo ideal</text>

            {/* Hormonal curve - decline */}
            <path
              d="M50,25 C80,22 100,28 130,45 C160,62 190,85 220,95 C240,100 260,102 275,103"
              fill="none"
              stroke="#c62828"
              strokeWidth="2.5"
            />

            {/* Area fill */}
            <path
              d="M50,25 C80,22 100,28 130,45 C160,62 190,85 220,95 C240,100 260,102 275,103 L275,120 L50,120 Z"
              fill="rgba(198,40,40,0.1)"
            />

            {/* "Você" marker */}
            <circle cx="220" cy="95" r="5" fill="#c62828" />
            <text x="220" y="130" fontSize="9" fill="#c62828" textAnchor="middle" fontWeight="bold">Você</text>

            {/* Legend */}
            <rect x="50" y="142" width="10" height="3" rx="1" fill="#c62828" />
            <text x="64" y="146" fontSize="8" fill="#8C7B6E">Alta hormonal</text>
            <rect x="140" y="142" width="10" height="3" rx="1" fill="rgba(198,40,40,0.3)" />
            <text x="154" y="146" fontSize="8" fill="#8C7B6E">Baixa hormonal</text>
          </svg>
        </div>
      </div>

      {/* Key insight */}
      <div
        className="rounded-[var(--radius)] p-4 text-sm font-semibold text-center leading-relaxed border-2"
        style={{
          background: "linear-gradient(135deg, #fff8e1, #fff3cd)",
          borderColor: "var(--amber)",
        }}
      >
        🔑 Isso tem solução — você precisa ativar a <strong>REPOSIÇÃO HORMONAL NATURAL</strong>
      </div>

      {/* CTA text */}
      <p
        className="text-xs font-bold uppercase tracking-wider text-center"
        style={{ color: "var(--text)" }}
      >
        AGORA É HORA DE PERSONALIZAR A SOLUÇÃO PARA VOCÊ 👇
      </p>

      {/* CTA */}
      <button
        onClick={onContinue}
        className="w-full py-[17px] rounded-[var(--radius)] text-[17px] font-extrabold uppercase tracking-wide transition-all hover:-translate-y-0.5"
        style={{
          background: "linear-gradient(135deg, var(--amber), var(--amber-dark))",
          color: "var(--dark)",
          boxShadow: "0 4px 20px rgba(245,166,35,0.35)",
        }}
      >
        CONTINUAR PARA SOLUÇÃO →
      </button>
    </motion.div>
  );
};

export default CauseScreen;
