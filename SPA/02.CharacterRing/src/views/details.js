import { html } from "../../node_modules/lit-html/lit-html.js";
import{
    deleteCharacterById,
    getCharacterById,
    getTotalLikes,
    didUserLike,
    like,
} from "../api/data.js"

const detailsTemp = (
character,
isOwner,
onDelete,
isLoggedIn,
TotalLikesCount,
onCLickLike,
didUserLiking    
)=> html`
<section id="details">
          <div id="details-wrapper">
            <img id="details-img" src="${character.imageUrl}" alt="example1" />
            <div>
            <p id="details-category">${character.category}</p>
            <div id="info-wrapper">
              <div id="details-description">
                <p id="description">${character.description} </p>
                <p id ="more-info"> ${character.moreInfo}</p>
              </div>
            </div>
              <h3>Is This Useful:<span id="likes">${TotalLikesCount}</span></h3>

          <div id="action-buttons">
            ${isOwner 
               ? html`<a href="/edit/${character._id}" id="edit-btn">Edit</a>
                      <a href="javascript:void(0)" id="delete-btn" @click=${onDelete}>Delete</a>`
                : ""}
            ${(()=>{
             if(didUserLiking == 0){
                if(isLoggedIn && !isOwner){
                       return html`<a href="javascript:void(0)" @click=${onCLickLike} id="like-btn">Like</a>`
                }
             }
            })()}

            
           

          </div>
            </div>
        </div>
`

export async function detailsView(ctx){
    const characterId = ctx.params.id;
    const character = await getCharacterById(characterId);
    const user = ctx.user;

    let userId;
    let totalLikesCount;
    let didUserLiking;

  if (user != null) {
    userId = user._id;
    didUserLiking = await didUserLike(characterId, userId);
  }

  const isOwner = user && character._ownerId == user._id;
  const isLoggedIn = user !== undefined;

  totalLikesCount= await getTotalLikes(characterId);
  ctx.render(
    detailsTemp(
        character,
        isOwner,
        onDelete,
        isLoggedIn,
        totalLikesCount,
        onCLickLike,
        didUserLiking
    )
  )

  async function onCLickLike(){
    const donation = {
        characterId,
    };
    await like(donation)

    totalLikesCount = await getTotalLikes(characterId)
    didUserLiking = await didUserLike(characterId,userId);
    ctx.render(
        detailsTemp(
            character,
            isOwner,
            onDelete,
            isLoggedIn,
            totalLikesCount,
            onCLickLike,
            didUserLiking
        )
    )
  }


  async function onDelete() {
    const confirmed = confirm("Are you sure?");
    if (confirmed) {
      await deleteCharacterById(characterId);
      ctx.page.redirect("/dashboard");
    }
  }

}