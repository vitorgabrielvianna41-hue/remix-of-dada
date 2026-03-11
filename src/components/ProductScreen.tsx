import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import avatarLarissa from "@/assets/avatar-larissa.png";
import avatarSimone from "@/assets/avatar-simone.png";
import avatarDraAna from "@/assets/avatar-dra-ana.png";
import transformationImage from "@/assets/transformation-result.png";
import protocoloApp from "@/assets/protocolo-app.jpg";
import garantia30dias from "@/assets/garantia-30dias.png";

const FAQ_ITEMS = [
  { q: "O Pilates em Casa realmente funciona para menopausa?", a: "Sim! O protocolo foi desenvolvido especificamente para mulheres na menopausa. Os exercícios de baixo impacto ativam a produção hormonal natural e aceleram o metabolismo, mesmo com as mudanças hormonais dessa fase." },
  { q: "Preciso fazer dieta ou outros exercícios?", a: "Não! O protocolo inclui um plano alimentar simples e prático. Você não precisa de academia, personal trainer ou dietas restritivas. Apenas 10 minutos por dia em casa." },
  { q: "Tem alguma contraindicação?", a: "O pilates em casa é um exercício de baixo impacto, seguro para todas as idades. Porém, se você tem alguma condição médica específica, recomendamos consultar seu médico antes de iniciar." },
  { q: "Em quanto tempo vejo resultados?", a: "A maioria das alunas relata resultados visíveis já nas primeiras 2 semanas. Resultados mais expressivos aparecem entre 4 a 8 semanas seguindo o protocolo." },
  { q: "Como funciona a garantia?", a: "Você tem 7 dias para experimentar o protocolo completo. Se não ficar satisfeita por qualquer motivo, basta solicitar o reembolso e devolvemos 100% do valor. Sem perguntas." },
  { q: "O que vem no protocolo?", a: "Você recebe: treinos de pilates de 10 min/dia, plano de reposição hormonal natural, guia anti-barriga, receitas saudáveis, aulas em vídeo e acesso vitalício pelo celular." },
];

const COMPARISON = [
  { label: "Consultas + exames", price: "R$ 500" },
  { label: "Academia + personal trainer", price: "R$ 400" },
  { label: "Dietas + suplementos", price: "R$ 300" },
  { label: "Cremes emagrecedores", price: "R$ 200" },
];

const CTAButton = () => (
  <a
    href="https://pay.lowify.com.br/checkout?product_id=hFqJVa"
    className="block w-full py-[17px] rounded-[var(--radius)] text-[17px] font-extrabold uppercase tracking-wide text-center transition-all hover:-translate-y-0.5"
    style={{
      background: "linear-gradient(135deg, var(--amber), var(--amber-dark))",
      color: "var(--dark)",
      boxShadow: "0 4px 20px rgba(245,166,35,0.35)",
    }}
  >
    QUERO MEU PROTOCOLO AGORA →
  </a>
);

const ProductScreen = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [countdown, setCountdown] = useState(14 * 60 + 59);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev <= 0 ? 14 * 60 + 59 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = useCallback((s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col gap-5"
    >
      {/* 1. Topo — Resultado */}
      <div
        className="rounded-[var(--radius)] p-5 text-center border-2"
        style={{ background: "linear-gradient(135deg, #e8f5e9, #c8e6c9)", borderColor: "#81c784" }}
      >
        <p className="text-sm font-bold" style={{ color: "#2e7d32" }}>✅ Plano Gerado com Sucesso!</p>
        <p className="font-display text-[24px] font-black mt-1 leading-tight" style={{ color: "var(--dark)" }}>
          Seu protocolo está liberado!
        </p>
        <p className="text-xs font-bold mt-2" style={{ color: "#c62828" }}>
          ⚠️ Ele é exclusivo e gerado só uma vez, não saia dessa página para não perdê-lo
        </p>
      </div>

      {/* 2. Card do plano */}
      <div className="bg-card rounded-[var(--radius)] p-5" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
        <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-1">SEU PLANO</p>
        <p className="font-display text-xl font-black" style={{ color: "var(--dark)" }}>1 MÊS DE TRATAMENTO</p>
        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
          De acordo com seu perfil e objetivo, você chegará em seu corpo ideal em 4 semanas com o Pilates em Casa.
        </p>

        {/* Progress bar with milestones */}
        <div className="mt-5 relative">
          <div className="h-3 bg-border rounded-full overflow-hidden">
            <div className="h-full rounded-full" style={{ width: "100%", background: "linear-gradient(90deg, var(--amber), var(--amber-dark))" }} />
          </div>
          <div className="flex justify-between mt-2">
            {[
              { pct: "25%", label: "-3kg", sub: "Primeiros resultados" },
              { pct: "50%", label: "-5 a 7kg", sub: "" },
              { pct: "75%", label: "-9 a 12kg", sub: "" },
              { pct: "100%", label: "Meta atingida", sub: "Corpo ideal!" },
            ].map((m, i) => (
              <div key={i} className="text-center flex-1">
                <p className="text-[10px] font-bold" style={{ color: "var(--amber-dark)" }}>{m.pct}</p>
                <p className="text-[10px] font-bold" style={{ color: "var(--dark)" }}>{m.label}</p>
                {m.sub && <p className="text-[9px] text-muted-foreground">{m.sub}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. O que está incluso */}
      <div className="bg-card rounded-[var(--radius)] overflow-hidden" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
        <img src={protocoloApp} alt="App Protocolo Completo" className="w-full h-auto object-cover" />
        <div className="p-5">
        <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-3">
          APP PROTOCOLO COMPLETO · ACESSO VITALÍCIO
        </p>
        <div className="flex flex-col gap-2.5">
          {[
            "Protocolo de Pilates de 10 min/dia para menopausa",
            "Plano de reposição hormonal natural (30 dias passo a passo)",
            "Guia anti-barriga da menopausa",
            "Dicas para acelerar resultados",
            "Acesso vitalício pelo celular",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-sm flex-shrink-0">✅</span>
              <p className="text-sm" style={{ color: "var(--text)" }}>{item}</p>
            </div>
          ))}
        </div>

        <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider mt-5 mb-3">
          🎁 BÔNUS EXCLUSIVOS
        </p>
        <div className="flex flex-col gap-2.5">
          {[
            "Dietas completas para emagrecimento",
            "Receitas saudáveis para menopausa",
            "Aulas em vídeo de pilates na parede",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-sm flex-shrink-0">⭐</span>
              <p className="text-sm" style={{ color: "var(--text)" }}>{item}</p>
            </div>
          ))}
        </div>
        </div>
      </div>

      {/* 4. Preço + CTA (1º bloco) */}
      <div
        className="rounded-[var(--radius)] p-5 text-center border-2"
        style={{ background: "linear-gradient(135deg, #fff8e1, #fff3cd)", borderColor: "var(--amber)" }}
      >
        <p className="text-sm text-muted-foreground line-through">de R$ 197,00</p>
        <p className="font-display text-[42px] font-black mt-1" style={{ color: "var(--amber-dark)" }}>
          R$ 27,90
        </p>
        <p className="text-sm font-semibold text-muted-foreground mt-1">
          Pagamento único · Acesso imediato
        </p>
      </div>

      <CTAButton />

      {/* Countdown */}
      <div className="text-center py-2">
        <p className="text-sm font-bold" style={{ color: "#c62828" }}>
          ⏱ Seu plano expira em: <span className="font-mono text-base">{formatTime(countdown)}</span>
        </p>
      </div>

      {/* 5. Autoridade */}
      <div className="bg-card rounded-[var(--radius)] p-5 flex items-center gap-4" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
        <img
          src={avatarDraAna}
          alt="Profa. Ana Paula Mendes"
          className="w-14 h-14 rounded-full object-cover flex-shrink-0"
        />
        <div>
          <p className="text-xs text-muted-foreground">Plano gerado por:</p>
          <p className="text-sm font-bold" style={{ color: "var(--dark)" }}>Profa. Ana Paula Mendes</p>
          <p className="text-xs text-muted-foreground">Especialista em Pilates para Menopausa · CREF 12345-G/SP</p>
        </div>
      </div>

      {/* 6. Depoimentos */}
      {[
        {
          avatar: avatarLarissa,
          name: "Larissa Antunes",
          text: "Em 2 semanas já percebi minha barriga desinchando! Nunca pensei que algo tão simples funcionaria tão bem. Recomendo demais!",
        },
        {
          avatar: avatarSimone,
          name: "Simone Alencar",
          text: "Perdi 8kg em 30 dias seguindo o protocolo certinho. Meu marido não acreditou na diferença! Melhor investimento que já fiz.",
        },
      ].map((t, i) => (
        <div key={i} className="bg-card rounded-[var(--radius)] p-4" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
          <div className="flex items-center gap-3 mb-2">
            <img src={t.avatar} alt={t.name} className="w-[42px] h-[42px] rounded-full object-cover flex-shrink-0" />
            <div>
              <p className="text-xs" style={{ color: "var(--amber-dark)" }}>⭐⭐⭐⭐⭐</p>
              <p className="text-sm font-bold" style={{ color: "var(--dark)" }}>{t.name}</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">"{t.text}"</p>
        </div>
      ))}

      {/* 7. Tabela comparativa */}
      <div className="bg-card rounded-[var(--radius)] p-5" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
        <p className="text-sm font-bold text-center mb-4" style={{ color: "var(--dark)" }}>Compare e economize</p>
        <div className="flex flex-col gap-2">
          {COMPARISON.map((item, i) => (
            <div key={i} className="flex justify-between items-center py-2 border-b" style={{ borderColor: "hsl(var(--border))" }}>
              <p className="text-sm text-muted-foreground">{item.label}</p>
              <p className="text-sm font-bold line-through text-muted-foreground">{item.price}</p>
            </div>
          ))}
          <div className="flex justify-between items-center py-2">
            <p className="text-sm font-bold" style={{ color: "var(--dark)" }}>Pilates em Casa (nosso protocolo)</p>
            <p className="text-base font-black" style={{ color: "var(--amber-dark)" }}>R$ 27,90</p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground text-center mt-3 leading-relaxed">
          Por menos do que um lanche, você tem acesso ao protocolo completo que já ajudou milhares de mulheres.
        </p>
      </div>

      {/* 8. Preço + CTA (2º bloco) */}
      <div
        className="rounded-[var(--radius)] p-5 text-center border-2"
        style={{ background: "linear-gradient(135deg, #fff8e1, #fff3cd)", borderColor: "var(--amber)" }}
      >
        <p className="text-sm text-muted-foreground line-through">de R$ 197,00</p>
        <p className="font-display text-[42px] font-black mt-1" style={{ color: "var(--amber-dark)" }}>
          R$ 27,90
        </p>
        <p className="text-sm font-semibold text-muted-foreground mt-1">
          Pagamento único · Acesso imediato
        </p>
      </div>

      <CTAButton />

      {/* 9. Garantia */}
      <div className="bg-card rounded-[var(--radius)] p-5 text-center" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
        <img src={garantia30dias} alt="Garantia de 30 dias" className="w-24 h-24 mx-auto mb-2 object-contain" />
        <p className="font-display text-lg font-bold" style={{ color: "var(--dark)" }}>Garantia de 30 Dias</p>
        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
          Se por qualquer motivo você não ficar satisfeita com os resultados, devolvemos 100% do seu dinheiro. Sem perguntas, sem burocracia.
        </p>
      </div>

      {/* 10. Foto antes/depois + CTA final */}
      <div className="overflow-hidden rounded-2xl" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
        <img src={transformationImage} alt="Resultado real antes e depois" className="w-full h-auto object-cover" />
      </div>
      <p className="text-sm font-extrabold uppercase text-center tracking-wide" style={{ color: "var(--dark)" }}>
        TENHA RESULTADOS EM ATÉ 30 DIAS OU SEU DINHEIRO DE VOLTA
      </p>
      <a
        href="https://pay.lowify.com.br/checkout?product_id=hFqJVa"
        className="block w-full py-[17px] rounded-[var(--radius)] text-[17px] font-extrabold uppercase tracking-wide text-center transition-all hover:-translate-y-0.5"
        style={{
          background: "linear-gradient(135deg, var(--amber), var(--amber-dark))",
          color: "var(--dark)",
          boxShadow: "0 4px 20px rgba(245,166,35,0.35)",
        }}
      >
        QUERO MEU PROTOCOLO AGORA! 🔥
      </a>

      {/* 11. FAQ */}
      <div className="flex flex-col gap-2">
        <p className="text-sm font-bold text-center mb-2" style={{ color: "var(--dark)" }}>Perguntas Frequentes</p>
        {FAQ_ITEMS.map((item, i) => (
          <div key={i} className="bg-card rounded-[var(--radius)] overflow-hidden" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
            <button
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
              className="w-full flex items-center justify-between p-4 text-left"
            >
              <p className="text-sm font-semibold pr-2" style={{ color: "var(--dark)" }}>{item.q}</p>
              <span className="text-muted-foreground flex-shrink-0 text-lg transition-transform" style={{ transform: openFaq === i ? "rotate(180deg)" : "" }}>
                ▾
              </span>
            </button>
            <motion.div
              initial={false}
              animate={{ height: openFaq === i ? "auto" : 0, opacity: openFaq === i ? 1 : 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <p className="text-sm text-muted-foreground leading-relaxed px-4 pb-4">{item.a}</p>
            </motion.div>
          </div>
        ))}
      </div>

      {/* 12. CTA final + segurança */}
      <CTAButton />
      <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
        <span>🔒 Compra 100% segura</span>
        <span>✅ Garantia de 7 dias</span>
      </div>

      {/* 13. Urgência + social proof */}
      <div
        className="rounded-[var(--radius)] p-4 text-center border-2"
        style={{ background: "linear-gradient(135deg, #fff3f3, #ffe5e5)", borderColor: "#ff6b6b" }}
      >
        <p className="text-sm font-bold" style={{ color: "#c62828" }}>
          🔥 Oferta por tempo limitado
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Esse valor promocional pode sair do ar a qualquer momento
        </p>
      </div>

      <p className="text-center text-sm text-muted-foreground font-medium">
        +4.800 mulheres já transformaram seus corpos ⭐⭐⭐⭐⭐
      </p>
    </motion.div>
  );
};

export default ProductScreen;
