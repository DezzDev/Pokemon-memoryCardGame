import { useState, useEffect, useMemo } from "react";
import { Pokemon, PokemonMin, PokemonName } from "./types/Pokemon";
import { generateRandomNum } from "./utils/generateRandom";

//components
import CardPokemon from "./components/cardPokemon/CardPokemon";
import Loading from "./components/loading/Loading";
import Marcador from "./components/marcador/Marcador";

// external libraries
import JSConfetti from "js-confetti";
import Swal from "sweetalert2";


// chadcn ui



import { Button } from "@/components/ui/button";
import { TypographyH1 } from "./components/typography";
import { SheetSetting } from "./components/settings/sheetSettings";
import { toast } from "sonner";

// css
import "./App.css";
import { useCardStyle } from "./context/CardStyleContext/useCardStyle";

function App() {

	// const url = "https://pokeapi.co/api/v2/pokemon";

	// array to store pokemons data
	const [ pokemons, setPokemons ] = useState<PokemonMin[] | null>(null);
	//game turns
	const [ turns, setTurns ] = useState(0);
	// states to store the cards choices
	const [ choiceOne, setChoiceOne ] = useState<PokemonMin | null>(null);
	const [ choiceTwo, setChoiceTwo ] = useState<PokemonMin | null>(null);
	// to disabled clicked card 
	const [ disabled, setDisabled ] = useState(false);
	// to know when the game is finished
	const [ gameEnd, setGameEnd ] = useState(false);
	// state to loading
	const [ loading, setLoading ] = useState(false);

	// state to know how many pokemons we want
	const [ pkmCount, setPkmCount ] = useState<number>(3);
	// state to know selected card manually
	const [ cardsManually, setCardsManually ] = useState<PokemonName[]>([]);
	// to know if fetch is randomly or manually
	const [ manually, setManually ] = useState(false);
	// to set the width of cards container
	const [ width, setWidth ] = useState("");
	// player points
	const [ player1Points, setPlayer1Points ] = useState(0);
	const [ player2Points, setPlayer2Points ] = useState(0);
	// to know player turn
	const [ player1, setPlayer1 ] = useState(false);
	const [ player2, setPlayer2 ] = useState(false);
	// to know if are two players
	const [ twoPlayers, setTwoPlayers ] = useState(false);



	// create confetti instance
	const jsConfetti = useMemo(() => new JSConfetti(), []);

	// cardStyle context
	const {cardStyle} = useCardStyle();
	let text = "";
	if(cardStyle.type === "pixel"){
		text = "press-start-2p-regular";
	}else{
		// default
		text = ".poppins-regular";
	}


	/**
	 * to get randomly Pokémon from data
	 * @param pkmsCount number of pokemon thats was selected
	 * @returns Array with the number of Pokemon that have been specified
	 */
	const getPokemonRandomly = async (pkmsCount: number) => {
		const url = "https://pokeapi.co/api/v2/pokemon/";
		const pokemonFetchPromises = [];


		// function to generate as many random numbers as specified
		const randomNums = generateRandomNum(1, 1024, pkmsCount);


		for (let i = 0; i < randomNums.length; i++) {
			const randomNum = randomNums[ i ];
			const promise = fetch(url + "/" + randomNum).then(response => {
				if (!response.ok) {
					throw new Error(`fetching error Pokemon: ${response.statusText}`);
				}
				return response.json() as Promise<Pokemon>;
			});
			pokemonFetchPromises.push(promise);

		}
		const data: Pokemon[] = await Promise.all(pokemonFetchPromises);
		const dataReturn: PokemonMin[] = data.map(pokemon => {
			return { name: pokemon.name, id: pokemon.id, img: pokemon.sprites, matched: false, type:pokemon.types[0].type.name };
		});

		return dataReturn;


	};


	/**
	 * to get manually Pokémon from data
	 * @param cards array of cards that we will find
	 * @returns Array with the number of Pokemon that have been specified
	 */
	const getPokemonManually = async (cards: PokemonName[]) => {
		const url = "https://pokeapi.co/api/v2/pokemon/";

		const fetchPromises = [];

		for (let i = 0; i < cards.length; i++) {
			const cardSelected = cards[ i ];

			const promise = fetch(`${url}/${cardSelected.id}`).then(response => {
				if (!response.ok) {
					throw new Error(`Error fetching: ${response.statusText}`);
				}
				return response.json() as Promise<Pokemon>;
			});

			fetchPromises.push(promise);

		}

		const data = await Promise.all(fetchPromises);

		const dataReturn:PokemonMin[] = data.map(pokemon => {
			return { id: pokemon.id, name: pokemon.name, img: pokemon.sprites, matched: false, type:pokemon.types[0].type.name };
		});
		// return pokemon
		return dataReturn;

	};



	/**
	 * 
	 * @param data array of Pokemon
	 * @returns array of PokemonMin 
	 */
	// const toPokemonMin = (data: Pokemon[]) => {
	// 	return data.map(item => {
	// 		return {
	// 			id: item.id,
	// 			img: item.sprites.other?.["official-artwork"].front_default,
	// 			name: item.name,
	// 			matched: false
	// 		};
	// 	});
	// };

	/**
	 * sort randomly element 
	 * @param array data to sort randomly
	 * @returns clone array with element sort randomly
	 */
	const shuffleArray = (array: PokemonMin[]) => {
		const cloneArray: PokemonMin[] = [ ...array ];
		for (let i = cloneArray.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[ cloneArray[ i ], cloneArray[ j ] ] = [ cloneArray[ j ], cloneArray[ i ] ];
		}
		return cloneArray;
	};
	
	/**
	 * duplicate array and add index to each card, this way we can differentiate every card 
	 * @param data array with pokemon
	 * @returns array with pokemon duplicate and each pokemon with index property
	 */
	const duplicatePokemon = (data: PokemonMin[]) => {
		return [ ...data, ...data ]
			.map((pokemon, index) => (
				{ ...pokemon, index }
			));
	};

	/**
	 * function to prepare deck
	 * duplicate Pokemon and sort randomly
	 * @param data Array with Pokémon

	 */
	const prepareDeck = (data: PokemonMin[]) => {



		// duplicate cards and add index param to get final deck
		const duplicatedPokemon = duplicatePokemon(data);
		// sort randomly
		const finalDeck = shuffleArray(duplicatedPokemon);
		return finalDeck;

	};

	/**

	 * set width of board
	 * @param pkmNumber numbers of pkms
	 * @returns 
	 */
	const setWidthClass = (pkmNumber: number) => {
		// set the width of board
		if (pkmNumber === 3) {
			setWidth("width-3-cards");
			return;
		}

		if (pkmNumber === 4) {
			setWidth("width-4-cards");
			return;
		}
		if (pkmNumber === 5) {
			setWidth("width-5-cards");
			return;
		}
		if (pkmNumber === 6) {
			setWidth("width-6-cards");
			return;
		}
		if (pkmNumber === 7) {
			setWidth("width-7-cards");
			return;
		}
		if (pkmNumber >= 8) {
			setWidth("width-8-cards");
			return;
		}
	};

	/**
	 * Get the numbers of Pokémon and set pkmsCount
	 * call fetchData to get Pokémon
	 * call shuffleCard to duplicate and sort randomly 
	 * @param e event of click
	 */
	const newGame = async () => {

		if(pkmCount > 13){
			toast.error("Maximum number of pairs of cards is 13");
			return;
		}
		//set player1 to first
		setPlayer1(true);
		// set player2 to second
		setPlayer2(false);
		// reset players points
		setPlayer1Points(0);
		setPlayer2Points(0);

		// reset pokemons data
		setPokemons(null);
		// set width 
		setWidthClass(pkmCount);
		// set choices to null
		setChoiceOne(null);
		setChoiceTwo(null);
		// resets turns
		setTurns(0);

		// if manually
		if (manually) {

			// check how many tags are 
			if (cardsManually.length !== pkmCount) {

				toast.error(`You must select ${pkmCount} Pokemon`);

				return;
			}


			// set loading
			setLoading(true);

			// get pokemon manually
			const pokemonManually = await getPokemonManually(cardsManually);


			const deck = prepareDeck(pokemonManually);
			setPokemons(deck);

			setLoading(false);


		} else {


			// set loading
			setLoading(true);

			// get Pokemon randomly
			const pokemonRandomly = await getPokemonRandomly(pkmCount);


			const deck = prepareDeck(pokemonRandomly);

			setPokemons(deck);

			setLoading(false);

		}
	};

	/**
	 * get the cards when click over there 
	 * @param card data Pokémon
	 */

	const handleChoice = (card: PokemonMin) => {
		if (choiceOne) {
			if (choiceOne === card) {
				setChoiceTwo(null);
			} else {
				setChoiceTwo(card);
			}
		} else {
			setChoiceOne(card);
		}

	};

	/**
		 * reset choices and add one turn (next turn) 
		 */

	const nextTurn = () => {
		setChoiceOne(null);
		setChoiceTwo(null);
		setTurns(prevTurns => prevTurns + 1);
		setDisabled(false);
	};

	/** 
	 * launch confetti and alert wen the game end
	 */
	const confetti = () => {
		setTimeout(() => {
			// confetti
			void jsConfetti.addConfetti({
				
				confettiNumber: 3000

			});

			// if two players
			if (twoPlayers) {

				// select the winner
				const winner = player1Points > player2Points ?
					"Player 1"
					: player2Points > player1Points ?
						"Player 2"
						: "Tie";

				void Swal.fire({
					title: winner,
					icon: "success",
					iconHtml: `<svg width="80px" height="80px" viewBox="0 0 1024 1024" class="icon" version="1.1"
							xmlns="http://www.w3.org/2000/svg">
							<path d="M454.5 675.5l-32.4 107.9h181.8L574.5 678" fill="#FBBA22" />
							<path d="M510.1 682.3c215.1 0 215.1-165.2 215.1-165.2V197.4H300.9v319.7s0 165.2 215.1 165.2h-5.9z" fill="#FBBA22" />
							<path d="M515.4 783.4h91.1s89.5 2.3 89.5 80.8H332.4c0-78.6 89.5-80.8 89.5-80.8H513" fill="#C04931" />
							<path d="M816.5 383.8V259.3c0-11.2-9-20.2-20.2-20.2h-50.9v-41.7c0-11.2-9-20.2-20.2-20.2H300.9c-11.2 0-20.2 9-20.2 20.2v41.7h-50.9c-11.2 0-20.2 9-20.2 20.2v124.5c0 1.2-0.7 42.2 27.2 70.9 11.7 12 26.5 19.9 43.9 23.8v38.6c0 1.6 2.1 135.7 147.8 174.7l-21.8 72.7c-39 5.7-94.5 31.2-94.5 99.7 0 11.2 9 20.2 20.2 20.2H696c11.2 0 20.2-9 20.2-20.2 0-69.6-57.2-94.7-96.6-99.9l-20.4-72.9c144.1-39.6 146.2-172.7 146.2-174.3v-38.6c17.4-3.9 32.1-11.8 43.9-23.8 27.9-28.7 27.2-69.7 27.2-70.9z m-550.8 42.7c-16-16.4-15.8-41.9-15.8-42.1V279.6h30.7v156.7c-5.7-2.4-10.8-5.6-14.9-9.8z m338.2 377.1c0.1 0 0.1 0 0 0h2c6.2 0.2 54 3 66.8 40.4h-317c12.8-37.4 60.5-40.2 66.2-40.4h182z m-154.6-40.4l19.1-63.6c12.5 1.6 25.9 2.5 40.1 2.8 0.5 0 1.1 0.1 1.6 0.1h5.9c0.5 0 1.1 0 1.6-0.1 14.9-0.3 28.8-1.3 41.9-3l17.9 63.9H449.3zM705 517c-0.1 5.9-3.5 143.6-191.9 145-17.6-0.1-33.6-1.4-48.1-3.7-1.5-0.9-3-1.7-4.7-2.2-3.2-0.9-6.3-1-9.4-0.4-127.1-27.3-129.7-133.5-129.8-138.6V217.6H705V517z m55.3-90.5c-4.1 4.2-9.1 7.4-15 9.8V279.5H776v104.8c0.1 0.3 0.3 25.8-15.7 42.2z" fill="#211F1E" />
							<path d="M446.7 449.5l-11.2 65.2c-1 5.7 1.4 11.4 6 14.8 4.7 3.4 10.8 3.8 16 1.1l58.5-30.8 58.5 30.8c2.2 1.2 4.6 1.7 7.1 1.7 3.1 0 6.3-1 8.9-2.9 4.7-3.4 7-9.1 6-14.8l-11.2-65.2 47.4-46.2c4.1-4 5.6-10.1 3.8-15.5-1.8-5.5-6.5-9.5-12.2-10.3L559 368l-29.3-59.3c-2.6-5.2-7.8-8.4-13.6-8.4s-11 3.3-13.6 8.4L473.2 368l-65.5 9.5c-5.7 0.8-10.4 4.8-12.2 10.3-1.8 5.5-0.3 11.5 3.8 15.5l47.4 46.2z m38.8-52.6c4.9-0.7 9.2-3.8 11.4-8.3l19.2-38.9 19.2 38.9c2.2 4.5 6.5 7.6 11.4 8.3l43 6.2-31.1 30.3c-3.6 3.5-5.2 8.5-4.4 13.4l7.3 42.8-38.4-20.2c-4.4-2.3-9.7-2.3-14.1 0l-38.4 20.2 7.3-42.8c0.8-4.9-0.8-9.9-4.4-13.4l-31.1-30.3 43.1-6.2z" fill="#211F1E" />
						</svg>`
				});

				// if one player
			} else {
				void Swal.fire({
					title: "Congratulations",
					buttonsStyling: true,
					icon: "success",
					iconHtml: `<svg width="80px" height="80px" viewBox="0 0 1024 1024" class="icon" version="1.1"
							xmlns="http://www.w3.org/2000/svg">
							<path d="M454.5 675.5l-32.4 107.9h181.8L574.5 678" fill="#FBBA22" />
							<path d="M510.1 682.3c215.1 0 215.1-165.2 215.1-165.2V197.4H300.9v319.7s0 165.2 215.1 165.2h-5.9z" fill="#FBBA22" />
							<path d="M515.4 783.4h91.1s89.5 2.3 89.5 80.8H332.4c0-78.6 89.5-80.8 89.5-80.8H513" fill="#C04931" />
							<path d="M816.5 383.8V259.3c0-11.2-9-20.2-20.2-20.2h-50.9v-41.7c0-11.2-9-20.2-20.2-20.2H300.9c-11.2 0-20.2 9-20.2 20.2v41.7h-50.9c-11.2 0-20.2 9-20.2 20.2v124.5c0 1.2-0.7 42.2 27.2 70.9 11.7 12 26.5 19.9 43.9 23.8v38.6c0 1.6 2.1 135.7 147.8 174.7l-21.8 72.7c-39 5.7-94.5 31.2-94.5 99.7 0 11.2 9 20.2 20.2 20.2H696c11.2 0 20.2-9 20.2-20.2 0-69.6-57.2-94.7-96.6-99.9l-20.4-72.9c144.1-39.6 146.2-172.7 146.2-174.3v-38.6c17.4-3.9 32.1-11.8 43.9-23.8 27.9-28.7 27.2-69.7 27.2-70.9z m-550.8 42.7c-16-16.4-15.8-41.9-15.8-42.1V279.6h30.7v156.7c-5.7-2.4-10.8-5.6-14.9-9.8z m338.2 377.1c0.1 0 0.1 0 0 0h2c6.2 0.2 54 3 66.8 40.4h-317c12.8-37.4 60.5-40.2 66.2-40.4h182z m-154.6-40.4l19.1-63.6c12.5 1.6 25.9 2.5 40.1 2.8 0.5 0 1.1 0.1 1.6 0.1h5.9c0.5 0 1.1 0 1.6-0.1 14.9-0.3 28.8-1.3 41.9-3l17.9 63.9H449.3zM705 517c-0.1 5.9-3.5 143.6-191.9 145-17.6-0.1-33.6-1.4-48.1-3.7-1.5-0.9-3-1.7-4.7-2.2-3.2-0.9-6.3-1-9.4-0.4-127.1-27.3-129.7-133.5-129.8-138.6V217.6H705V517z m55.3-90.5c-4.1 4.2-9.1 7.4-15 9.8V279.5H776v104.8c0.1 0.3 0.3 25.8-15.7 42.2z" fill="#211F1E" />
							<path d="M446.7 449.5l-11.2 65.2c-1 5.7 1.4 11.4 6 14.8 4.7 3.4 10.8 3.8 16 1.1l58.5-30.8 58.5 30.8c2.2 1.2 4.6 1.7 7.1 1.7 3.1 0 6.3-1 8.9-2.9 4.7-3.4 7-9.1 6-14.8l-11.2-65.2 47.4-46.2c4.1-4 5.6-10.1 3.8-15.5-1.8-5.5-6.5-9.5-12.2-10.3L559 368l-29.3-59.3c-2.6-5.2-7.8-8.4-13.6-8.4s-11 3.3-13.6 8.4L473.2 368l-65.5 9.5c-5.7 0.8-10.4 4.8-12.2 10.3-1.8 5.5-0.3 11.5 3.8 15.5l47.4 46.2z m38.8-52.6c4.9-0.7 9.2-3.8 11.4-8.3l19.2-38.9 19.2 38.9c2.2 4.5 6.5 7.6 11.4 8.3l43 6.2-31.1 30.3c-3.6 3.5-5.2 8.5-4.4 13.4l7.3 42.8-38.4-20.2c-4.4-2.3-9.7-2.3-14.1 0l-38.4 20.2 7.3-42.8c0.8-4.9-0.8-9.9-4.4-13.4l-31.1-30.3 43.1-6.2z" fill="#211F1E" />
						</svg>`
				});
			}

		}, 1000);

	};

	/**
		* compare 2 selected Pokémon
		*/
	useEffect(() => {


		// if choiceOne and choiceTwo have a value
		if (choiceOne && choiceTwo) {


			//disabled
			setDisabled(true);
			// if there are equal
			if (choiceOne.id === choiceTwo.id) {

				// update the state
				setPokemons(prevPokemons => {
					if (!prevPokemons) {
						return null;
					} else {
						return prevPokemons.map(pokemon => {
							if (pokemon.id === choiceOne.id) {

								// update propertied matched to true

								return { ...pokemon, matched: true };
							} else {
								return pokemon;
							}
						});
					}
				});


				// add point to player in turn
				if (player1) {
					setPlayer1Points(prev => prev + 1);
				} else {

					setPlayer2Points(prev => prev + 1);
				}

			} else {
				// change turn

				setPlayer1(prev => !prev);
				setPlayer2(prev => !prev);

			}

			setTimeout(() => {
				nextTurn();

			}, 1500);
		}
	}, [ choiceOne, choiceTwo ]);

	/**
	 * to check if all cards are matched
	 */

	useEffect(() => {

		if (pokemons === null) return;
		// check if all pokemons are matched and setGameEnd
		setGameEnd(pokemons.every(pokemon => pokemon.matched));

	}, [ pokemons ]);


	/**
	 * to check if game is end
	 */
	useEffect(() => {

		// solo se ejecuta si gameEnd
		if (gameEnd) {

			// execute function
			confetti();

			setGameEnd(false);
		}

	}, [ gameEnd ]);

	return (
		<div className="relative min-h-screen bg-hero bg-cover bg-no-repeat bg-center">
			<div className="absolute inset-0 bg-black/50 z-0"></div>

			<div className='ml-auto mr-auto pt-10 pb-10 pl-5 pr-5 max-w-[1690px]'>

				<div className="flex flex-col justify-around items-center space-y-10 ">
					
					<TypographyH1 style="text-center font-pokemon drop-shadow text-outline">
						POKEMON MEMORY GAME
					</TypographyH1>

					<Marcador
						player1={player1}
						player2={player2}
						player1Points={player1Points}
						player2Points={player2Points}
						turns={turns}
						twoPlayers={twoPlayers}
					/>

					<Button 
						variant="secondary" 
						onClick={() => { newGame().catch(error => { toast.error(`Error: ${error}`); }); }}
						className={`z-10 ${text}`}
					>
						New Game
					</Button>

					{
						// if loading set true show loading, if set false show pokemons
						loading
							? <Loading />

							// if don't have pokemons , don't show nothing
							: pokemons &&
							<div className={`flex flex-wrap gap-3 mt-10 mb-10 justify-center m-auto ${width}`}>
								{/* cards container */}
								{

									pokemons.map((pokemon, index) => {
										return (
											<CardPokemon
												key={index}
												pokemon={pokemon}
												handleChoice={handleChoice}
												flipped={
													pokemon === choiceOne ||
													pokemon === choiceTwo ||
													pokemon.matched

												}
												disabled={disabled}
											/>
										);
									})
								}
							</div>
					}
				</div>

			</div>
			<SheetSetting
				setPkmCount={setPkmCount}
				pkmCount={pkmCount}
				setCardsManually={setCardsManually}
				manually={manually}
				setManually={setManually}
				setTwoPlayers={setTwoPlayers}
				twoPlayers={twoPlayers}
			/>

		</div>
	);
}


export default App;
