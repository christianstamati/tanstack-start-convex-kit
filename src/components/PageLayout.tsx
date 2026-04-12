import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SidebarTrigger } from "./ui/sidebar";

type Props = {
	title: ReactNode;
	description?: ReactNode;
	children: ReactNode;
	className?: string;
};

/**
 * Full-width page shell: top page header (title + optional description) and main body.
 * Use under the authenticated layout so each route gets a consistent header band.
 */
export function PageLayout({ title, children, className }: Props) {
	return (
		<div
			className={cn(
				"flex min-h-full w-full min-w-0 flex-1 flex-col",
				className,
			)}
		>
			<header className="sticky top-0 z-30 flex h-14 shrink-0 items-center gap-3 border-border/80 border-b bg-background/95 px-4 backdrop-blur supports-backdrop-filter:bg-background/60 lg:px-4">
				<SidebarTrigger className="-ml-1 shrink-0" />
				<div className="font-semibold text-xl tracking-tight">{title}</div>
			</header>

			<div className="flex w-full min-w-0 flex-1 flex-col gap-6 px-4 py-6">
				{children}
			</div>
		</div>
	);
}
