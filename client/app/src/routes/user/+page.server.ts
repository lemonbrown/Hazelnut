import { redirect } from "@sveltejs/kit"

export function load({ cookies }) {

    const userToken = cookies.get('AuthorizationToken').split(" ")[1];

    if(!userToken){

        redirect(303, '/login')
    }
    
	return {
		
	};
}