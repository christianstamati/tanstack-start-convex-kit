import { cn } from "@/lib/utils";

export function Footer({ className }: { className?: string }) {
	return (
		<footer
			className={cn(
				"border-t py-6 text-center text-muted-foreground text-sm",
				className,
			)}
		>
			<div className="mx-auto max-w-5xl px-4">
				<p>Built with TanStack Start and Convex.</p>
			</div>
		</footer>
	);
}
