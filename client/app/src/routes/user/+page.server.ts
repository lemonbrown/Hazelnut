import { redirect } from "@sveltejs/kit"

export function load({ cookies }) {

    const userToken = cookies.get('AuthorizationToken')?.split(" ")[1];

    if(userToken){

        fetch("http://localhost:3000/api/users",{
            method: "GET",
            headers:{
                "Authorization": "Bearer " + userToken
            }
        })

    }else{
        redirect(302, '/login')
    }    


	return {
		
	};
}