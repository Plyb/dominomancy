<template>
<div class="piece">
    <div class="cell">
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 75 75"
            preserveAspectRatio="xMinYMid meet"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            style="background-color: black;"
        >
            <text
                x="50%"
                y="50%"
                text-anchor="middle"
                dominant-baseline="middle"
                font-size="25"
                :fill="color"
                font-family="Helvetica"
            >{{piece.value}}</text>
        </svg>
    </div>
</div>
</template>

<script lang="ts">
import PieceOverlay from "@plyb/web-game-core-frontend/src/components/pieceOverlays/PieceOverlay.mixin";
import UnoCard, { Color } from "../../shared/src/pieces/UnoCard"; // TODO: this needs to have a proper module connection

export default class UnoCardOverlay extends PieceOverlay<UnoCard>() {
    get color() {
        const colorMap = {
            [Color.Red]: "red",
            [Color.Blue]: "blue",
            [Color.Green]: "green",
            [Color.Yellow]: "gold",
            [Color.Wild]: "#ffffff",
        }

        return colorMap[this.piece.color];
    }
}
</script>