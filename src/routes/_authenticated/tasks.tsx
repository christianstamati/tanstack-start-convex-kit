import { createFileRoute } from "@tanstack/react-router";
import { UserInfo } from "@/components/UserInfo";
import { PrintTasks } from "@/features/tasks/PrintTasks";
import { TaskList } from "@/features/tasks/TaskList";

export const Route = createFileRoute("/_authenticated/tasks")({
	component: App,
});

function App() {
	return (
		<div className="mx-auto flex w-full max-w-md flex-col gap-4 pt-4">
			<UserInfo />
			<TaskList />
			<PrintTasks />
		</div>
	);
}
