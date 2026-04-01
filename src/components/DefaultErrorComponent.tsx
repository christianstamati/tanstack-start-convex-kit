import type { ErrorComponentProps } from "@tanstack/react-router";
import { Link, rootRouteId, useMatch, useRouter } from "@tanstack/react-router";
import {
	AlertTriangleIcon,
	ArrowLeftIcon,
	HouseIcon,
	RefreshCcwIcon,
} from "lucide-react";
import { Button, buttonVariants } from "./ui/button";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "./ui/empty";

export function DefaultErrorComponent({ error }: ErrorComponentProps) {
	const router = useRouter();
	const isRoot = useMatch({
		strict: false,
		select: (state) => state.id === rootRouteId,
	});
	const message =
		error instanceof Error
			? error.message
			: "Something went wrong while loading this page.";
	return (
		<div className="flex h-svh min-w-0 flex-1 items-center justify-center p-4">
			<Empty className="max-w-fit border border-dashed bg-muted/20">
				<EmptyContent>
					<EmptyHeader>
						<EmptyMedia variant="icon">
							<AlertTriangleIcon />
						</EmptyMedia>
						<EmptyTitle>Something went wrong</EmptyTitle>
						<EmptyDescription>{message}</EmptyDescription>
					</EmptyHeader>
					<div className="flex flex-wrap items-center justify-center gap-2">
						<Button
							onClick={() => {
								void router.invalidate();
							}}
						>
							<RefreshCcwIcon />
							Try again
						</Button>
						{isRoot ? (
							<Link to="/" className={buttonVariants({ variant: "outline" })}>
								<HouseIcon />
								Home
							</Link>
						) : (
							<Link
								to="/"
								className={buttonVariants({ variant: "outline" })}
								onClick={(e) => {
									e.preventDefault();
									window.history.back();
								}}
							>
								<ArrowLeftIcon />
								Go back
							</Link>
						)}
					</div>
				</EmptyContent>
			</Empty>
		</div>
	);
}
