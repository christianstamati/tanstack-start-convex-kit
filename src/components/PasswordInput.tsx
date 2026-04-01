import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";

export default function PasswordInput(
	props: React.ComponentProps<typeof Input>,
) {
	const [isVisible, setIsVisible] = useState<boolean>(false);

	const toggleVisibility = () => setIsVisible((prevState) => !prevState);

	const { className, type, ...restProps } = props;

	return (
		<div className="relative">
			<Input
				className={cn("pe-9", className)}
				type={isVisible ? "text" : "password"}
				name="password"
				placeholder="Password"
				required
				aria-controls="password"
				autoComplete="current-password"
				{...restProps}
			/>
			<button
				aria-controls={props.id || props.name}
				aria-label={isVisible ? "Hide password" : "Show password"}
				aria-pressed={isVisible}
				className="absolute inset-e-0 inset-y-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80 outline-none transition-[color,box-shadow] hover:text-foreground focus:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
				onClick={toggleVisibility}
				type="button"
			>
				{isVisible ? (
					<EyeOffIcon aria-hidden="true" size={16} />
				) : (
					<EyeIcon aria-hidden="true" size={16} />
				)}
			</button>
		</div>
	);
}
