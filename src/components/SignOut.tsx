import { useAuthActions } from "@convex-dev/auth/react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";

export function SignOut() {
	const { signOut } = useAuthActions();
	const queryClient = useQueryClient();
	return (
		<Button
			onClick={() => {
				queryClient.clear();
				void signOut();
			}}
		>
			Sign out
		</Button>
	);
}
