<template>
<div>
    <Board
        :model="gameState.hub"
    />
</div>
</template>

<script lang="ts">
import { BoardGameState } from "@plyb/web-game-core-frontend";
import { Options, Vue } from "vue-class-component";
import { LTestPiece } from 'shared'
import Board from '../components/Board.vue'

@Options({
    components: {
        Board
    }
})
export default class GamePage extends Vue {
    public readonly gameState = new BoardGameState({x: 10, y: 10});

    public created() {
        this.gameState.hub.placePiece(new LTestPiece(), 2, 5);
    }
}
</script>