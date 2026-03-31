import { Trash } from "lucide-react";
import { type SubmitEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	useCreateTask,
	useRemoveAllTasks,
	useRemoveTask,
	useTasks,
	useUpdateTask,
} from "@/hooks/tasks";
import { TaskItem } from "./TaskItem";

export function TaskList() {
	const { data: tasks } = useTasks();
	const { mutate: createTask } = useCreateTask();
	const { mutate: updateTask } = useUpdateTask();
	const { mutate: removeTask } = useRemoveTask();
	const { mutate: removeAllTasks } = useRemoveAllTasks();

	const [draft, setDraft] = useState("");

	function handleAdd(e: SubmitEvent<HTMLFormElement>) {
		e.preventDefault();
		const text = draft.trim();
		if (!text) return;
		void createTask({ text });
		setDraft("");
	}
	return (
		<Card>
			<CardHeader className="flex items-center justify-between">
				<CardTitle>Tasks</CardTitle>
				<Button
					variant="destructive"
					size={"icon"}
					onClick={() => removeAllTasks()}
				>
					<Trash />
				</Button>
			</CardHeader>
			<CardContent className="space-y-4">
				<form onSubmit={handleAdd} className="flex gap-2">
					<Input
						className="flex-1"
						value={draft}
						onChange={(e) => setDraft(e.target.value)}
						placeholder="New task"
						aria-label="New task"
					/>
					<Button type="submit">Add</Button>
				</form>
				<ul className="space-y-2">
					{tasks?.map((task) => (
						<TaskItem
							key={task._id}
							task={task}
							onUpdate={(payload) => updateTask({ id: task._id, payload })}
							onRemove={() => removeTask({ id: task._id })}
						/>
					))}
				</ul>
			</CardContent>
		</Card>
	);
}
