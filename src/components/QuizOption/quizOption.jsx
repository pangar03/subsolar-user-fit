/**
 * QuizOption
 *
 * Purely presentational. The parent (QuizCard) is responsible for:
 *   - deciding whether this option isSelected
 *   - passing the onClick handler that calls selectAnswer() from context
 *
 * Props:
 *   icon        {string}   Emoji character
 *   title       {string}   Primary label
 *   description {string}   Secondary line
 *   isSelected  {boolean}  Drives selected vs. default visual state
 *   onClick     {function} Called when the button is clicked
 */
const QuizOption = ({
    icon,
    title,
    description,
    isSelected = false,
    onClick,
}) => {
    return (
        <button
            onClick={onClick}
            className={`
                flex items-center gap-[14px] px-4 py-[14px]
                border-2 rounded-[18px]
                cursor-pointer text-left w-full
                transition-all duration-200 ease-in-out
                ${
                    isSelected
                        ? // ── selected state ──────────────────────────────
                          // .opt-btn.selected:
                          //   border-color: #2E86C1; background: #EBF5FD;
                          //   box-shadow: 0 0 0 3px rgba(91,184,245,0.2);
                          "border-[#2E86C1] bg-[#EBF5FD] shadow-[0_0_0_3px_rgba(91,184,245,0.2)]"
                        : // ── default state ───────────────────────────────
                          // .opt-btn:
                          //   border-color: #DDE4EB; background: #fff;
                          // .opt-btn:hover:
                          //   border-color: #5BB8F5; background: #D6EEFB;
                          //   transform: translateY(-1px);
                          //   box-shadow: 0 2px 8px rgba(0,0,0,0.08);
                          "border-[#DDE4EB] bg-white hover:border-[#5BB8F5] hover:bg-[#D6EEFB] hover:-translate-y-px hover:shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
                }
            `}
        >
            {/*
                .opt-icon (default)  → background: #EFF3F6
                .opt-btn.selected .opt-icon → background: #D6EEFB
                width:44px; height:44px; border-radius:12px;
                display:flex; align-items:center; justify-content:center;
                font-size:22px; flex-shrink:0; transition:background 0.2s;
            */}
            <span
                className={`
                    w-11 h-11 rounded-[12px]
                    flex items-center justify-center
                    text-[22px] shrink-0
                    transition-colors duration-200
                    ${isSelected ? "bg-[#D6EEFB]" : "bg-[#EFF3F6]"}
                `}
            >
                {icon}
            </span>

            {/*
                .opt-text-wrap → flex:1
                .opt-title     → font-size:15px; font-weight:700; color:#1A2942; display:block;
                .opt-desc      → font-size:12px; color:#94A3B8; display:block;
                margin-top:2px; line-height:1.4;
            */}
            <div className="flex-1">
                <span className="block text-[15px] font-bold text-[#1A2942]">
                    {title}
                </span>
                <span className="block text-[12px] text-[#94A3B8] mt-0.5 leading-[1.4]">
                    {description}
                </span>
            </div>
        </button>
    );
};

export default QuizOption;
