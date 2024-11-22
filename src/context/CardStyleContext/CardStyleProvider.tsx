import React, { useState } from "react";
import { CardStyleContext } from "./CardStyleContext";

interface props {
	children: React.ReactNode
}

export function CardStyleProvider ({children}:props){
	const [cardStyle, setCardStyle] = useState<string | null>(null);

	return(
		<CardStyleContext.Provider value={{cardStyle, setCardStyle}}>
			{children}
		</CardStyleContext.Provider>
	);
}