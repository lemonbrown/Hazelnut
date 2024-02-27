
export const actions = {
	default: async ({ cookies, request }) => {

        const data = await request.formData();

		let response = await fetch("http://localhost:3000/api/user/login", {
            method: "POST",
            body: JSON.stringify({
                email: data.get('email'),
                password: data.get('password'),
            }),
            headers: {
                "Content-Type": "application/json",
              },
        }); 

        if(response.ok){

            let token = "";
            let data = await response.text();
            token = data;        

            cookies.set('AuthorizationToken', `Bearer ${token}`, {
                httpOnly: true,
                path: '/',
                secure: true,
                sameSite: 'strict',
                maxAge: 60 * 60 * 24 // 1 day
              });
        }else{
            
            let messages = await response.text();
            console.log(messages)
        }
	}
};
