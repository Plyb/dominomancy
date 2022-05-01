import StartServer from '@plyb/web-game-core-backend'
import PlayingCardGameState from 'shared/src/gameState/PlayingCardGameState'

StartServer([], {}, (players) => new PlayingCardGameState(players));