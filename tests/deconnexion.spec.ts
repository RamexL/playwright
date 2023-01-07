import { test, expect, Page } from '@playwright/test';
import { before } from 'node:test';
import * as logindata from '../logindatas.json';
import {allure} from "allure-playwright"


//import {login} from "../tests/login.spec"
test.describe('deconnexion', async () => {
  let page:Page

  test.beforeAll(async ({browser}) => {
    page= await browser.newPage()

    await page.goto('https://ztrain-web.vercel.app/auth/login');
    await page.getByPlaceholder('Email').click();
    await page.getByPlaceholder('Email').fill(logindata.email);
    await page.getByPlaceholder('Mot de passe').click();
    await page.getByPlaceholder('Mot de passe').fill(logindata.mot_de_passe);
    await page.locator('#btn_login').click();
    await expect(page).toHaveURL('https://ztrain-web.vercel.app/home')
    await page.pause
    
    
  })

  test('test de deconnexion', async () => {
    await page.locator('#style_avatar_wrapper__pEGIQ svg').nth(1).click();
    await page.getByRole('link', { name: 'Se déconnecter' }).click();
    await expect(page).toHaveURL(logindata.urldeco)
  })
  
})

async function decotest(page:Page){
  await expect(page).toHaveURL("https://ztrain-web.vercel.app/home")
  await page.locator('#style_avatar_wrapper__pEGIQ svg').nth(1).click();
    await page.getByRole('link', { name: 'Se déconnecter' }).click();
    await expect(page).toHaveURL(logindata.urldeco)
  
}

module.exports= decotest 

  