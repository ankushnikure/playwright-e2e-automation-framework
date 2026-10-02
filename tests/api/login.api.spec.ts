import {test, expect} from '@playwright/test';

test('Verify login API reponse', async ({ request }) => {

    const email = process.env.EMAIL;
    const password = process.env.PASSWORD;

    const respose = await request.post('api/ecom/auth/login', {
        data: {
            userEmail: email,
            userPassword: password
        }
    });
    
    expect(respose.ok()).toBeTruthy();
    const responseBody = await respose.json();
    console.log(responseBody);
});