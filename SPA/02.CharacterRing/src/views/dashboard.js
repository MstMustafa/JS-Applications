import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllCharacters } from "../api/data.js";

const dashboardTemp = (characters) => html`
<h2>Characters</h2>
        <section id="characters">
          ${characters.length == 0 
          ? html` <h2>No added Heroes yet.</h2>`
          : characters.map((c) => html`
                 <div class="character">
            <img src="${c.imageUrl}" alt="example1" />
            <div class="hero-info">
              <h3 class="category">${c.category}</h3>
              <p class="description">${c.description}</p>
              <a class="details-btn" href="/details/${c._id}">More Info</a>
            </div>`)}

            </section>;
`

export async function dashboardView(ctx){
    const characters = await getAllCharacters();
    ctx.render(dashboardTemp(characters))
}