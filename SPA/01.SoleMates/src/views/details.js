import { html } from "../../node_modules/lit-html/lit-html.js";
import { deleteShoeById , getShoeById } from "../api/data.js";



const detailsTemp = (shoe,isOwner,onDelete,isLoggedIn) => html`
<section id="details">
          <div id="details-wrapper">
            <p id="details-title">Shoe Details</p>
            <div id="img-wrapper">
              <img src="${shoe.imageUrl}" alt="example1" />
            </div>
            <div id="info-wrapper">
              <p>Brand: <span id="details-brand">${shoe.brand}</span></p>
              <p>Model: <span id="details-model">${shoe.model}</span></p>
              <p>Release date: <span id="details-release">${shoe.release}</span></p>
              <p>Designer: <span id="details-designer">${shoe.designer}</span></p>
              <p>Value: <span id="details-value">${shoe.value}</span></p>
            </div>
            <!--Edit and Delete are only for creator-->
            <div id="action-buttons">
                ${isOwner ?
                html` <a href="/edit/${shoe._id}" id="edit-btn">Edit</a>
                <a href="javascript:void(0)" id="delete-btn" @click=${onDelete}>Delete</a>`
                : ""}
             
            </div>
          </div>
        </section>

`

export async function detailsView(ctx){
    const shoeid = ctx.params.id;
    
    const shoe = await getShoeById(shoeid)
    const user = ctx.user;

    let userId;

    if(user != null){
        userId = user._id
    }

    const isOwner = user && shoe._ownerId == user._id;
    const isLoggedIn = user !== undefined;

    ctx.render(detailsTemp(shoe,isOwner,onDelete,isLoggedIn));


    async function onDelete(){
        const confirmed = confirm("Are you sure")

        if(confirmed){
            await deleteShoeById(shoeid)
            ctx.page.redirect("/dashboard")
        }
    }

}