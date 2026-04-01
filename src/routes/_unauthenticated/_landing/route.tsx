import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Footer } from "@/features/landing/Footer";
import { Header } from "@/features/landing/Header";

export const Route = createFileRoute("/_unauthenticated/_landing")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex min-h-screen flex-col">
			<Header />
			<main className="flex-1">
				<Outlet />
			</main>
			<Footer />
		</div>
	);
}
