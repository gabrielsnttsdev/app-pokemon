import { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';

import { buscarLutador, calcularDano } from '../services/batalha';
import Arena from '../components/Arena';
import Botao from '../components/Botao';
import { cores } from '../tema';

const vivos = (lista) => lista.filter((p) => p.hp > 0);

const aplicarDano = (lista, alvo, dano) =>
  lista.map((p) =>
    p.id === alvo.id ? { ...p, hp: Math.max(0, p.hp - dano) } : p
  );

const maiuscula = (texto) => texto.charAt(0).toUpperCase() + texto.slice(1);

const descrever = (atacante, alvo, dano, vantagem) => {
  const desmaiou = alvo.hp - dano <= 0 ? ' Ele desmaiou!' : '';
  const efeito = vantagem ? ' Foi super efetivo!' : '';
  return `${maiuscula(atacante.nome)} causou ${dano} de dano em ${maiuscula(alvo.nome)}.${efeito}${desmaiou}`;
};

export default function Batalha({ navigation, route, time, aoVencer }) {
  const { ginasio } = route.params;
  const [meus, setMeus] = useState([]);
  const [deles, setDeles] = useState([]);
  const [turno, setTurno] = useState('jogador');
  const [mensagem, setMensagem] = useState(`${ginasio.lider} quer batalhar!`);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    const buscar = (lista) =>
      Promise.all(lista.map((id) => buscarLutador(id, controller.signal)));

    Promise.all([
      buscar(time.map((p) => p.id)),
      buscar(ginasio.pokemons),
    ])
      .then(([doTime, doGinasio]) => {
        setMeus(doTime);
        setDeles(doGinasio);
      })
      .catch((e) => {
        if (e.name !== 'CanceledError') {
          setErro('Não foi possível preparar a batalha.');
        }
      })
      .finally(() => setCarregando(false));

    return () => controller.abort();
  }, [ginasio, time]);

  useEffect(() => {
    if (turno !== 'inimigo') {
      return;
    }

    const timer = setTimeout(() => {
      const atacante = vivos(deles)[0];
      const alvo = vivos(meus)[0];
      const { dano, vantagem } = calcularDano(atacante, alvo);
      const novos = aplicarDano(meus, alvo, dano);

      setMeus(novos);
      setMensagem(descrever(atacante, alvo, dano, vantagem));
      setTurno(vivos(novos).length === 0 ? 'derrota' : 'jogador');
    }, 1000);

    return () => clearTimeout(timer);
  }, [turno, meus, deles]);

  const atacar = () => {
    const atacante = vivos(meus)[0];
    const alvo = vivos(deles)[0];
    const { dano, vantagem } = calcularDano(atacante, alvo);
    const novos = aplicarDano(deles, alvo, dano);

    setDeles(novos);
    setMensagem(descrever(atacante, alvo, dano, vantagem));

    if (vivos(novos).length === 0) {
      setTurno('vitoria');
      aoVencer(ginasio.id);
    } else {
      setTurno('inimigo');
    }
  };

  if (carregando) {
    return (
      <ActivityIndicator size="large" color={cores.vermelho} style={styles.centro} />
    );
  }

  if (erro) {
    return <Text style={styles.erro}>{erro}</Text>;
  }

  const meuAtivo = vivos(meus)[0] ?? meus[meus.length - 1];
  const delesAtivo = vivos(deles)[0] ?? deles[deles.length - 1];
  const terminou = turno === 'vitoria' || turno === 'derrota';

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <Arena tipo={ginasio.tipo} inimigo={delesAtivo} jogador={meuAtivo} />

      <Text style={styles.placar}>
        {ginasio.lider}: {vivos(deles).length}/{deles.length} vivos
        {'   |   '}
        Seu time: {vivos(meus).length}/{meus.length} vivos
      </Text>

      <Text style={styles.mensagem}>{mensagem}</Text>

      {!terminou && (
        <Botao
          titulo={turno === 'jogador' ? 'Atacar' : 'Turno do líder...'}
          desabilitado={turno !== 'jogador'}
          aoPressionar={atacar}
        />
      )}

      {turno === 'vitoria' && (
        <View style={styles.final}>
          <Text style={styles.resultado}>
  {ginasio.elite
    ? `Vitória! ${ginasio.lider} foi derrotado.`
    : 'Vitória! Insígnia conquistada.'}
</Text>
          <Botao
            titulo="Voltar aos ginásios"
            aoPressionar={() => navigation.goBack()}
          />
        </View>
      )}

      {turno === 'derrota' && (
        <View style={styles.final}>
          <Text style={styles.resultado}>Seu time foi derrotado.</Text>
          <Botao
            titulo="Tentar de novo"
            aoPressionar={() => navigation.replace('Batalha', { ginasio })}
          />
          <Botao
            titulo="Voltar aos ginásios"
            tipo="secundario"
            aoPressionar={() => navigation.goBack()}
          />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  centro: { flex: 1 },
  erro: { textAlign: 'center', color: cores.textoSuave, marginTop: 40 },
  container: { padding: 16, gap: 12, backgroundColor: cores.fundo, flexGrow: 1 },
  placar: { textAlign: 'center', color: cores.textoSuave, fontWeight: 'bold' },
  mensagem: {
    textAlign: 'center',
    fontSize: 16,
    color: cores.texto,
    backgroundColor: '#e8e8f0',
    borderRadius: 12,
    padding: 12,
    minHeight: 64,
  },
  final: { gap: 12, marginTop: 8 },
  resultado: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: cores.texto,
  },
});