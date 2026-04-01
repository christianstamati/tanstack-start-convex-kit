import { useForm, useStore } from "@tanstack/react-form";
import { createFileRoute } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
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
import { useEmailVerification } from "@/hooks/auth";

export const Route = createFileRoute("/_unauthenticated/verify-email")({
	validateSearch: (search: Record<string, unknown>): { email?: string } => {
		const raw = search.email;
		const str = typeof raw === "string" ? raw.trim() : undefined;
		if (!str) return {};
		const parsed = z.email().safeParse(str);
		return parsed.success ? { email: parsed.data } : {};
	},
	component: RouteComponent,
});

const formSchema = z.object({
	code: z.string().min(1, "Verification code is required"),
});

function RouteComponent() {
	const { email } = Route.useSearch();

	const { mutate: verifyEmail, isPending } = useEmailVerification({
		onSuccess: () => {
			toast.success("Email verified");
		},
		onError: () => {
			toast.error("Invalid or expired verification code");
		},
	});

	const form = useForm({
		defaultValues: {
			code: "",
		},
		validators: {
			onSubmit: formSchema,
		},
		onSubmit: ({ value }) => {
			if (!email) {
				toast.error("Invalid verification link");
				return;
			}
			verifyEmail({
				code: value.code,
				email,
				redirectTo: "/tasks",
			});
		},
	});

	const isSubmitting = useStore(form.store, (state) => state.isSubmitting);
	const submitting = isSubmitting || isPending;

	if (!email) {
		return (
			<div className="flex min-h-screen w-full items-center justify-center bg-muted p-4">
				<Card className="w-full max-w-md">
					<CardHeader className="space-y-2">
						<CardTitle className="text-lg md:text-xl">Invalid Link</CardTitle>
						<CardDescription className="text-xs md:text-sm">
							This verification link is missing a valid email. Open the link
							from your verification email, or sign in to request a new one.
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
					<CardTitle className="text-lg md:text-xl">Verify email</CardTitle>
					<CardDescription className="text-xs md:text-sm">
						Enter the code sent to {email}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form
						id="verify-email-form"
						onSubmit={(e) => {
							e.preventDefault();
							form.handleSubmit();
						}}
					>
						<FieldGroup className="grid gap-4">
							<form.Field name="code">
								{(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									return (
										<Field data-invalid={isInvalid}>
											<FieldLabel htmlFor={field.name}>
												Verification code
											</FieldLabel>
											<Input
												id={field.name}
												name={field.name}
												required
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
												aria-invalid={isInvalid}
												autoComplete="one-time-code"
												placeholder="Enter your code"
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
									form="verify-email-form"
									className="w-full"
									disabled={submitting}
								>
									{submitting ? (
										<Loader2 size={16} className="animate-spin" />
									) : (
										"Verify email"
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
