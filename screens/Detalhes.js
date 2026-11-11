import { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

import api, { urlImagem } from '../services/api';
import Botao from '../components/Botao';
import { cores, coresTipo, LIMITE_TIME } from '../tema';

const NOMES_STATS = {
  hp: 'HP',
  attack: 'Ataque',
  defense: 'Defesa',
  speed: 'Velocidade',
};

export default function Detalhes({
  route,
  favoritos,
  time,
  aoFavoritar,
  aoAlternarTime,
}) {
  const { nome, id } = route.params;
  const [dados, setDados] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    setCarregando(true);
    setErro('');

    api
      .get(`/pokemon/${id}`, { signal: controller.signal })
      .then((resposta) => setDados(resposta.data))
      .catch((e) => {
        if (e.name !== 'CanceledError') {
          setErro('Não foi possível carregar os detalhes.');
        }
      })
      .finally(() => setCarregando(false));

    return () => controller.abort();
  }, [id]);

  if (carregando) {
    return (
      <ActivityIndicator size="large" color={cores.vermelho} style={styles.centro} />
    );
  }

  if (erro || !dados) {
    return <Text style={styles.erro}>{erro}</Text>;
  }

  const pokemon = { nome, id, imagem: urlImagem(id) };
  const ehFavorito = favoritos.some((p) => p.nome === nome);
  const noTime = time.some((p) => p.nome === nome);
  const timeCheio = time.length >= LIMITE_TIME && !noTime;

  const tipos = dados.types.map((t) => t.type.name);
  const corPrincipal = coresTipo[tipos[0]] ?? cores.vermelho;
  const stats = dados.stats.filter((s) => NOMES_STATS[s.stat.name]);

  return (
    <ScrollView
      style={{ backgroundColor: corPrincipal }}
      contentContainerStyle={styles.conteudo}
    >
      <Image source={{ uri: pokemon.imagem }} style={styles.imagem} />

      <View style={styles.painel}>
        <Text style={styles.nome}>{nome}</Text>

        <View style={styles.tipos}>
          {tipos.map((tipo) => (
            <Text
              key={tipo}
              style={[styles.tipo, { backgroundColor: coresTipo[tipo] ?? '#999' }]}
            >
              {tipo}
            </Text>
          ))}
        </View>

        <View style={styles.medidas}>
          <Text style={styles.medida}>Altura: {dados.height / 10} m</Text>
          <Text style={styles.medida}>Peso: {dados.weight / 10} kg</Text>
        </View>

        {stats.map((s) => (
          <View key={s.stat.name} style={styles.linhaStat}>
            <Text style={styles.statNome}>{NOMES_STATS[s.stat.name]}</Text>
            <Text style={styles.statValor}>{s.base_stat}</Text>
            <View style={styles.barraFundo}>
              <View
                style={[
                  styles.barra,
                  {
                    width: `${Math.min((s.base_stat / 150) * 100, 100)}%`,
                    backgroundColor: corPrincipal,
                  },
                ]}
              />
            </View>
          </View>
        ))}

        <View style={styles.botoes}>
          <Botao
            titulo={ehFavorito ? 'Remover dos favoritos' : 'Favoritar'}
            tipo={ehFavorito ? 'secundario' : 'primario'}
            aoPressionar={() => aoFavoritar(pokemon)}
          />
          <Botao
            titulo={noTime ? 'Remover do meu time' : 'Adicionar ao meu time'}
            tipo={noTime ? 'secundario' : 'primario'}
            desabilitado={timeCheio}
            aoPressionar={() => aoAlternarTime(pokemon)}
          />
          {timeCheio && (
            <Text style={styles.aviso}>
              Seu time já tem {LIMITE_TIME} pokémons. Remova um para adicionar.
            </Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  centro: { flex: 1 },
  erro: { textAlign: 'center', color: cores.textoSuave, marginTop: 40 },
  conteudo: { flexGrow: 1 },
  imagem: { width: 220, height: 220, alignSelf: 'center', marginVertical: 12 },
  painel: {
    flex: 1,
    backgroundColor: cores.branco,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
  },
  nome: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: cores.texto,
    textTransform: 'capitalize',
  },
  tipos: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginTop: 12,
  },
  tipo: {
    color: cores.branco,
    fontWeight: 'bold',
    paddingVertical: 4,
    paddingHorizontal: 14,
    borderRadius: 20,
    overflow: 'hidden',
    textTransform: 'capitalize',
  },
  medidas: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  medida: { fontSize: 16, color: cores.textoSuave },
  linhaStat: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  statNome: { width: 90, color: cores.textoSuave },
  statValor: { width: 36, fontWeight: 'bold', color: cores.texto },
  barraFundo: {
    flex: 1,
    height: 10,
    backgroundColor: '#eee',
    borderRadius: 5,
    overflow: 'hidden',
  },
  barra: { height: 10, borderRadius: 5 },
  botoes: { marginTop: 24, gap: 12 },
  aviso: { textAlign: 'center', color: cores.textoSuave },
});