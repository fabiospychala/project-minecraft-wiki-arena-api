const $form = document.querySelector("form");
const maincard = document.querySelector("#result-search");

$form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const searchvalue = document.querySelector("#page-explore-search-input").value.toLowerCase().trim();
    const response = await fetch(API + "entities");
    const data = await response.json();

    maincard.innerHTML = "";

    let divglobalcard = document.createElement("div");
    divglobalcard.classList.add("card");
    maincard.appendChild(divglobalcard);

    const filtered = searchvalue === ""
        ? data
        : data.filter(entity => entity.name.toLowerCase().includes(searchvalue));

    if (filtered.length === 0) {
        let msg = document.createElement("p");
        msg.textContent = "Aucune entité trouvée.";
        divglobalcard.appendChild(msg);
        return;
    }

    for (let i = 0; i < filtered.length; i++) {
        const entity = filtered[i];
        const type = entity.type;

        const colors = {
            neutral: "rgba(227, 181, 153, 1)",
            passive: "rgba(79, 140, 105, 1)",
            hostile: "rgba(210, 70, 70, 1)",
        };
        const color = colors[type] || "#ccc";

        let divcard = document.createElement("div");
        divcard.classList.add("div-card");
        divcard.style.border = `solid 2px ${color}`;
        divglobalcard.appendChild(divcard);

        let p = document.createElement("p");
        p.textContent = entity.name;
        p.classList.add("p-search");
        p.style.backgroundColor = color;
        divcard.appendChild(p);

        let img = document.createElement("img");
        img.setAttribute("src", entity.image);
        console.log(entity.image)
        img.classList.add("img-search");
        divcard.appendChild(img);

        let divsubtext = document.createElement("div");
        divsubtext.classList.add("div-sub-text");
        divcard.appendChild(divsubtext);

        let divtext = document.createElement("div");
        divtext.classList.add("div-text");
        divsubtext.appendChild(divtext);

        let a = document.createElement("a");
        a.textContent = entity.classification ?? "Unknown";
        a.classList.add("InfoBlue");
        a.setAttribute("href", "");
        divtext.appendChild(a);

        let hr = document.createElement("hr");
        hr.classList.add("hr-card");
        hr.style.backgroundColor = color;
        divsubtext.appendChild(hr);

        let ptype = document.createElement("p");
        ptype.textContent = entity.type;
        ptype.classList.add("ptype");
        divtext.appendChild(ptype);

        let btn = document.createElement("button");
        btn.textContent = "SEE MORE";
        btn.classList.add("BTNspawn-card");
        btn.style.backgroundColor = color;
        divcard.appendChild(btn);
    }
});