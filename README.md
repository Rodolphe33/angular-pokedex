# Angular Pokedex App

Tutorial [Angular Senior](http://angularsenior.fr)

## JSON-SERVER

1 - npm install json-server@0.17.4 --save-dev
  - https://www.npmjs.com/package/json-server

2 - package.json

```json
"script" : {
  ...
  "start:api": "json-server db.json",
}
```

3 - npm run start:api

### Requête HTTP avec la collection de 'pokémons'

| | | |
| --- | --- | --- |
| GET | **/pokemons** | *renvoie tous les pokémons* |
| GET | **/pokemons/1** | *renvoie le pokémon avec l'identifiant 1* |
| POST | **/pokemons** | *ajoute un nouveau pokémon* |
| PUT | **/pokemons/1** | *modifie le pokémon avec l'identifiant 1* |
| GET | **/pokemons?name='Bulbizzare'** | *Recherche un Pokémon par son om* |
| GET | **/pokemons?_page=1&_limit=10** | *Pagine les Pokémon* |
| GET | **/pokemons?_sort=name&_order=asc** | *Tri la liste des Pokémons* |
