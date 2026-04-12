"use client";

import { Link, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
	SidebarGroup,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";

export type NavMainItem = {
	title: string;
	/** TanStack Router path, e.g. `/tasks` */
	to: string;
	icon: ReactNode;
	tooltip?: string;
};

function pathMatchesNav(pathname: string, to: string) {
	if (pathname === to) {
		return true;
	}
	if (to !== "/" && pathname.startsWith(`${to}/`)) {
		return true;
	}
	return false;
}

export function NavMain({ items }: { items: NavMainItem[] }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });

	return (
		<SidebarGroup>
			<SidebarMenu className="gap-1">
				{items.map((item) => (
					<SidebarMenuItem key={item.to}>
						<SidebarMenuButton
							tooltip={item.tooltip ?? item.title}
							isActive={pathMatchesNav(pathname, item.to)}
							render={<Link to={item.to} />}
						>
							{item.icon}
							<span>{item.title}</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
				))}
			</SidebarMenu>
		</SidebarGroup>
	);
}
