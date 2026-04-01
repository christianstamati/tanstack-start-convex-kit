import { useForm } from "@tanstack/react-form";
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
import { useResetVerification } from "@/features/auth/hooks";

const formSchema = z
	.object({
		email: z.email("Invalid email address").min(1, "Email is required"),
		password: z
			.string()
			.min(1, "Password is required")
			.min(8, "Password must be at least 8 characters")
			.max(128, "Password must be at most 128 characters"),
		confirmPassword: z.string().min(1, "Please confirm your password"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

type ResetPasswordProps = {
	token?: number;
};

export function ResetPassword({ token }: ResetPasswordProps) {
	const { mutate: resetVerification, isPending } = useResetVerification({
		onSuccess: () => {
			toast.success("Password reset successfully");
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	const form = useForm({
		defaultValues: {
			email: "",
			password: "",
			confirmPassword: "",
		},
		validators: {
			onSubmit: formSchema,
		},
		onSubmit: ({ value }) => {
			if (!token) {
				toast.error("Invalid reset token");
				return;
			}

			resetVerification({
				token: token.toString(),
				email: value.email,
				newPassword: value.password,
				redirectTo: "/tasks",
			});
		},
	});

	if (!token) {
		return (
			<div className="flex min-h-screen w-full items-center justify-center bg-muted p-4">
				<Card className="w-full max-w-md">
					<CardHeader className="space-y-2">
						<CardTitle className="text-lg md:text-xl">Invalid Link</CardTitle>
						<CardDescription className="text-xs md:text-sm">
							This password reset link is invalid or has expired. Please request
							a new one.
						</CardDescription>
					</CardHeader>
				</Card>
			</div>
		);
	}

	return (
		<div className="flex min-h-screen w-full items-center justify-center p-4">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle className="text-lg md:text-xl">Reset Password</CardTitle>
					<CardDescription className="text-xs md:text-sm">
						Enter your new password below
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form
						id="reset-password-form"
						onSubmit={(e) => {
							e.preventDefault();
							form.handleSubmit();
						}}
					>
						<FieldGroup className="grid gap-4">
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
												required
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
												aria-invalid={isInvalid}
												autoComplete="email"
												placeholder="Enter your email"
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
											<FieldLabel htmlFor={field.name}>New Password</FieldLabel>
											<PasswordInput
												id={field.name}
												name={field.name}
												required
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
												aria-invalid={isInvalid}
												autoComplete="new-password"
												placeholder="Enter your new password"
											/>
											{isInvalid && (
												<FieldError errors={field.state.meta.errors} />
											)}
										</Field>
									);
								}}
							</form.Field>
							<form.Field name="confirmPassword">
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
												placeholder="Confirm your new password"
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
									form="reset-password-form"
									className="w-full"
									disabled={isPending}
								>
									{isPending ? (
										<Loader2 size={16} className="animate-spin" />
									) : (
										"Reset Password"
									)}
								</Button>
							</Field>
						</FieldGroup>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
