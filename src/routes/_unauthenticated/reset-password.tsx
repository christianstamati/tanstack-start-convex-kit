import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { ResetPassword } from "@/features/auth/ResetPassword";

const resetPasswordSearchSchema = z.object({
	token: z.number().min(1).optional().catch(undefined),
});

export const Route = createFileRoute("/_unauthenticated/reset-password")({
	validateSearch: (search: Record<string, unknown>) =>
		resetPasswordSearchSchema.parse(search),
	component: ResetPasswordRoute,
});

function ResetPasswordRoute() {
	const { token } = Route.useSearch();
	return <ResetPassword token={token} />;
}
