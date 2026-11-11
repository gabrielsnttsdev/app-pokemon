import { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

import api, { urlImagem } from '../services/api';
import GradePokemons from '../components/GradePokemons';
import CampoBusca from '../components/CampoBusca';
import Botao from '../components/Botao';
import { cores } from '../tema';

const pegarId = (url) => url.split('/').filter(Boolean).pop();

export default function Pokedex({ navigation, favoritos, time }) {
  const [pokemons, setPokemons] = useState([]);
  const [busca, setBusca] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    api
      .get('/pokemon?limit=151', { signal: controller.signal })
      .then((resposta) =>
        setPokemons(
          resposta.data.results.map((p) => {
            const id = pegarId(p.url);
            return { nome: p.name, id, imagem: urlImagem(id) };
          })
        )
      )
      .catch((e) => {
        if (e.name !== 'CanceledError') {
          setErro('Não foi possível carregar os pokémons.');
        }
      })
      .finally(() => setCarregando(false));

    return () => controller.abort();
  }, []);

  const filtrados = pokemons.filter((p) =>
    p.nome.includes(busca.toLowerCase().trim())
  );

  const abrirDetalhes = (pokemon) =>
    navigation.navigate('Detalhes', { nome: pokemon.nome, id: pokemon.id });

  return (
    <View style={styles.container}>
      <View style={styles.topo}>
        <CampoBusca valor={busca} aoMudar={setBusca} />
      </View>

      {carregando && (
        <ActivityIndicator size="large" color={cores.vermelho} style={styles.centro} />
      )}
      {!carregando && erro !== '' && <Text style={styles.erro}>{erro}</Text>}
      {!carregando && erro === '' && (
        <GradePokemons
          dados={filtrados}
          mensagemVazia="Nenhum pokémon encontrado."
          aoSelecionar={abrirDetalhes}
        />
      )}

      <View style={styles.rodape}>
        <View style={styles.metade}>
          <Botao
            titulo={`Meu time (${time.length})`}
            aoPressionar={() => navigation.navigate('MeuTime')}
          />
        </View>
        <View style={styles.metade}>
          <Botao
            titulo={`Favoritos (${favoritos.length})`}
            tipo="secundario"
            aoPressionar={() => navigation.navigate('Favoritos')}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: cores.fundo },
  topo: {
    backgroundColor: cores.vermelho,
    padding: 16,
    paddingTop: 4,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  centro: { flex: 1 },
  erro: { textAlign: 'center', color: cores.textoSuave, marginTop: 40 },
  rodape: {
    flexDirection: 'row',
    gap: 12,
    padding: 16,
    backgroundColor: cores.branco,
  },
  metade: { flex: 1 },
});