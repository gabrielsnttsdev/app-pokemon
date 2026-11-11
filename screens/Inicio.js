import { View, Text, StyleSheet } from 'react-native';
import Pokebola from '../components/Pokebola';
import Botao from '../components/Botao';
import { cores } from '../tema';

export default function Inicio({ navigation }) {
  return (
    <View style={styles.container}>
      <Pokebola tamanho={160} />
      <Text style={styles.titulo}>Pokédex</Text>
      <Text style={styles.subtitulo}>
        Explore, favorite e monte o seu time
      </Text>
      <View style={styles.botao}>
        <Botao
          titulo="Entrar na minha Pokédex"
          aoPressionar={() => navigation.navigate('Pokedex')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.escuro,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  titulo: {
    marginTop: 32,
    fontSize: 44,
    fontWeight: 'bold',
    color: cores.branco,
    letterSpacing: 2,
  },
  subtitulo: {
    marginTop: 8,
    fontSize: 16,
    color: '#c9c9d6',
    textAlign: 'center',
  },
  botao: { marginTop: 40, alignSelf: 'stretch' },
});