import { test, expect, Page } from '@playwright/test';
import { before } from 'node:test';
import * as logindata from '../logindatas.json';
import * as data from '../recherche.json';
import {allure} from "allure-playwright"



//  test.beforeEach( async ({ page }) => {
//     await page.goto('https://ztrain-web.vercel.app/auth/login');
//     await page.getByPlaceholder('Email').click();
//     await page.getByPlaceholder('Email').fill(logindata.email);
//    // await expect(page.getByPlaceholder('Email')).toContain(data.email)
//     await page.getByPlaceholder('Mot de passe').click();
//     await page.getByPlaceholder('Mot de passe').fill(logindata.mot_de_passe);
//     //await expect(page.getByPlaceholder('Mot de passe')).toContain(data.email)
//     await page.locator('#btn_login').click();
//     await expect(page).toHaveURL('https://ztrain-web.vercel.app/home')
//     await page.pause
    
//   }) 

test.describe("rechcerche",async () => {
  let page: Page
  test.beforeAll(async ({browser}) => {
    page = await browser.newPage()

    await page.goto('https://ztrain-web.vercel.app/auth/login');
    await page.getByPlaceholder('Email').click();
    await page.getByPlaceholder('Email').fill(logindata.email);
    await page.getByPlaceholder('Mot de passe').click();
    await page.getByPlaceholder('Mot de passe').fill(logindata.mot_de_passe);
    await page.locator('#btn_login').click();
    await expect(page).toHaveURL('https://ztrain-web.vercel.app/home')
    
  })

  test('test de recherche produit', async () => {
    await expect(page).toHaveURL('https://ztrain-web.vercel.app/home')
    await page.waitForTimeout(2000)
    await page.getByPlaceholder('Rechecher un produit').click();
    await page.getByPlaceholder('Rechecher un produit').fill(data.input);

    await page.getByPlaceholder('Rechecher un produit').press('Enter');
    await expect(page.getByPlaceholder('Rechecher un produit')).toHaveValue(data.input)
    await expect(page.locator('[id=style_popular_product_wrapper__z6J0h]'), {message:"produit non trouvé"}).toContainText(data.input)
   

  })
  


// test('test de recherche produit', async ({ page }) => {
//     await expect(page).toHaveURL('https://ztrain-web.vercel.app/home')
//     await page.getByPlaceholder('Rechecher un produit').click();
//     await page.getByPlaceholder('Rechecher un produit').fill(data.input);
//     await page.pause

//     await page.getByPlaceholder('Rechecher un produit').press('Enter');
//     await expect(page.getByPlaceholder('Rechecher un produit')).toHaveValue(data.input)
//     await expect(page.locator('[id=style_popular_product_wrapper__z6J0h]')).toContainText(data.input)
   


//   })

  // test('test de recherche produit inexistant', async ({ page }) => {
  //   await page.goto('https://ztrain-web.vercel.app/home')
  //   await page.getByPlaceholder('Rechecher un produit').click();
  //   await page.getByPlaceholder('Rechecher un produit').fill(data.input);
    
  //   await page.getByPlaceholder('Rechecher un produit').press('Enter');
  //   //await expect(page.getByPlaceholder('Rechecher un produit')).toHaveValue(data.input)
  //   await expect(page.locator('[id=style_popular_product_wrapper__z6J0h]')).toContainText('Aucun produit trouvé')
   


  // })

  test.afterAll(async()=>{
    allure.addParameter("article",data.input)

  })
})

  async function recherche(page:Page) {
    await expect(page).toHaveURL('https://ztrain-web.vercel.app/home')
    await page.waitForTimeout(2000)
    await page.getByPlaceholder('Rechecher un produit').click();
    await page.getByPlaceholder('Rechecher un produit').fill(data.input);

    await page.getByPlaceholder('Rechecher un produit').press('Enter');
    await expect(page.getByPlaceholder('Rechecher un produit')).toHaveValue(data.input)
    await expect(page.locator('[id=style_popular_product_wrapper__z6J0h]')).toContainText(data.input)
    await page.waitForTimeout(5000)
    await page.locator('#style_header_home__8t_ie').click();


    allure.addParameter("article",data.input)

    
  }

  module.exports= recherche