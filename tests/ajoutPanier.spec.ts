import { test, expect, Page } from '@playwright/test';
import { before } from 'node:test';
import * as logindata from '../logindatas.json';
import * as data from '../produit.json';
import datas from '../flopProduits.json'
import {allure} from "allure-playwright"


//import {login} from "../tests/login.spec"
test.describe("regroupement", async()=>{
  let page : Page
test.beforeAll( async({browser})=>  {
  page = await browser.newPage()
  await page.goto('https://ztrain-web.vercel.app/auth/login');
    await page.getByPlaceholder('Email').click();
    await page.getByPlaceholder('Email').fill(logindata.email);
    await page.getByPlaceholder('Mot de passe').click();
    await page.getByPlaceholder('Mot de passe').fill(logindata.mot_de_passe);
    await page.locator('#btn_login').click();
    await expect(page).toHaveURL('https://ztrain-web.vercel.app/home')
    await page.pause
})
// test.beforeEach( async () => {
//     await page.goto('https://ztrain-web.vercel.app/auth/login');
//     await page.getByPlaceholder('Email').click();
//     await page.getByPlaceholder('Email').fill(logindata.email);
//     await page.getByPlaceholder('Mot de passe').click();
//     await page.getByPlaceholder('Mot de passe').fill(logindata.mot_de_passe);
//     await page.locator('#btn_login').click();
//     await expect(page).toHaveURL('https://ztrain-web.vercel.app/home')
//     await page.pause
    
//   })



datas.forEach( (element) => {
   test(`ajouter plusieurs produits au panier ${element.article}`, async () => {
    await expect(page).toHaveURL('https://ztrain-web.vercel.app/home')
    let product_name=element.article
    await page.locator(".style_card__gNEqX", { has: page.locator(`text=${product_name}`) }).click();
    await page.locator('#style_quantity_wrapper__2QMug').getByRole('textbox').click();
    await page.locator('#style_quantity_wrapper__2QMug').getByRole('textbox').fill(element.quantité);
    await page.getByRole('button', { name: 'Ajouter au panier' }).click();
    await page.locator('#style_content_cart_wrapper__mqNbf').click();
    await page.waitForTimeout(1000)
    
    //await expect (page.getByRole('heading', { name: '6295.10 €' }));
    //await expect (page.locator('{id="style_totalPrice__o2yCy"}')) 
    //await page.locator('div:nth-child(5) > .style_card_body__QuFGN > span > .style_card_body_img__mkV1D').click();
  // await page.getByRole('button', { name: 'Ajouter au panier' }).click();
    await expect (page.getByText('Votre panier à été mis à jour')).toHaveText('Votre panier à été mis à jour');  
    await page.waitForTimeout(2000)
    await expect(page.locator('[id="style_card_wrapper__hrc1I"]')).toContainText(data.nom)
    await page.locator('#style_header_home__8t_ie').click();

  })
});




  // {  test('ajouter u produit au panier', async () => {
  //     await expect(page).toHaveURL('https://ztrain-web.vercel.app/home')
  //     let product_name=data.article
  //     await page.locator(".style_card__gNEqX", { has: page.locator(`text=${product_name}`) }).click();
  //     await page.locator('#style_quantity_wrapper__2QMug').getByRole('textbox').click();
  //     await page.locator('#style_quantity_wrapper__2QMug').getByRole('textbox').fill(data.quantité);
  //     await page.getByRole('button', { name: 'Ajouter au panier' }).click();
  //     await page.locator('#style_content_cart_wrapper__mqNbf').click();
      
  //     //await expect (page.getByRole('heading', { name: '6295.10 €' }));
  //     //await expect (page.locator('{id="style_totalPrice__o2yCy"}')) 
  //     //await page.locator('div:nth-child(5) > .style_card_body__QuFGN > span > .style_card_body_img__mkV1D').click();
  //   // await page.getByRole('button', { name: 'Ajouter au panier' }).click();
  //     await expect (page.getByText('Votre panier à été mis à jour')).toHaveText('Votre panier à été mis à jour');  
  //     await expect(page.locator('[id="style_card_wrapper__hrc1I"]')).toContainText(data.nom)
  //     await page.locator('#style_header_home__8t_ie').click();

  //   })}

  // test('test de deconnexion', async () => {
  //   await page.locator('#style_avatar_wrapper__pEGIQ svg').nth(1).click();
  //   await page.getByRole('link', { name: 'Se déconnecter' }).click();
  //   await expect(page).toHaveURL(logindata.urldeco)
  // })

  

  test.afterAll(async({})=>{
    allure.addParameter("article",data.article)
    allure.addParameter("quantité",data.quantité)
    await page.getByRole('heading', { name: 'Normal d\'être impatient.' }).click();


  })
})

async function ajoupanier(page:Page) {
  await expect(page).toHaveURL('https://ztrain-web.vercel.app/home')
      let product_name=data.article
      await page.locator(".style_card__gNEqX", { has: page.locator(`text=${product_name}`) }).click();
      await page.locator('#style_quantity_wrapper__2QMug').getByRole('textbox').click();
      await page.locator('#style_quantity_wrapper__2QMug').getByRole('textbox').fill(data.quantité);
      await page.getByRole('button', { name: 'Ajouter au panier' }).click();
      await page.locator('#style_content_cart_wrapper__mqNbf').click();
      await page.waitForTimeout(1000)
      //await expect (page.getByRole('heading', { name: '6295.10 €' }));
      //await expect (page.locator('{id="style_totalPrice__o2yCy"}')) 
      //await page.locator('div:nth-child(5) > .style_card_body__QuFGN > span > .style_card_body_img__mkV1D').click();
    // await page.getByRole('button', { name: 'Ajouter au panier' }).click();
      await expect (page.getByText('Votre panier à été mis à jour')).toHaveText('Votre panier à été mis à jour'); 
      await page.waitForTimeout(2000)

      await expect(page.locator('[id="style_card_wrapper__hrc1I"]')).toContainText(data.nom)
      await page.locator('#style_header_home__8t_ie').click();

      allure.addParameter("article",data.article)
      allure.addParameter("quantité",data.quantité)
      await page.getByRole('heading', { name: 'Normal d\'être impatient.' }).click();
}

async function ajoutflopproduit(page:Page) {
  datas.forEach( (element) => {
      expect(page).toHaveURL('https://ztrain-web.vercel.app/home')
     let product_name=element.article
      page.locator(".style_card__gNEqX", { has: page.locator(`text=${product_name}`) }).click();
      page.locator('#style_quantity_wrapper__2QMug').getByRole('textbox').click();
      page.locator('#style_quantity_wrapper__2QMug').getByRole('textbox').fill(element.quantité);
      page.getByRole('button', { name: 'Ajouter au panier' }).click();
      page.locator('#style_content_cart_wrapper__mqNbf').click();
      page.waitForTimeout(1000)
     

      expect (page.getByText('Votre panier à été mis à jour')).toHaveText('Votre panier à été mis à jour');  
      page.waitForTimeout(2000)
      expect(page.locator('[id="style_card_wrapper__hrc1I"]')).toContainText(data.nom)
      page.locator('#style_header_home__8t_ie').click();
      page.reload()
 
 });
}

module.exports = ajoupanier
//module.exports = ajoutflopproduit