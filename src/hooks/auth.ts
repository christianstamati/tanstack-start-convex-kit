import { useAuthActions } from "@convex-dev/auth/react";
import { type UseMutationOptions, useMutation } from "@tanstack/react-query";
import { type LinkProps, useNavigate } from "@tanstack/react-router";
import type { Value } from "convex/values";

/**
 * Sign in with credentials flow
 * Sign in with email and password
 */
type SignInWithCredentialsVariables = {
	email: string;
	password: string;
};
type SignInWithCredentialsResponse = {
	signingIn: boolean;
	redirect?: URL | undefined;
};
export const useSignInWithCredentials = (
	options?: Omit<
		UseMutationOptions<
			SignInWithCredentialsResponse,
			Error,
			SignInWithCredentialsVariables
		>,
		"mutationFn"
	>,
) => {
	const { signIn } = useAuthActions();
	return useMutation<
		SignInWithCredentialsResponse,
		Error,
		SignInWithCredentialsVariables
	>({
		...options,
		mutationFn: async ({ email, password }) => {
			const response = await signIn("password", {
				email,
				password,
				flow: "signIn",
			});
			return response;
		},
	});
};

/**
 * Reset password flow
 * Send reset password email to user
 */
type ResetPasswordVariables = {
	email: string;
	redirectTo?: LinkProps["to"];
};
export const useResetPassword = (
	options?: Omit<
		UseMutationOptions<void, Error, ResetPasswordVariables>,
		"mutationFn"
	>,
) => {
	const { signIn } = useAuthActions();
	const navigate = useNavigate();
	return useMutation<void, Error, ResetPasswordVariables>({
		...options,
		mutationFn: ({ email, redirectTo }) => {
			return signIn("password", {
				email,
				flow: "reset",
			}).then(() => {
				if (redirectTo) {
					navigate({ to: redirectTo });
				}
			});
		},
	});
};

/**
 * Reset password flow
 * Reset password with token and new password
 */
type ResetVerificationVariables = {
	token: string;
	email: string;
	newPassword: string;
	redirectTo?: LinkProps["to"];
};
export const useResetVerification = (
	options?: Omit<
		UseMutationOptions<void, Error, ResetVerificationVariables>,
		"mutationFn"
	>,
) => {
	const { signIn } = useAuthActions();
	const navigate = useNavigate();
	return useMutation<void, Error, ResetVerificationVariables>({
		...options,
		mutationFn: ({ token, email, redirectTo, newPassword }) => {
			return signIn("password", {
				code: token,
				email,
				newPassword,
				flow: "reset-verification",
			}).then(() => {
				if (redirectTo) {
					navigate({ to: redirectTo });
				}
			});
		},
	});
};

/**
 * Social sign in flow
 * Sign in with social provider
 */
type SocialSignInVariables = {
	provider: string;
	redirectTo?: string;
};
type SocialSignInResponse = {
	signingIn: boolean;
	redirect?: URL | undefined;
};
export const useSocialSignIn = (
	options?: Omit<
		UseMutationOptions<SocialSignInResponse, Error, SocialSignInVariables>,
		"mutationFn"
	>,
) => {
	const { signIn } = useAuthActions();
	return useMutation<SocialSignInResponse, Error, SocialSignInVariables>({
		...options,
		mutationFn: ({ provider, redirectTo }) => {
			return signIn(provider, {
				redirectTo,
			} as Record<string, Value>);
		},
	});
};

/**
 * Sign up with credentials flow
 * Sign up with email and password
 */
type SignUpWithCredentialsVariables = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	redirectTo?: LinkProps["to"];
};
export const useSignUpWithCredentials = (
	options?: Omit<
		UseMutationOptions<void, Error, SignUpWithCredentialsVariables>,
		"mutationFn"
	>,
) => {
	const { signIn } = useAuthActions();
	const navigate = useNavigate();
	return useMutation<void, Error, SignUpWithCredentialsVariables>({
		...options,
		mutationFn: ({ firstName, lastName, email, password, redirectTo }) => {
			return signIn("password", {
				name: `${firstName} ${lastName}`,
				email,
				password,
				flow: "signUp",
			}).then(() => {
				if (redirectTo) {
					navigate({ to: redirectTo });
				}
			});
		},
	});
};

/**
 * Email verification flow
 * Verify email with code sent to user
 */
type EmailVerificationVariables = {
	code: string;
	email: string;
	redirectTo?: LinkProps["to"];
};
export const useEmailVerification = (
	options?: Omit<
		UseMutationOptions<void, Error, EmailVerificationVariables>,
		"mutationFn"
	>,
) => {
	const { signIn } = useAuthActions();
	const navigate = useNavigate();
	return useMutation<void, Error, EmailVerificationVariables>({
		...options,
		mutationFn: ({ code, email, redirectTo }) => {
			return signIn("password", {
				code,
				email,
				flow: "email-verification",
			}).then(() => {
				if (redirectTo) {
					navigate({ to: redirectTo });
				}
			});
		},
	});
};
