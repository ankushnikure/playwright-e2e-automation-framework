import {test, expect} from '@playwright/test';
import { env } from '@utils/env';

test('Verify login API reponse', async ({ request }) => {

    const respose = await request.post('api/ecom/auth/login', {
        data: {
            userEmail: env.email,
            userPassword: env.password
        }
    });
    
    expect(respose.ok()).toBeTruthy();
    const responseBody = await respose.json();
    console.log(responseBody);
});