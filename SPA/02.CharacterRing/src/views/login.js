import { html } from "../../node_modules/lit-html/lit-html.js";
import { login } from "../api/api.js";

const loginTemp = (onSubmit) => html`
<section id="login">
          <div class="form" @submit=${onSubmit}>
            <img class="border" src="./images/border.png" alt="">
            <h2>Login</h2>
            <form class="login-form">
              <input type="text" name="email" id="email" placeholder="email" />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="password"
              />
              <button type="submit">login</button>
              <p class="message">
                Not registered? <a href="/register">Create an account</a>
              </p>
            </form>
            <img class="border" src="./images/border.png" alt="">
          </div>
        </section>
`

export async function loginView(ctx){
    ctx.render(loginTemp(onSubmit))

    async function onSubmit(e){
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get("email");
        const password = formData.get("password");
    
        if (!password || !email) {
          return alert("All fields are required!");
        }
    
        await login(email, password);
        e.target.reset();
        ctx.setUserNav();
        ctx.page.redirect("/");
    }
}