# Pokémon: Jornada por Kanto

## Descrição
Neste trabalho eu fiz um app de Pokémon com React Native e Expo. Ele começou
como uma Pokédex simples, com lista, busca e favoritos, e depois eu
transformei em um joguinho: dá para montar um time de até 6 pokémons e
enfrentar batalhas por turnos contra 5 líderes de ginásio e a Elite 4.
As fases aparecem em um mapa, e cada uma só abre depois que eu venço a
anterior. Em cada batalha, a arena muda de cor e de enfeites conforme o tipo
do ginásio.

## Aluno
Gabriel dos Santos Souza 
## Telas
- **Inicio**: tela de abertura, com o título do jogo e o botão para começar.
- **Pokedex**: mostra os 151 primeiros pokémons em uma grade de 2 colunas,
  com um campo para buscar pelo nome.
- **Detalhes**: mostra a imagem, os tipos, a altura, o peso e alguns status
  do pokémon. Também tem os botões de favoritar e de adicionar ao time.
- **MeuTime**: lista os pokémons que escolhi para as batalhas (máximo de 6).
- **Favoritos**: lista os pokémons que favoritei.
- **Ginasios**: o mapa de fases. Mostra o caminho, qual fase é a atual, quais
  já venci e quais ainda estão bloqueadas, até chegar na Elite 4.
- **Batalha**: a luta por turnos contra o líder, dentro de uma arena temática.

## Fonte de dados
Usei dois tipos de dados:
- A **PokéAPI** (https://pokeapi.co/api/v2), consumida com axios. A
  configuração com `axios.create` e `baseURL` está em `services/api.js`.
- **Dados locais**: o arquivo `dados/ginasios.js` é um array de objetos com
  os líderes, o tipo de cada um e os pokémons que eles usam. A ordem desse
  array é a ordem das fases do mapa.

## Onde estão os requisitos

### Componentes
Separei tudo em arquivos na pasta `components/`: `Pokebola`, `Botao`,
`CampoBusca`, `CardPokemon`, `GradePokemons`, `Lutador`, `EtapaMapa` e
`Arena`. Cada um tem uma responsabilidade só e eles são reutilizados:
- `GradePokemons` aparece na Pokedex, no MeuTime e nos Favoritos, então
  escrevi a lista uma vez só.
- `EtapaMapa` é repetido para cada fase do mapa, usando um `map` sobre o
  array de ginásios.
- `Botao` é usado em várias telas.
- `Lutador` é usado duas vezes dentro da `Arena` (o pokémon do líder e o meu).

### Props com callback
Os componentes recebem dados por props e, em vários casos, uma função para
avisar a tela pai quando algo acontece:
- `aoPressionar`: em `Botao`, `CardPokemon` e `EtapaMapa`.
- `aoSelecionar`: em `GradePokemons`.
- `aoMudar`: em `CampoBusca`.
- `aoFavoritar` e `aoAlternarTime`: recebidos por `screens/Detalhes.js`, que
  chama essas funções, mas quem guarda os dados é o `App.js`.
- `aoVencer`: recebido por `screens/Batalha.js`, que avisa o `App.js` quando
  eu venço um ginásio.

### useState
- `App.js`: `favoritos`, `time` e `insignias`. Deixei esses três aqui porque
  várias telas precisam ler e alterar essas informações, então elas são
  passadas por props.
- `screens/Pokedex.js`: `pokemons`, `busca` (campo controlado com `value` e
  `onChangeText`), `carregando` e `erro`.
- `screens/Detalhes.js`: `dados`, `carregando` e `erro`.
- `screens/Batalha.js`: `meus`, `deles`, `turno`, `mensagem`, `carregando`
  e `erro`.

Em nenhum lugar eu altero o estado diretamente. Sempre uso a função `set` com
`filter`, `map` ou spread, por exemplo em `alternarFavorito` no `App.js` e
em `aplicarDano` na `Batalha`.

O estado de cada fase do mapa (vencida, atual ou bloqueada) não é guardado em
nenhuma variável: ele é calculado a partir da lista de `insignias`.

### useEffect
- `screens/Pokedex.js`: busca a lista de pokémons uma vez, quando a tela abre
  (`[]`). Usei um `AbortController` no cleanup para cancelar a requisição se
  eu sair da tela antes de terminar.
- `screens/Detalhes.js`: busca os dados do pokémon e roda de novo quando o
  `id` muda (`[id]`), também com cleanup.
- `screens/Batalha.js`: tem dois efeitos. Um carrega os pokémons da batalha
  (cleanup com `AbortController`). O outro controla a vez do líder: depois de
  1 segundo ele ataca sozinho, usando `setTimeout`, e o cleanup faz
  `clearTimeout` para não atacar depois que eu sair da tela.

### Navegação com parâmetros
- `navigate('Detalhes', { nome, id })`, lido com `route.params` em
  `screens/Detalhes.js`.
- `navigate('Batalha', { ginasio })`, lido com `route.params` em
  `screens/Batalha.js`.
- O título do cabeçalho de Detalhes e de Batalha é dinâmico (nome do
  pokémon e título do ginásio), configurado em `options` no `App.js`.
- O `NavigationContainer` e o Stack ficam todos no `App.js`.

## Estrutura do projeto
```
app-pokemon/
├── App.js
├── tema.js
├── components/
├── dados/
├── screens/
└── services/
```
O `tema.js` guarda as cores e a lista de cores por tipo de pokémon, para o
visual ficar igual em todas as telas.

## Vídeo de demonstração
demo/demo.mp4

## Como executar
```
npm install
npx expo start
```
Depois é só escanear o QR code com o app Expo Go, com o celular e o
computador na mesma rede Wi-Fi.
