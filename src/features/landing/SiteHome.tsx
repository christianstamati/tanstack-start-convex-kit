import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function SiteHome() {
	return (
		<div className="relative mx-auto flex min-h-[min(70vh,720px)] max-w-5xl flex-col justify-center overflow-hidden px-4 py-24 md:py-32">
			<div
				aria-hidden
				className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgb(0_0_0/0.06),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgb(255_255_255/0.07),transparent)]"
			/>
			<div
				aria-hidden
				className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgb(0_0_0/0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgb(0_0_0/0.035)_1px,transparent_1px)] bg-size-[4rem_4rem] dark:bg-[linear-gradient(to_right,rgb(255_255_255/0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.05)_1px,transparent_1px)] dark:bg-size-[4rem_4rem]"
			/>
			<div className="relative mx-auto max-w-2xl text-center">
				<h1 className="font-bold text-4xl text-foreground tracking-tighter sm:text-5xl md:text-6xl">
					Build and{" "}
					<span className="bg-linear-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
						ship
					</span>{" "}
					with confidence
				</h1>
				<p className="mx-auto mt-5 max-w-lg text-base text-muted-foreground sm:text-lg">
					Starter template—swap this for your value proposition.
				</p>
				<div className="mt-10 flex flex-wrap items-center justify-center gap-3">
					<Button
						size="lg"
						nativeButton={false}
						render={(props) => <Link {...props} to="/sign-up" />}
					>
						Get started
					</Button>
					<Button
						variant="outline"
						size="lg"
						nativeButton={false}
						render={(props) => <Link {...props} to="/tasks" />}
					>
						Open app
					</Button>
				</div>
			</div>
		</div>
	);
}
