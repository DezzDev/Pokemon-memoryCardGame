export function getPublicId (url:string){
	const firstSplit = url.split("/");
	const secondSplit = firstSplit[firstSplit.length -1].split(".");
	return secondSplit[0];
}