import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Header({ className }: { className?: string }) {
	return (
		<header
			className={cn(
				"border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60",
				className,
			)}
		>
			<div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4">
				<Link
					to="/"
					className="font-semibold text-foreground tracking-tight hover:opacity-90"
				>
					TSCK
				</Link>
				<nav className="flex items-center gap-2">
					<Button
						variant="ghost"
						size="sm"
						nativeButton={false}
						render={(props) => <Link {...props} to="/sign-in" />}
					>
						Sign in
					</Button>
					<Button
						size="sm"
						nativeButton={false}
						render={(props) => <Link {...props} to="/sign-up" />}
					>
						Sign up
					</Button>
				</nav>
			</div>
		</header>
	);
}
