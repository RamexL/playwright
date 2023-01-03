import { test, expect } from '@playwright/test';
import { before } from 'node:test';
import * as logindata from '../logindatas.json';
import * as data from '../produit.json';
//import {login} from "./login.spec"

test.beforeEach( async ({ page }) => {
    await page.goto('https://ztrain-web.vercel.app/auth/login');
    await page.getByPlaceholder('Email').click();
    await page.getByPlaceholder('Email').fill(logindata.email);
    await page.getByPlaceholder('Mot de passe').click();
    await page.getByPlaceholder('Mot de passe').fill(logindata.mot_de_passe);
    await page.locator('#btn_login').click();
    await expect(page).toHaveURL('https://ztrain-web.vercel.app/home')
    await page.pause
    
  })

  test('supprimer u produit au panier', async ({ page }) => {
    await expect(page).toHaveURL('https://ztrain-web.vercel.app/home')
    await page.locator('#style_content_cart_wrapper__mqNbf').click();
    //await expect(page.locator('[id="style_card_wrapper__hrc1I"]')).toContainText(data.produitsupp)    
    //await page.locator('#style_card_wrapper__hrc1I div').filter({ hasText: data.produitsupp }).locator('svg').nth(2).click();
    for(let i=0; i<data.nombresupp; i++)
    {await page.locator('#style_card_wrapper__hrc1I div').filter({ hasText: data.produitsupp}).locator('span').nth(2).click}
    await page.locator('#style_card_wrapper__hrc1I').click();
   await !expect(page.locator('[id="style_card_wrapper__hrc1I"]')).toContainText(data.produitsupp)
   await page.pause

  });