import { CardStyle } from "@/types/CardStyle";
import {createContext} from "react";

export interface CardStyleProps{
	cardStyle : CardStyle,
	setCardStyle: (type: CardStyle)=> void
}


export const CardStyleContext = createContext<CardStyleProps | undefined>(undefined); 