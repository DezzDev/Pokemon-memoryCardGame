import { PokemonMin } from "../../types/Pokemon";
import "./CardPokemon.css";

const types = [
	{
		name: "normal",
		backgroundColor: "#A8A77A", // Verde oliva suave
		textColor: "#FFFFFF", // Blanco
	},
	{
		name: "fighting",
		backgroundColor: "#C22E28", // Rojo oscuro
		textColor: "#FFFFFF", // Blanco
	},
	{
		name: "flying",
		backgroundColor: "#A98FF3", // Púrpura claro
		textColor: "#FFFFFF", // Blanco
	},
	{
		name: "poison",
		backgroundColor: "#A33EA1", // Violeta
		textColor: "#FFFFFF", // Blanco
	},
	{
		name: "ground",
		backgroundColor: "#E2BF65", // Beige arenoso
		textColor: "#000000", // Negro
	},
	{
		name: "rock",
		backgroundColor: "#B6A136", // Marrón piedra
		textColor: "#FFFFFF", // Blanco
	},
	{
		name: "bug",
		backgroundColor: "#A6B91A", // Verde claro
		textColor: "#000000", // Negro
	},
	{
		name: "ghost",
		backgroundColor: "#735797", // Púrpura oscuro
		textColor: "#FFFFFF", // Blanco
	},
	{
		name: "steel",
		backgroundColor: "#B7B7CE", // Gris acero
		textColor: "#000000", // Negro
	},
	{
		name: "fire",
		backgroundColor: "#EE8130", // Naranja
		textColor: "#000000", // Negro
	},
	{
		name: "water",
		backgroundColor: "#6390F0", // Azul claro
		textColor: "#FFFFFF", // Blanco
	},
	{
		name: "grass",
		backgroundColor: "#7AC74C", // Verde
		textColor: "#000000", // Negro
	},
	{
		name: "electric",
		backgroundColor: "#F7D02C", // Amarillo
		textColor: "#000000", // Negro
	},
	{
		name: "psychic",
		backgroundColor: "#F95587", // Rosa fuerte
		textColor: "#FFFFFF", // Blanco
	},
	{
		name: "ice",
		backgroundColor: "#96D9D6", // Azul hielo
		textColor: "#000000", // Negro
	},
	{
		name: "dragon",
		backgroundColor: "#6F35FC", // Morado oscuro
		textColor: "#FFFFFF", // Blanco
	},
	{
		name: "dark",
		backgroundColor: "#705746", // Marrón oscuro
		textColor: "#FFFFFF", // Blanco
	},
	{
		name: "fairy",
		backgroundColor: "#D685AD", // Rosa pastel
		textColor: "#000000", // Negro
	},
	{
		name: "stellar",
		backgroundColor: "#D4AF37", // Oro
		textColor: "#000000", // Negro
	},
	{
		name: "unknown",
		backgroundColor: "#68A090", // Gris neutral
		textColor: "#FFFFFF", // Blanco
	},
];


type props = {
	pokemon : 			PokemonMin,
	handleChoice : 	(card: PokemonMin)=> void,
	flipped: 				boolean | undefined,
	disabled:				boolean
}

export default function CardPokemon({
	pokemon, 
	handleChoice, 
	flipped,
	disabled
} : props) {

	const handleClick = ()=>{
		// while disabled false, we can call handleChoice
		if(!disabled){
			handleChoice(pokemon);
		}
	};

	const type = types.find(type => type.name === pokemon.type);

	return (
		<div
			className='relative cursor-pointer h-[176px] w-[128px] sm:h-[220px] sm:w-[160px] md:h-[275px] md:w-[200px]'
		>
			
			<div className={`card-content w-full h-full border-[1px] border-white ${flipped ? "flipped" : ""}`}>
				<div className={`front top-0 absolute  flex flex-col h-full w-full overflow-hidden ${pokemon.matched ? "flash" : ""} ${type ? `text-[${type.textColor}] bg-[${type.backgroundColor}]` : "text-[green]"}`}>
					<img
						className="h-full w-full block"
						src={pokemon.img}
						alt={pokemon.name + " img"}
					/>
					<p
						className="m-0 p-1 h-full flex justify-center items-center text-center press-start-2p-regular text-xs md:text-sm"
					>{pokemon.name}</p>
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