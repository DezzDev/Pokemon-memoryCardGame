import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Toaster } from "@/components/ui/sonner";
import "./index.css";
import { CardStyleProvider } from "./context/CardStyleContext/CardStyleProvider.tsx";

const root = document.getElementById("root");
if(root){
	ReactDOM.createRoot(root).render(
		<React.StrictMode>
			<CardStyleProvider>
				
				<App />

			</CardStyleProvider>
			<Toaster richColors expand={true}/>
		</React.StrictMode>,
	);

}

