import { html ,render } from "./node_modules/lit-html/lit-html.js";
import {cats} from "./catSeeder.js"

const section = document.getElementById("allCats");

const content = html `
   <ul>
        ${cats.map( cat => catTemp(cat))}
   </ul>
`

render(content,section);
document.querySelectorAll("[data-handler='toggleBtn']").forEach(bttn => bttn.addEventListener("click",showInfo))



function catTemp (cat) {
    return html `<li>
    <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
    <div class="info">
        <button class="showBtn" data-id="${cat.id}" data-handler="toggleBtn">Show status code</button>
        <div class="status" style="display: none" id=${cat.id}>
            <h4>Status Code: ${cat.statusCode}</h4>
            <p>${cat.statusMessage}</p>
        </div>
    </div>
    </li>`

}


function showInfo(event){

    const button = event.target;
    const div =  button.parentElement.querySelector("div")
    const currState = div.style.display
    div.style.display = currState === "none" ? "block" : "none";
    button.textContent = currState === "none"  ? "Hide status code" : "Show status code";


}
