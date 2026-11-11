import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Inicio from './screens/Inicio';
import Pokedex from './screens/Pokedex';
import Detalhes from './screens/Detalhes';
import MeuTime from './screens/MeuTime';
import Favoritos from './screens/Favoritos';
import Ginasios from './screens/Ginasios';
import Batalha from './screens/Batalha';
import { cores, LIMITE_TIME } from './tema';

const Stack = createNativeStackNavigator();

export default function App() {
  const [favoritos, setFavoritos] = useState([]);
  const [time, setTime] = useState([]);
  const [insignias, setInsignias] = useState([]);

  const alternarFavorito = (pokemon) => {
    setFavoritos((atual) =>
      atual.some((p) => p.nome === pokemon.nome)
        ? atual.filter((p) => p.nome !== pokemon.nome)
        : [...atual, pokemon]
    );
  };

  const alternarTime = (pokemon) => {
    setTime((atual) => {
      if (atual.some((p) => p.nome === pokemon.nome)) {
        return atual.filter((p) => p.nome !== pokemon.nome);
      }
      if (atual.length >= LIMITE_TIME) {
        return atual;
      }
      return [...atual, pokemon];
    });
  };

  const vencerGinasio = (idGinasio) => {
    setInsignias((atual) =>
      atual.includes(idGinasio) ? atual : [...atual, idGinasio]
    );
  };

  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: cores.vermelho },
          headerTintColor: cores.branco,
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen
          name="Inicio"
          component={Inicio}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Pokedex" options={{ title: 'Pokédex' }}>
          {(props) => <Pokedex {...props} favoritos={favoritos} time={time} />}
        </Stack.Screen>
        <Stack.Screen
          name="Detalhes"
          options={({ route }) => ({ title: route.params.nome })}
        >
          {(props) => (
            <Detalhes
              {...props}
              favoritos={favoritos}
              time={time}
              aoFavoritar={alternarFavorito}
              aoAlternarTime={alternarTime}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="MeuTime" options={{ title: 'Meu time' }}>
          {(props) => <MeuTime {...props} time={time} />}
        </Stack.Screen>
        <Stack.Screen name="Favoritos" options={{ title: 'Meus favoritos' }}>
          {(props) => <Favoritos {...props} favoritos={favoritos} />}
        </Stack.Screen>
        <Stack.Screen name="Ginasios" options={{ title: 'Ginásios' }}>
          {(props) => <Ginasios {...props} time={time} insignias={insignias} />}
        </Stack.Screen>
        <Stack.Screen
          name="Batalha"
          options={({ route }) => ({
            title: `Ginásio de ${route.params.ginasio.cidade}`,
          })}
        >
          {(props) => <Batalha {...props} time={time} aoVencer={vencerGinasio} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}