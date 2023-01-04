import { test, expect } from '@playwright/test';
import { before } from 'node:test';
import * as logindata from '../logindatas.json';
import {allure} from "allure-playwright"

//import {login} from "../tests/login.spec"

test.beforeEach( async ({ page }) => {
    await page.goto('https://ztrain-web.vercel.app/auth/login');
    await page.getByPlaceholder('Email').click();
    await page.getByPlaceholder('Email').fill(logindata.email);
   // await expect(page.getByPlaceholder('Email')).toContain(data.email)
    await page.getByPlaceholder('Mot de passe').click();
    await page.getByPlaceholder('Mot de passe').fill(logindata.mot_de_passe);
    //await expect(page.getByPlaceholder('Mot de passe')).toContain(data.email)
    await page.locator('#btn_login').click();
    await expect(page).toHaveURL('https://ztrain-web.vercel.app/home')
    await page.pause
    
  })
 
  test('test de deconnexion', async ({ page }) => {
    await page.locator('#style_avatar_wrapper__pEGIQ svg').nth(1).click();
    await page.getByRole('link', { name: 'Se déconnecter' }).click();
    await expect(page).toHaveURL(logindata.urldeco)
  })