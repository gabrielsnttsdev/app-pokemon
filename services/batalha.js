import api, { urlImagem } from './api';

const FORTE_CONTRA = {
  normal: [],
  fire: ['grass', 'ice', 'bug', 'steel'],
  water: ['fire', 'ground', 'rock'],
  electric: ['water', 'flying'],
  grass: ['water', 'ground', 'rock'],
  ice: ['grass', 'ground', 'flying', 'dragon'],
  fighting: ['normal', 'ice', 'rock', 'dark', 'steel'],
  poison: ['grass', 'fairy'],
  ground: ['fire', 'electric', 'poison', 'rock', 'steel'],
  flying: ['grass', 'fighting', 'bug'],
  psychic: ['fighting', 'poison'],
  bug: ['grass', 'psychic', 'dark'],
  rock: ['fire', 'ice', 'flying', 'bug'],
  ghost: ['ghost', 'psychic'],
  dragon: ['dragon'],
  dark: ['ghost', 'psychic'],
  steel: ['ice', 'rock', 'fairy'],
  fairy: ['fighting', 'dragon', 'dark'],
};

export const buscarLutador = async (id, signal) => {
  const { data } = await api.get(`/pokemon/${id}`, { signal });
  const stat = (nome) => data.stats.find((s) => s.stat.name === nome).base_stat;
  const hp = stat('hp') + 50;

  return {
    id,
    nome: data.name,
    imagem: urlImagem(id),
    tipos: data.types.map((t) => t.type.name),
    hp,
    hpMax: hp,
    atk: stat('attack'),
    def: stat('defense'),
  };
};

export const calcularDano = (atacante, defensor) => {
  const vantagem = atacante.tipos.some((t) =>
    defensor.tipos.some((d) => FORTE_CONTRA[t]?.includes(d))
  );
  const base = atacante.atk * 0.6 - defensor.def * 0.2 + 15;
  const sorte = 0.85 + Math.random() * 0.3;
  const dano = Math.max(8, Math.round(base * (vantagem ? 1.5 : 1) * sorte));

  return { dano, vantagem };
};