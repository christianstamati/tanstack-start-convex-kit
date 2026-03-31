import type { Doc } from "convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function TaskItem({
	task,
	onUpdate,
	onRemove,
}: {
	task: Doc<"tasks">;
	onUpdate: (payload: { text?: string; isCompleted?: boolean }) => void;
	onRemove: () => void;
}) {
	return (
		<li className="flex items-center gap-2">
			<Checkbox
				checked={task.isCompleted}
				onCheckedChange={(checked) =>
					onUpdate({ isCompleted: checked === true })
				}
				aria-label="Completed"
			/>
			<Input
				className={cn(
					"min-w-0 flex-1",
					task.isCompleted && "line-through opacity-70",
				)}
				defaultValue={task.text}
				onBlur={(e) => {
					const next = e.target.value.trim();
					if (!next || next === task.text) return;
					onUpdate({ text: next });
				}}
			/>
			<Button type="button" variant="destructive" size="sm" onClick={onRemove}>
				Delete
			</Button>
		</li>
	);
}
