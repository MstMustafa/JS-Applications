import { html } from "../../node_modules/lit-html/lit-html.js";

import { search } from "../api/data.js";
import { getUserData } from "../utility.js";

const searchTemp = (shoes,onSearch,isLoggedIn) => html`
 <section id="search">
          <h2>Search by Brand</h2>

          <form class="search-wrapper cf">
            <input
              id="#search-input"
              type="text"
              name="search"
              placeholder="Search here..."
              required
            />
            <button type="submit" @click=${onSearch}>Search</button>
          </form>

          <h3>Results:</h3>

           ${shoes  != undefined ?
           html ` <div id="search-container">
            <ul class="card-wrapper">
                ${shoes.length == 0 
                ? html`<h2>There are no results found.</h2>`
                : shoes.map(s => html`
                <li class="card">
                <img src="${s.imageUrl}" alt="travis" />
                <p> <strong>Brand: </strong><span class="brand">${s.brand}</span></p>
                <p><strong>Model: </strong><span class="model">${s.model}</span></p>
                <p><strong>Value:</strong><span class="value">${s.value}</span>$</p>
                ${isLoggedIn ? html`<a class="details-btn" href="/details/${s._id}">Details</a>` : ''}
              </li>`) }
            ` : ""}
            </ul>
          </div>
        </section>
`

export async function searchView(ctx){
    let user = getUserData(ctx.user)
    let shoes = undefined

    const name = ctx.querystring.split('=')[1];

    if(name !== undefined) {
        shoes = await search(name);
      }

      const isLoggedIn = user !== undefined;

      console.log(shoes);
    ctx.render(searchTemp(shoes, onSearch, isLoggedIn));

    async function onSearch() {
        const query = document.querySelector('#search-input').value;
        if (query !== '') {
            ctx.page.redirect(`/search?query=${query}`);
        } else {
            return alert('All fields are required!');
        }
    }
}