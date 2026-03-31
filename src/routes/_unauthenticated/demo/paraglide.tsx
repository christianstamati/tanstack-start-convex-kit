import { createFileRoute } from "@tanstack/react-router";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { m } from "@/paraglide/messages";

export const Route = createFileRoute("/_unauthenticated/demo/paraglide")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex h-screen flex-col items-center justify-center gap-4">
			<div>{m.example_message({ username: "John" })}</div>
			<LocaleSwitcher />
		</div>
	);
}
