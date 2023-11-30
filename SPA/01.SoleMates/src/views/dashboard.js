import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllShoes} from "../api/data.js";

const dashTemp = (shoes) => html`
<section id="dashboard">
          <h2>Collectibles</h2>
          <ul class="card-wrapper">
          ${shoes.length == 0 ?
           html`<h2>There are no items added yet.</h2>
        </section>` : shoes.map( (shoe) => html`
        
        <li class="card">
              <img src="${shoe.imageUrl}" alt="travis" />
              <p> <strong>Brand: </strong><span class="brand">${shoe.brand}</span></p>
              <p><strong>Model: </strong><span class="model">${shoe.model}</span></p>
              <p><strong>Value:</strong><span class="value">${shoe.value}</span>$</p>
              <a class="details-btn" href="/details/${shoe._id}">Details</a>
            </li>
        `)}
        </ul>
        </section>
`


export async function dashboardView(ctx) {
    const shoes = await getAllShoes();
    console.log(shoes);
    ctx.render(dashTemp(shoes));
  }
  