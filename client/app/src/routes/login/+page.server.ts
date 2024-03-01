import {redirect} from '@sveltejs/kit'

export async function load({url}){
}

export const actions = {
	default: async ({ cookies, request, url }) => {
        const data = await request.formData();
		let response = await fetch("http://localhost:3000/api/users/login", {
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

            const from = url.searchParams.get('from');
            
            if(from == 'createthread'){
                redirect(302, '/user/thread')
            }
            else{
                redirect(302, '/user')
            }

        }else{
            
            let messages = await response.text();
        }
	}
};
