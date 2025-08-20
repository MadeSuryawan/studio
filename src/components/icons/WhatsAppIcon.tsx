import type { SVGProps } from "react";

type WhatsAppIconProps = SVGProps<SVGSVGElement>;

const WhatsAppIcon = (props: WhatsAppIconProps): JSX.Element => (
    <svg
        width="100%"
        height="100%"
        viewBox="0 0 352 352"
        xmlns="http://www.w3.org/2000/svg"
        style={{
            fillRule: "evenodd",
            clipRule: "evenodd",
            strokeLinejoin: "round",
            strokeMiterlimit: 2,
        }}
        {...props}
    >
        <g transform="matrix(2,0,0,2,-203.786,-288.636)">
            <path
                d="M277.813,284.103C277.813,304.061 261.638,320.236 241.68,320.236L138.031,320.236C118.073,320.236 101.893,304.061 101.893,284.103L101.893,180.455C101.893,160.494 118.073,144.318 138.031,144.318L241.68,144.318C261.638,144.318 277.813,160.494 277.813,180.455L277.813,284.103Z"
                style={{ fill: "url(#_Radial1)" }}
            />
        </g>
        <g transform="matrix(2,0,0,2,-203.786,-288.636)">
            <path
                d="M191.764,285.249C180.542,285.249 170.135,281.769 161.546,275.849L143.213,281.132L147.898,262.244C141.933,253.626 138.427,243.176 138.427,231.909C138.427,202.449 162.307,178.57 191.764,178.57C221.224,178.57 245.104,202.449 245.104,231.909C245.104,261.367 221.224,285.249 191.764,285.249ZM191.037,167.421C155.555,167.421 126.79,196.181 126.79,231.669C126.79,243.657 130.08,254.87 135.797,264.471L127.697,297.132L159.894,287.862C169.123,292.982 179.736,295.917 191.037,295.917C226.522,295.917 255.284,267.149 255.284,231.669C255.284,196.181 226.522,167.421 191.037,167.421Z"
                style={{ fill: "url(#_Radial2)" }}
            />
        </g>
        <g transform="matrix(2,0,0,2,-203.786,-288.636)">
            <path
                d="M174.794,226.58C175.54,225.723 176.284,224.867 177.025,224.01C178.277,222.557 180.151,221.157 180.248,219.068C180.342,217.061 179.626,215.062 178.917,213.241C178.461,212.07 177.992,210.902 177.542,209.723C176.73,207.586 175.682,204.595 174.503,203.342C172.905,201.649 170.169,201.29 168.003,202.33C168.003,202.33 155.396,208.389 159.278,220.513C159.278,220.513 166.793,254.695 204.617,261.726C204.617,261.726 218.19,263.668 221.826,255.421C222.612,253.643 223.144,251.141 223.014,249.207C222.884,247.329 221.561,246.085 220.014,245.192C218.021,244.052 216.248,242.984 213.978,241.861C212.007,240.895 209.742,239.458 207.475,240.083C205.813,240.543 204.619,242.062 203.494,243.269C202.024,244.825 200.522,246.363 199.038,247.909C199.038,247.909 179.884,240.875 174.794,226.58Z"
                style={{ fill: "url(#_Radial3)" }}
            />
        </g>
        <defs>
            <radialGradient
                id="_Radial1"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="matrix(226.316,0,0,226.316,183.9,355.63)"
            >
                <stop
                    offset="0"
                    style={{ stopColor: "rgb(0,212,55)", stopOpacity: 1 }}
                />
                <stop
                    offset="1"
                    style={{ stopColor: "rgb(0,226,95)", stopOpacity: 1 }}
                />
            </radialGradient>
            <radialGradient
                id="_Radial2"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="matrix(138.834,0,0,138.834,165.581,300.759)"
            >
                <stop
                    offset="0"
                    style={{ stopColor: "rgb(235,235,235)", stopOpacity: 1 }}
                />
                <stop
                    offset="1"
                    style={{ stopColor: "rgb(252,252,252)", stopOpacity: 1 }}
                />
            </radialGradient>
            <radialGradient
                id="_Radial3"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="matrix(62.1087,0,0,62.1087,167.047,271.676)"
            >
                <stop
                    offset="0"
                    style={{ stopColor: "rgb(235,235,235)", stopOpacity: 1 }}
                />
                <stop
                    offset="1"
                    style={{ stopColor: "white", stopOpacity: 1 }}
                />
            </radialGradient>
        </defs>
    </svg>
);

export default WhatsAppIcon;
