const buscar = document.getElementById("buscar");

buscar.addEventListener("keypress", parametros);

const pokeData = document.getElementById("pokeData")
const scard = document.querySelector("#scard");
const previous = document.querySelector("#previous");
const next = document.querySelector("#next");
const pagination = document.querySelector(".pagination");

document.addEventListener("click", mostrarinfo);

function mostrarinfo(e) {
    console.log(e.target.id);
    let poke_select = e.target.id;
    if (poke_select) {
        pokeff(poke_select);
    }
}

function parametros(e) {
    // console.log(e.key);
    if (e.key == "Enter") {
        // console.log(buscar.value);
        pokef(buscar.value);
    }
    if (e.key == "") {
        resethtml();
        fetch(`https://pokeapi.co/api/v2/pokemon/`)
            .then((res) => res.json())
            .then((data) => {
                mostrarpoke(data);
            });
    }
}

function resethtml() {
    while (pokeData.firstChild) {
        pokeData.removeChild(pokeData.firstChild);
    }
}

let offset = 1;
let limit = 8;

previous.addEventListener('click', () => {
    if (offset != 1) {
        offset -= 9;
        poksf(offset, limit);
    }
})

next.addEventListener('click', () => {
    offset += 9;
    poksf(offset, limit);
})

function pokeff(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
        });
}

function pokef(id) {
    resethtml();
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then((res) => res.json())
        .then((data) => {
            mostrarpoke(data);
        });
}

function poksf(offset, limit) {

    for (let i = offset; i <= offset + limit; i++) {
        pokef(i);
    }
}

function mostrarpoke(poke) {

    const inf = document.createElement("div");
    inf.classList.add("poke-cont");

    const button = document.createElement("button");
    button.classList.add('btn-pokemon');
    let pokemon_id = poke.id
    button.id = pokemon_id;

    button.innerText = 'Ver pokemon';

    const spriteCont = document.createElement("div");
    spriteCont.classList.add("img-cont");

    const sprite = document.createElement("img");
    sprite.src = poke.sprites.front_default;

    spriteCont.appendChild(sprite);

    const number = document.createElement("p");
    number.textContent = `#${poke.id.toString().padStart(3,0)}`;

    const name = document.createElement("p");
    name.classList.add("name");
    name.textContent = poke.name

    inf.appendChild(spriteCont);
    inf.appendChild(number);
    inf.appendChild(name);
    inf.appendChild(button);

    const perfilcont = document.createElement("div");
    perfilcont.classList.add("perfil-cont");

    button.onclick = function () {
        perfilcont.style.display = "block";
    }
    perfilcont.onclick = function () {
        perfilcont.style.display = "none";
    }

    const perfilB = document.createElement("div");
    perfilB.classList.add("poke-block-b");
    const imgb = document.createElement("img");
    imgb.src = poke.sprites.front_shiny;
    perfilB.appendChild(imgb);

    perfilB.appendChild(statcaract(poke.stats));

    perfilcont.appendChild(perfilB);
    inf.appendChild(perfilcont);
    pokeData.appendChild(inf);
}

function statcaract(stats) {
    const statsContainer = document.createElement("div");
    statsContainer.classList.add("stats-container");

    for (let i = 0; i < 3; i++) {
        const stat = stats[i];

        const statPercent = stat.base_stat;
        const statContainer = document.createElement("stat-container");
        statContainer.classList.add("stat-container");

        const statName = document.createElement("p");
        statName.textContent = stat.stat.name;

        const progress = document.createElement("div");
        progress.classList.add("progress");

        const statb = document.createElement("div");
        statb.style.width = statPercent;

        statb.textContent = stat.base_stat;

        progress.appendChild(statb);
        statContainer.appendChild(statName);
        statContainer.appendChild(progress);

        statsContainer.appendChild(statContainer);
    }

    return statsContainer;
}

poksf(offset, limit);