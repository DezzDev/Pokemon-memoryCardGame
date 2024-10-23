import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
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
import jsonPokemonName from "@/data/pokemonName.json";
import { PokemonMin, PokemonNames, PokemonName } from "@/types/Pokemon";

const dataPokemonNames: PokemonNames = jsonPokemonName;

interface props {
	setPkmCount: (pkmCount: number) => void,
	pkmCount: number,
	setCardsManually: (pokemonNames: PokemonName[]) => void,
	manually: boolean,
	setManually: (manually: boolean) => void,
	setTwoPlayers: (twoPlayers: boolean)=> void
}



export function SheetSide({pkmCount}:props) {
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState("");
	const [tags, setTags] = useState<PokemonName[]>([]);


	const addTag = ()=>{
		
		console.log({value});
		if(value === ""){
			toast.error("Select Pokemon");
			return;
		}
		// search the value
		const pokemon = dataPokemonNames.Pokemon.find(pokemon => pokemon.name === value);
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
		setTags(prev => ([...prev,pokemon]));
		

		console.log({tags});
	};

	const removeTag = (tag:PokemonName)=>{
		setTags(tags.filter(item => item.id !== tag.id )); 
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
					<div className="grid gap-4 py-4">

						<div className="grid grid-cols-6 items-center gap-4">
							<Label htmlFor="name" className="col-span-2">
							Cards pairs
							</Label>
							<Input id="name" type="number" defaultValue={"3"} min="3" max="13" className="col-span-2" />
						</div>

						<div className="grid grid-cols-6 gap-4">
							<Label htmlFor="players" className=" col-span-2">
							Select players
							</Label>
							<RadioGroup name="players" defaultValue="one-player" className="col-span-4">
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

						<div className="flex flex-col gap-4">
							<Label htmlFor="select-cards" className="col-span-2 ">
							Select cards
							</Label>

							{/* comboBox */}
							<div className="flex gap-4">

								<Popover open={open} onOpenChange={setOpen}>
									<PopoverTrigger asChild>
										<Button
											variant="outline"
											role="combobox"
											aria-expanded={open}
											className="w-[200px] justify-between"
										>
											{value
												? dataPokemonNames.Pokemon.find((pokemon) => pokemon.name === value)?.name
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
														dataPokemonNames.Pokemon.map((pokemon:PokemonMin) =>{
															return <CommandItem
																key={pokemon.id}
																value={pokemon.name}
																onSelect={(currentValue)=>{
																	setValue(currentValue === value ? "" : currentValue);
																	setOpen(false);
																}}															
															>
																{pokemon.name}
																<CheckIcon 
																	className={cn(
																		"ml-auto h-4 w-4",
																		value === pokemon.name ? "opacity-100" : "opacity-0"
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
							{/* tags */}
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
					</div>
					<SheetFooter className="mt-auto">
						<SheetClose asChild>
							<Button type="submit">Save changes</Button>
						</SheetClose>
					</SheetFooter>
				</SheetContent>
			</Sheet>

		</div>


	);
}
