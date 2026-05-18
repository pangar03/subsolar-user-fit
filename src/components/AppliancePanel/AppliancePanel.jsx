import { useSubsolar, PLANS_DATA } from "../../contexts/SubsolarContext";

// ─────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────

/**
 * BatterySection — Redesigned as the visual hero of the simulator
 *
 * Now includes:
 * - Eyebrow label with icon
 * - Compact percentage and hours display
 * - Plan selector grid (3 plans)
 * - Full-width primary CTA button
 * - Supporting copy text
 */
const BatterySection = ({ battery, selectedPlan, selectPlan }) => {
    const pct = battery.pct;
    const color = battery.color;

    return (
        <div className="px-5 py-2 border-b border-[#EFF3F6]">
            {/* Eyebrow label */}
            <div className="eyebrow mb-1.5 w-fit">
                ☀️ Tarifa fija mensual · Sin inversión inicial
            </div>

            {/* Section heading — balanced header */}
            <h2 className="!text-[24px] !font-black text-[#163042] mb-2 leading-tight">
                Estado de tu batería
            </h2>
            <p className="text-[16px] text-[#617789] mb-3 leading-relaxed">
                Con este consumo, tu batería cubre aproximadamente{" "}
                {battery.hoursDisplay} horas de respaldo
            </p>

            {/* Battery display — ultra compact */}
            <div className="flex items-end gap-1.5 mb-2">
                {/* Battery icon — much smaller */}
                <div className="shrink-0 w-8 h-8">
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
                        {/* Dynamic fill bar */}
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
                    </svg>
                </div>

                {/* Percentage display — smaller */}
                <div>
                    <p className="text-xl font-black text-[#163042] leading-none">
                        {pct}%
                    </p>
                    <span className="block text-[14px] text-[#617789] font-medium mt-0.5">
                        disponible
                    </span>
                </div>
            </div>

            {/* Progress bar */}
            <div className="mb-2">
                <div className="h-2 bg-[#EFF3F6] rounded-full overflow-hidden">
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
            </div>

            {/* Hours of backup — ultra compact */}
            <div className="flex justify-between items-end mb-2">
                <div>
                    <span className="text-lg font-black text-[#163042] leading-none">
                        {battery.hoursDisplay}
                    </span>
                    <span className="block text-[14px] text-[#617789] font-medium mt-0.5">
                        horas respaldo
                    </span>
                </div>
                <p className="text-[14px] text-[#617789] text-right font-medium">
                    {battery.hoursLabel}
                </p>
            </div>

            {/* Plan Selector Grid — micro compact */}
            <div className="mb-3">
                <p className="text-[14px] font-bold tracking-[0.15em] uppercase text-[#617789] mb-1">
                    Elige tu plan
                </p>
                <div className="grid grid-cols-3 gap-1">
                    {Object.entries(PLANS_DATA).map(([key, plan]) => {
                        // Extract abbreviated plan names: Básico, Equilibrio, Respaldo Total
                        const planNames = {
                            basico: "Básico",
                            equilibrio: "Equilibrio",
                            respaldo: "Respaldo",
                        };
                        const planName = planNames[key] || plan.name;

                        return (
                            <button
                                key={key}
                                onClick={() => selectPlan(key)}
                                className={`
                                    px-1.5 py-1 rounded-[6px] text-center
                                    border transition-all duration-200
                                    font-bold
                                    ${
                                        selectedPlan === key
                                            ? "border-[#13a76b] bg-gradient-to-br from-[#e9fbf3] to-white shadow-[0_2px_6px_rgba(19,167,107,0.12)]"
                                            : "border-[rgba(29,143,227,0.12)] bg-white hover:border-[#1d8fe3]"
                                    }
                                `}
                            >
                                <div className="font-black text-[14px] text-[#163042] leading-tight">
                                    {planName}
                                </div>
                                <div className="text-[14px] text-[#1d8fe3] font-bold">
                                    {battery.planHours[key]}h
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Primary CTA Button — full-width */}
            <button
                onClick={() =>
                    alert(
                        "¡Gracias! Un asesor de GdO Solar se contactará contigo pronto.",
                    )
                }
                className="btn btn-primary btn-full py-1.5 animated-in text-sm font-bold"
            >
                Quiero este plan
            </button>

            {/* Supporting copy under CTA */}
            <p className="text-[14px] text-[#617789] mb-0 font-medium mt-1">
                Un asesor te contactará para confirmar
            </p>
        </div>
    );
};

// ─────────────────────────────────────────────

/**
 * ApplianceItem — Redesigned appliance card with better state visibility
 */
const ApplianceItem = ({ appliance, roomId }) => {
    const { toggleAppliance } = useSubsolar();
    const isOn = appliance.on;

    return (
        <button
            onClick={() => toggleAppliance(roomId, appliance.id)}
            className={`
                device-card
                flex items-center gap-[14px]
                px-4 py-3
                border-2
                w-full text-left
                cursor-pointer
                transition-all duration-200
                animated-in
                ${
                    isOn
                        ? "border-[#13a76b] bg-gradient-to-br from-[#e9fbf3] to-white"
                        : "border-[rgba(29,143,227,0.12)] bg-white"
                }
            `}
        >
            {/* Device emoji */}
            <span className="text-[24px] w-7 text-center shrink-0">
                {appliance.emoji}
            </span>

            {/* Device info */}
            <div className="flex-1 min-w-0">
                <span className="block text-[14px] font-bold text-[#163042] truncate">
                    {appliance.name}
                </span>
                <span className="block text-[12px] text-[#617789] font-medium mt-0.5">
                    {appliance.watts}W
                </span>
            </div>

            {/* Toggle switch */}
            <div
                className={`
                    relative shrink-0 w-[24px] h-[16px] rounded-full
                    transition-colors duration-200
                    ${isOn ? "bg-[#13a76b]" : "bg-[#DDE4EB]"}
                `}
            >
                <div
                    className={`
                        absolute top-[3px] w-[12px] h-[12px] rounded-full bg-white
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
 * PlanCard — Redesigned plan selector with better contrast
 */
const PlanCard = ({ planKey, plan, isSelected, hoursTag }) => {
    const { selectPlan } = useSubsolar();

    return (
        <button
            onClick={() => selectPlan(planKey)}
            className={`
                flex items-center gap-[12px]
                px-4 py-3 rounded-[14px]
                border-2 w-full text-left
                cursor-pointer
                transition-all duration-200
                ${
                    isSelected
                        ? "border-[#13a76b] bg-gradient-to-r from-[#e9fbf3] to-white shadow-[0_4px_12px_rgba(19,167,107,0.2)]"
                        : "border-[rgba(29,143,227,0.12)] bg-white hover:border-[#1d8fe3]"
                }
            `}
        >
            {/* Plan indicator dot */}
            <div
                className="w-[12px] h-[12px] rounded-full shrink-0"
                style={{ background: plan.dotColor }}
            />

            {/* Plan name */}
            <span className="flex-1 text-[13px] font-bold text-[#163042] text-left">
                {plan.name}
            </span>

            {/* Hours tag */}
            <span className="text-[11px] font-bold text-white bg-[#1d8fe3] px-2.5 py-1 rounded-full shrink-0">
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
 * Right panel of the Simulator showing:
 *   1. Battery status (hero element with CTA)
 *   2. Room appliances (toggleable list)
 *   3. Plan comparison (selector with CTAs)
 */
const AppliancePanel = () => {
    const { currentRoom, rooms, selectedPlan, selectPlan, battery } =
        useSubsolar();

    const room = rooms[currentRoom];
    const appliances = room?.appliances ?? [];

    return (
        <div className="flex flex-col overflow-y-auto bg-white/[0.95] border-l border-[#DDE4EB]">
            {/* ── 1. Battery (Hero) with Plan Selector ──────────── */}
            <BatterySection
                battery={battery}
                selectedPlan={selectedPlan}
                selectPlan={selectPlan}
            />

            {/* ── 2. Appliances ──────────────────────────────── */}
            <div className="flex-1 px-5 py-5 border-b border-[#EFF3F6]">
                <div className="eyebrow mb-4 w-fit">⚡ Electrodomésticos</div>

                <h3 className="text-[16px] font-bold text-[#163042] mb-4">
                    {room?.label || "Habitación"}
                </h3>

                <div className="flex flex-col gap-2.5">
                    {appliances.map((appliance) => (
                        <ApplianceItem
                            key={appliance.id}
                            appliance={appliance}
                            roomId={currentRoom}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AppliancePanel;
