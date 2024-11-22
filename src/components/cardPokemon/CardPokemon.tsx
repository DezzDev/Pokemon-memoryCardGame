import { PokemonMin } from "../../types/Pokemon";
import "./CardPokemon.css";

const types = [
	{
		name: "normal",
		gradientFrom: "from-[#A8A77A]",
		gradientTo: "to-[#C5C8A7]",
		textColor: "text-black", // Blanco
	},
	{
		name: "fighting",
		gradientFrom: "from-[#C22E28]",
		gradientVia: "via-[#D1423C]",
		gradientTo: "to-[#D6534B]",
		textColor: "text-white", // Blanco
	},
	{
		name: "flying",
		gradientFrom: "from-[#A98FF3]",
		gradientVia: "via-[#B9A1F6]",
		gradientTo: "to-[#C2A9F9]",
		textColor: "text-white", // Blanco
	},
	{
		name: "poison",
		gradientFrom: "from-[#A33EA1]",
		gradientVia: "via-[#B14DB0]",
		gradientTo: "to-[#C25EC0]",
		textColor: "text-white", // Blanco
	},
	{
		name: "ground",
		gradientFrom: "from-[#E2BF65]",
		gradientVia: "via-[#EAD592]",
		gradientTo: "to-[#F1E6BA]",
		textColor: "text-black", // Negro
	},
	{
		name: "rock",
		gradientFrom: "from-[#B6A136]",
		gradientTo: "to-[#D6C360]",
		textColor: "text-white", // Blanco
	},
	{
		name: "bug",
		gradientFrom: "from-[#A6B91A]",
		gradientTo: "to-[#C7DC3C]",
		textColor: "text-black", // Negro
	},
	{
		name: "ghost",
		gradientFrom: "from-[#735797]",
		gradientTo: "to-[#8E6DB4]",
		textColor: "text-white", // Blanco
	},
	{
		name: "steel",
		gradientFrom: "from-[#B7B7CE]",
		gradientTo: "to-[#D1D1EB]",
		textColor: "text-black", // Negro
	},
	{
		name: "fire",
		gradientFrom: "from-[#EE8130]",
		gradientTo: "to-[#F5A051]",
		textColor: "text-black", // Negro
	},
	{
		name: "water",
		gradientFrom: "from-[#6390F0]",
		gradientTo: "to-[#87ABF6]",
		textColor: "text-white", // Blanco
	},
	{
		name: "grass",
		gradientFrom: "from-[#7AC74C]",
		gradientTo: "to-[#A3DE78]",
		textColor: "text-black", // Negro
	},
	{
		name: "electric",
		gradientFrom: "from-[#F7D02C]",
		gradientTo: "to-[#FFE66A]",
		textColor: "text-black", // Negro
	},
	{
		name: "psychic",
		gradientFrom: "from-[#F95587]",
		gradientTo: "to-[#FA789E]",
		textColor: "text-white", // Blanco
	},
	{
		name: "ice",
		gradientFrom: "from-[#96D9D6]",
		gradientTo: "to-[#B6ECE9]",
		textColor: "text-black", // Negro
	},
	{
		name: "dragon",
		gradientFrom: "from-[#6F35FC]",
		gradientTo: "to-[#945CFF]",
		textColor: "text-white", // Blanco
	},
	{
		name: "dark",
		gradientFrom: "from-[#705746]",
		gradientTo: "to-[#8A685A]",
		textColor: "text-white", // Blanco
	},
	{
		name: "fairy",
		gradientFrom: "from-[#D685AD]",
		gradientTo: "to-[#E7AFC9]",
		textColor: "text-black", // Negro
	},
	{
		name: "stellar",
		gradientFrom: "from-[#D4AF37]",
		gradientTo: "to-[#F0C961]",
		textColor: "text-black", // Negro
	},
	{
		name: "unknown",
		gradientFrom: "from-[#68A090]",
		gradientTo: "to-[#8EB8AA]",
		textColor: "text-white", // Blanco
	},
];




type props = {
	pokemon: PokemonMin,
	handleChoice: (card: PokemonMin) => void,
	flipped: boolean | undefined,
	disabled: boolean
}

export default function CardPokemon({
	pokemon,
	handleChoice,
	flipped,
	disabled
}: props) {

	const handleClick = () => {
		// while disabled false, we can call handleChoice
		if (!disabled) {
			handleChoice(pokemon);
		}
	};
	
	const type = types.find(type => type.name === pokemon.type);

	// const gradientFrom = type?.gradientFrom || "bg-slate-800";
	// const gradientVia = type?.gradientVia || "bg-slate-800";
	// const gradientTo = type?.gradientTo || "bg-slate-800";
	// const textColor = type?.textColor || "text-white";
	


	return (
		<div
			className='relative cursor-pointer h-[176px] w-[128px] sm:h-[220px] sm:w-[160px] md:h-[275px] md:w-[200px]'
		>

			<div className={`card-content w-full h-full border-[1px] border-white ${flipped ? "flipped" : ""}`}>
				<div className={`front top-0 absolute flex flex-col h-full w-full overflow-hidden bg-gradient-to-t ${type?.gradientFrom} ${type?.gradientVia} ${type?.gradientTo || ""} ${type?.textColor} ${pokemon.matched ? "flash" : ""} `}>
					<img
						className="h-full w-full block"
						src={pokemon.img}
						alt={pokemon.name + " img"}
					/>
					<p
						className="m-0 p-1 h-full flex justify-center items-center text-center press-start-2p-regular text-xs md:text-sm"
					>{pokemon.name.toLocaleUpperCase()}</p>
				</div>
				<img
					src="pokemon_card_backside.webp"
					alt="card back"
					className='back top-0 absolute'
					onClick={handleClick}
				/>
			</div>
		</div>
	);
}