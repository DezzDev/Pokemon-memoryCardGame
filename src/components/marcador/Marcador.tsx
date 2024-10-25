import { cn } from "@/lib/utils";


type props = {
	player1: boolean,
	player2: boolean,
	player1Points: number,
	player2Points: number,
	turns: number,
	twoPlayers: boolean
}

export default function Marcador({
	player1Points,
	player2Points,
	turns,
	player1,
	player2,
	twoPlayers
}: props) {
	return (

		<section className={twoPlayers ? "grid grid-cols-3 justify-center items-center w-full max-w-96 lg:max-w-4xl creepster-regular text-2xl" : "creepster-regular text-2xl"} >

			{twoPlayers ?
				<div className={cn("flex flex-col items-center", 
					player1 ? "text-yellow-400 scale-150 transition-all font-bold" : "player")}>
					<h2 >Player 1</h2>
					<span >{`${player1Points} `}</span>
				</div> 
				: ""
			}

			<h3 className="flex justify-center " >Turns: {turns}</h3>

			{
				twoPlayers ?
					<div className={cn("flex flex-col items-center",
						player2 ? "text-yellow-400 scale-150 transition-all font-bold" : "player")}>
						<h2 >Player 2</h2>
						<span >{`${player2Points} `}</span>
					</div>
					: ""
			}



		</section>
	);
}
