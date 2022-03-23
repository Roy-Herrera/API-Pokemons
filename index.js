const API = 'https://pokeapi.co/api/v2/pokemon/'
const contenedor = document.querySelector('.segundaFila')


async function asincronismo() {
    let pokemones = await fetch(API);
    pokemones = await pokemones.json()

    let PokemonesPerfiles = await Promise.all(pokemones.results.map(p => fetch(p.url)))

    let PokemonesPerfilesJSON = await Promise.all(PokemonesPerfiles.map(response => response.json()))
    renderHTML(PokemonesPerfilesJSON)
}

asincronismo()

function renderHTML(pokemonesLista) {
    let contador = 0;
    let acumulador = 0;
    let columnas = "";
    let numero = 0;
    
    pokemonesLista.forEach((p) => {
        contador++
        acumulador++
        numero++

        let abilidades = []
        p.abilities.forEach((x) => {
            abilidades.push(x.ability.name)
        })

        columnas += `
        <div class="col-md-6 col-lg-3">
            <div class="card border-dark mb-3">
                <div class="card-body text-success" style="height: 240px;">
                    <span>${numero}</span>
                    <img class="card-img-top" src="${p.sprites.other.dream_world.front_default}" alt="">
                </div>
                <div class="card-footer bg-transparent border-dark">
                    <p class="card-text">Nombre: ${p.name}</p>
                    <small class="card-text">Habilidades: ${abilidades.toString().split(",").join(", ")}</small> <br>
                    <small class="card-text">Experiencia: ${p.base_experience}</small>
                </div>
            </div>
        </div>`
    })

    if(contador == 3 || acumulador == pokemonesLista.length) {
        var fila = document.createElement('div') 
        fila.classList.add('row')
        fila.innerHTML = columnas
        contenedor.appendChild(fila)
        contador = 0
        columnas = ""
        numero = 0
    }
}
