<template>
<div class="board">
    <!--BG grid-->
    <div class="bg-grid" :style="gridStyle">
        <div v-for="(_, i) in numGridCells" :key="_"
            class="bg-grid-cell"
            @mouseup="onCellMouseUp(i)"
        ></div>
    </div>

    <PlacedPiece v-for="(piece, i) in model.pieces" :key="i"
        :model="piece"
        :numSpaces="{
            x: model.size.x,
            y: model.size.y
        }"
        :color="'green'"
        :gameState="gameState"
        :boardId="model.id"
        @long-press="onPieceLongPress(piece)"
    />
</div>
</template>

<script lang="ts">
import Core, { Board, BoardGameStateProxy, PickUpItemAction, PieceLocation } from "@plyb/web-game-core-frontend";
import { Options, prop, Vue } from "vue-class-component";
import PlacedPiece from "./PlacedPiece.vue";

class Props {
    model: Board = prop({
        required: true
    })

    gameState: BoardGameStateProxy = prop({
        required: true
    })
}

@Options({
    components: {
        PlacedPiece
    }
})
export default class BoardComponent extends Vue.with(Props) {

    get gridStyle() {
        return `grid-template-columns: repeat(${this.model.size.x}, 1fr);` +
            `grid-template-rows: repeat(${this.model.size.y}, 1fr);`
    }

    get numGridCells() {
        return this.model.size.x * this.model.size.y;
    }

    onPieceLongPress(pieceLocation: PieceLocation) {
        this.gameState.executeAction(PickUpItemAction, Core.getUserId() || '', pieceLocation.piece.id);
    }

    onCellMouseUp(index: number) {
        this.$emit('cell-mouse-up', {
            x: index % this.model.size.x,
            y: Math.floor(index / this.model.size.x)
        });
    }
}
</script>

<style scoped>
.board {
    position: relative;
}

.bg-grid {
    display: grid;
    grid-gap: 1px;
    border: 1px solid black;
}

.bg-grid-cell {
    box-sizing: border-box;
    background-color: #fff;
    border: 1px solid black;
    height: 0;
    padding-bottom: calc(100% - 2px); /* 100% - 2px for border */
}
</style>