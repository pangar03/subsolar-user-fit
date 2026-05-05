import {
    createContext,
    useContext,
    useState,
    useCallback,
    useMemo,
} from "react";

// ─────────────────────────────────────────────
// QUESTIONS DATA
// ─────────────────────────────────────────────
export const QUESTIONS = [
    {
        label: "Paso 1 de 4",
        pct: 0,
        title: "¿Cuál es tu mayor preocupación con la energía en casa?",
        sub: "Elige la opción que mejor te represente",
        key: "pain",
        options: [
            {
                val: "factura",
                icon: "💸",
                title: "Mi factura sube cada mes",
                desc: "Me preocupa cuánto pago y quiero reducirlo",
            },
            {
                val: "apagones",
                icon: "🔦",
                title: "Los apagones me afectan mucho",
                desc: "Cuando se va la luz, mi rutina se paraliza",
            },
            {
                val: "ambos",
                icon: "⚡",
                title: "Las dos cosas me preocupan",
                desc: "Quiero ahorrar y tener respaldo",
            },
        ],
    },
    {
        label: "Paso 2 de 4",
        pct: 33,
        title: "¿Cuánto pagas de factura eléctrica al mes?",
        sub: "Esto nos permite calcular tu ahorro real en pesos",
        key: "bill",
        options: [
            {
                val: "bajo",
                icon: "📄",
                title: "Menos de $200,000",
                desc: "Consumo moderado del hogar",
            },
            {
                val: "medio",
                icon: "📋",
                title: "Entre $200,000 y $500,000",
                desc: "Consumo típico de una familia",
            },
            {
                val: "alto",
                icon: "📑",
                title: "Más de $500,000",
                desc: "Alto consumo — AC, calefacción, etc.",
            },
        ],
    },
    {
        label: "Paso 3 de 4",
        pct: 66,
        title: "Cuando se va la luz, ¿qué necesitas mantener encendido?",
        sub: "Piensa en lo que paraliza tu día si se apaga",
        key: "needs",
        options: [
            {
                val: "basico",
                icon: "💡",
                title: "Luz, internet y cargadores",
                desc: "Con eso aguanto el apagón tranquilo",
            },
            {
                val: "confort",
                icon: "❄️",
                title: "El aire acondicionado es clave",
                desc: "Sin AC la casa se vuelve inhabitable",
            },
            {
                val: "todo",
                icon: "🏠",
                title: "Quiero que todo siga funcionando",
                desc: "Nevera, AC y electrodomésticos completos",
            },
        ],
    },
    {
        label: "Paso 4 de 4",
        pct: 100,
        title: "¿Qué priorizarías si tuvieras que elegir?",
        sub: "No hay respuesta incorrecta — es tu decisión",
        key: "prio",
        options: [
            {
                val: "ahorro",
                icon: "💰",
                title: "Reducir mi factura lo más posible",
                desc: "Maximizar el ahorro mensual",
            },
            {
                val: "respaldo",
                icon: "🔋",
                title: "Que mi casa no se quede sin luz",
                desc: "Más horas de respaldo en apagones",
            },
            {
                val: "equilibrio",
                icon: "⚖️",
                title: "Un balance entre los dos",
                desc: "Algo de ahorro y algo de respaldo",
            },
        ],
    },
];

// ─────────────────────────────────────────────
// SIMULATOR STATIC DATA
// ─────────────────────────────────────────────

/**
 * Room definitions. These are treated as constants — never mutated directly.
 * Mutable simulator state is a deep clone produced by buildInitialSimState().
 */
export const ROOMS_DATA = {
    sala: {
        label: "Sala de estar",
        emoji: "🛋️",
        appliances: [
            {
                id: "tv",
                name: 'Televisor 55"',
                watts: 150,
                emoji: "📺",
                on: false,
            },
            {
                id: "ac_sala",
                name: "Aire Acondicionado",
                watts: 1500,
                emoji: "❄️",
                on: false,
            },
            {
                id: "luces_sala",
                name: "Luces LED (x6)",
                watts: 48,
                emoji: "💡",
                on: true,
            },
            {
                id: "router",
                name: "Router WiFi",
                watts: 12,
                emoji: "📡",
                on: true,
            },
            {
                id: "parlante",
                name: "Parlante / Sonido",
                watts: 30,
                emoji: "🔊",
                on: false,
            },
        ],
    },
    cocina: {
        label: "Cocina",
        emoji: "🍳",
        appliances: [
            {
                id: "nevera",
                name: "Nevera / Refrigerador",
                watts: 180,
                emoji: "🧊",
                on: true,
            },
            {
                id: "microondas",
                name: "Microondas",
                watts: 1200,
                emoji: "📦",
                on: false,
            },
            {
                id: "cafetera",
                name: "Cafetera",
                watts: 900,
                emoji: "☕",
                on: false,
            },
            {
                id: "luces_cocina",
                name: "Luces LED (x4)",
                watts: 32,
                emoji: "💡",
                on: true,
            },
            {
                id: "extractor",
                name: "Extractor de olores",
                watts: 60,
                emoji: "🌀",
                on: false,
            },
        ],
    },
    habitacion: {
        label: "Habitación principal",
        emoji: "🛏️",
        appliances: [
            {
                id: "ac_hab",
                name: "Aire Acondicionado",
                watts: 1500,
                emoji: "❄️",
                on: false,
            },
            {
                id: "luces_hab",
                name: "Luces LED (x4)",
                watts: 32,
                emoji: "💡",
                on: true,
            },
            {
                id: "laptop",
                name: "Laptop / PC",
                watts: 65,
                emoji: "💻",
                on: false,
            },
            {
                id: "cargadores",
                name: "Cargadores (x3)",
                watts: 45,
                emoji: "🔌",
                on: true,
            },
            {
                id: "ventilador",
                name: "Ventilador",
                watts: 60,
                emoji: "🌀",
                on: false,
            },
        ],
    },
    bano: {
        label: "Baño",
        emoji: "🚿",
        appliances: [
            {
                id: "calentador",
                name: "Calentador de agua",
                watts: 1500,
                emoji: "🚿",
                on: false,
            },
            {
                id: "luces_bano",
                name: "Luces LED (x2)",
                watts: 16,
                emoji: "💡",
                on: true,
            },
            {
                id: "secador",
                name: "Secador de cabello",
                watts: 1800,
                emoji: "💨",
                on: false,
            },
        ],
    },
    garaje: {
        label: "Garaje",
        emoji: "🚗",
        appliances: [
            {
                id: "carro_electrico",
                name: "Carro Eléctrico",
                watts: 7200,
                emoji: "🚗",
                on: false,
            },
            {
                id: "luces_garaje",
                name: "Luces Garaje",
                watts: 24,
                emoji: "💡",
                on: true,
            },
            {
                id: "porton",
                name: "Motor Portón",
                watts: 200,
                emoji: "🚪",
                on: false,
            },
            {
                id: "herramientas",
                name: "Herramientas eléctricas",
                watts: 500,
                emoji: "🔧",
                on: false,
            },
        ],
    },
};

/** Plan battery capacities. dotColor is used by the plan selector UI. */
export const PLANS_DATA = {
    basico: { name: "Plan Básico", wh: 5000, dotColor: "#2E86C1" },
    medio: { name: "Plan Equilibrio", wh: 10000, dotColor: "#1ABC9C" },
    premium: { name: "Plan Respaldo Total", wh: 20000, dotColor: "#F39C12" },
};

// Appliance IDs that are ON in the default / reset state (mirrors original goQuiz() reset)
const DEFAULT_ON_IDS = new Set([
    "luces_sala",
    "router",
    "luces_cocina",
    "nevera",
    "luces_hab",
    "cargadores",
    "luces_bano",
    "luces_garaje",
]);

/**
 * Build a fresh deep-cloned rooms state, optionally pre-activating
 * appliances that match the user's profile (mirrors original showResult() logic).
 */
function buildInitialSimState(profile = null, initialPlan = "medio") {
    const rooms = Object.fromEntries(
        Object.entries(ROOMS_DATA).map(([key, room]) => [
            key,
            {
                ...room,
                appliances: room.appliances.map((a) => ({
                    ...a,
                    on: DEFAULT_ON_IDS.has(a.id),
                })),
            },
        ]),
    );

    if (profile === "resiliente") {
        rooms.sala.appliances.find((a) => a.id === "ac_sala").on = true;
        rooms.habitacion.appliances.find((a) => a.id === "ac_hab").on = true;
        rooms.habitacion.appliances.find((a) => a.id === "laptop").on = true;
        rooms.cocina.appliances.find((a) => a.id === "nevera").on = true;
    } else {
        rooms.sala.appliances.find((a) => a.id === "tv").on = true;
        rooms.sala.appliances.find((a) => a.id === "router").on = true;
    }

    return { rooms, selectedPlan: initialPlan };
}

// ─────────────────────────────────────────────
// RESULT DERIVATION
// ─────────────────────────────────────────────
export function deriveResult(answers) {
    const { pain, bill, needs, prio } = answers;
    if (!pain || !bill || !needs || !prio) return null;

    let profile = "ahorrador";
    if (
        pain === "apagones" ||
        needs === "confort" ||
        needs === "todo" ||
        prio === "respaldo"
    ) {
        profile = "resiliente";
    }
    if (prio === "equilibrio" && (pain === "ambos" || pain === "factura")) {
        profile = "ahorrador";
    }

    const savings =
        bill === "bajo" ? 80_000 : bill === "medio" ? 180_000 : 350_000;
    const batteryH = needs === "basico" ? 16 : needs === "confort" ? 8 : 5;
    const isResilient = profile === "resiliente";

    return {
        profile,
        savings,
        batteryH,
        emoji: isResilient ? "⚡" : "💰",
        badgeLabel: isResilient
            ? "⚡ Perfil Resiliente"
            : "💰 Perfil Ahorrador",
        title: isResilient
            ? "Tu hogar necesita continuidad"
            : "Tu prioridad es ahorrar",
        desc: isResilient
            ? "Los apagones son tu mayor dolor. El plan ideal para ti garantiza que tu AC, nevera e internet sigan funcionando sin importar qué pase con la red."
            : "Cada mes pagas de más en energía. El plan ideal para ti reduce tu factura desde el primer mes con el máximo retorno sobre la inversión.",
        renunciaText: isResilient
            ? "Al priorizar el respaldo sobre el ahorro, la reducción en tu factura mensual será menor. Tu batería protege tu hogar, no maximiza el retorno financiero."
            : "Al priorizar el ahorro, tendrás menos horas de batería disponibles en un apagón. En cortes largos, los aparatos de alto consumo como el AC no podrán funcionar todo el tiempo.",
        initialPlan: isResilient ? "premium" : "medio",
    };
}

// ─────────────────────────────────────────────
// CONTEXT + PROVIDER
// ─────────────────────────────────────────────
const SubsolarContext = createContext(null);

export function SubsolarProvider({ children }) {
    // ── Quiz ──────────────────────────────────────────────────
    const [screen, setScreen] = useState("quiz");
    const [currentQ, setCurrentQ] = useState(0);
    const [answers, setAnswers] = useState({});
    const [result, setResult] = useState(null);

    // ── Simulator ─────────────────────────────────────────────
    const [currentRoom, setCurrentRoom] = useState("sala");
    const [rooms, setRooms] = useState(() => buildInitialSimState().rooms);
    const [selectedPlan, setSelectedPlan] = useState("medio");

    // ── Quiz actions ──────────────────────────────────────────
    const selectAnswer = useCallback((key, val) => {
        setAnswers((prev) => ({ ...prev, [key]: val }));
    }, []);

    const goNext = useCallback(() => {
        const q = QUESTIONS[currentQ];
        if (!answers[q.key]) return;
        if (currentQ < QUESTIONS.length - 1) {
            setCurrentQ((i) => i + 1);
        } else {
            const derived = deriveResult(answers);
            setResult(derived);
            setScreen("result");
        }
    }, [currentQ, answers]);

    const goBack = useCallback(() => {
        if (currentQ > 0) setCurrentQ((i) => i - 1);
    }, [currentQ]);

    // ── Navigation ────────────────────────────────────────────
    const goToSimulator = useCallback(() => {
        if (result) {
            const { rooms: freshRooms, selectedPlan: freshPlan } =
                buildInitialSimState(result.profile, result.initialPlan);
            setRooms(freshRooms);
            setSelectedPlan(freshPlan);
        }
        setCurrentRoom("sala");
        setScreen("simulator");
    }, [result]);

    const resetQuiz = useCallback(() => {
        setScreen("quiz");
        setCurrentQ(0);
        setAnswers({});
        setResult(null);
        const { rooms: freshRooms } = buildInitialSimState();
        setRooms(freshRooms);
        setSelectedPlan("medio");
        setCurrentRoom("sala");
    }, []);

    // ── Simulator actions ─────────────────────────────────────
    const selectRoom = useCallback((roomId) => {
        setCurrentRoom(roomId);
    }, []);

    const toggleAppliance = useCallback((roomId, applianceId) => {
        setRooms((prev) => ({
            ...prev,
            [roomId]: {
                ...prev[roomId],
                appliances: prev[roomId].appliances.map((a) =>
                    a.id === applianceId ? { ...a, on: !a.on } : a,
                ),
            },
        }));
    }, []);

    const selectPlan = useCallback((planKey) => {
        setSelectedPlan(planKey);
    }, []);

    // ── Derived: battery (memoised) ───────────────────────────
    const battery = useMemo(() => {
        const totalW = Object.values(rooms).reduce(
            (total, room) =>
                total +
                room.appliances
                    .filter((a) => a.on)
                    .reduce((s, a) => s + a.watts, 0),
            0,
        );
        const planWh = PLANS_DATA[selectedPlan].wh;
        const hoursRaw = totalW > 0 ? planWh / totalW : 99;
        const hoursDisplay = Math.min(hoursRaw, 99);
        const pct = Math.min(100, Math.round((hoursDisplay / 24) * 100));
        const color = pct > 60 ? "#1ABC9C" : pct > 30 ? "#F39C12" : "#E74C3C";

        const planHours = Object.fromEntries(
            Object.entries(PLANS_DATA).map(([key, plan]) => {
                const h = totalW > 0 ? Math.min(plan.wh / totalW, 99) : 99;
                return [key, h >= 99 ? "99+" : h.toFixed(1)];
            }),
        );

        return {
            totalW,
            pct,
            color,
            hoursDisplay: hoursDisplay >= 99 ? "99+" : hoursDisplay.toFixed(1),
            hoursLabel:
                totalW > 0
                    ? `en apagón (${totalW}W activos)`
                    : "sin consumo activo",
            planHours,
        };
    }, [rooms, selectedPlan]);

    // ── Derived: active appliance count per room ──────────────
    const roomCounts = useMemo(
        () =>
            Object.fromEntries(
                Object.entries(rooms).map(([key, room]) => [
                    key,
                    room.appliances.filter((a) => a.on).length,
                ]),
            ),
        [rooms],
    );

    // ─────────────────────────────────────────────────────────
    const value = {
        // navigation
        screen,
        goToSimulator,
        resetQuiz,
        // quiz
        currentQ,
        answers,
        selectAnswer,
        goNext,
        goBack,
        // result
        result,
        // simulator
        currentRoom,
        rooms,
        selectedPlan,
        battery,
        roomCounts,
        selectRoom,
        toggleAppliance,
        selectPlan,
    };

    return (
        <SubsolarContext.Provider value={value}>
            {children}
        </SubsolarContext.Provider>
    );
}

export function useSubsolar() {
    const ctx = useContext(SubsolarContext);
    if (!ctx)
        throw new Error("useSubsolar must be used inside <SubsolarProvider>");
    return ctx;
}
