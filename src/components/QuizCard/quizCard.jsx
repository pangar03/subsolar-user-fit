import QuizOption from "../QuizOption/quizOption";

const QuizCard = () => {
    return (
        <>
            <style>
                {`
                    /* Keyframe for result-emoji pop animation — not expressible in Tailwind */
                    @keyframes pop {
                        from { transform: scale(0.3); opacity: 0; }
                        to   { transform: scale(1);   opacity: 1; }
                    }
                    .animate-pop { animation: pop 0.6s cubic-bezier(.4,0,.2,1); }
                    
                    /* Progress fill transition — Tailwind's transition-all covers this but explicit for clarity */
                    .progress-fill-transition { transition: width 0.5s cubic-bezier(.4,0,.2,1); }
                    
                    /*
                        NOTE: The pseudo-elements (::before / ::after) on #quiz-screen cannot be
                        expressed as Tailwind utility classNamees. They are kept here as plain CSS.
                        In a real React project you'd handle these with a wrapper <div> or a
                        Tailwind arbitrary-value bg decoration div.
                    */
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
                `}
            </style>
            <div
                id="quiz-screen"
                className="quiz-screen-bg flex flex-col items-center justify-center min-h-screen p-5 relative overflow-hidden bg-[linear-gradient(160deg,_#1A2942_0%,_#2563AB_50%,_#1A6BAA_100%)]"
            >
                {/* <!--
                .quiz-card
                Original CSS:
                background: rgba(255,255,255,0.97); border-radius: 32px (--r-xl);
                padding: 40px; max-width: 560px; width: 100%;
                box-shadow: 0 8px 40px rgba(0,0,0,0.16), 0 0 0 1px rgba(255,255,255,0.2);
                position: relative; z-index: 1;
                --> */}
                <div className="bg-white/[.97] rounded-[32px] p-10 w-full max-w-[560px] relative z-10 shadow-[0_8px_40px_rgba(0,0,0,0.16),_0_0_0_1px_rgba(255,255,255,0.2)]">
                    {/* <!-- ── Logo ── -->
                    <!--
                    .quiz-logo
                    display:flex; align-items:center; gap:8px; margin-bottom:28px;
                    --> */}
                    <div className="flex items-center gap-2 mb-7">
                        {/* <!--
                        .quiz-logo-icon
                        width:36px; height:36px;
                        background: linear-gradient(135deg, #5BB8F5, #2E86C1);
                        border-radius:10px; display:flex; align-items:center; justify-content:center;
                        font-size:18px;
                        --> */}
                        <div className="w-9 h-9 rounded-[10px] flex items-center justify-center text-[18px] shrink-0 bg-[linear-gradient(135deg, #5BB8F5, #2E86C1)]">
                            ☀️
                        </div>

                        <div>
                            {/* <!--
                            .quiz-logo-text
                            font-family:'Nunito'; font-weight:900; font-size:20px;
                            color:#1A2942; letter-spacing:-0.5px;
                            --> */}
                            <span className="font-nunito font-black text-[20px] text-navy tracking-[-0.5px]">
                                Subsolar
                            </span>
                            {/* <!--
                            .quiz-logo-sub
                            font-size:11px; color:#94A3B8; font-weight:500;
                            margin-top:-2px; display:block;
                            --> */}
                            <span className="block text-[11px] text-[#94A3B8] font-medium -mt-0.5">
                                Una empresa GdO · PROMIGAS
                            </span>
                        </div>
                    </div>
                    {/* <!-- /Logo --> */}

                    {/* <!-- ── Progress ── -->
                    <!--
                    .progress-wrap
                    margin-bottom:28px;
                    --> */}
                    <div className="mb-7">
                        {/* <!--
                        .progress-labels
                        display:flex; justify-content:space-between;
                        font-size:12px; color:#94A3B8; margin-bottom:8px; font-weight:600;
                        -->*/}
                        <div className="flex justify-between text-[12px] text-[#94A3B8] font-semibold mb-2">
                            <span id="step-label">Paso 1 de 4</span>
                            <span id="step-pct">0%</span>
                        </div>

                        {/* <!--
                        .progress-track
                        height:6px; background:#EFF3F6; border-radius:99px; overflow:hidden;
                        --> */}
                        <div className="h-[6px] bg-[#EFF3F6] rounded-full overflow-hidden">
                            {/* <!--
                            .progress-fill
                            height:100%;
                            background: linear-gradient(90deg, #5BB8F5, #1ABC9C);
                            border-radius:99px;
                            transition: width 0.5s cubic-bezier(.4,0,.2,1);
                            --> */}
                            <div
                                id="progress-fill"
                                className="h-full rounded-full progress-fill-transition w-0 bg-[linear-gradient(90deg, #5BB8F5, #1ABC9C)]"
                            ></div>
                        </div>
                    </div>
                    {/* <!-- /Progress --> */}

                    {/* <!-- ── Question block ── --> */}
                    <div id="quiz-content">
                        {/* <!--
                        .q-label
                        font-size:11px; font-weight:700; letter-spacing:0.1em;
                        color:#2E86C1; text-transform:uppercase; margin-bottom:8px;
                        --> */}
                        <p className="text-[11px] font-bold tracking-[0.1em] text-[#2E86C1] uppercase mb-2">
                            Pregunta 1
                        </p>

                        {/* <!--
                        .q-title
                        font-family:'Nunito'; font-size:22px; font-weight:800;
                        color:#1A2942; line-height:1.3; margin-bottom:6px;
                        --> */}
                        <h2 className="font-nunito text-[22px] font-extrabold text-navy leading-[1.3] mb-1.5">
                            ¿Cuántas personas viven en tu hogar?
                        </h2>

                        {/* <!--
                        .q-sub
                        font-size:14px; color:#94A3B8; margin-bottom:24px; line-height:1.5;
                        --> */}
                        <p className="text-[14px] text-[#94A3B8] mb-6 leading-[1.5]">
                            Incluyéndote a ti mismo.
                        </p>

                        {/* <!-- ── Options ── -->
                        <!--
                        .options-grid
                        display:flex; flex-direction:column; gap:10px; margin-bottom:28px;
                        --> */}
                        <div className="flex flex-col gap-[10px] mb-7">
                            {/* <!--
                            .opt-btn (default state)
                            display:flex; align-items:center; gap:14px;
                            padding:14px 16px; border:2px solid #DDE4EB; border-radius:18px;
                            background:#fff; cursor:pointer; text-align:left; width:100%;
                            transition: all 0.2s ease;

                            hover → border-color:#5BB8F5; background:#D6EEFB;
                            transform:translateY(-1px); box-shadow: 0 2px 8px rgba(0,0,0,0.08);

                            .selected → border-color:#2E86C1; background:#EBF5FD;
                            box-shadow: 0 0 0 3px rgba(91,184,245,0.2);
                            --> */}

                            {/* <!-- Option A — default state example --> */}
                            <QuizOption
                                icon="🧍"
                                title="1 persona"
                                description="Solo/a"
                            />
                            {/* <!-- Option B — selected state example --> */}
                            <QuizOption
                                icon="👨‍👩‍👧"
                                title="2-3 personas"
                                description="Familia pequeña"
                            />
                            {/* <!-- Option C — default --> */}
                            <QuizOption
                                icon="👨‍👩‍👧‍👦"
                                title="4-5 personas"
                                description="Familia grande"
                            />
                        </div>
                        {/* <!-- /Options --> */}
                    </div>
                    {/* <!-- /quiz-content -->

    <!-- ── Nav buttons ── -->
    <!--
    .quiz-nav
    display:flex; gap:12px; align-items:center;
    --> */}
                    <div className="flex gap-3 items-center" id="quiz-nav">
                        {/* <!--
        .btn-back
        padding:12px 20px; border:2px solid #DDE4EB; border-radius:12px;
        background:transparent; font-size:14px; font-weight:600;
        color:#4A5568; cursor:pointer; transition:all 0.2s;
        hover → border-color:#94A3B8; color:#1A2942;
      --> */}
                        <button
                            id="btn-back"
                            className="
                                px-5 py-3 border-2 border-[#DDE4EB] rounded-[12px]
                                bg-transparent text-[14px] font-semibold text-[#4A5568]
                                cursor-pointer font-jakarta transition-all duration-200
                                hover:border-[#94A3B8] hover:text-navy hidden"
                        >
                            ← Atrás
                        </button>

                        {/* <!--
        .btn-next (disabled / not ready)
        flex:1; padding:14px 24px; border:none; border-radius:12px;
        background: linear-gradient(135deg, #2E86C1, #1A4F8A);
        color:white; font-size:15px; font-weight:700; cursor:pointer;
        transition:all 0.2s; opacity:0.4; pointer-events:none;

        .btn-next.ready → opacity:1; pointer-events:all;
        .btn-next.ready:hover → transform:translateY(-2px); box-shadow:0 6px 20px rgba(37,99,171,0.4);
        .btn-next.ready:active → transform:translateY(0);

        NOTE: In React, manage ready/disabled state via conditional classNameName or disabled prop.
        The "not ready" state is shown here. Add/remove the opacity + pointer-events
        classNamees dynamically, or use the `disabled` attribute + Tailwind's disabled: variant.
      --> */}
                        <button
                            id="btn-next"
                            disabled
                            className="
                                flex-1 px-6 py-[14px] border-none rounded-[12px]
                                text-white text-[15px] font-bold cursor-pointer font-jakarta
                                transition-all duration-200 opacity-40 pointer-events-none
                                disabled:opacity-40 disabled:pointer-events-none
                                enabled:opacity-100 enabled:pointer-events-auto
                                enabled:hover:-translate-y-0.5 enabled:hover:shadow-[0_6px_20px_rgba(37,99,171,0.4)]
                                active:translate-y-0
                                bg-[linear-gradient(135deg, #2E86C1, #1A4F8A)]
                                "
                        >
                            Siguiente →
                        </button>
                    </div>
                    {/* <!-- /Nav --> */}
                </div>
                {/* <!-- /quiz-card --> */}
            </div>
        </>
    );
};

export default QuizCard;
