// src/components/Header.tsx
import type { JSX } from "react";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import LogoIcon from "@/components/svg/LogoIcon";
import NavbarFlow from "@/components/ui/navbar-flow";
import { NAVIGATION_LINKS } from "@/constants/navigation";
import { cn } from "@/lib/utils";

const Header = (): JSX.Element => {
    /*
     * PRESERVED COMMENTED NAVIGATION LINKS FOR FUTURE REFERENCE
     * These commented sections contain submenu configurations that may be used later:
     *
     * Navigation submenu with HoverLink components
     * Templates submenu with FeatureItem components
     * Showcase submenu with various project links
     *
     * Original structure maintained for easy restoration when needed
     */

    return (
        <NavbarFlow
            styleName={cn("h-12 md:h-16")}
            emblem={<LogoIcon className={cn("h-auto w-[84px] md:w-[90px]")} />}
            links={NAVIGATION_LINKS}
            rightComponent={<ThemeSwitcher />}
        />
    );
};

export default Header;
