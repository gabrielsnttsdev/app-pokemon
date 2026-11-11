import { View, Text, Pressable, StyleSheet } from 'react-native';
import Pokebola from './Pokebola';
import { cores, coresTipo } from '../tema';

const ALTURA = 120;
const VERDE = '#4caf50';
const CINZA = '#b9b9c4';

export default function EtapaMapa({
  numero,
  titulo,
  lider,
  tipo,
  elite,
  estado,
  lado,
  temCima,
  temBaixo,
  cimaPercorrido,
  baixoPercorrido,
  aoPressionar,
}) {
  const bloqueado = estado === 'bloqueado';

  const card = (
    <Pressable
      disabled={bloqueado}
      onPress={aoPressionar}
      style={[
        styles.card,
        bloqueado && styles.cardBloqueado,
        estado === 'atual' && styles.cardAtual,
      ]}
    >
      <Text style={styles.titulo} numberOfLines={2}>
        {titulo}
      </Text>
      <Text style={styles.lider}>{bloqueado ? '???' : lider}</Text>
      <Text style={[styles.tipo, { backgroundColor: coresTipo[tipo] }]}>
        {tipo}
      </Text>
      {estado === 'atual' && <Text style={styles.aqui}>Você está aqui</Text>}
    </Pressable>
  );

  return (
    <View style={styles.linha}>
      {temCima && (
        <View
          style={[
            styles.trilhaCima,
            { backgroundColor: cimaPercorrido ? VERDE : CINZA },
          ]}
        />
      )}
      {temBaixo && (
        <View
          style={[
            styles.trilhaBaixo,
            { backgroundColor: baixoPercorrido ? VERDE : CINZA },
          ]}
        />
      )}

      <View style={[styles.metade, styles.esquerda]}>
        {lado === 'esquerda' && card}
      </View>
      <View style={[styles.metade, styles.direita]}>
        {lado === 'direita' && card}
      </View>

      <Pressable
        disabled={bloqueado}
        onPress={aoPressionar}
        style={[
          styles.ponto,
          { borderColor: elite ? '#d4af37' : cores.branco },
          estado === 'vencido' && { backgroundColor: VERDE },
          bloqueado && { backgroundColor: CINZA },
          estado === 'atual' && styles.pontoAtual,
        ]}
      >
        {estado === 'atual' ? (
          <Pokebola tamanho={46} />
        ) : (
          <Text style={styles.numero}>
            {estado === 'vencido' ? '✓' : numero}
          </Text>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  linha: { height: ALTURA, flexDirection: 'row' },
  trilhaCima: {
    position: 'absolute',
    left: '50%',
    marginLeft: -4,
    width: 8,
    top: 0,
    height: ALTURA / 2,
  },
  trilhaBaixo: {
    position: 'absolute',
    left: '50%',
    marginLeft: -4,
    width: 8,
    top: ALTURA / 2,
    height: ALTURA / 2,
  },
  metade: { flex: 1, justifyContent: 'center' },
  esquerda: { alignItems: 'flex-end', paddingRight: 40 },
  direita: { alignItems: 'flex-start', paddingLeft: 40 },
  ponto: {
    position: 'absolute',
    left: '50%',
    marginLeft: -28,
    top: (ALTURA - 56) / 2,
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 4,
    backgroundColor: cores.escuro,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  pontoAtual: { backgroundColor: cores.branco, borderColor: cores.vermelho },
  numero: { color: cores.branco, fontSize: 20, fontWeight: 'bold' },
  card: {
    backgroundColor: cores.branco,
    borderRadius: 12,
    padding: 8,
    maxWidth: '100%',
    elevation: 3,
  },
  cardBloqueado: { opacity: 0.55 },
  cardAtual: { borderWidth: 2, borderColor: cores.vermelho },
  titulo: { fontSize: 13, fontWeight: 'bold', color: cores.texto },
  lider: { fontSize: 12, color: cores.textoSuave, marginVertical: 2 },
  tipo: {
    alignSelf: 'flex-start',
    color: cores.branco,
    fontSize: 11,
    fontWeight: 'bold',
    paddingVertical: 1,
    paddingHorizontal: 8,
    borderRadius: 10,
    overflow: 'hidden',
    textTransform: 'capitalize',
  },
  aqui: {
    marginTop: 4,
    fontSize: 11,
    fontWeight: 'bold',
    color: cores.vermelho,
  },
});