import * as React from "react";
import type { SVGProps } from "react";

const BaliMapLight = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 800 900"
        aria-label="Map of Bali"
        {...props}
    >
        <path
            d="M369.3,248.3L363,250.3L354,251.3L352.5,242.3L353,235.3L355,229.3L353,222.3L353,213.8L359,206.3L364.5,203.3L369,201.3L376,197.3L381.5,193.8L388.5,191.8L394,188.8L397,192.3L400.5,195.8L408.5,198.3L410.5,203.3L412,209.3L415,214.3L419.5,217.3L425,218.3L427.5,222.3L428.5,230.3L429,235.3L428,242.3L427,249.3L425,256.3L424,264.8L421,273.3L416,278.3L411.5,281.3L405.5,282.8L400,283.3L394,283.3L388,281.8L382.5,279.3L378,276.3L374,272.3L371,267.3L369,261.3L368.5,254.3L369.3,248.3Z"
            fill="currentColor"
        />
    </svg>
);

export default BaliMapLight;
