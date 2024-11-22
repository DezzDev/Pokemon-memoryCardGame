import {createContext} from "react";

export interface CardStyleProps{
	cardStyle : string | null,
	setCardStyle: (style: string)=> void
}

export const CardStyleContext = createContext<CardStyleProps | undefined>(undefined); 