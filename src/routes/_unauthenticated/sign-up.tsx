import { createFileRoute } from "@tanstack/react-router";
import { SignUp } from "@/features/auth/SignUp";

export const Route = createFileRoute("/_unauthenticated/sign-up")({
	component: SignUp,
});
