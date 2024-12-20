import { cn } from "@/lib/utils";

type props = {
	children: React.ReactNode,
	style?: string
}

export function TypographyH1({ children,style }: props) {
	return (
		<h1 className={cn(`scroll-m-20 text-4xl md:text-5xl font-extrabold tracking-tight lg:text-7xl ${style}`)}>
			{children}
		</h1>
	);
}


export function TypographyH2({children,style}:props) {
	return (
		<h2 className={cn(`scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 ${style}`)}>
			{children}
		</h2>
	);
}

// export function TypographyH3() {
// 	return (
// 		<h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
// 			The Joke Tax
// 		</h3>
// 	);
// }

// export function TypographyP() {
// 	return (
// 		<p className="leading-7 [&:not(:first-child)]:mt-6">
// 			The king, seeing how much happier his subjects were, realized the error of
// 			his ways and repealed the joke tax.
// 		</p>
// 	);
// }