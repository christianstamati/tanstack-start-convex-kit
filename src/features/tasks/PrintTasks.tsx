import { api } from "convex/_generated/api";
import { useConvex } from "convex/react";
import { Button } from "@/components/ui/button";

export function PrintTasks() {
	const convex = useConvex();
	return (
		<Button
			onClick={async () => console.log(await convex.query(api.tasks.list))}
		>
			Print Tasks
		</Button>
	);
}
