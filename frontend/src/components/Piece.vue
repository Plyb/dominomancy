<template>
<div class="piece" :style="[sizeStyle, positionStyle]">
    <template v-for="(row, r) in model.piece.shape" :key="r">
        <template v-for="(cell, c) in row" :key="c">
            <div v-if="cell"
                class="cell"
                :style="[cellSizeStyle, getCellPositionStyle(c, r), cellColorStyle]"
            ></div>
        </template>
    </template>
</div>
</template>

<script lang="ts">
import { Piece, PieceLocation } from "@plyb/web-game-core-frontend";
import { prop, Vue } from "vue-class-component";

class Props {
    model: PieceLocation = prop({
        required: true
    })

    numSpaces: {x: number, y: number} = prop({
        required: true
    })

    color: string = prop({
        required: true
    })
}

export default class PieceComponent extends Vue.with(Props) {
    get pieceSize() {
        return {
            width: this.model.piece.shape[0].length,
            height: this.model.piece.shape.length
        }
    }

    get sizeStyle() {
        return `width: ${this.pieceSize.width * 100 / this.numSpaces.x}%;` +
            `height: ${this.pieceSize.height * 100 / this.numSpaces.y}%;`;
    }

    get positionStyle() {
        return `left: ${(this.model.x - this.model.piece.pivot.x) * 100 / this.numSpaces.x}%;` +
            `top: ${(this.model.y - this.model.piece.pivot.y) * 100 / this.numSpaces.y}%;`;
    }

    get cellSizeStyle() {
        return `width: ${100 / this.pieceSize.width}%;` +
            `height: ${100 / this.pieceSize.height}%;`;
    }

    getCellPositionStyle(x: number, y: number) {
        return `left: ${x * 100 / this.pieceSize.width}%;` +
            `top: ${y * 100 / this.pieceSize.height}%;`;
    }

    get cellColorStyle() {
        return `background-color: ${this.color};`;
    }
}
</script>

<style scoped>
.piece {
    position: absolute;
}

.cell {
    position: absolute;
}
</style>