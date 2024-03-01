export async function load({ url }) {


	const response = await fetch('http://localhost:3000/api/threads/hot', {
		method: "GET"		
	});

	const threads = await response.json();

	return {
		threads
	}

}