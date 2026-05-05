import { useSubsolar } from "../../contexts/SubsolarContext";
import RoomPanel from "../RoomPanel/RoomPanel";
import AppliancePanel from "../AppliancePanel/AppliancePanel";

/**
 * Simulator
 *
 * Top-level screen for the simulator. Composes:
 *   - A sticky header (logo, profile chip, restart button)
 *   - A two-column body: RoomPanel (left) | AppliancePanel (right)
 *
 * The isometric center column from the original has been intentionally removed.
 * The two-column layout fills the full viewport height below the header.
 *
 * Original CSS translated:
 *   #sim-screen     → background:#B8D4E8; flex-direction:column; min-height:100vh;
 *   .sim-header     → navy bg; padding:14px 24px; flex row space-between; shrink-0
 *   .sim-logo       → Nunito 900 18px white, gap:8px; "solar" span in sky blue
 *   .profile-chip   → pill, profile-variant colours
 *   .btn-restart    → ghost border button, white/60, hover white
 *   .sim-body       → flex:1; two-column grid (was 3-col with iso center)
 */
const Simulator = () => {
    const { result, resetQuiz } = useSubsolar();

    const isResilient = result?.profile === "resiliente";

    return (
        /*
            #sim-screen
            background:#B8D4E8; display:flex; flex-direction:column; min-height:100vh;
        */
        <div className="flex flex-col min-h-screen bg-[#B8D4E8]">
            {/* ── Header ───────────────────────────────────────────
                .sim-header
                background:#1A2942; padding:14px 24px;
                display:flex; align-items:center; justify-content:space-between;
                flex-shrink:0;
            */}
            <header className="flex items-center justify-between px-6 py-[14px] bg-[#1A2942] shrink-0">
                {/*
                    .sim-logo
                    font-family:'Nunito'; font-weight:900; font-size:18px; color:white;
                    display:flex; align-items:center; gap:8px;
                    .sim-logo span → color:#5BB8F5;
                */}
                <div className="flex items-center gap-2 font-nunito font-black text-[18px] text-white">
                    <span>☀️</span>
                    <span>
                        Sub<span className="text-[#5BB8F5]">solar</span>
                    </span>
                </div>

                <div className="flex items-center gap-[10px]">
                    {/*
                        .profile-chip (base)
                        padding:6px 14px; border-radius:99px; font-size:12px;
                        font-weight:700; letter-spacing:0.04em;

                        .chip-ahorrador  → background:rgba(91,184,245,0.2);  color:#90CAF9;
                        .chip-resiliente → background:rgba(26,188,156,0.2);  color:#80CBC4;
                    */}
                    {result && (
                        <span
                            className={`
                                px-[14px] py-1.5 rounded-full
                                text-[12px] font-bold tracking-[0.04em]
                                ${
                                    isResilient
                                        ? "bg-[rgba(26,188,156,0.2)] text-[#80CBC4]"
                                        : "bg-[rgba(91,184,245,0.2)] text-[#90CAF9]"
                                }
                            `}
                        >
                            {result.badgeLabel}
                        </span>
                    )}

                    {/*
                        .btn-restart
                        padding:7px 14px; border:1px solid rgba(255,255,255,0.2);
                        border-radius:8px; background:transparent;
                        color:rgba(255,255,255,0.6); font-size:12px; font-weight:600;
                        cursor:pointer; transition:all 0.2s;
                        :hover → background:rgba(255,255,255,0.1); color:white;
                    */}
                    <button
                        onClick={resetQuiz}
                        className="
                            px-[14px] py-[7px]
                            border border-white/20 rounded-[8px]
                            bg-transparent text-white/60
                            text-[12px] font-semibold font-jakarta
                            cursor-pointer transition-all duration-200
                            hover:bg-white/10 hover:text-white
                        "
                    >
                        ↩ Reiniciar
                    </button>
                </div>
            </header>
            {/* /Header */}

            {/* ── Body — two-column layout ──────────────────────────
                Original .sim-body was grid-template-columns: 280px 1fr 300px.
                With the iso center removed, we use: 280px 1fr (or 300px).
                Both panels scroll independently; the grid itself is overflow-hidden.
            */}
            <div className="flex-1 grid grid-cols-[280px_1fr] overflow-hidden">
                {/* Left: Room selector */}
                <RoomPanel />

                {/* Right: Battery + Appliances + Plans */}
                <AppliancePanel />
            </div>
            {/* /Body */}
        </div>
    );
};

export default Simulator;
