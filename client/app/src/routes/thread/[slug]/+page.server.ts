export async function load({ params }) {

	const uid = params.slug;

	const response = await fetch(`http://localhost:3000/api/threads/${uid}`, {
		method: "GET"		
	});

	const thread = await response.json();

	return {
		thread
	}

}