"use client";

import { ShoppingCart, UserIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { APP_NAME } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import ModeToggle from "./mode-toggle";
import { useTheme } from "next-themes";

const Header = () => {
	const { resolvedTheme } = useTheme();

	const logoSrc =
		resolvedTheme === "light" ? "/images/logoBlack.png" : "/images/logoWhite.png";

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
								priority
							/>
							<span className="hidden lg:block font-bold text-2xl ml-3">
								{APP_NAME}
							</span>
						</Link>
					</div>
					<div className="space-x-2">
						<ModeToggle />
						<Button asChild variant="ghost">
							<Link href="/cart">
								<ShoppingCart />
								Cart
							</Link>
						</Button>
						<Button asChild>
							<Link href="/sign-in">
								<UserIcon />
								Sign In
							</Link>
						</Button>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
