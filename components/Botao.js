import { Pressable, Text, StyleSheet } from 'react-native';
import { cores } from '../tema';

export default function Botao({
  titulo,
  aoPressionar,
  tipo = 'primario',
  desabilitado = false,
}) {
  const secundario = tipo === 'secundario';

  return (
    <Pressable
      disabled={desabilitado}
      onPress={aoPressionar}
      style={({ pressed }) => [
        styles.botao,
        secundario ? styles.secundario : styles.primario,
        desabilitado && styles.desabilitado,
        pressed && styles.pressionado,
      ]}
    >
      <Text style={[styles.texto, secundario && styles.textoSecundario]}>
        {titulo}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  botao: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: cores.vermelho,
  },
  primario: { backgroundColor: cores.vermelho },
  secundario: { backgroundColor: cores.branco },
  desabilitado: { opacity: 0.4 },
  pressionado: { opacity: 0.8 },
  texto: { color: cores.branco, fontSize: 16, fontWeight: 'bold' },
  textoSecundario: { color: cores.vermelho },
});