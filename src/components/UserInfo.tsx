import { useMe } from "@/hooks/users";
import { SignOut } from "./SignOut";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export function UserInfo() {
	const { data: user, isLoading } = useMe();

	if (isLoading) {
		return (
			<Card>
				<CardHeader className="space-y-2">
					<Skeleton className="h-7 w-[min(100%,14rem)]" />
					<Skeleton className="h-4 w-[min(100%,12rem)]" />
				</CardHeader>
				<CardContent>
					<Skeleton className="h-9 w-24" />
				</CardContent>
			</Card>
		);
	}

	if (!user) {
		return <div>User not found</div>;
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Welcome back, {user.name}</CardTitle>
				<CardDescription>{user.email}</CardDescription>
			</CardHeader>
			<CardContent>
				<SignOut />
			</CardContent>
		</Card>
	);
}
