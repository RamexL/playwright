import { Given, When, Then } from "@cucumber/cucumber";
import { OurWorld } from "../setup/types";
import { expect } from "@playwright/test";




Given("i open Ztrain login page", async function (this: OurWorld) {
  await this.page.goto("https://ztrain-web.vercel.app/auth/login");
  await expect(this.page, "good").toHaveURL("https://ztrain-web.vercel.app/auth/login");
});

When(
  "I enter email address {string} and password {string}",
  async function (this: OurWorld, string, string2) {
    
    await this.page.goto("https://ztrain-web.vercel.app/auth/login");
    await this.page.getByPlaceholder("Email").fill(string);
    await this.page.getByPlaceholder("Mot de passe").fill(string2);
    
  }
);

When("I clicks to the login button", async function (this: OurWorld) {
  await this.page.locator("#btn_login").click();
});

Then(
  "The user is connected with  {string}",
  async function (this: OurWorld, string) {
/*     if (this.page.$("Email ou mot de passe incorrect")) {
      await expect(
        this.page.getByText("Email ou mot de passe incorrect")
      ).toHaveText("Email ou mot de passe incorrect");
    } */
  
      const locator = this.page
        .locator("#style_content_logo__pkvMP")
        .getByRole("heading", { name: "Z-Train" });
        await expect(locator, "should be logged in").toBeVisible({
          timeout: 10000,
        });
/*       await expect(locator, {
        message: "Le mot de passe ou le mail est incorrect",
      }).toContainText(string).catch(()=>{
        console.log("Le mot de passe ou le mail est incorrect");
      }); */
    }
  
);

