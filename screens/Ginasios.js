import { View, Text, FlatList, StyleSheet } from 'react-native';
import EtapaMapa from '../components/EtapaMapa';
import { ginasios } from '../dados/ginasios';
import { cores } from '../tema';

export default function Ginasios({ navigation, time, insignias }) {
  const semTime = time.length === 0;
  const campeao = insignias.length === ginasios.length;

  const liberado = (indice) =>
    indice === 0 || insignias.includes(ginasios[indice - 1].id);

  const desafiar = (ginasio) => {
    if (!semTime) {
      navigation.navigate('Batalha', { ginasio });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.contador}>
        Fases vencidas: {insignias.length} de {ginasios.length}
      </Text>
      {semTime && (
        <Text style={styles.aviso}>
          Monte seu time antes de começar a jornada.
        </Text>
      )}
      <FlatList
        data={ginasios}
        inverted
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.lista}
        ListHeaderComponent={<Text style={styles.ponta}>Início da jornada</Text>}
        ListFooterComponent={
          <Text style={[styles.ponta, campeao && styles.campeao]}>
            {campeao ? 'Você é o campeão da Liga Pokémon!' : 'Liga Pokémon'}
          </Text>
        }
        renderItem={({ item, index }) => (
          <EtapaMapa
            numero={index + 1}
            titulo={item.titulo}
            lider={item.lider}
            tipo={item.tipo}
            elite={item.elite}
            estado={
              insignias.includes(item.id)
                ? 'vencido'
                : liberado(index)
                ? 'atual'
                : 'bloqueado'
            }
            lado={index % 2 === 0 ? 'esquerda' : 'direita'}
            temCima={index < ginasios.length - 1}
            temBaixo={index > 0}
            cimaPercorrido={insignias.includes(item.id)}
            baixoPercorrido={
              index > 0 && insignias.includes(ginasios[index - 1].id)
            }
            aoPressionar={() => desafiar(item)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#d9efdc' },
  contador: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: cores.escuro,
    paddingTop: 16,
  },
  aviso: { textAlign: 'center', color: cores.vermelho, marginTop: 8 },
  lista: { padding: 16 },
  ponta: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: cores.escuro,
    paddingVertical: 12,
  },
  campeao: { color: '#b8860b', fontSize: 18 },
});