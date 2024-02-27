export function load({ cookies }) {

    const userToken = cookies.get('AuthorizationToken').split(" ")[1];

    if(userToken){

        fetch("http://localhost:3000/api/user",{
            method: "GET",
            headers:{
                "Authorization": "Bearer " + userToken
            }
        })

    }

	return {
		
	};
}
