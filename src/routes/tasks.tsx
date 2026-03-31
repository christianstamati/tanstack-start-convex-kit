import { createFileRoute, Link } from "@tanstack/react-router";
import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";
import { UserInfo } from "@/components/UserInfo";
import { PrintTasks } from "@/features/tasks/PrintTasks";
import { TaskList } from "@/features/tasks/TaskList";

export const Route = createFileRoute("/tasks")({ component: App });

function App() {
	return (
		<div className="mx-auto flex max-w-md flex-col gap-4 p-4">
			<AuthLoading>Loading...</AuthLoading>
			<Unauthenticated>
				<div className="flex flex-col gap-2">
					<p>Unauthenticated</p>
					<Link to="/sign-in">Sign in</Link>
				</div>
			</Unauthenticated>
			<Authenticated>
				<UserInfo />
				<TaskList />
				<PrintTasks />
			</Authenticated>
		</div>
	);
}
