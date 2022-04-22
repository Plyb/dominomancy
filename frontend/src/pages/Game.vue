<template>
<div>
    {{gameState.hub.pieces.length}}
</div>
</template>

<script lang="ts">
import { BoardGameState } from "@plyb/web-game-core-frontend";
import { Vue } from "vue-class-component";
import { LTestPiece } from 'shared'

export default class GamePage extends Vue {
    public readonly gameState = new BoardGameState();

    public created() {
        this.gameState.hub.placePiece(new LTestPiece(), 0, 0);
    }
}
</script>