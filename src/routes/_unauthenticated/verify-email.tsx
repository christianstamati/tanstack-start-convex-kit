import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { VerifyEmail } from "@/features/auth/VerifyEmail";

export const Route = createFileRoute("/_unauthenticated/verify-email")({
	validateSearch: (search: Record<string, unknown>): { email?: string } => {
		const raw = search.email;
		const str = typeof raw === "string" ? raw.trim() : undefined;
		if (!str) return {};
		const parsed = z.email().safeParse(str);
		return parsed.success ? { email: parsed.data } : {};
	},
	component: VerifyEmailRoute,
});

function VerifyEmailRoute() {
	const { email } = Route.useSearch();
	return <VerifyEmail email={email} />;
}
