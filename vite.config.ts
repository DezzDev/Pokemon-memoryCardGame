import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig(({command})=>{
	if(command === "build"){
		return {
			base:"/Pokemon-memoryCardGame/",
			plugins: [react()],
		};
	}else{
		return {
			plugins: [react()],
		};
	}
});
