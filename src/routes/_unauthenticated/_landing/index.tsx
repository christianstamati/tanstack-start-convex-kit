import { createFileRoute } from "@tanstack/react-router";
import { SiteHome } from "@/features/landing/SiteHome";

export const Route = createFileRoute("/_unauthenticated/_landing/")({
	component: SiteHome,
});
