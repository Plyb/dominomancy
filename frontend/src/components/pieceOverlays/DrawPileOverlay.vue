<template>
<div>
    <h2>{{piece.pieces.length}} items(s) remaining</h2>
</div>
</template>

<script lang="ts">
import PieceOverlayMixin from "./PieceOverlay.mixin";
import DrawPile from "@plyb/web-game-core-shared/src/model/gameState/pieces/DrawPile";
import { Piece } from "@plyb/web-game-core-shared";

export default class DrawPileOverlay extends PieceOverlayMixin<DrawPile<Piece>>() {

}
</script>

<style scoped>
div {
    background-color: white;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

h2 {
    text-align: center;
    font-size: 1.6vw;
}
</style>