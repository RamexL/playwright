import { test, expect } from '@playwright/test';
import { before } from 'node:test';
import * as logindata from '../logindatas.json';
import * as data from '../produit.json';
import {allure} from "allure-playwright"

//import {login} from "../tests/login.spec"

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

  test('ajouter u produit au panier', async ({ page }) => {
    await expect(page).toHaveURL('https://ztrain-web.vercel.app/home')
    let product_name=data.article
    await page.locator(".style_card__gNEqX", { has: page.locator(`text=${product_name}`) }).click();
    await page.locator('#style_quantity_wrapper__2QMug').getByRole('textbox').click();
    await page.locator('#style_quantity_wrapper__2QMug').getByRole('textbox').fill(data.quantité);
    await page.getByRole('button', { name: 'Ajouter au panier' }).click();
    await page.locator('#style_content_cart_wrapper__mqNbf').click();
    
    //await expect (page.getByRole('heading', { name: '6295.10 €' }));
    //await expect (page.locator('{id="style_totalPrice__o2yCy"}')) 
    //await page.locator('div:nth-child(5) > .style_card_body__QuFGN > span > .style_card_body_img__mkV1D').click();
   // await page.getByRole('button', { name: 'Ajouter au panier' }).click();
    await expect (page.getByText('Votre panier à été mis à jour')).toHaveText('Votre panier à été mis à jour');  
    await expect(page.locator('[id="style_card_wrapper__hrc1I"]')).toContainText(data.nom)

  })

  test.afterAll(async({page})=>{
    allure.addParameter("article",data.article)
    allure.addParameter("quantité",data.quantité)

  })
  