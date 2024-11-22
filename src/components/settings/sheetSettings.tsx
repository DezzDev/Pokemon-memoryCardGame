import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import {
	Sheet,	
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";
import {XIcon, Settings} from "lucide-react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

// data
import { dataPokemon } from "@/data/pokemonNames";
import type { PokemonName } from "@/types/Pokemon";



interface props {
	setPkmCount: (pkmCount: number) => void,
	pkmCount: number,
	setCardsManually: (pokemonNames: PokemonName[]) => void,
	manually: boolean,
	setManually: (manually: boolean) => void,
	setTwoPlayers: (twoPlayers: boolean)=> void,
	twoPlayers: boolean
}



export function SheetSetting({manually, setManually, pkmCount, setPkmCount, setTwoPlayers, twoPlayers, setCardsManually}:props) {
	const [open, setOpen] = useState(false);
	const [valueTag, setValueTag] = useState("");
	const [tags, setTags] = useState<PokemonName[]>([]);


	const addTag = ()=>{
		

		// if not select Pokemon
		if(valueTag === ""){
			toast.error("Select Pokemon");
			return;
		}

		// check if can add more tags
		if(tags.length >= pkmCount){
			toast.error("Can't add more Pokemon");
			return;
		}

		// check if pokemon exist
		const pokemon = dataPokemon.Pokemon.find(pokemon => pokemon.name === valueTag);
		if(!pokemon){
			toast.error("Pokemon not found");
			return;
		}
		// check if tag is not repeat
		const repeat = tags.find((tagPokemon)=> tagPokemon.name === pokemon.name);
		if(repeat){
			toast.error("Pokemon repeat");
			return;
		} 

		// añadimos tag
		setTags(prev => {
			
			// añadimos pokemon to array
			setCardsManually([...prev,pokemon]);
			return ([...prev,pokemon]);
		});

		
		
	};

	const removeTag = (tag:PokemonName)=>{
		setTags(prev =>{
			const pkmFiltered = prev.filter(item => item.id !== tag.id );
			setCardsManually(pkmFiltered);
			return pkmFiltered;
		}); 
	};

	const handleCardSelection = (value:string)=>{
		if(value === "manually"){
			setManually(true);
		}else{
			setManually(false);
		}
		
	};


	const handlePokemonCount = (e: React.ChangeEvent<HTMLInputElement>)=>{
		const value = e.target.value;
		setPkmCount(Number(value));
	};

	const handlePlayers = (value:string)=>{
		if(value === "two-players"){
			setTwoPlayers(true);
		}else{
			setTwoPlayers(false);
		}
	};


	return (

		<div className="absolute right-4 top-4">

			<Sheet>
				<SheetTrigger asChild>
					<Button variant="outline" size={"icon"}>
						<Settings />
					</Button>
				</SheetTrigger>
				<SheetContent side={"right"} className="flex flex-col">
					<SheetHeader>
						<SheetTitle>Settings</SheetTitle>
						<SheetDescription>
						Configure game
						</SheetDescription>
					</SheetHeader>
					<div className="grid gap-8 py-4">

						{/* select number of cards pair */}
						<div className="grid grid-cols-6 items-center gap-4">
							<Label htmlFor="name" className="col-span-2">
							Cards pairs
							</Label>
							<Input 
								id="name" 
								type="number" 
								min="3" max="13" 
								className="col-span-2" 
								onChange={handlePokemonCount}
								value={pkmCount}
							/>
						</div>

						{/* select number of players */}
						<div className="grid grid-cols-6 gap-4">
							<Label htmlFor="players" className=" col-span-2">
							Select players
							</Label>
							<RadioGroup 
								name="players" 
								defaultValue="one-player" 
								value={twoPlayers ? "two-players" : "one-player"}
								className="col-span-4"
								onValueChange={handlePlayers}
							>
								<div className="flex items-center space-x-2">
									<RadioGroupItem value="one-player" id="one-player" />
									<Label htmlFor="one-player">One player</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem value="two-players" id="two-players" />
									<Label htmlFor="two-players">Two players</Label>
								</div>
							</RadioGroup>
						</div>

						{/* select  mode of card selection*/}
						<div className="flex flex-col gap-4">

							<div className="grid grid-cols-6 gap-4">

								<Label htmlFor="select-cards" className="col-span-2 ">
							Select cards
								</Label>

								<RadioGroup 
									name="cardSelection" 
									defaultValue="randomly" 
									value={manually ? "manually" : "randomly"}
									className="col-span-4"
									onValueChange={(value)=>{handleCardSelection(value);}}
									
								>
									<div className="flex items-center space-x-2" >
										<RadioGroupItem value="randomly" id="randomly"/>
										<Label htmlFor="randomly">Randomly</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="manually" id="manually" />
										<Label htmlFor="manually">Manually</Label>
									</div>
								</RadioGroup>
							</div>


							{/* comboBox */}
							{
								manually && 
							<div className="flex flex-col gap-4">
								<div className="flex gap-4">

									<Popover open={open} onOpenChange={setOpen}>
										<PopoverTrigger asChild>
											<Button
												variant="outline"
												role="combobox"
												aria-expanded={open}
												className="w-[200px] justify-between"
											>
												{valueTag
													? dataPokemon.Pokemon.find((pokemon) => pokemon.name === valueTag)?.name
													: "Select Pokemon..."}
												<CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
											</Button>
										</PopoverTrigger>
										<PopoverContent className="w-[200px] p-0">
											<Command>
												<CommandInput placeholder="Search Pokemon..." className="h-9" />
												<CommandList>
													<CommandEmpty>No Pokemon found.</CommandEmpty>
													<CommandGroup>

														{
															dataPokemon.Pokemon.map((pokemon) =>{
																return <CommandItem
																	key={pokemon.id}
																	value={pokemon.name}
																	onSelect={(currentValue)=>{
																		setValueTag(currentValue === valueTag ? "" : currentValue);
																		setOpen(false);
																	}}															
																>
																	{pokemon.name}
																	<CheckIcon 
																		className={cn(
																			"ml-auto h-4 w-4",
																			valueTag === pokemon.name ? "opacity-100" : "opacity-0"
																		)}
																	/>
																</CommandItem>;
															})
														}						
													</CommandGroup>
												</CommandList>
											</Command>
										</PopoverContent>
									</Popover>
									<Button onClick={addTag}>Add</Button>
									
								</div>

								{/*  tags */}
								<div className="flex flex-wrap gap-4">
									{
										tags.map(tag=>(
											<Badge 
												key={tag.id} 
										
												className="flex gap-1 items-center">
												{tag.name}
												<XIcon size="15px" onClick={()=>{removeTag(tag);}}  />
											</Badge>
										))
									}

								</div>

							</div>
							}

						</div>
					</div>
					
				</SheetContent>
			</Sheet>

		</div>


	);
}
