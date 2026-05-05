import { useSubsolar, QUESTIONS } from "../../contexts/SubsolarContext";
import QuizOption from "../QuizOption/QuizOption";

/**
 * QuizCard
 *
 * Reads quiz state from SubsolarContext and renders:
 *   - Logo header
 *   - Progress bar (step label + percentage + fill bar)
 *   - Current question (label, title, subtitle, options)
 *   - Back / Next navigation buttons
 *
 * All logic (selectAnswer, goNext, goBack) lives in context —
 * this component only reads state and calls actions.
 */
const QuizCard = () => {
    const { currentQ, answers, selectAnswer, goNext, goBack } = useSubsolar();

    const question = QUESTIONS[currentQ];

    // ── Progress values ──────────────────────────────────────
    // Original: Math.round((idx / 4) * 100)  — 0 % on Q0, 25 % on Q1, etc.
    const progressPct = Math.round((currentQ / QUESTIONS.length) * 100);

    // Whether the current question has been answered
    const hasAnswer = Boolean(answers[question.key]);

    // Last question label changes the "Next" button text (verbatim from original)
    const isLastQuestion = currentQ === QUESTIONS.length - 1;

    return (
        <>
            {/*
                Pseudo-elements (::before / ::after) for the decorative blobs
                cannot be expressed as Tailwind utilities, so they live here.
                In a real project, swap these for two absolute <div> decorators.
            */}
            <style>{`
                .quiz-screen-bg::before {
                    content: '';
                    position: absolute;
                    width: 600px; height: 600px;
                    border-radius: 50%;
                    background: rgba(91,184,245,0.08);
                    top: -200px; right: -200px;
                    pointer-events: none;
                }
                .quiz-screen-bg::after {
                    content: '';
                    position: absolute;
                    width: 400px; height: 400px;
                    border-radius: 50%;
                    background: rgba(26,188,156,0.07);
                    bottom: -150px; left: -100px;
                    pointer-events: none;
                }
            `}</style>

            {/*
                #quiz-screen
                background: linear-gradient(160deg, #1A2942 0%, #2563AB 50%, #1A6BAA 100%);
                display:flex; flex-direction:column; align-items:center;
                justify-content:center; min-height:100vh;
                padding:20px; position:relative; overflow:hidden;
            */}
            <div
                className="quiz-screen-bg flex flex-col items-center justify-center min-h-screen p-5 relative overflow-hidden"
                style={{
                    background:
                        "linear-gradient(160deg, #1A2942 0%, #2563AB 50%, #1A6BAA 100%)",
                }}
            >
                {/*
                    .quiz-card
                    background: rgba(255,255,255,0.97); border-radius:32px;
                    padding:40px; max-width:560px; width:100%;
                    box-shadow: 0 8px 40px rgba(0,0,0,0.16), 0 0 0 1px rgba(255,255,255,0.2);
                    position:relative; z-index:1;
                */}
                <div
                    className="bg-white/[.97] rounded-[32px] p-10 w-full max-w-[560px] relative z-10"
                    style={{
                        boxShadow:
                            "0 8px 40px rgba(0,0,0,0.16), 0 0 0 1px rgba(255,255,255,0.2)",
                    }}
                >
                    {/* ── Logo ─────────────────────────────────────────────
                        .quiz-logo: display:flex; align-items:center; gap:8px; margin-bottom:28px;
                    */}
                    <div className="flex items-center gap-2 mb-7">
                        {/*
                            .quiz-logo-icon
                            width:36px; height:36px; border-radius:10px;
                            background: linear-gradient(135deg, #5BB8F5, #2E86C1);
                            display:flex; align-items:center; justify-content:center; font-size:18px;
                        */}
                        <div
                            className="w-9 h-9 rounded-[10px] flex items-center justify-center text-[18px] shrink-0"
                            style={{
                                background:
                                    "linear-gradient(135deg, #5BB8F5, #2E86C1)",
                            }}
                        >
                            ☀️
                        </div>

                        <div>
                            {/* .quiz-logo-text: font-family:'Nunito'; font-weight:900; font-size:20px; color:#1A2942; letter-spacing:-0.5px; */}
                            <span className="font-nunito font-black text-[20px] text-[#1A2942] tracking-[-0.5px]">
                                Subsolar
                            </span>
                            {/* .quiz-logo-sub: font-size:11px; color:#94A3B8; font-weight:500; margin-top:-2px; display:block; */}
                            <span className="block text-[11px] text-[#94A3B8] font-medium -mt-0.5">
                                Una empresa GdO · PROMIGAS
                            </span>
                        </div>
                    </div>

                    {/* ── Progress bar ──────────────────────────────────────
                        .progress-wrap: margin-bottom:28px;
                    */}
                    <div className="mb-7">
                        {/*
                            .progress-labels
                            display:flex; justify-content:space-between;
                            font-size:12px; color:#94A3B8; margin-bottom:8px; font-weight:600;
                        */}
                        <div className="flex justify-between text-[12px] text-[#94A3B8] font-semibold mb-2">
                            <span>{question.label}</span>
                            <span>{progressPct}%</span>
                        </div>

                        {/*
                            .progress-track
                            height:6px; background:#EFF3F6; border-radius:99px; overflow:hidden;
                        */}
                        <div className="h-[6px] bg-[#EFF3F6] rounded-full overflow-hidden">
                            {/*
                                .progress-fill
                                height:100%; border-radius:99px;
                                background: linear-gradient(90deg, #5BB8F5, #1ABC9C);
                                transition: width 0.5s cubic-bezier(.4,0,.2,1);
                            */}
                            <div
                                className="h-full rounded-full"
                                style={{
                                    width: `${progressPct}%`,
                                    background:
                                        "linear-gradient(90deg, #5BB8F5, #1ABC9C)",
                                    transition:
                                        "width 0.5s cubic-bezier(.4,0,.2,1)",
                                }}
                            />
                        </div>
                    </div>

                    {/* ── Question ──────────────────────────────────────────*/}
                    <div>
                        {/*
                            .q-label
                            font-size:11px; font-weight:700; letter-spacing:0.1em;
                            color:#2E86C1; text-transform:uppercase; margin-bottom:8px;
                        */}
                        <p className="text-[11px] font-bold tracking-[0.1em] text-[#2E86C1] uppercase mb-2">
                            {question.label}
                        </p>

                        {/*
                            .q-title
                            font-family:'Nunito'; font-size:22px; font-weight:800;
                            color:#1A2942; line-height:1.3; margin-bottom:6px;
                        */}
                        <h2 className="font-nunito text-[22px] font-extrabold text-[#1A2942] leading-[1.3] mb-1.5">
                            {question.title}
                        </h2>

                        {/*
                            .q-sub
                            font-size:14px; color:#94A3B8; margin-bottom:24px; line-height:1.5;
                        */}
                        <p className="text-[14px] text-[#94A3B8] mb-6 leading-[1.5]">
                            {question.sub}
                        </p>

                        {/*
                            .options-grid
                            display:flex; flex-direction:column; gap:10px; margin-bottom:28px;
                        */}
                        <div className="flex flex-col gap-[10px] mb-7">
                            {question.options.map((opt) => (
                                <QuizOption
                                    key={opt.val}
                                    icon={opt.icon}
                                    title={opt.title}
                                    description={opt.desc}
                                    isSelected={
                                        answers[question.key] === opt.val
                                    }
                                    onClick={() =>
                                        selectAnswer(question.key, opt.val)
                                    }
                                />
                            ))}
                        </div>
                    </div>

                    {/* ── Navigation ────────────────────────────────────────
                        .quiz-nav: display:flex; gap:12px; align-items:center;
                    */}
                    <div className="flex gap-3 items-center">
                        {/* Back button — hidden on first question
                            .btn-back:
                            padding:12px 20px; border:2px solid #DDE4EB; border-radius:12px;
                            background:transparent; font-size:14px; font-weight:600; color:#4A5568;
                            cursor:pointer; transition:all 0.2s;
                            :hover → border-color:#94A3B8; color:#1A2942;
                        */}
                        {currentQ > 0 && (
                            <button
                                onClick={goBack}
                                className="
                                    px-5 py-3
                                    border-2 border-[#DDE4EB] rounded-[12px]
                                    bg-transparent
                                    text-[14px] font-semibold text-[#4A5568]
                                    cursor-pointer font-jakarta
                                    transition-all duration-200
                                    hover:border-[#94A3B8] hover:text-[#1A2942]
                                "
                            >
                                ← Atrás
                            </button>
                        )}

                        {/* Next button
                            .btn-next (disabled):
                            flex:1; padding:14px 24px; border:none; border-radius:12px;
                            background: linear-gradient(135deg, #2E86C1, #1A4F8A);
                            color:white; font-size:15px; font-weight:700;
                            opacity:0.4; pointer-events:none; transition:all 0.2s;
                            .btn-next.ready (enabled):
                            opacity:1; pointer-events:all;
                            :hover → transform:translateY(-2px); box-shadow:0 6px 20px rgba(37,99,171,0.4);
                            :active → transform:translateY(0);
                        */}
                        <button
                            onClick={goNext}
                            disabled={!hasAnswer}
                            className={`
                                flex-1 px-6 py-[14px]
                                border-none rounded-[12px]
                                text-white text-[15px] font-bold font-jakarta
                                transition-all duration-200
                                ${
                                    hasAnswer
                                        ? "opacity-100 cursor-pointer hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(37,99,171,0.4)] active:translate-y-0"
                                        : "opacity-40 cursor-not-allowed"
                                }
                            `}
                            style={{
                                background:
                                    "linear-gradient(135deg, #2E86C1, #1A4F8A)",
                            }}
                        >
                            {isLastQuestion ? "Ver mi perfil →" : "Siguiente →"}
                        </button>
                    </div>
                    {/* /Navigation */}
                </div>
                {/* /quiz-card */}
            </div>
            {/* /quiz-screen */}
        </>
    );
};

export default QuizCard;
