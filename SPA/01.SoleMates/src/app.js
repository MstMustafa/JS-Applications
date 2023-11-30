import { render } from "../node_modules/lit-html/lit-html.js";
import page from "../node_modules/page/page.mjs";

import { logout as apiLogout } from "./api/api.js";
import { getUserData } from "./utility.js";
import { createView } from "./views/create.js";
import { dashboardView } from "./views/dashboard.js";
import { detailsView } from "./views/details.js";
import { editView } from "./views/edit.js";
import { homeView } from "./views/home.js";
import { loginView } from "./views/login.js";
import { registerView } from "./views/register.js";
import { searchView } from "./views/search.js";



const main = document.querySelector("main");

setUserNav();

document.getElementById("logoutBtn").addEventListener("click", onLogout);

page("/",decorateContext,homeView)
page("/login",decorateContext,loginView)
page("/register",decorateContext,registerView)
page("/dashboard",decorateContext,dashboardView)
page("/add-pair",decorateContext,createView)
page("/details/:id",decorateContext,detailsView)
page("/edit/:id",decorateContext,editView)
page("/search", decorateContext, searchView);



page.start();

function decorateContext(ctx, next) {
  ctx.render = (content) => render(content, main);
  ctx.setUserNav = setUserNav;
  ctx.user = getUserData();

  next();
}


function setUserNav() {
    const userAsJson = sessionStorage.getItem("user");
    const user = userAsJson && JSON.parse(userAsJson);
    const guestDiv = document.querySelector(".guest");
    const userDiv = document.querySelector(".user");
    user != null
      ? [
          (userDiv.style.display = "inline-block"),
          (guestDiv.style.display = "none"),
        ]
      : [
          (userDiv.style.display = "none"),
          (guestDiv.style.display = "inline-block"),
        ];
  }
  
  async function onLogout() {
    await apiLogout();
    setUserNav();
    page.redirect("/");
  }