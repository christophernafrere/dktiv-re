import * as React from "react";
const PinMapIcon = ({ color }: { color: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} fill="none">
        <path
            stroke={color}
            strokeWidth={1.333}
            d="M26 16c0 6.69-7.318 11.204-9.433 12.369a1.16 1.16 0 0 1-1.133 0C13.318 27.204 6 22.69 6 16c0-6 4.845-10 10-10 5.333 0 10 4 10 10Z"
        />
        <circle cx={16} cy={16} r={4.667} stroke={color} strokeWidth={1.333} />
    </svg>
);
export default PinMapIcon;
