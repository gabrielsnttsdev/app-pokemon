import { FlatList, Text, StyleSheet } from 'react-native';
import CardPokemon from './CardPokemon';
import { cores } from '../tema';

export default function GradePokemons({ dados, mensagemVazia, aoSelecionar }) {
  return (
    <FlatList
      data={dados}
      keyExtractor={(item) => item.nome}
      numColumns={2}
      columnWrapperStyle={styles.linha}
      contentContainerStyle={styles.conteudo}
      keyboardShouldPersistTaps="handled"
      ListEmptyComponent={<Text style={styles.vazio}>{mensagemVazia}</Text>}
      renderItem={({ item }) => (
        <CardPokemon
          nome={item.nome}
          id={item.id}
          imagem={item.imagem}
          aoPressionar={() => aoSelecionar(item)}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  linha: { justifyContent: 'space-between' },
  conteudo: { padding: 16 },
  vazio: {
    textAlign: 'center',
    color: cores.textoSuave,
    fontSize: 16,
    marginTop: 40,
  },
});