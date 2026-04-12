import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";
import { AppSidebar } from "@/components/AppSidebar";
import { Spinner } from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export const Route = createFileRoute("/_authenticated")({
	component: RouteComponent,
});

function CenterContent({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex h-svh w-full items-center justify-center">
			{children}
		</div>
	);
}

function RouteComponent() {
	return (
		<>
			<AuthLoading>
				<CenterContent>
					<Spinner />
				</CenterContent>
			</AuthLoading>
			<Unauthenticated>
				<CenterContent>
					<Card className="w-full max-w-md">
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
				</CenterContent>
			</Unauthenticated>
			<Authenticated>
				<SidebarProvider>
					<AppSidebar />
					<SidebarInset className="flex min-h-svh min-w-0 flex-col">
						<Outlet />
					</SidebarInset>
				</SidebarProvider>
			</Authenticated>
		</>
	);
}
