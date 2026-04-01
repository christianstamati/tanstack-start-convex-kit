import { useForm } from "@tanstack/react-form";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { z } from "zod";
import PasswordInput from "@/components/PasswordInput";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import {
	useResetPassword,
	useSignInWithCredentials,
	useSocialSignIn,
} from "@/hooks/auth";

export const Route = createFileRoute("/_unauthenticated/sign-in")({
	component: RouteComponent,
});

const emailSchema = z
	.email("Please enter a valid email address")
	.min(1, "Email is required")
	.max(254, "Email must be at most 254 characters");

const formSchema = z.object({
	email: emailSchema,
	password: z
		.string()
		.min(1, "Password is required")
		.min(8, "Password must be at least 8 characters")
		.max(128, "Password must be at most 128 characters"),
});

function RouteComponent() {
	const navigate = useNavigate();

	const {
		mutate: signInWithCredentials,
		isPending: isSigningInWithCredentials,
	} = useSignInWithCredentials({
		onSuccess: (response, variables) => {
			if (response.signingIn) {
				navigate({ to: "/tasks" });
				toast.success("Signed in successfully");
			} else {
				navigate({
					to: "/verify-email",
					search: { email: variables.email },
				});
				toast.warning("Email not verified");
			}
		},
		onError: () => {
			toast.error("Invalid email or password");
		},
	});

	const { mutate: resetPassword, isPending: isResettingPassword } =
		useResetPassword({
			onSuccess: () => {
				toast.success("Password reset email sent");
			},
			onError: () => {
				toast.error("Failed to send password reset email");
			},
		});

	const { mutate: socialSignIn, isPending: isSocialSigningIn } =
		useSocialSignIn({
			onSuccess: () => {
				toast.success("Signed in successfully");
			},
			onError: (e) => {
				toast.error(e.message);
			},
		});

	const form = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
		validators: {
			onSubmit: formSchema,
		},
		onSubmit: ({ value }) => {
			void signInWithCredentials({
				email: value.email,
				password: value.password,
			});
		},
	});

	const handleResetPassword = () => {
		const email = form.state.values.email;
		const result = emailSchema.safeParse(email);

		if (!result.success) {
			toast.error("Please enter a valid email address");
			return;
		}

		resetPassword({
			email: email,
		});
	};

	const handleGithubSignIn = () => {
		socialSignIn({ provider: "github", redirectTo: "/tasks" });
	};

	const handleGoogleSignIn = () => {
		socialSignIn({ provider: "google", redirectTo: "/tasks" });
	};

	const isPending =
		isSigningInWithCredentials || isResettingPassword || isSocialSigningIn;

	return (
		<div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
			<div className="flex w-full max-w-sm flex-col gap-6">
				<div className={"flex flex-col gap-6"}>
					<Card>
						<CardHeader className="text-center">
							<CardTitle className="text-xl">Welcome back</CardTitle>
							<CardDescription>
								Sign in with your social account
							</CardDescription>
						</CardHeader>
						<CardContent>
							<form
								id="sign-in-form"
								onSubmit={(e) => {
									e.preventDefault();
									form.handleSubmit();
								}}
							>
								<FieldGroup>
									<Field>
										<Button
											variant="outline"
											type="button"
											onClick={handleGoogleSignIn}
											disabled={isPending}
										>
											<svg
												role="img"
												viewBox="0 0 24 24"
												xmlns="http://www.w3.org/2000/svg"
											>
												<title>Google</title>
												<path
													fill="currentColor"
													d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
												/>
											</svg>
											Sign in with Google
										</Button>
										<Button
											variant="outline"
											type="button"
											onClick={handleGithubSignIn}
											disabled={isPending}
										>
											<svg
												role="img"
												viewBox="0 0 24 24"
												xmlns="http://www.w3.org/2000/svg"
											>
												<title>GitHub</title>
												<path
													fill="currentColor"
													d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
												/>
											</svg>
											Sign in with Github
										</Button>
									</Field>
									<FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
										Or continue with
									</FieldSeparator>
									<form.Field name="email">
										{(field) => {
											const isInvalid =
												field.state.meta.isTouched && !field.state.meta.isValid;
											return (
												<Field data-invalid={isInvalid}>
													<FieldLabel htmlFor={field.name}>Email</FieldLabel>
													<Input
														id={field.name}
														name={field.name}
														type="email"
														required
														value={field.state.value}
														onBlur={field.handleBlur}
														onChange={(e) => field.handleChange(e.target.value)}
														aria-invalid={isInvalid}
														placeholder="m@example.com"
														autoComplete="email"
													/>
													{isInvalid && (
														<FieldError errors={field.state.meta.errors} />
													)}
												</Field>
											);
										}}
									</form.Field>
									<form.Field name="password">
										{(field) => {
											const isInvalid =
												field.state.meta.isTouched && !field.state.meta.isValid;
											return (
												<Field data-invalid={isInvalid}>
													<div className="flex items-center">
														<FieldLabel htmlFor={field.name}>
															Password
														</FieldLabel>
														<button
															type="button"
															disabled={isPending}
															className="ml-auto text-sm underline-offset-4 hover:underline"
															onClick={handleResetPassword}
														>
															Forgot your password?
														</button>
													</div>
													<PasswordInput
														id={field.name}
														name={field.name}
														required
														value={field.state.value}
														onBlur={field.handleBlur}
														onChange={(e) => field.handleChange(e.target.value)}
														aria-invalid={isInvalid}
													/>
													{isInvalid && (
														<FieldError errors={field.state.meta.errors} />
													)}
												</Field>
											);
										}}
									</form.Field>
									<Field>
										<Button
											type="submit"
											disabled={isPending}
											form="sign-in-form"
										>
											{isPending ? <Spinner /> : "Sign in"}
										</Button>
										<FieldDescription className="text-center">
											Don&apos;t have an account?{" "}
											<Link to="/sign-up">Sign up</Link>
										</FieldDescription>
									</Field>
								</FieldGroup>
							</form>
						</CardContent>
					</Card>
					<FieldDescription className="px-4 text-center">
						By clicking continue, you agree to our{" "}
						<a href="/#" target="_blank" rel="noopener">
							Terms of Service
						</a>{" "}
						and{" "}
						<a href="/#" target="_blank" rel="noopener">
							Privacy Policy
						</a>
						.
					</FieldDescription>
				</div>
			</div>
		</div>
	);
}
