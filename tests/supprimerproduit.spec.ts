import { test, expect, Page } from '@playwright/test';
import { before } from 'node:test';
import * as logindata from '../logindatas.json';
import * as data from '../produit.json';
import {allure} from "allure-playwright"

test.describe("regroupement pour suppression", async()=>{
  let page : Page
test.beforeAll( async ({browser}) => {
  page = await browser.newPage()
    await page.goto('https://ztrain-web.vercel.app/auth/login');
    await page.getByPlaceholder('Email').click();
    await page.getByPlaceholder('Email').fill(logindata.email);
    await page.getByPlaceholder('Mot de passe').click();
    await page.getByPlaceholder('Mot de passe').fill(logindata.mot_de_passe);
    await page.locator('#btn_login').click();
    //await expect(page).toHaveURL('https://ztrain-web.vercel.app/home')
    //await page.pause

    await expect(page).toHaveURL('https://ztrain-web.vercel.app/home')
    
    await page.locator('#style_content_cart_wrapper__mqNbf').click();
    
  })

 let clickList:any[]=[];
 var conteur=0

  for(let i=0; i<data.nombresupp; i++  ){
    clickList.push(conteur+i)
  }

 
 clickList.forEach(element => {
  console.log(clickList)

  test(`supprimer  produit au panier ${element}`, async () => {
    // await expect(page).toHaveURL('https://ztrain-web.vercel.app/home')
    // await page.locator('#style_content_cart_wrapper__mqNbf').click();
    //await expect(page.locator('[id="style_card_wrapper__hrc1I"]')).toContainText(data.produitsupp)    
    //await page.locator('#style_card_wrapper__hrc1I div').filter({ hasText: data.produitsupp }).locator('svg').nth(2).click();
    await expect(page.locator('[id="style_card_wrapper__hrc1I"]'), {message:"produit inexistant"}).toContainText(data.produitsupp)

      await page.locator('#style_card_wrapper__hrc1I div').filter({ hasText: data.produitsupp}).locator('span').nth(2).click();
      await page.waitForTimeout(2000);
    
    //await page.pause()

    // page.locator('#style_card_wrapper__hrc1I div').filter({ hasText: data.produitsupp}).locator('span').nth(2).click()
    //await page.locator('#style_card_wrapper__hrc1I').click();
   //await !expect(page.locator('[id="style_card_wrapper__hrc1I"]')).toContainText(data.produitsupp)
   //await page.pause

  });

  
 });
  // test('supprimer u produit au panier', async ({ page }) => {
  //   // await expect(page).toHaveURL('https://ztrain-web.vercel.app/home')
  //   // await page.locator('#style_content_cart_wrapper__mqNbf').click();
  //   //await expect(page.locator('[id="style_card_wrapper__hrc1I"]')).toContainText(data.produitsupp)    
  //   //await page.locator('#style_card_wrapper__hrc1I div').filter({ hasText: data.produitsupp }).locator('svg').nth(2).click();
    
  //     await page.locator('#style_card_wrapper__hrc1I div').filter({ hasText: data.produitsupp}).locator('span').nth(2).click();
    
  //   await page.pause()

  //   // page.locator('#style_card_wrapper__hrc1I div').filter({ hasText: data.produitsupp}).locator('span').nth(2).click()
  //   await page.locator('#style_card_wrapper__hrc1I').click();
  //  //await !expect(page.locator('[id="style_card_wrapper__hrc1I"]')).toContainText(data.produitsupp)
  //  await page.pause

  // });

  test.afterAll(async()=>{
    allure.addParameter("article",data.produitsupp)
    allure.addParameter("quantité",data.quantité)

  })
})


async function supprimer(page:Page) {
  await expect(page).toHaveURL("https://ztrain-web.vercel.app/home")
  await page.locator('#style_content_cart_wrapper__mqNbf').click();

  let clickList:any[]=[];
  var conteur=0
 
   for(let i=0; i<data.nombresupp; i++  ){
     clickList.push(conteur+i)
   }
 
  
   console.log(clickList)
 

      await expect(page.locator('[id="style_card_wrapper__hrc1I"]'), {message:"produit inexistant"}).toContainText(data.produitsupp)
 
      await  page.locator('#style_card_wrapper__hrc1I div').filter({ hasText: data.produitsupp}).locator('span').nth(2).click();
      await  page.waitForTimeout(2000);
      await page.locator('#style_header_home__8t_ie').click();

      allure.addParameter("article", data.produitsupp)
  
}

module.exports= supprimer