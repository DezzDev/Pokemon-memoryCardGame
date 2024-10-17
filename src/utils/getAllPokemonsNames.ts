import { Pokemon } from "../types/Pokemon";


/**
 * 
 * @returns array of objects with name and id of Pokemon we want
 */
const fetchAllPokemon = async () => {
	console.log("fetch");
	const pokemonNames: string[] = [];
	// 1025
	for (let i = 1; i <= 20; i++) {
		const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
		if (!response.ok) {
			console.error("Error to fetch Pokemon");
		}

		const pokemon = await response.json() as Pokemon;

		pokemonNames.push(`{
				"name":"${pokemon.name}",
				"id":${pokemon.id},
        "img":"${pokemon.sprites.other?.["official-artwork"].front_default}"
			}`);
	}

	return pokemonNames;
};

/**
 * to download data from fetch
 */
export const generarArchivo = () => {
	console.log("generar archivo");
	fetchAllPokemon().then(data => {
		let contenido = data.join(",");

		contenido = `{"Pokemon":[${contenido}]}`;


		// creamos objeto blob con el contenido
		const blob = new Blob([contenido], { type: "application/json" });

		// crear enlace link
		const enlaceDescarga = document.createElement("a");
		enlaceDescarga.href = URL.createObjectURL(blob);

		// establecer el nombre del archivo
		enlaceDescarga.download = "pokemonName";

		// simular un click
		enlaceDescarga.click();

		// liberar recursos
		URL.revokeObjectURL(enlaceDescarga.href);

	})
		.catch(e => {
			console.error("Error:", e);
		});

};
