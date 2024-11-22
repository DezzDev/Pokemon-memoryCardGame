import { useContext } from "react";
import { CardStyleContext } from "./CardStyleContext";

export function useCardStyle (){
	const context = useContext(CardStyleContext);

	if(!context){
		throw new Error("useCardStyle debe usarse dentro de un provider");
	}
	return context;
}