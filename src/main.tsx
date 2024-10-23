import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Toaster } from "@/components/ui/sonner";
import "./index.css";

const root = document.getElementById("root");
if(root){
	ReactDOM.createRoot(root).render(
		<React.StrictMode>
			<App />
			<Toaster richColors expand={true}/>
		</React.StrictMode>,
	);

}

