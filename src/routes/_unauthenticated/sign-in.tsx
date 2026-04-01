import { createFileRoute } from "@tanstack/react-router";
import { SignIn } from "@/features/auth/SignIn";

export const Route = createFileRoute("/_unauthenticated/sign-in")({
	component: SignIn,
});
