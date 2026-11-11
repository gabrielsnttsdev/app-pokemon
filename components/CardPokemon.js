import { Pressable, Text, Image, StyleSheet } from 'react-native';
import { cores } from '../tema';

export default function CardPokemon({ nome, id, imagem, aoPressionar }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.pressionado]}
      onPress={aoPressionar}
    >
      <Text style={styles.numero}>#{String(id).padStart(3, '0')}</Text>
      <Image source={{ uri: imagem }} style={styles.imagem} />
      <Text style={styles.nome}>{nome}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48%',
    backgroundColor: cores.branco,
    borderRadius: 16,
    alignItems: 'center',
    padding: 12,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  pressionado: { opacity: 0.8 },
  numero: {
    alignSelf: 'flex-end',
    color: cores.textoSuave,
    fontSize: 12,
    fontWeight: 'bold',
  },
  imagem: { width: 110, height: 110 },
  nome: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: 'bold',
    color: cores.texto,
    textTransform: 'capitalize',
  },
});