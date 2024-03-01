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

	return {
		
	};
}