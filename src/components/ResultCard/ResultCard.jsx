import { useSubsolar } from "../../contexts/SubsolarContext";

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────

/**
 * Formats a number as Colombian pesos.
 * Mirrors the original: n => '$' + n.toLocaleString('es-CO')
 */
const fmtCOP = (n) => "$" + n.toLocaleString("es-CO");

// ─────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────

/**
 * StatBox — one cell in the 2-column stats grid.
 *
 * .stat-box:  background:#F8FAFB; border-radius:12px; padding:16px; text-align:left;
 * .stat-label: font-size:11px; font-weight:700; color:#94A3B8;
 *              text-transform:uppercase; letter-spacing:0.06em; margin-bottom:4px;
 * .stat-value: font-family:'Nunito'; font-size:22px; font-weight:900; color:#1A2942;
 * .stat-unit:  font-size:12px; color:#94A3B8; font-weight:500;
 */
const StatBox = ({ label, value, unit }) => (
    <div className="bg-[#F8FAFB] rounded-[12px] p-4 text-left">
        <p className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-[0.06em] mb-1">
            {label}
        </p>
        <p className="font-nunito text-[22px] font-black text-[#1A2942]">
            {value}
            {unit && (
                <span className="text-[12px] text-[#94A3B8] font-medium">
                    {unit}
                </span>
            )}
        </p>
    </div>
);

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────

/**
 * ResultCard
 *
 * Reads `result` and `goToSimulator` from SubsolarContext.
 * Renders nothing if result is null (quiz not yet complete) —
 * in practice App.jsx will only mount this when screen === 'result'.
 *
 * Faithfully mirrors the original showResult() DOM output:
 *   - result-emoji       → result.emoji
 *   - result-badge       → result.badgeLabel  (profile-aware colours)
 *   - result-title       → result.title
 *   - result-desc        → result.desc
 *   - result-stats       → fmtCOP(result.savings) + result.batteryH
 *   - renuncia-box       → renuncia title + result.renunciaText
 *                          (original used innerHTML with <strong>; handled as JSX here)
 *   - btn-simulate       → calls goToSimulator()
 */
const ResultCard = () => {
    const { result, goToSimulator } = useSubsolar();

    // Guard — should never be visible when result is null,
    // but prevents a crash if rendered prematurely.
    if (!result) return null;

    const isResilient = result.profile === "resiliente";

    return (
        <>
            {/* @keyframes pop — cannot be expressed as a Tailwind utility */}
            <style>{`
                @keyframes pop {
                    from { transform: scale(0.3); opacity: 0; }
                    to   { transform: scale(1);   opacity: 1; }
                }
                .animate-pop { animation: pop 0.6s cubic-bezier(.4,0,.2,1); }
            `}</style>

            {/*
                #result-screen
                background: linear-gradient(160deg, #0F6E56 0%, #1ABC9C 60%, #5BB8F5 100%);
                display:flex; flex-direction:column;   ← from .screen.active
                align-items:center; justify-content:center;
                padding:20px; min-height:100vh;
            */}
            <div
                className="flex flex-col items-center justify-center min-h-screen p-5"
                style={{
                    background:
                        "linear-gradient(160deg, #0F6E56 0%, #1ABC9C 60%, #5BB8F5 100%)",
                }}
            >
                {/*
                    .result-card
                    background:rgba(255,255,255,0.97); border-radius:32px (--r-xl);
                    padding:44px 40px; max-width:560px; width:100%;
                    box-shadow:0 8px 40px rgba(0,0,0,0.16);
                    text-align:center;
                */}
                <div
                    className="bg-white/[.97] rounded-[32px] px-10 py-11 w-full max-w-[560px] text-center"
                    style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.16)" }}
                >
                    {/*
                        .result-emoji
                        font-size:64px; margin-bottom:16px; display:block;
                        animation: pop 0.6s cubic-bezier(.4,0,.2,1);
                    */}
                    <span className="block text-[64px] mb-4 animate-pop">
                        {result.emoji}
                    </span>

                    {/*
                        .result-badge (base)
                        display:inline-flex; align-items:center; gap:8px;
                        padding:8px 20px; border-radius:99px; font-size:13px;
                        font-weight:700; margin-bottom:20px; letter-spacing:0.05em;
                        text-transform:uppercase;

                        .badge-ahorrador  → background:#D6EEFB; color:#2E86C1;
                        .badge-resiliente → background:#D4EFEA; color:#0F6E56;
                    */}
                    <div
                        className={`
                            inline-flex items-center gap-2
                            px-5 py-2 rounded-full
                            text-[13px] font-bold mb-5
                            tracking-[0.05em] uppercase
                            ${
                                isResilient
                                    ? "bg-[#D4EFEA] text-[#0F6E56]"
                                    : "bg-[#D6EEFB] text-[#2E86C1]"
                            }
                        `}
                    >
                        {result.badgeLabel}
                    </div>

                    {/*
                        .result-title
                        font-family:'Nunito'; font-size:30px; font-weight:900;
                        color:#1A2942; margin-bottom:10px;
                    */}
                    <h2 className="font-nunito text-[30px] font-black text-[#1A2942] mb-2.5">
                        {result.title}
                    </h2>

                    {/*
                        .result-desc
                        font-size:15px; color:#4A5568; line-height:1.6; margin-bottom:28px;
                    */}
                    <p className="text-[15px] text-[#4A5568] leading-[1.6] mb-7">
                        {result.desc}
                    </p>

                    {/* ── Stats grid ──────────────────────────────────────
                        .result-stats
                        display:grid; grid-template-columns:1fr 1fr;
                        gap:12px; margin-bottom:28px;

                        Original only renders 2 stat-boxes (savings + batteryH).
                    */}
                    <div className="grid grid-cols-2 gap-3 mb-7">
                        <StatBox
                            label="Ahorro estimado"
                            value={fmtCOP(result.savings)}
                            unit="/mes"
                        />
                        <StatBox
                            label="Horas de respaldo"
                            value={result.batteryH}
                            unit=" horas"
                        />
                    </div>

                    {/* ── Renuncia box ─────────────────────────────────────
                        .renuncia-box
                        background:#FEF3E2; border-left:4px solid #F39C12;
                        border-radius:12px; padding:14px 16px;
                        text-align:left; margin-bottom:28px;

                        .renuncia-title
                        font-size:12px; font-weight:700; color:#F39C12;
                        text-transform:uppercase; letter-spacing:0.06em; margin-bottom:6px;

                        .renuncia-text
                        font-size:13px; color:#1E2A3A; line-height:1.5;

                        NOTE: The original injects this via innerHTML with a <strong> tag:
                          "⚠️ <strong>Lo que cedes:</strong> Al priorizar…"
                        We replicate that bold span as JSX here instead.
                    */}
                    <div className="bg-[#FEF3E2] border-l-4 border-[#F39C12] rounded-[12px] px-4 py-[14px] text-left mb-7">
                        <p className="text-[12px] font-bold text-[#F39C12] uppercase tracking-[0.06em] mb-1.5">
                            ⚖️ Renuncia consciente — léela antes de elegir
                        </p>
                        <p className="text-[13px] text-[#1E2A3A] leading-[1.5]">
                            ⚠️ <strong>Lo que cedes:</strong>{" "}
                            {result.renunciaText}
                        </p>
                    </div>

                    {/*
                        .btn-simulate
                        width:100%; padding:16px 24px; border:none; border-radius:18px (--r-md);
                        background: linear-gradient(135deg, #1ABC9C, #0F6E56);
                        color:white; font-size:16px; font-weight:800; cursor:pointer;
                        font-family:'Nunito'; letter-spacing:0.02em; transition:all 0.2s;
                        display:flex; align-items:center; justify-content:center; gap:10px;
                        :hover → transform:translateY(-2px); box-shadow:0 8px 24px rgba(26,188,156,0.4);
                    */}
                    <button
                        onClick={goToSimulator}
                        className="
                            w-full px-6 py-4
                            border-none rounded-[18px]
                            text-white text-[16px] font-extrabold font-nunito tracking-[0.02em]
                            cursor-pointer
                            flex items-center justify-center gap-[10px]
                            transition-all duration-200
                            hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(26,188,156,0.4)]
                        "
                        style={{
                            background:
                                "linear-gradient(135deg, #1ABC9C, #0F6E56)",
                        }}
                    >
                        🏠 Simular mi hogar
                    </button>
                </div>
                {/* /result-card */}
            </div>
            {/* /result-screen */}
        </>
    );
};

export default ResultCard;
