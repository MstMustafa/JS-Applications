import { html } from "../../node_modules/lit-html/lit-html.js";
import { addCharacter } from "../api/data.js";

const addTemp = (onSubmit) => html`
<section id="create">
          <div class="form">
            <img class="border" src="./images/border.png" alt="">
            <h2>Add Character</h2>
            <form class="create-form" @submit=${onSubmit}>
              <input
                type="text"
                name="category"
                id="category"
                placeholder="Character Type"
              />
              <input
                type="text"
                name="image-url"
                id="image-url"
                placeholder="Image URL"
              />
              <textarea
              id="description"
              name="description"
              placeholder="Description"
              rows="2"
              cols="10"
            ></textarea>
            <textarea
              id="additional-info"
              name="additional-info"
              placeholder="Additional Info"
              rows="2"
              cols="10"
            ></textarea>
              <button type="submit">Add Character</button>
            </form>
            <img class="border" src="./images/border.png" alt="">
          </div>
        </section>
`

export async function AddView(ctx){
    ctx.render(addTemp(onSubmit))

    async function onSubmit(e){
     e.preventDefault();
    const formData = new FormData(e.target);

    const newCharacter = {
      category: formData.get("category").trim(),
      imageUrl: formData.get("image-url").trim(),
      description: formData.get("description").trim(),
      moreInfo: formData.get("additional-info").trim(),
    };

    if (Object.values(newCharacter).some((x) => !x)) {
      return alert("All fields are required!");
    }

    await addCharacter(newCharacter);
    e.target.reset();
    ctx.page.redirect("/dashboard");
    }
}