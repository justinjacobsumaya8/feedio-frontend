export default function FolderIcon({ width, height }) {
    return (
        <svg width={width ?? "45px"} height={height ?? "45px"} viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg">
            <defs>
                <style>{`
                    .a{fill:none;stroke:#3c82f6;stroke-linecap:round;stroke-linejoin:round;}
                `}</style>
            </defs>
            <path className="a" d="M41.6783,13.0436H24.77c-1.9628-.1072-5.9311-4.2372-8.1881-4.2372H6.6806V8.8046A2.1762,2.1762,0,0,0,4.5,10.9763v7.3063h39V14.8652A1.8217,1.8217,0,0,0,41.6783,13.0436Z" />
            <path className="a" d="M43.5,18.2826H4.5V37.0165a2.1762,2.1762,0,0,0,2.1735,2.1789H41.3194A2.1762,2.1762,0,0,0,43.5,37.0237V18.2826Z" />
        </svg>
    );
};