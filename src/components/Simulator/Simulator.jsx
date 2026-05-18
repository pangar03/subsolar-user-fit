import { useSubsolar } from "../../contexts/SubsolarContext";
import RoomPanel from "../RoomPanel/RoomPanel";
import AppliancePanel from "../AppliancePanel/AppliancePanel";

/**
 * Simulator
 *
 * Mobile-first responsive layout:
 *
 *   MOBILE  (default, < md / 768px)
 *   ┌─────────────────────────────┐
 *   │         Header              │  sticky, full width
 *   ├─────────────────────────────┤
 *   │   RoomPanel (horizontal     │  horizontal scroll tab bar,
 *   │   scroll tab strip)         │  fixed height, shrink-0
 *   ├─────────────────────────────┤
 *   │                             │
 *   │   AppliancePanel            │  flex-1, scrolls vertically
 *   │                             │
 *   └─────────────────────────────┘
 *
 *   DESKTOP (≥ md / 768px)
 *   ┌──────────────────────────────────────┐
 *   │              Header                  │  sticky, full width
 *   ├──────────┬───────────────────────────┤
 *   │          │                           │
 *   │ RoomPanel│     AppliancePanel        │  side-by-side columns,
 *   │ 280px    │     flex-1                │  both scroll independently
 *   │          │                           │
 *   └──────────┴───────────────────────────┘
 *
 * RoomPanel receives a `layout` prop so it can switch between
 * vertical (desktop sidebar) and horizontal (mobile tab strip) rendering.
 * AppliancePanel is unchanged — it always stacks vertically.
 *
 * No functionality changes — all state and actions remain in context.
 */
const Simulator = () => {
    const { result, resetQuiz } = useSubsolar();

    const isResilient = result?.profile === "resiliente";

    return (
        /*
            #sim-screen
            Mobile:  flex col, min-h-screen
            Desktop: same — the inner body switches from stacked to side-by-side
        */
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#fff7e8] via-[#f8fdff] to-[#f4fbf8]">
            {/* ── Header ──────────────────────────────────────────────
                Identical on all breakpoints except the profile chip
                hides its text label on very small screens (< sm) to
                prevent overflow — the coloured pill itself remains visible.

                sticky + z-10 so it stays above the scrolling panels.
            */}
            <header className="sticky top-0 z-10 flex items-center justify-between px-4 md:px-8 py-4 bg-white/72 backdrop-blur-[18px] border-b border-[rgba(12,102,150,0.08)] shrink-0">
                {/* Logo — updated for new design */}
                <div className="flex items-center gap-2 font-black text-[20px] md:text-[22px] text-[#0b4f8a]">
                    <span className="text-[24px]">☀️</span>
                    <span>Subsolar</span>
                </div>

                {/* Right side — profile badge and subtitle */}
                <div className="flex items-center gap-3">
                    {result && (
                        <div className="flex flex-col items-end gap-0.5">
                            <span
                                className={`
                                    px-3 md:px-4 py-1.5 rounded-full
                                    text-[11px] md:text-[12px] font-bold tracking-[0.04em]
                                    ${
                                        isResilient
                                            ? "bg-[rgba(19,167,107,0.12)] text-[#08724f]"
                                            : "bg-[rgba(29,143,227,0.12)] text-[#0b4f8a]"
                                    }
                                `}
                            >
                                {/*
                                    On mobile show only the emoji part of the badge label
                                    (e.g. "⚡" or "💰") to save horizontal space.
                                    On sm+ show the full label.
                                    badgeLabel format is "⚡ Perfil Resiliente" — split on space.
                                */}
                                <span className="sm:hidden">
                                    {result.badgeLabel.split(" ")[0]}
                                </span>
                                <span className="hidden sm:inline">
                                    {result.badgeLabel}
                                </span>
                            </span>
                            <p className="hidden md:block text-[10px] text-[#617789] font-medium">
                                Simula tu hogar
                            </p>
                        </div>
                    )}
                </div>
            </header>

            {/* ── Body ────────────────────────────────────────────────
                MOBILE:  flex-col — RoomPanel on top as tab strip,
                         AppliancePanel below filling remaining height.
                DESKTOP: grid with fixed 280px left column for RoomPanel.
            */}
            <div className="flex-1 flex flex-col md:grid md:grid-cols-[280px_1fr] overflow-hidden">
                {/*
                    RoomPanel receives `layout` so it can render differently:
                      mobile  → horizontal scrolling strip  (layout="horizontal")
                      desktop → vertical sidebar            (layout="vertical")
                    See RoomPanel.jsx for the two rendering modes.
                */}
                <RoomPanel layout="horizontal" mdLayout="vertical" />

                {/* AppliancePanel — always the same, fills remaining space */}
                <AppliancePanel />
            </div>
        </div>
    );
};

export default Simulator;
