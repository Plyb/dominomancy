<template>
<div>
  <div>
    <label>username</label>
    <input v-model="username"/>
  </div>
  <div>
    <button v-if="readyToStart" @click="startGame">start new game</button>
  </div>
  <div>
    <label>game code</label>
    <input v-model="gameId"/>
    <button v-if="readyToJoin" @click="joinGame">join game</button>
  </div>
</div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Core from '@plyb/web-game-core-frontend';

@Options({
})
export default class App extends Vue {
  gameId: string = sessionStorage.getItem('gameId') || '';
  username: string = sessionStorage.getItem('username') || '';

  async startGame() {
    await Core.startGame(this.username);
    console.log(sessionStorage.getItem('gameId'));
  }

  async joinGame() {
    Core.joinGame(this.gameId, this.username);
  }

  get readyToStart(): boolean {
    return !!this.username;
  }

  get gameIdValid() {
    return this.gameId.length === 4 && /^[a-z0-9]+$/i.test(this.gameId);
  }

  get readyToJoin(): boolean {
    return this.readyToStart && this.gameIdValid;
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
