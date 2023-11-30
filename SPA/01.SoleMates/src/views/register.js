import { html } from "../../node_modules/lit-html/lit-html.js";
import { register } from "../api/api.js";

const registerTemp = (onSubmit) => html`
<section id="register">
          <div class="form">
            <h2>Register</h2>
            <form class="login-form" @submit=${onSubmit}>
              <input
                type="text"
                name="email"
                id="register-email"
                placeholder="email"
              />
              <input
                type="password"
                name="password"
                id="register-password"
                placeholder="password"
              />
              <input
                type="password"
                name="re-password"
                id="repeat-password"
                placeholder="repeat password"
              />
              <button type="submit">login</button>
              <p class="message">Already registered? <a href="/login">Login</a></p>
            </form>
          </div>
        </section>
`


export async function registerView(ctx){
   ctx.render(registerTemp(onSubmit))

   async function onSubmit(e){
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    const repeatPass = formData.get("re-password");

    if (!password || !email) {
      return alert("All fields are required!");
    } else if (password != repeatPass) {
      return alert("Password don't match");
    }

    await register(email, password);
    e.target.reset();
    ctx.setUserNav();
    ctx.page.redirect("/");
   }
}