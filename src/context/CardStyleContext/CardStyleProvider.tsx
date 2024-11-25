import React, { useState } from "react";
import { CardStyleContext } from "./CardStyleContext";
import { CardStyle } from "@/types/CardStyle";


interface props {
	children: React.ReactNode
}




export function CardStyleProvider ({children}:props){
	const [cardStyle, setCardStyle] = useState<CardStyle>({type:"default"});

	return(
		<CardStyleContext.Provider value={{cardStyle, setCardStyle}}>
			{children}
		</CardStyleContext.Provider>
	);
}