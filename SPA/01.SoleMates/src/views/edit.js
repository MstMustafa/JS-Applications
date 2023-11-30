import { html } from "../../node_modules/lit-html/lit-html.js";
import { editShoeById,getShoeById } from "../api/data.js";

const editTemp= (shoe,onSubmit) => html`
 <section id="edit">
          <div class="form">
            <h2>Edit item</h2>
            <form class="edit-form"  @submit=${onSubmit}>
              <input
                type="text"
                name="brand"
                id="shoe-brand"
                placeholder="Brand"
                value="${shoe.brand}"
              />
              <input
                type="text"
                name="model"
                id="shoe-model"
                placeholder="Model"
                value="${shoe.model}"
              />
              <input
                type="text"
                name="imageUrl"
                id="shoe-img"
                placeholder="Image url"
                value="${shoe.imageUrl}"
              />
              <input
                type="text"
                name="release"
                id="shoe-release"
                placeholder="Release date"
                value="${shoe.release}"
              />
              <input
                type="text"
                name="designer"
                id="shoe-designer"
                placeholder="Designer"
                value="${shoe.designer}"
              />
              <input
                type="text"
                name="value"
                id="shoe-value"
                placeholder="Value"
                value="${shoe.value}"
              />

              <button type="submit">post</button>
            </form>
          </div>
        </section>
`

export async function editView(ctx){
    const shoeId = ctx.params.id;

    const fruit = await getShoeById(shoeId);
  ctx.render(editTemp(fruit, onSubmit));

  async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const editShoe = {
      brand: formData.get("brand").trim(),
      model: formData.get("model").trim(),
      imageUrl: formData.get("imageUrl").trim(),
      release: formData.get("release").trim(),
      designer: formData.get("designer").trim(),
      value: formData.get("value").trim(),
    };

    if (Object.values(editShoe).some((x) => !x)) {
      return alert("All fields are required!");
    }

    await editShoeById(shoeId, editShoe);
    e.target.reset();
    ctx.page.redirect(`/details/${shoeId}`);
  }
}