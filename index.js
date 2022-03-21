// const fetch = require('node-fetch')
const API = 'https://pokeapi.co/api/v2/pokemon/'
const contenedor = document.querySelector('.row')


async function asincronismo() {
    let pokemones = await fetch(API);
    pokemones = await pokemones.json()

    let PokemonesPerfiles = await Promise.all(pokemones.results.map(p => fetch(p.url)))

    let PokemonesPerfilesJSON = await Promise.all(PokemonesPerfiles.map(response => response.json()))

    console.log(PokemonesPerfilesJSON);
    PokemonesPerfilesJSON.forEach((p) => {
        let abilidades = []

        p.abilities.forEach((x) => {
            abilidades.push(x.ability.name)
        })

        contenedor.innerHTML += `
            <div class="card col-md-3">
                <img src="${p.sprites.other.dream_world.front_default}" class="card-img-top" alt="...">
                <div class="card-body">
                    <p class="card-text">Nombre: ${p.name}</p>
                    <p class="card-text">Habilidades: ${abilidades.toString().split(",").join(", ")}</p>
                    <p class="card-text">Experiencia: ${p.base_experience}</p>
                </div>
            </div>`
    })
}

asincronismo()