import { useSubsolar, ROOMS_DATA } from "../../contexts/SubsolarContext";

/**
 * RoomPanel
 *
 * Left sidebar of the Simulator. Lists every room as a selectable button.
 * Reads currentRoom, roomCounts, and selectRoom from context.
 *
 * Original CSS translated:
 *   .rooms-panel    → flex col, white/90 bg, backdrop-blur, right border, overflow-y-auto
 *   .rooms-title    → 11px uppercase label
 *   .room-btn       → flex row, 2px transparent border, default / hover / active states
 *   .room-emoji     → 20px, fixed 32px wide
 *   .room-name      → 13px bold navy
 *   .room-active-count → 11px gray-400, sky-dark when active
 */
const RoomPanel = () => {
    const { currentRoom, roomCounts, selectRoom } = useSubsolar();

    const rooms = Object.entries(ROOMS_DATA);

    return (
        /*
            .rooms-panel
            background: rgba(255,255,255,0.9); backdrop-filter: blur(10px);
            border-right: 1px solid #DDE4EB;
            padding: 20px 16px; overflow-y: auto;
            display: flex; flex-direction: column; gap: 8px;
        */
        <div className="flex flex-col gap-2 px-4 py-5 overflow-y-auto bg-white/90 backdrop-blur-[10px] border-r border-[#DDE4EB]">
            {/*
                .rooms-title
                font-size:11px; font-weight:700; letter-spacing:0.1em;
                text-transform:uppercase; color:#94A3B8;
                padding: 0 4px; margin-bottom:4px;
            */}
            <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-[#94A3B8] px-1 mb-1">
                Habitaciones
            </p>

            {rooms.map(([roomId, room]) => {
                const isActive = currentRoom === roomId;
                const count = roomCounts[roomId] ?? 0;

                return (
                    /*
                        .room-btn (base)
                        display:flex; align-items:center; gap:10px;
                        padding:10px 12px; border-radius:12px; cursor:pointer;
                        border: 2px solid transparent; background:transparent;
                        width:100%; text-align:left; transition:all 0.2s;

                        :hover → background: #F8FAFB;

                        .room-btn.active
                        background: #D6EEFB; border-color: #5BB8F5;
                    */
                    <button
                        key={roomId}
                        onClick={() => selectRoom(roomId)}
                        className={`
                            flex items-center gap-[10px]
                            px-3 py-[10px] rounded-[12px]
                            border-2 w-full text-left
                            font-jakarta cursor-pointer
                            transition-all duration-200
                            ${
                                isActive
                                    ? "bg-[#D6EEFB] border-[#5BB8F5]"
                                    : "bg-transparent border-transparent hover:bg-[#F8FAFB]"
                            }
                        `}
                    >
                        {/*
                            .room-emoji
                            font-size:20px; width:32px; text-align:center;
                        */}
                        <span className="text-[20px] w-8 text-center shrink-0">
                            {room.emoji}
                        </span>

                        {/*
                            .room-info → flex:1
                        */}
                        <div className="flex-1 min-w-0">
                            {/*
                                .room-name
                                font-size:13px; font-weight:700; color:#1A2942; display:block;
                            */}
                            <span className="block text-[13px] font-bold text-[#1A2942] truncate">
                                {room.label}
                            </span>

                            {/*
                                .room-active-count
                                font-size:11px; color:#94A3B8; display:block; margin-top:1px;
                                .room-btn.active .room-active-count → color:#2E86C1;
                            */}
                            <span
                                className={`block text-[11px] mt-px ${
                                    isActive
                                        ? "text-[#2E86C1]"
                                        : "text-[#94A3B8]"
                                }`}
                            >
                                {count} {count === 1 ? "activo" : "activos"}
                            </span>
                        </div>
                    </button>
                );
            })}
        </div>
    );
};

export default RoomPanel;
