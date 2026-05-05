import { useSubsolar, PLANS_DATA } from "../../contexts/SubsolarContext";

// ─────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────

/**
 * BatterySection
 *
 * Displays the current battery percentage, a colour-coded progress bar,
 * and the hours-of-backup calculation.
 *
 * Original CSS:
 *   .battery-section        → padding:20px; border-bottom: 1px solid #EFF3F6;
 *   .battery-section-title  → 11px uppercase label
 *   .battery-display        → flex row, gap:14px, mb:16px
 *   .battery-icon-wrap      → 56×56px shrink-0 (SVG battery icon)
 *   .battery-pct            → Nunito 32px black navy
 *   .battery-pct-sub        → 11px gray-400
 *   .battery-bar-wrap       → h:12px gray-100 rounded-full overflow-hidden mb:10px
 *   .battery-bar-fill       → h:100% rounded-full, transition width+bg 0.6s
 *   .battery-hours          → flex space-between
 *   .hours-big              → Nunito 28px black navy
 *   .hours-unit / .hours-label → 12px gray-400
 */
const BatterySection = ({ battery }) => {
    const pct = battery.pct;
    const color = battery.color;

    return (
        <div className="px-5 py-5 border-b border-[#EFF3F6]">
            {/* .battery-section-title */}
            <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-[#94A3B8] mb-3">
                🔋 Estado de batería
            </p>

            {/* .battery-display */}
            <div className="flex items-center gap-[14px] mb-4">
                {/*
                    .battery-icon-wrap + inline SVG
                    Original SVG has a dynamic fill rect and text node.
                    We drive both via the `battery` values from context.
                    The rect width scales from 0 to 28px (the inner fill area).
                */}
                <div className="shrink-0 w-14 h-14">
                    <svg
                        viewBox="0 0 56 56"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full h-full"
                    >
                        <rect
                            x="8"
                            y="12"
                            width="36"
                            height="28"
                            rx="5"
                            fill="#1A2942"
                            opacity="0.08"
                        />
                        <rect
                            x="10"
                            y="14"
                            width="32"
                            height="24"
                            rx="4"
                            fill="white"
                            stroke="#DDE4EB"
                            strokeWidth="1.5"
                        />
                        <rect
                            x="12"
                            y="16"
                            width="28"
                            height="20"
                            rx="3"
                            fill="#EFF3F6"
                        />
                        {/* Dynamic fill bar — width = 28 * pct / 100 */}
                        <rect
                            x="12"
                            y="16"
                            width={(28 * pct) / 100}
                            height="20"
                            rx="3"
                            fill={color}
                            style={{ transition: "width 0.6s ease, fill 0.6s" }}
                        />
                        <rect
                            x="42"
                            y="22"
                            width="4"
                            height="8"
                            rx="2"
                            fill="#94A3B8"
                        />
                        <text
                            x="28"
                            y="32"
                            textAnchor="middle"
                            fontSize="10"
                            fontWeight="800"
                            fontFamily="Nunito, sans-serif"
                            fill="#1A2942"
                        >
                            {pct}%
                        </text>
                    </svg>
                </div>

                <div>
                    {/* .battery-pct → Nunito 32px black */}
                    <p className="font-nunito text-[32px] font-black text-[#1A2942] leading-none">
                        {pct}%
                    </p>
                    {/* .battery-pct-sub */}
                    <span className="block text-[11px] text-[#94A3B8] font-medium mt-0.5">
                        capacidad disponible
                    </span>
                </div>
            </div>

            {/*
                .battery-bar-wrap
                height:12px; background:#EFF3F6; border-radius:99px; overflow:hidden; margin-bottom:10px;
            */}
            <div className="h-3 bg-[#EFF3F6] rounded-full overflow-hidden mb-2.5">
                {/*
                    .battery-bar-fill
                    transition: width 0.6s cubic-bezier(.4,0,.2,1), background 0.6s;
                */}
                <div
                    className="h-full rounded-full"
                    style={{
                        width: `${pct}%`,
                        background: color,
                        transition:
                            "width 0.6s cubic-bezier(.4,0,.2,1), background 0.6s",
                    }}
                />
            </div>

            {/* .battery-hours → flex space-between items-center */}
            <div className="flex justify-between items-center">
                <div>
                    {/* .hours-big → Nunito 28px black navy */}
                    <span className="font-nunito text-[28px] font-black text-[#1A2942]">
                        {battery.hoursDisplay}
                    </span>
                    {/* .hours-unit */}
                    <span className="text-[12px] text-[#94A3B8] font-medium">
                        {" "}
                        horas
                    </span>
                </div>
                {/* .hours-label */}
                <span className="text-[12px] text-[#94A3B8] text-right">
                    {battery.hoursLabel}
                </span>
            </div>
        </div>
    );
};

// ─────────────────────────────────────────────

/**
 * ApplianceItem — a single toggleable appliance row.
 *
 * Original CSS:
 *   .appliance-item (base)
 *     display:flex; align-items:center; gap:10px; padding:10px 12px;
 *     border-radius:12px; border:2px solid #EFF3F6; cursor:pointer;
 *     background:white; transition:all 0.2s; width:100%; text-align:left;
 *   :hover → border-color:#5BB8F5; background:#D6EEFB;
 *   .appliance-item.on
 *     border-color:#2E86C1; background:#EBF5FD;
 *     box-shadow: 0 2px 8px rgba(91,184,245,0.2);
 *
 *   .app-emoji  → 20px, w:28px center
 *   .app-name   → 13px font-semibold navy
 *   .app-watts  → 11px gray-400
 *
 *   .toggle-dot (custom CSS toggle pill):
 *     width:22px; height:14px; border-radius:99px;
 *     background: gray-200 (off) / sky-dark (on);
 *     ::after → white dot, translateX(8px) when on
 *   Since ::after can't be Tailwind, the pill is rendered as two divs.
 */
const ApplianceItem = ({ appliance, roomId }) => {
    const { toggleAppliance } = useSubsolar();
    const isOn = appliance.on;

    return (
        <button
            onClick={() => toggleAppliance(roomId, appliance.id)}
            className={`
                flex items-center gap-[10px]
                px-3 py-[10px] rounded-[12px]
                border-2 w-full text-left
                font-jakarta cursor-pointer
                transition-all duration-200
                ${
                    isOn
                        ? "border-[#2E86C1] bg-[#EBF5FD] shadow-[0_2px_8px_rgba(91,184,245,0.2)]"
                        : "border-[#EFF3F6] bg-white hover:border-[#5BB8F5] hover:bg-[#D6EEFB]"
                }
            `}
        >
            {/* .app-emoji → font-size:20px; width:28px; text-align:center; */}
            <span className="text-[20px] w-7 text-center shrink-0">
                {appliance.emoji}
            </span>

            {/* .app-info → flex:1 */}
            <div className="flex-1 min-w-0">
                {/* .app-name → font-size:13px; font-weight:600; color:#1A2942; */}
                <span className="block text-[13px] font-semibold text-[#1A2942] truncate">
                    {appliance.name}
                </span>
                {/* .app-watts → font-size:11px; color:#94A3B8; */}
                <span className="block text-[11px] text-[#94A3B8] mt-px">
                    {appliance.watts}W
                </span>
            </div>

            {/*
                Toggle pill — replicates .toggle-dot + ::after without pseudo-elements.
                Off: gray track + left-aligned white dot
                On:  sky-dark track + right-aligned white dot
                transition on both track color and dot position.
            */}
            <div
                className={`
                    relative shrink-0 w-[22px] h-[14px] rounded-full
                    transition-colors duration-200
                    ${isOn ? "bg-[#2E86C1]" : "bg-[#DDE4EB]"}
                `}
            >
                <div
                    className={`
                        absolute top-[2px] w-[10px] h-[10px] rounded-full bg-white
                        shadow-[0_1px_3px_rgba(0,0,0,0.2)]
                        transition-transform duration-200
                        ${isOn ? "translate-x-[10px]" : "translate-x-[2px]"}
                    `}
                />
            </div>
        </button>
    );
};

// ─────────────────────────────────────────────

/**
 * PlanCard — a single selectable plan row in the plan comparison section.
 *
 * Original CSS:
 *   .plan-card (base)
 *     padding:10px 12px; border-radius:10px; border:2px solid transparent;
 *     cursor:pointer; display:flex; align-items:center; gap:10px;
 *     background:white; transition:all 0.2s; width:100%;
 *   :hover → border-color:#5BB8F5;
 *   .plan-card.selected-plan → border-color:#2E86C1; background:#EBF5FD;
 *
 *   .plan-dot  → 10×10px circle, flex-shrink:0
 *   .plan-name → 12px bold navy flex:1
 *   .plan-hours-tag → 11px bold sky-dark, sky-light bg, rounded-full pill
 */
const PlanCard = ({ planKey, plan, isSelected, hoursTag }) => {
    const { selectPlan } = useSubsolar();

    return (
        <button
            onClick={() => selectPlan(planKey)}
            className={`
                flex items-center gap-[10px]
                px-3 py-[10px] rounded-[10px]
                border-2 w-full text-left
                font-jakarta cursor-pointer
                transition-all duration-200
                ${
                    isSelected
                        ? "border-[#2E86C1] bg-[#EBF5FD]"
                        : "border-transparent bg-white hover:border-[#5BB8F5]"
                }
            `}
        >
            {/* .plan-dot */}
            <div
                className="w-[10px] h-[10px] rounded-full shrink-0"
                style={{ background: plan.dotColor }}
            />

            {/* .plan-name → font-size:12px; font-weight:700; color:#1A2942; flex:1; */}
            <span className="flex-1 text-[12px] font-bold text-[#1A2942] text-left">
                {plan.name}
            </span>

            {/*
                .plan-hours-tag
                font-size:11px; font-weight:700; color:#2E86C1;
                background:#D6EEFB; padding:2px 8px; border-radius:99px;
            */}
            <span className="text-[11px] font-bold text-[#2E86C1] bg-[#D6EEFB] px-2 py-0.5 rounded-full">
                {hoursTag}h
            </span>
        </button>
    );
};

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────

/**
 * AppliancePanel
 *
 * Right panel of the Simulator. Contains three stacked sections:
 *   1. BatterySection  — live battery gauge
 *   2. Appliances      — toggleable list for the current room
 *   3. Plan comparison — plan selector + CTA button
 *
 * Original CSS:
 *   .right-panel
 *     background: rgba(255,255,255,0.95); border-left:1px solid #DDE4EB;
 *     display:flex; flex-direction:column; overflow-y:auto;
 */
const AppliancePanel = () => {
    const { currentRoom, rooms, selectedPlan, battery } = useSubsolar();

    const room = rooms[currentRoom];
    const appliances = room?.appliances ?? [];

    return (
        /*
            .right-panel
            background:rgba(255,255,255,0.95); border-left:1px solid #DDE4EB;
            display:flex; flex-direction:column; overflow-y:auto;
        */
        <div className="flex flex-col overflow-y-auto bg-white/[.95] border-l border-[#DDE4EB]">
            {/* ── 1. Battery ─────────────────────────────────── */}
            <BatterySection battery={battery} />

            {/* ── 2. Appliances ──────────────────────────────── */}
            {/*
                .appliances-section → padding:16px 20px; flex:1;
                .appliances-title   → 11px uppercase label, mb:12px
                .appliance-list     → flex col, gap:8px
            */}
            <div className="flex-1 px-5 py-4 border-b border-[#EFF3F6]">
                <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-[#94A3B8] mb-3">
                    ⚡ Electrodomésticos — {room?.label}
                </p>

                <div className="flex flex-col gap-2">
                    {appliances.map((appliance) => (
                        <ApplianceItem
                            key={appliance.id}
                            appliance={appliance}
                            roomId={currentRoom}
                        />
                    ))}
                </div>
            </div>

            {/* ── 3. Plan comparison ─────────────────────────── */}
            {/*
                .plan-section
                padding:16px 20px; background:#F8FAFB; border-top:1px solid #EFF3F6;
                .plan-title → 11px uppercase label, mb:10px
                .plan-cards → flex col, gap:6px, mb:12px
            */}
            <div className="px-5 py-4 bg-[#F8FAFB]">
                <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-[#94A3B8] mb-2.5">
                    📊 Comparar planes
                </p>

                <div className="flex flex-col gap-1.5 mb-3">
                    {Object.entries(PLANS_DATA).map(([key, plan]) => (
                        <PlanCard
                            key={key}
                            planKey={key}
                            plan={plan}
                            isSelected={selectedPlan === key}
                            hoursTag={battery.planHours[key]}
                        />
                    ))}
                </div>

                {/*
                    .btn-cta
                    width:100%; padding:14px; border:none; border-radius:12px;
                    background: linear-gradient(135deg, #2E86C1, #1A4F8A);
                    color:white; font-size:14px; font-weight:800; cursor:pointer;
                    font-family:'Nunito'; transition:all 0.2s;
                    :hover → transform:translateY(-1px); box-shadow:0 6px 20px rgba(37,99,171,0.4);
                */}
                <button
                    onClick={() =>
                        alert(
                            "¡Gracias! Un asesor de Subsolar se contactará contigo pronto.",
                        )
                    }
                    className="
                        w-full py-[14px] border-none rounded-[12px]
                        text-white text-[14px] font-extrabold font-nunito
                        cursor-pointer transition-all duration-200
                        hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(37,99,171,0.4)]
                    "
                    style={{
                        background: "linear-gradient(135deg, #2E86C1, #1A4F8A)",
                    }}
                >
                    Elegir este plan →
                </button>
            </div>
        </div>
    );
};

export default AppliancePanel;
