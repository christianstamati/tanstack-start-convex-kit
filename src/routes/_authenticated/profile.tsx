import { createFileRoute } from "@tanstack/react-router";
import type { Doc } from "convex/_generated/dataModel";
import type { ReactNode } from "react";
import { PageLayout } from "@/components/PageLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useMe } from "@/hooks/users";

export const Route = createFileRoute("/_authenticated/profile")({
	component: Profile,
});

function formatTimestamp(value: number | undefined) {
	if (value === undefined) {
		return "—";
	}
	return new Intl.DateTimeFormat(undefined, {
		dateStyle: "medium",
		timeStyle: "short",
	}).format(new Date(value));
}

function formatOptional(value: string | boolean | undefined) {
	if (value === undefined) {
		return "—";
	}
	if (typeof value === "boolean") {
		return value ? "Yes" : "No";
	}
	return value === "" ? "—" : value;
}

function ProfileField({
	label,
	value,
	className,
}: {
	label: string;
	value: ReactNode;
	className?: string;
}) {
	return (
		<div className={className}>
			<dt className="font-medium text-muted-foreground text-xs">{label}</dt>
			<dd className="wrap-break-word mt-0.5 text-sm">{value}</dd>
		</div>
	);
}

function userFields(user: Doc<"users">) {
	return (
		<dl className="grid gap-4 sm:grid-cols-2">
			<ProfileField
				label="User ID"
				value={<span className="font-mono text-xs">{user._id}</span>}
			/>
			<ProfileField
				label="Account created"
				value={formatTimestamp(user._creationTime)}
			/>
			<ProfileField label="Name" value={formatOptional(user.name)} />
			<ProfileField label="Email" value={formatOptional(user.email)} />
			<ProfileField
				label="Email verified at"
				value={formatTimestamp(user.emailVerificationTime)}
			/>
			<ProfileField label="Phone" value={formatOptional(user.phone)} />
			<ProfileField
				label="Phone verified at"
				value={formatTimestamp(user.phoneVerificationTime)}
			/>
			<ProfileField
				label="Anonymous account"
				value={formatOptional(user.isAnonymous)}
			/>
			<ProfileField
				className="sm:col-span-2"
				label="Profile image URL"
				value={
					user.image ? (
						<span className="font-mono text-xs">{user.image}</span>
					) : (
						"—"
					)
				}
			/>
		</dl>
	);
}

function Profile() {
	const { data: user, isLoading } = useMe();

	if (isLoading) {
		return (
			<PageLayout title="Profile">
				<div className="mx-auto w-full max-w-4xl space-y-4">
					<Card>
						<CardHeader className="space-y-2">
							<Skeleton className="h-6 w-48" />
							<Skeleton className="h-4 w-full max-w-md" />
						</CardHeader>
						<CardContent className="space-y-3">
							<Skeleton className="h-24 w-full" />
							<Skeleton className="h-4 w-full" />
							<Skeleton className="h-4 w-full" />
						</CardContent>
					</Card>
				</div>
			</PageLayout>
		);
	}

	if (!user) {
		return (
			<PageLayout title="Profile">
				<p className="text-muted-foreground text-sm">
					Could not load your profile.
				</p>
			</PageLayout>
		);
	}

	return (
		<PageLayout title="Profile">
			<div className="mx-auto w-full">
				<Card>
					<CardHeader>
						<div className="flex flex-col gap-4 sm:flex-row sm:items-center">
							<Avatar className="size-16">
								<AvatarImage src={user.image} alt={user.name ?? ""} />
								<AvatarFallback className="text-lg">
									{(user.name ?? user.email ?? "?").slice(0, 2).toUpperCase()}
								</AvatarFallback>
							</Avatar>
							<div>
								<CardTitle>{user.name ?? "No name"}</CardTitle>
								<CardDescription>{user.email ?? "No email"}</CardDescription>
							</div>
						</div>
					</CardHeader>
					<CardContent>{userFields(user)}</CardContent>
				</Card>
			</div>
		</PageLayout>
	);
}
