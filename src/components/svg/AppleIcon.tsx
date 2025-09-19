import { type JSX, type RefAttributes, memo } from "react";
import { cn } from "@/lib/utils";
import { faApple } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AppleIcon = memo(
    ({
        className,
        ...props
    }: {
        className?: string;
    } & RefAttributes<SVGSVGElement>): JSX.Element => (
        <div className={cn("relatives scale-[1.5] mr-2")}>
            <FontAwesomeIcon
                icon={faApple}
                className={cn("relative", className)}
                viewBox="0 0 24 24"
                {...props}
            />
        </div>
    ),
);
AppleIcon.displayName = "AppleIcon";
export { AppleIcon };
