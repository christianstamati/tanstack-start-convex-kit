import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated")({
	component: RouteComponent,
});

function CenteredShell({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<div className={cn("flex items-center justify-center p-4", className)}>
			{children}
		</div>
	);
}

function RouteComponent() {
	return (
		<>
			<AuthLoading>
				<CenteredShell className="h-fit">
					<Card className="w-full max-w-md" size="sm">
						<CardHeader className="space-y-2">
							<Skeleton className="h-4 w-28" />
							<Skeleton className="h-3 w-full" />
						</CardHeader>
						<CardContent>
							<Skeleton className="h-8 w-full rounded-lg" />
						</CardContent>
					</Card>
				</CenteredShell>
			</AuthLoading>
			<Unauthenticated>
				<CenteredShell>
					<Card className="w-full max-w-md" size="sm">
						<CardHeader>
							<CardTitle>Sign in required</CardTitle>
							<CardDescription>
								Sign in to continue to this area of the app.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Button
								nativeButton={false}
								render={(props) => <Link {...props} to="/sign-in" />}
							>
								Sign in
							</Button>
						</CardContent>
					</Card>
				</CenteredShell>
			</Unauthenticated>
			<Authenticated>
				<Outlet />
			</Authenticated>
		</>
	);
}
