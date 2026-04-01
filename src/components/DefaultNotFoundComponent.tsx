import { Link, type NotFoundRouteProps } from "@tanstack/react-router";
import { ArrowLeftIcon, FileSearchIcon, HouseIcon } from "lucide-react";
import { Button, buttonVariants } from "./ui/button";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "./ui/empty";

export function DefaultNotFoundComponent(_props: NotFoundRouteProps) {
	return (
		<div className="flex h-svh min-w-0 flex-1 items-center justify-center p-4">
			<Empty className="max-w-fit border border-dashed bg-muted/20">
				<EmptyContent>
					<EmptyHeader>
						<EmptyMedia variant="icon">
							<FileSearchIcon />
						</EmptyMedia>
						<EmptyTitle>Page not found</EmptyTitle>
						<EmptyDescription>
							The page you are looking for does not exist or may have been
							moved.
						</EmptyDescription>
					</EmptyHeader>
					<div className="flex flex-wrap items-center justify-center gap-2">
						<Button onClick={() => window.history.back()} variant="outline">
							<ArrowLeftIcon />
							Go back
						</Button>
						<Link to="/" className={buttonVariants({ variant: "default" })}>
							<HouseIcon />
							Home
						</Link>
					</div>
				</EmptyContent>
			</Empty>
		</div>
	);
}
