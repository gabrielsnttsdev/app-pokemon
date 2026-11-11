import { View, Text, StyleSheet } from 'react-native';
import GradePokemons from '../components/GradePokemons';
import Botao from '../components/Botao';
import { cores, LIMITE_TIME } from '../tema';

export default function MeuTime({ navigation, time }) {
  return (
    <View style={styles.container}>
      <Text style={styles.contador}>
        {time.length} de {LIMITE_TIME} pokémons
      </Text>
      <GradePokemons
        dados={time}
        mensagemVazia="Seu time está vazio. Adicione pokémons pelos detalhes."
        aoSelecionar={(p) =>
          navigation.navigate('Detalhes', { nome: p.nome, id: p.id })
        }
      />
      <View style={styles.rodape}>
        <Botao
          titulo="Desafiar ginásios"
          aoPressionar={() => navigation.navigate('Ginasios')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: cores.fundo },
  contador: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: cores.textoSuave,
    paddingTop: 16,
  },
  rodape: { padding: 16, backgroundColor: cores.branco },
});