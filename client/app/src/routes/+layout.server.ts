export async function load({ cookies }) {

    const userToken = cookies.get('AuthorizationToken').split(" ")[1];

    if(userToken){

        const response = await fetch("http://localhost:3000/api/user",{
            method: "GET",
            headers:{
                "Authorization": "Bearer " + userToken
            }
        });

        const user = await response.json();

        console.log(user)

        return {
            user
        };
    }

	return {
		
	};
}