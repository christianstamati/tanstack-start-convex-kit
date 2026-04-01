import { useForm } from "@tanstack/react-form";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
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
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useSignUpWithCredentials } from "@/hooks/auth";

export const Route = createFileRoute("/_unauthenticated/sign-up")({
	component: RouteComponent,
});

const formSchema = z
	.object({
		firstName: z.string().min(1, "First name is required"),
		lastName: z.string().min(1, "Last name is required"),
		email: z
			.email("Please enter a valid email address")
			.min(1, "Email is required")
			.max(254, "Email must be at most 254 characters"),
		password: z
			.string()
			.min(1, "Password is required")
			.min(8, "Password must be at least 8 characters")
			.max(128, "Password must be at most 128 characters"),
		passwordConfirmation: z.string().min(1, "Please confirm your password"),
	})
	.refine((data) => data.password === data.passwordConfirmation, {
		message: "Passwords do not match",
		path: ["passwordConfirmation"],
	});

function RouteComponent() {
	const {
		mutate: signUpWithCredentials,
		isPending: isSigningUpWithCredentials,
	} = useSignUpWithCredentials({
		onSuccess: () => {
			toast.success("Signed up successfully");
		},
		onError: (e) => {
			toast.error(e.message);
		},
	});

	const form = useForm({
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			passwordConfirmation: "",
		},
		validators: {
			onSubmit: formSchema,
		},
		onSubmit: ({ value }) => {
			void signUpWithCredentials({
				firstName: value.firstName,
				lastName: value.lastName,
				email: value.email,
				password: value.password,
				redirectTo: "/sign-in",
			});
		},
	});

	return (
		<div className="flex min-h-screen w-full items-center justify-center bg-muted p-4">
			<div className="w-full max-w-md">
				<Card className="max-w-md">
					<CardHeader>
						<CardTitle className="text-lg md:text-xl">Sign Up</CardTitle>
						<CardDescription className="text-xs md:text-sm">
							Enter your information to create an account
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form
							id="sign-up-form"
							onSubmit={(e) => {
								e.preventDefault();
								form.handleSubmit();
							}}
						>
							<FieldGroup className="grid gap-4">
								<div className="grid grid-cols-2 gap-4">
									<form.Field name="firstName">
										{(field) => {
											const isInvalid =
												field.state.meta.isTouched && !field.state.meta.isValid;
											return (
												<Field data-invalid={isInvalid}>
													<FieldLabel htmlFor={field.name}>
														First name
													</FieldLabel>
													<Input
														id={field.name}
														name={field.name}
														placeholder="Max"
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
									<form.Field name="lastName">
										{(field) => {
											const isInvalid =
												field.state.meta.isTouched && !field.state.meta.isValid;
											return (
												<Field data-invalid={isInvalid}>
													<FieldLabel htmlFor={field.name}>
														Last name
													</FieldLabel>
													<Input
														id={field.name}
														name={field.name}
														placeholder="Robinson"
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
								</div>
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
													placeholder="m@example.com"
													required
													value={field.state.value}
													onBlur={field.handleBlur}
													onChange={(e) => field.handleChange(e.target.value)}
													aria-invalid={isInvalid}
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
												<FieldLabel htmlFor={field.name}>Password</FieldLabel>
												<PasswordInput
													id={field.name}
													name={field.name}
													required
													value={field.state.value}
													onBlur={field.handleBlur}
													onChange={(e) => field.handleChange(e.target.value)}
													aria-invalid={isInvalid}
													autoComplete="new-password"
													placeholder="Password"
												/>
												{isInvalid && (
													<FieldError errors={field.state.meta.errors} />
												)}
											</Field>
										);
									}}
								</form.Field>
								<form.Field name="passwordConfirmation">
									{(field) => {
										const isInvalid =
											field.state.meta.isTouched && !field.state.meta.isValid;
										return (
											<Field data-invalid={isInvalid}>
												<FieldLabel htmlFor={field.name}>
													Confirm Password
												</FieldLabel>
												<PasswordInput
													id={field.name}
													name={field.name}
													required
													value={field.state.value}
													onBlur={field.handleBlur}
													onChange={(e) => field.handleChange(e.target.value)}
													aria-invalid={isInvalid}
													autoComplete="new-password"
													placeholder="Confirm Password"
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
										form="sign-up-form"
										className="w-full"
										disabled={isSigningUpWithCredentials}
									>
										{isSigningUpWithCredentials ? (
											<Loader2 size={16} className="animate-spin" />
										) : (
											"Create an account"
										)}
									</Button>
								</Field>
							</FieldGroup>
						</form>
					</CardContent>
				</Card>
				<p className="mt-4 text-center">
					Already have an account?{" "}
					<Link
						to="/sign-in"
						className="text-primary underline hover:text-primary/80"
					>
						Sign in
					</Link>
				</p>
			</div>
		</div>
	);
}
