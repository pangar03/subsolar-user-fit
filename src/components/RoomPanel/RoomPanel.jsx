import { useSubsolar, ROOMS_DATA } from "../../contexts/SubsolarContext";

/**
 * RoomPanel
 *
 * Renders room selector buttons in two visual modes, controlled by
 * CSS breakpoints — no JS layout switching needed:
 *
 *   MOBILE  (< md):
 *   ┌──────────────────────────────────────────────┐
 *   │ 🛋️        🍳        🛏️        🚿       🚗   │  ← horizontal scroll strip
 *   │ Sala    Cocina   Habitación  Baño   Garaje  │     each button stacks emoji + name
 *   └──────────────────────────────────────────────┘
 *
 *   DESKTOP (≥ md):
 *   ┌──────────┐
 *   │ HABITA…  │
 *   │ ─────    │
 *   │ 🛋️ Sala  │  ← vertical sidebar, full labels + active-count badge
 *   │ 🍳 Coc…  │
 *   │ 🛏️ Hab…  │
 *   │ 🚿 Baño  │
 *   │ 🚗 Gar…  │
 *   └──────────┘
 *
 * No props needed — layout is fully driven by Tailwind breakpoint classes.
 * All state comes from context (currentRoom, roomCounts, selectRoom).
 */
const RoomPanel = () => {
    const { currentRoom, roomCounts, selectRoom } = useSubsolar();
    const rooms = Object.entries(ROOMS_DATA);

    return (
        /*
            MOBILE:   flex-row, horizontal scroll, fixed height, border-bottom
                      shrink-0 so it never collapses and AppliancePanel gets the rest
            DESKTOP:  flex-col, vertical scroll, fixed width (set by parent grid), border-right

            bg + backdrop-blur are the same in both modes.
        */
        <div
            className="
                shrink-0
                flex flex-row gap-1 overflow-x-auto overflow-y-hidden
                px-3 py-2 border-b border-[#DDE4EB]
                md:flex-col md:gap-2 md:overflow-x-hidden md:overflow-y-auto
                md:px-4 md:py-5 md:border-b-0 md:border-r md:border-[#DDE4EB]
                bg-white/90 backdrop-blur-[10px]
            "
        >
            {/* Section label — hidden on mobile (no room), visible on desktop */}
            <p className="hidden md:block text-[11px] font-bold tracking-[0.1em] uppercase text-[#94A3B8] px-1 mb-1 shrink-0">
                Habitaciones
            </p>

            {rooms.map(([roomId, room]) => {
                const isActive = currentRoom === roomId;
                const count = roomCounts[roomId] ?? 0;

                return (
                    <button
                        key={roomId}
                        onClick={() => selectRoom(roomId)}
                        className={`
                            cursor-pointer font-jakarta transition-all duration-200
                            border-2 rounded-[12px]

                            /* ── MOBILE: compact vertical stack ── */
                            flex-col items-center justify-center gap-0.5
                            flex shrink-0
                            px-3 py-2 min-w-[72px]
                            text-center

                            /* ── DESKTOP: horizontal row with full info ── */
                            md:flex-row md:items-center md:gap-[10px]
                            md:w-full md:text-left
                            md:px-3 md:py-[10px] md:min-w-0

                            ${
                                isActive
                                    ? "bg-[#D6EEFB] border-[#5BB8F5]"
                                    : "bg-transparent border-transparent hover:bg-[#F8FAFB]"
                            }
                        `}
                    >
                        {/*
                            Emoji:
                            Mobile  → slightly larger, centred
                            Desktop → fixed 32px container, centred
                        */}
                        <span className="text-[22px] md:text-[20px] md:w-8 md:text-center shrink-0">
                            {room.emoji}
                        </span>

                        {/*
                            Text wrapper:
                            Mobile  → just the short room name, small, centred
                            Desktop → name + active-count badge stacked
                        */}
                        <div className="flex-1 min-w-0">
                            <span
                                className={`
                                    block font-bold text-[#1A2942] truncate
                                    text-[11px] md:text-[13px]
                                `}
                            >
                                {/*
                                    Mobile: show a short version of the label to save space.
                                    "Habitación principal" → "Hab." etc.
                                    We use the ROOMS_DATA key as the short label on mobile.
                                    On desktop show the full label.
                                */}
                                <span className="md:hidden">
                                    {room.label.split(" ")[0]}
                                </span>
                                <span className="hidden md:inline">
                                    {room.label}
                                </span>
                            </span>

                            {/*
                                Active-count badge — hidden on mobile to save space,
                                shown on desktop below the room name.
                            */}
                            <span
                                className={`
                                    hidden md:block text-[11px] mt-px
                                    ${isActive ? "text-[#2E86C1]" : "text-[#94A3B8]"}
                                `}
                            >
                                {count} {count === 1 ? "activo" : "activos"}
                            </span>
                        </div>

                        {/*
                            Mobile-only active-count dot — a small coloured circle
                            in the top-right of the button when count > 0, so the
                            user gets feedback without needing the text label.
                            Hidden on desktop (the text badge handles it there).
                        */}
                        {count > 0 && (
                            <span
                                className={`
                                    md:hidden
                                    text-[10px] font-bold rounded-full
                                    px-1.5 py-px leading-none
                                    ${
                                        isActive
                                            ? "bg-[#2E86C1] text-white"
                                            : "bg-[#EFF3F6] text-[#94A3B8]"
                                    }
                                `}
                            >
                                {count}
                            </span>
                        )}
                    </button>
                );
            })}
        </div>
    );
};

export default RoomPanel;
