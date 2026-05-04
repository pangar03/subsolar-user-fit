import { createContext, useContext, useState, useCallback } from "react";

// ─────────────────────────────────────────────
// QUESTIONS DATA  (from original QUESTIONS[])
// ─────────────────────────────────────────────
export const QUESTIONS = [
    {
        label: "Paso 1 de 4",
        pct: 0,
        title: "¿Cuál es tu mayor preocupación con la energía en casa?",
        sub: "Elige la opción que mejor te represente",
        key: "pain",
        options: [
            { val: "factura",  icon: "💸", title: "Mi factura sube cada mes",       desc: "Me preocupa cuánto pago y quiero reducirlo" },
            { val: "apagones", icon: "🔦", title: "Los apagones me afectan mucho",  desc: "Cuando se va la luz, mi rutina se paraliza" },
            { val: "ambos",    icon: "⚡", title: "Las dos cosas me preocupan",     desc: "Quiero ahorrar y tener respaldo" },
        ],
    },
    {
        label: "Paso 2 de 4",
        pct: 33,
        title: "¿Cuánto pagas de factura eléctrica al mes?",
        sub: "Esto nos permite calcular tu ahorro real en pesos",
        key: "bill",
        options: [
            { val: "bajo",  icon: "📄", title: "Menos de $200,000",         desc: "Consumo moderado del hogar" },
            { val: "medio", icon: "📋", title: "Entre $200,000 y $500,000", desc: "Consumo típico de una familia" },
            { val: "alto",  icon: "📑", title: "Más de $500,000",           desc: "Alto consumo — AC, calefacción, etc." },
        ],
    },
    {
        label: "Paso 3 de 4",
        pct: 66,
        title: "Cuando se va la luz, ¿qué necesitas mantener encendido?",
        sub: "Piensa en lo que paraliza tu día si se apaga",
        key: "needs",
        options: [
            { val: "basico",  icon: "💡", title: "Luz, internet y cargadores",          desc: "Con eso aguanto el apagón tranquilo" },
            { val: "confort", icon: "❄️", title: "El aire acondicionado es clave",       desc: "Sin AC la casa se vuelve inhabitable" },
            { val: "todo",    icon: "🏠", title: "Quiero que todo siga funcionando",     desc: "Nevera, AC y electrodomésticos completos" },
        ],
    },
    {
        label: "Paso 4 de 4",
        pct: 100,
        title: "¿Qué priorizarías si tuvieras que elegir?",
        sub: "No hay respuesta incorrecta — es tu decisión",
        key: "prio",
        options: [
            { val: "ahorro",     icon: "💰", title: "Reducir mi factura lo más posible", desc: "Maximizar el ahorro mensual" },
            { val: "respaldo",   icon: "🔋", title: "Que mi casa no se quede sin luz",   desc: "Más horas de respaldo en apagones" },
            { val: "equilibrio", icon: "⚖️", title: "Un balance entre los dos",          desc: "Algo de ahorro y algo de respaldo" },
        ],
    },
];

// ─────────────────────────────────────────────
// RESULT DERIVATION  (mirrors showResult() logic)
// ─────────────────────────────────────────────

/**
 * Given the completed answers object, compute every piece of data
 * that the ResultCard needs to display. Returns null if answers are incomplete.
 *
 * @param {{ pain: string, bill: string, needs: string, prio: string }} answers
 * @returns {{
 *   profile:        'ahorrador' | 'resiliente',
 *   savings:        number,
 *   batteryH:       number,
 *   emoji:          string,
 *   badgeLabel:     string,
 *   title:          string,
 *   desc:           string,
 *   renunciaText:   string,
 *   initialPlan:    'basico' | 'medio' | 'premium',
 * } | null}
 */
export function deriveResult(answers) {
    const { pain, bill, needs, prio } = answers;
    if (!pain || !bill || !needs || !prio) return null;

    // Profile logic (verbatim from original)
    let profile = "ahorrador";
    if (pain === "apagones" || needs === "confort" || needs === "todo" || prio === "respaldo") {
        profile = "resiliente";
    }
    if (prio === "equilibrio" && (pain === "ambos" || pain === "factura")) {
        profile = "ahorrador";
    }

    const savings  = bill === "bajo" ? 80_000 : bill === "medio" ? 180_000 : 350_000;
    const batteryH = needs === "basico" ? 16 : needs === "confort" ? 8 : 5;

    const isResilient = profile === "resiliente";

    return {
        profile,
        savings,
        batteryH,
        emoji:      isResilient ? "⚡" : "💰",
        badgeLabel: isResilient ? "⚡ Perfil Resiliente" : "💰 Perfil Ahorrador",
        title:      isResilient
            ? "Tu hogar necesita continuidad"
            : "Tu prioridad es ahorrar",
        desc: isResilient
            ? "Los apagones son tu mayor dolor. El plan ideal para ti garantiza que tu AC, nevera e internet sigan funcionando sin importar qué pase con la red."
            : "Cada mes pagas de más en energía. El plan ideal para ti reduce tu factura desde el primer mes con el máximo retorno sobre la inversión.",
        renunciaText: isResilient
            ? "Al priorizar el respaldo sobre el ahorro, la reducción en tu factura mensual será menor. Tu batería protege tu hogar, no maximiza el retorno financiero."
            : "Al priorizar el ahorro, tendrás menos horas de batería disponibles en un apagón. En cortes largos, los aparatos de alto consumo como el AC no podrán funcionar todo el tiempo.",
        // Which simulator plan to pre-select (mirrors original pre-selection logic)
        initialPlan: isResilient ? "premium" : "medio",
    };
}

// ─────────────────────────────────────────────
// CONTEXT DEFINITION
// ─────────────────────────────────────────────

/**
 * @typedef {'quiz' | 'result' | 'simulator'} Screen
 */

const SubsolarContext = createContext(null);

/**
 * Wrap your entire app with this provider.
 *
 * Exposes:
 *   // Navigation
 *   screen          — current active screen
 *   goToResult()    — called after quiz completes
 *   goToSimulator() — called from result screen
 *   resetQuiz()     — go back to quiz, clearing all state
 *
 *   // Quiz state
 *   currentQ        — current question index (0-3)
 *   answers         — { pain?, bill?, needs?, prio? }
 *   selectAnswer(key, val)  — record an answer for the active question
 *   goNext()        — advance question or trigger result
 *   goBack()        — go to previous question
 *
 *   // Derived result (populated once quiz finishes)
 *   result          — return value of deriveResult(), or null
 */
export function SubsolarProvider({ children }) {
    const [screen,   setScreen]   = useState(/** @type {Screen} */ ("quiz"));
    const [currentQ, setCurrentQ] = useState(0);
    const [answers,  setAnswers]  = useState({});
    const [result,   setResult]   = useState(null);

    // ── record a single answer key/value ──────────────────
    const selectAnswer = useCallback((key, val) => {
        setAnswers((prev) => ({ ...prev, [key]: val }));
    }, []);

    // ── advance or finish ──────────────────────────────────
    const goNext = useCallback(() => {
        const q = QUESTIONS[currentQ];
        // Guard: don't advance without an answer for this question
        if (!answers[q.key]) return;

        if (currentQ < QUESTIONS.length - 1) {
            setCurrentQ((i) => i + 1);
        } else {
            // Last question answered — derive result and navigate
            const derived = deriveResult(answers);
            setResult(derived);
            setScreen("result");
        }
    }, [currentQ, answers]);

    // ── go back one question ───────────────────────────────
    const goBack = useCallback(() => {
        if (currentQ > 0) setCurrentQ((i) => i - 1);
    }, [currentQ]);

    // ── from result → simulator ────────────────────────────
    const goToSimulator = useCallback(() => {
        setScreen("simulator");
    }, []);

    // ── full reset ─────────────────────────────────────────
    const resetQuiz = useCallback(() => {
        setScreen("quiz");
        setCurrentQ(0);
        setAnswers({});
        setResult(null);
    }, []);

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
        // derived
        result,
    };

    return (
        <SubsolarContext.Provider value={value}>
            {children}
        </SubsolarContext.Provider>
    );
}

/**
 * Hook — use anywhere inside <SubsolarProvider>.
 * @returns {ReturnType<typeof SubsolarProvider> extends React.Provider<infer V> ? V : never}
 */
export function useSubsolar() {
    const ctx = useContext(SubsolarContext);
    if (!ctx) throw new Error("useSubsolar must be used inside <SubsolarProvider>");
    return ctx;
}
