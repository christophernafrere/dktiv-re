import * as React from "react";
const HomeIcon = ({ color }: { color: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} fill="none">
        <path
            stroke={color}
            strokeWidth={1.333}
            d="M6.667 17.013c0-1.81 0-2.716.365-3.511.366-.796 1.054-1.385 2.428-2.563l1.333-1.143C13.278 7.666 14.52 6.602 16 6.602s2.722 1.064 5.206 3.194l1.334 1.143c1.374 1.178 2.061 1.767 2.427 2.563.366.795.366 1.7.366 3.51v5.655c0 2.514 0 3.77-.78 4.552-.782.78-2.039.78-4.553.78h-8c-2.514 0-3.771 0-4.552-.78-.782-.781-.782-2.038-.782-4.552v-5.654Z"
        />
        <path
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.333}
            d="M19.333 28v-6.667c0-.736-.597-1.333-1.333-1.333h-4c-.736 0-1.334.597-1.334 1.333V28"
        />
    </svg>
);
export default HomeIcon;
