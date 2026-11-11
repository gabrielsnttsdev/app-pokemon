import { View, Text, StyleSheet } from 'react-native';
import { cores } from '../tema';

export default function Lutador({ pokemon }) {
  const porcentagem = (pokemon.hp / pokemon.hpMax) * 100;
  const corBarra =
    porcentagem > 50 ? '#4caf50' : porcentagem > 20 ? '#f9a825' : '#e53935';

  return (
    <View style={styles.container}>
      <Text style={styles.nome}>{pokemon.nome}</Text>
      <View style={styles.barraFundo}>
        <View
          style={[
            styles.barra,
            { width: `${porcentagem}%`, backgroundColor: corBarra },
          ]}
        />
      </View>
      <Text style={styles.hp}>
        {pokemon.hp} / {pokemon.hpMax} HP
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: cores.branco,
    borderRadius: 12,
    padding: 8,
    elevation: 3,
  },
  nome: {
    fontSize: 15,
    fontWeight: 'bold',
    color: cores.texto,
    textTransform: 'capitalize',
  },
  barraFundo: {
    height: 10,
    backgroundColor: '#e5e5e5',
    borderRadius: 5,
    overflow: 'hidden',
    marginVertical: 4,
  },
  barra: { height: 10, borderRadius: 5 },
  hp: { fontSize: 11, color: cores.textoSuave },
});