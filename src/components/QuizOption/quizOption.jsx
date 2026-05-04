const QuizOption = ({ icon, title, description }) => {
    return (
        <button
            className="
                                    flex items-center gap-[14px] px-4 py-[14px]
                                    border-2 border-[#DDE4EB] rounded-[18px]
                                    bg-white cursor-pointer text-left w-full
                                    transition-all duration-200 ease-in-out
                                    hover:border-[#5BB8F5] hover:bg-[#D6EEFB] hover:-translate-y-px hover:shadow-[0_2px_8px_rgba(0,0,0,0.08)]
                                    "
        >
            {/* <!--
            .opt-icon (default)
            width:44px; height:44px; border-radius:12px;
            background:#EFF3F6; display:flex; align-items:center; justify-content:center;
            font-size:22px; flex-shrink:0; transition:background 0.2s;
            --> */}
            <span className="w-11 h-11 rounded-[12px] bg-[#EFF3F6] flex items-center justify-center text-[22px] shrink-0 transition-colors duration-200">
                {icon}
            </span>

            {/* <!--
            .opt-text-wrap → flex:1
            .opt-title     → font-size:15px; font-weight:700; color:#1A2942; display:block;
            .opt-desc      → font-size:12px; color:#94A3B8; display:block; margin-top:2px; line-height:1.4;
            --> */}
            <div className="flex-1">
                <span className="block text-[15px] font-bold text-navy">
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
