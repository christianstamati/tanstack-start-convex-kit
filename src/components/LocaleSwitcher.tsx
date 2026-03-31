import { ChevronDown, Languages } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
	assertIsLocale,
	getLocale,
	locales,
	setLocale,
} from "@/paraglide/runtime.js";

const LOCALE_LABELS = {
	en: "English",
	de: "Deutsch",
	it: "Italiano",
} as const;

export function LocaleSwitcher({ className }: { className?: string }) {
	const current = getLocale();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				className={cn(
					buttonVariants({ variant: "outline", size: "sm" }),
					"gap-1.5 font-normal",
					className,
				)}
				aria-label="Language"
			>
				<Languages className="size-4 opacity-70" />
				<span>
					{LOCALE_LABELS[current as keyof typeof LOCALE_LABELS] ?? current}
				</span>
				<ChevronDown className="size-3.5 opacity-50" />
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuGroup>
					<DropdownMenuLabel>Language</DropdownMenuLabel>
					<DropdownMenuRadioGroup
						value={current}
						onValueChange={(value) => {
							if (typeof value !== "string" || value === current) {
								return;
							}
							setLocale(assertIsLocale(value));
						}}
					>
						{locales.map((locale) => (
							<DropdownMenuRadioItem key={locale} value={locale} closeOnClick>
								{LOCALE_LABELS[locale as keyof typeof LOCALE_LABELS] ?? locale}
							</DropdownMenuRadioItem>
						))}
					</DropdownMenuRadioGroup>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
