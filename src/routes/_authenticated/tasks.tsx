import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { UserInfo } from "@/components/UserInfo";
import { TaskList } from "@/features/tasks/TaskList";

export const Route = createFileRoute("/_authenticated/tasks")({
	component: App,
});

function App() {
	return (
		<PageLayout title="Tasks">
			<div className="mx-auto flex w-full flex-col gap-6">
				<UserInfo />
				<TaskList />
			</div>
		</PageLayout>
	);
}
