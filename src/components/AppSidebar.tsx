"use client";

import { Link } from "@tanstack/react-router";
import { LayersIcon, ListTodoIcon, UserIcon } from "lucide-react";
import type * as React from "react";
import { NavMain, type NavMainItem } from "@/components/NavMenu";
import { NavUser } from "@/components/NavUser";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarRail,
} from "@/components/ui/sidebar";

const navItems: NavMainItem[] = [
	{
		title: "Task",
		to: "/tasks",
		icon: <ListTodoIcon />,
	},
	{
		title: "Profile",
		to: "/profile",
		icon: <UserIcon />,
	},
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuButton
						size="lg"
						tooltip="TSCK"
						render={<Link to="/tasks" />}
					>
						<div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
							<LayersIcon className="size-4" />
						</div>
						<div className="grid min-w-0 flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
							<span className="truncate font-semibold">TSCK</span>
						</div>
					</SidebarMenuButton>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={navItems} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
