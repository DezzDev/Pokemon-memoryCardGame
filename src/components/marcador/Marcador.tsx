import { useCardStyle } from "@/context/CardStyleContext/useCardStyle";

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

	// cardStyle context
	const {cardStyle} = useCardStyle();
	let text = "";
	if(cardStyle.type === "pixel"){
		text = "press-start-2p-regular";
	}else{
		// default
		text = ".poppins-regular";
	}

	
	return (

		<section className={`grid grid-cols-3 justify-around w-full text-center text-outline drop-shadow ${text} md:text-xl`}>
			<div>
				{twoPlayers
					? <div className={player1 ? "text-yellow-500 font-bold scale-150 transition-all " : ""}>
						<h2 >Player 1</h2>
						<span >{`${player1Points} `}</span>
					</div>
					: ""
				}

			</div>

			<h3 className="" >Turns: {turns}</h3>

			<div>
				{
					twoPlayers
						? <div className={player2 ? "text-yellow-500 font-bold scale-150 transition-all" : ""}>
							<h2 >Player 2</h2>
							<span >{`${player2Points} `}</span>
						</div>
						: ""
				}
			</div>


		</section>
	);
}
