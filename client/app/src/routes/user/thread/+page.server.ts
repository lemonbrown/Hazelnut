import { redirect } from '@sveltejs/kit';

export async function load({ cookies }) {

    const userBearerToken = cookies.get('AuthorizationToken')?.split(" ");

    if(userBearerToken?.length > 1){

        const userToken = cookies.get('AuthorizationToken').split(" ")[1];

        if(userToken){

            const response = await fetch("http://localhost:3000/api/users",{
                method: "GET",
                headers:{
                    "Authorization": "Bearer " + userToken
                }
            });

            const user = await response.json();

            return {
                user
            };
        }
    }

    redirect(302, '/login')
}


export const actions = {
	default: async ({ cookies, request, url }) => {
        const data = await request.formData();
        const userToken = cookies.get('AuthorizationToken')?.split(" ")[1];

        console.log(data.get('content'));

		let response = await fetch("http://localhost:3000/api/threads", {
            method: "POST",
            body: JSON.stringify({
                title: data.get('title'),
                content: data.get('content')
            }),
            headers: {
                "Authorization": "Bearer " + userToken,
                "Content-Type": "application/json",
              },
        }); 

        if(response.ok){

            const thread = await response.json();

            redirect(302, '/thread/' + thread.uid)
        
        }
	}
};
