import { TextInput, StyleSheet } from 'react-native';
import { cores } from '../tema';

export default function CampoBusca({ valor, aoMudar }) {
  return (
    <TextInput
      style={styles.campo}
      placeholder="Buscar pokémon..."
      placeholderTextColor="#999"
      value={valor}
      onChangeText={aoMudar}
      autoCapitalize="none"
    />
  );
}

const styles = StyleSheet.create({
  campo: {
    backgroundColor: cores.branco,
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: cores.texto,
  },
});