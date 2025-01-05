"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";

import { APP_NAME } from "@/lib/constants";
import { isServer } from "@/utils/helpers";
import Menu from "./menu";

const Header = () => {
	const { resolvedTheme } = useTheme();

	const logoSrc = isServer()
		? "/images/logoBlack.png"
		: resolvedTheme === "light"
		? "/images/logoBlack.png"
		: "/images/logoWhite.png";

	return (
		<header>
			<div className="w-full border-b">
				<div className="wrapper flex-between">
					<div className="flex-start">
						<Link href="/" className="flex-start">
							<Image
								src={logoSrc}
								alt={`${APP_NAME} logo`}
								height={48}
								width={48}
								className="w-auto h-auto"
								fetchPriority="high"
								priority
							/>
							<span className="hidden lg:block font-bold text-2xl ml-3">
								{APP_NAME}
							</span>
						</Link>
					</div>
					<Menu />
				</div>
			</div>
		</header>
	);
};

export default Header;
