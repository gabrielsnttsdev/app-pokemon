import { View } from 'react-native';

export default function Pokebola({ tamanho = 120 }) {
  const borda = tamanho * 0.07;
  const centro = tamanho * 0.3;

  return (
    <View
      style={{
        width: tamanho,
        height: tamanho,
        borderRadius: tamanho / 2,
        borderWidth: borda,
        borderColor: '#111',
        backgroundColor: '#fff',
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '50%',
          backgroundColor: '#e3350d',
        }}
      />
      <View
        style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          right: 0,
          height: borda,
          marginTop: -borda / 2,
          backgroundColor: '#111',
        }}
      />
      <View
        style={{
          width: centro,
          height: centro,
          borderRadius: centro / 2,
          backgroundColor: '#fff',
          borderWidth: borda,
          borderColor: '#111',
        }}
      />
    </View>
  );
}