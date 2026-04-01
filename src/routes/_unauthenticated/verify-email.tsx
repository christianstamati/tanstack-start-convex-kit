import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { VerifyEmail } from "@/features/auth/VerifyEmail";

const verifyEmailSearchSchema = z.object({
	email: z
		.string()
		.trim()
		.pipe(
			z
				.email("Please enter a valid email address")
				.min(1, "Email is required")
				.max(254, "Email must be at most 254 characters"),
		),
});

export const Route = createFileRoute("/_unauthenticated/verify-email")({
	validateSearch: (search: Record<string, unknown>) =>
		verifyEmailSearchSchema.parse(search),
	component: VerifyEmailRoute,
});

function VerifyEmailRoute() {
	const { email } = Route.useSearch();
	return <VerifyEmail email={email} />;
}
