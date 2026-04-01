import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function SiteHome() {
	return (
		<div className="mx-auto max-w-5xl px-4 py-16">
			<div className="mx-auto max-w-2xl text-center">
				<h1 className="font-semibold text-4xl text-foreground tracking-tight sm:text-5xl">
					Welcome
				</h1>
				<p className="mt-4 text-lg text-muted-foreground">
					Public marketing home. Sign in to manage your tasks.
				</p>
				<div className="mt-8 flex flex-wrap items-center justify-center gap-3">
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
						Go to tasks
					</Button>
				</div>
			</div>
		</div>
	);
}
