import { test, expect } from '@playwright/test';
import * as data from '../logindatas.json';
test('test de connexion', async ({ page }) => {
    await page.goto('https://ztrain-web.vercel.app/auth/login');
    await page.getByPlaceholder('Email').click();
    await page.getByPlaceholder('Email').fill(data.email);
    await expect(page.getByPlaceholder('Email')).toHaveValue(data.email)
    await page.getByPlaceholder('Mot de passe').click();
    await page.getByPlaceholder('Mot de passe').fill(data.mot_de_passe);
    await expect(page.getByPlaceholder('Mot de passe')).toHaveValue(data.mot_de_passe)
    await page.locator('#btn_login').click();
    await expect(page).toHaveURL('https://ztrain-web.vercel.app/home')
  })

//  export function login(){
//     test('test de connexion', async ({ page }) => {
//         await page.goto('https://ztrain-web.vercel.app/auth/login');
//         await page.getByPlaceholder('Email').click();
//         await page.getByPlaceholder('Email').fill(data.email);
//         await expect(page.getByPlaceholder('Email')).toHaveText(data.email)
//         await page.getByPlaceholder('Mot de passe').click();
//         await page.getByPlaceholder('Mot de passe').fill(data.mot_de_passe);
//         await expect(page.getByPlaceholder('Mot de passe')).toHaveText(data.email)
//         await page.locator('#btn_login').click();
//         await expect(page).toHaveURL('https://ztrain-web.vercel.app/home')
//       })
//   }


