import { View, StyleSheet } from 'react-native';
import GradePokemons from '../components/GradePokemons';
import { cores } from '../tema';

export default function Favoritos({ navigation, favoritos }) {
  return (
    <View style={styles.container}>
      <GradePokemons
        dados={favoritos}
        mensagemVazia="Você ainda não favoritou ninguém."
        aoSelecionar={(p) =>
          navigation.navigate('Detalhes', { nome: p.nome, id: p.id })
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: cores.fundo },
});