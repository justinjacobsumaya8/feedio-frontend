export default function NewsFeedIcon({ strokeColor }) {
    return (
        <svg width="21px" height="21px" viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg">
            <defs>
                <style>{`
                    .a{fill:none;stroke:${strokeColor};stroke-linecap:round;stroke-linejoin:round;}
                `}
                </style>
            </defs>
            <path className="a" d="M24,7.17a1.53,1.53,0,0,0-1.06.44l-18,18a1.48,1.48,0,0,0,0,2.11L18,40.83H30l13.09-13.1a1.48,1.48,0,0,0,0-2.11l-18-18A1.5,1.5,0,0,0,24,7.17Zm-4,22.6M10.5,27.52,23.24,14.85M21,25.09l-6.49,6.44m4.06,4.06,2.5-2.44" />
        </svg>
    );
};