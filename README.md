# Pokémon 3D API — Server Engine

Welcome to the core RESTful engine for the **Pokémon 3D API**. This repository handles the backend logic and JSON delivery that powers 3D Pokémon integration in modern web applications.

**Looking for the 3D Models?** Visit the [Assets Repository](https://github.com/Pokemon-3D-api/assets) for raw files and model counts.

**See it in action!** [![Live App 1](https://img.shields.io/badge/Live-Pokedex%20Viewer%201-brightgreen)](https://sudhanshu-ambastha.github.io/Pokedex/) 
[![Live App 2](https://img.shields.io/badge/Live-Pokedex%20Viewer%202-brightgreen)](https://pokemon-3d-api.oneapp.dev/)

<p align="center">
    <img src="https://go-skill-icons.vercel.app/api/icons?i=html,css,js,modelviewer,threejs,postman,githubactions,yml,api,opensource" />
</p>

---

## Table of Contents
- [Features](#features)
- [Using the API](#using-the-api)
- [Note About APIs](#note-about-apis)
- [Credits & Legal](#credits)

---

## Features
- Access a **JSON API** for retrieving optimized Pokémon 3D model URLs.
- Seamless integration with Google's `<model-viewer>`.
- High-performance metadata delivery with **Node-Cache**.

---

## Using the API
To fetch data, consult the [![Postman](https://img.shields.io/badge/Postman-Documentation-orange)](https://documenter.getpostman.com/view/29725199/2sAYX8KMU8).

### JSON Response Structure

The API returns an array of Pokémon objects. Each object contains an `id` and an array of `forms`.
```json
{
  "pokemon": [
    {
      "id": 1,
      "forms": [
        {
          "name": "Bulbasaur",
          "model": "https://raw.githubusercontent.com/Pokemon-3D-api/assets/main/models/opt/regular/1.glb",
          "formName": "regular"
        },
        {
          "name": "Shiny Bulbasaur",
          "model": "https://raw.githubusercontent.com/Pokemon-3D-api/assets/main/models/opt/shiny/1.glb",
          "formName": "shiny"
        }
      ]
    },
  // ... more Pokémon objects
]
````

### API Endpoint
```
https://pokemon-3d-api.onrender.com/v1/pokemon
```

### Example Usage (JavaScript)
```js
fetch('https://pokemon-3d-api.onrender.com/v1/pokemon')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

## Note About APIs
While there are many Pokémon APIs available that provide Pokémon data (e.g., stats, types, moves, etc.), most of these APIs do not offer 3D models of Pokémon.  This is primarily due to the significant storage and bandwidth requirements for hosting and serving 3D models, as well as potential licensing issues.  Existing APIs like [PokéAPI](https://pokeapi.co/) are excellent resources for general Pokémon information, but they do not include 3D models.

## Credits
Check [![Credits](https://img.shields.io/badge/Credits-See%20File-red)](./docs/CREDITS.md) for a list of contributors and resources used in this project.  This project is a community-driven effort to provide a comprehensive and accessible 3D model database for Pokémon.  We appreciate the contributions of
everyone who has helped make this project a reality.  If you have any questions or would like to
contribute, please don't hesitate to reach out.  We're always happy to help and appreciate
any assistance you can provide.  Thank you for your interest in this project!

## License
This project is open source and available under the [![License](https://img.shields.io/badge/License-MIT-blue)](./docs/LICENSE) for all versions up to ![GitHub Tag](https://img.shields.io/github/v/tag/Sudhanshu-Ambastha/Pokemon-3D)

## Legal Notice

For more information about the legal considerations related to this project, please see the [![Copyright](https://img.shields.io/badge/Copyright-See%20File-yellow)](./docs/COPYRIGHT.md) file.

### The Pokémon3D project community 
Join our Discord: [![Join us on Discord](https://img.shields.io/discord/mycoolserver?label=Join%20us%20on%20Discord&logo=discord&style=social)](https://discord.gg/4JptVPw8qn)

<h1 align="center">Don't just clone 🤖 it, also star 🌟 it!</h1>
