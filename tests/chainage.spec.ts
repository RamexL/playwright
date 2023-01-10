import { test, Page } from "@playwright/test"
import assert from "assert"

const login = require("./login.spec")
const deconnexion = require("./deconnexion.spec")
// const rechcerche = require("./recherche.spec")
// const ajoupanier = require("./ajoutPanier.spec")
//const ajoutflopproduit = require("./ajoutPanier.spec")

// const suppression = require("./supprimerproduit.spec")
// const inscription = require("./inscription.spec")

test.describe("testes à la chaine", async()=>{
    let page:Page
    test.beforeAll(async ({browser}) => {
        page = await browser.newPage()
    })


    // test("inscription", async () => {
    //     await inscription(page);
    //   });

    test("Login", async () => {
        await login(page);
      });

    //   test("ajout panier", async () => {
    //     await ajoupanier(page);
    //   });

    // test("ajout panier", async () => {
    //     await ajoutflopproduit(page);
    //   });

      

    //   test("recherche", async () => {
    //     await rechcerche(page);
    //     page.waitForTimeout(6000)
    //   });

    // test("supprimer", async () => {
    //     await suppression(page);
        
    // });

      test("deconnexion", async () => {
        await deconnexion(page);
      }); 
})