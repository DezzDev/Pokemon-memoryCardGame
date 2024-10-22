import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({command})=>{
	if(command === "build"){
		return {
			base:"/Pokemon-memoryCardGame/",
			plugins: [react()],
			resolve: {
				alias: {
					"@": path.resolve(__dirname, "./src"),
				},
			},
		};
	}else{
		return {
			plugins: [react()],
			resolve: {
				alias: {
					"@": path.resolve(__dirname, "./src"),
				},
			},
		};
	}
});
