import { View, Text, Image, StyleSheet } from 'react-native';
import Lutador from './Lutador';
import { coresTipo, decoracaoTipo } from '../tema';

const POSICOES = [
  { top: 8, left: '45%' },
  { top: 70, left: '5%' },
  { top: 110, left: '60%' },
  { top: 190, left: '40%' },
  { top: 250, left: '8%' },
  { top: 300, left: '75%' },
];

export default function Arena({ tipo, inimigo, jogador }) {
  const cor = coresTipo[tipo] ?? '#999';
  const enfeite = decoracaoTipo[tipo] ?? '⭐';

  return (
    <View style={[styles.arena, { backgroundColor: cor + '33' }]}>
      <View style={[styles.chao, { backgroundColor: cor + '77' }]} />

      {POSICOES.map((posicao, i) => (
        <Text key={i} style={[styles.enfeite, posicao]}>
          {enfeite}
        </Text>
      ))}

      <View style={[styles.plataforma, styles.platInimigo, { backgroundColor: cor }]} />
      <Image source={{ uri: inimigo.imagem }} style={styles.spriteInimigo} />
      <View style={styles.infoInimigo}>
        <Lutador pokemon={inimigo} />
      </View>

      <View style={[styles.plataforma, styles.platJogador, { backgroundColor: cor }]} />
      <Image source={{ uri: jogador.imagem }} style={styles.spriteJogador} />
      <View style={styles.infoJogador}>
        <Lutador pokemon={jogador} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  arena: {
    height: 360,
    borderRadius: 20,
    overflow: 'hidden',
  },
  chao: { position: 'absolute', left: 0, right: 0, top: '30%', bottom: 0 },
  enfeite: { position: 'absolute', fontSize: 28, opacity: 0.35 },
  plataforma: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    opacity: 0.8,
    transform: [{ scaleY: 0.25 }],
  },
  platInimigo: { top: 59, right: 5 },
  platJogador: { top: 215, left: 11 },
  spriteInimigo: {
    position: 'absolute',
    top: 24,
    right: 20,
    width: 120,
    height: 120,
  },
  spriteJogador: {
    position: 'absolute',
    bottom: 60,
    left: 16,
    width: 140,
    height: 140,
    transform: [{ scaleX: -1 }],
  },
  infoInimigo: { position: 'absolute', top: 12, left: 12, width: '48%' },
  infoJogador: { position: 'absolute', bottom: 12, right: 12, width: '48%' },
});