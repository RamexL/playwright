import { test, expect, Page } from '@playwright/test';
import * as data from '../logindatas.json';
import {allure} from "allure-playwright";
import assert from 'assert/strict';


// test.beforeEach(async ({ page }) => {
//   var rimraf = require("rimraf");
//   rimraf("./allure-results", function () { console.log("done"); });
//   page.pause();
// });

test.describe('regroupement login',async () => {
  let page:Page

  test.beforeAll(async ({browser}) => {
    page = await browser.newPage()
    
  })



test('test de connexion', async () => {
    await page.goto('https://ztrain-web.vercel.app/auth/login');
    await page.getByPlaceholder('Email').click();
    await page.getByPlaceholder('Email').fill(data.email);
    await expect(page.getByPlaceholder('Email')).toHaveValue(data.email)
    await page.getByPlaceholder('Mot de passe').click();
    await page.getByPlaceholder('Mot de passe').fill(data.mot_de_passe);
    await expect(page.getByPlaceholder('Mot de passe')).toHaveValue(data.mot_de_passe)
    await page.locator('#btn_login').click();
    await expect(page,{message:"erreur de login"}).toHaveURL('https://ztrain-web.vercel.app/home')
    
    
  })

/*   test.afterAll(async({page})=>{
    allure.addParameter("email",data.email)
    allure.addParameter("mot de passe",data.mot_de_passe)

  }) */

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

test.afterAll(async()=>{
  allure.addParameter("email",data.email)
  allure.addParameter("mot de passe",data.mot_de_passe)

})

})

async function login(page:Page) {
  await page.goto('https://ztrain-web.vercel.app/auth/login');
    await page.getByPlaceholder('Email').click();
    await page.getByPlaceholder('Email').fill(data.email);
    await expect(page.getByPlaceholder('Email')).toHaveValue(data.email)
    await page.getByPlaceholder('Mot de passe').click();
    await page.getByPlaceholder('Mot de passe').fill(data.mot_de_passe);
    await expect(page.getByPlaceholder('Mot de passe')).toHaveValue(data.mot_de_passe)
    await page.locator('#btn_login').click();
    // await expect(page,{message:"erreur de login"}).toHaveURL('https://ztrain-web.vercel.app/home')

    allure.addParameter("email",data.email)
    allure.addParameter("mot de passe",data.mot_de_passe)
  
}

module.exports= login
