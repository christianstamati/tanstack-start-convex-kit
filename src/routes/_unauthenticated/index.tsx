import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/_unauthenticated/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div>
			<div>Home</div>
			<Link to="/tasks">Go to Tasks</Link>
		</div>
	);
}
