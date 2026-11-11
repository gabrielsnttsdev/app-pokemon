import axios from 'axios';

const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
});

export const urlImagem = (id) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

export default api;