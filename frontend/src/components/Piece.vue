<template>
<div class="piece" :style="colStyle">
    <template v-for="(row, r) in piece.shape" :key="r">
        <template v-for="(cell, c) in row" :key="c">
            <div
                class="cell"
                :style="getCellColorStyle(cell)"
            ></div>
        </template>
    </template>
</div>
</template>

<script lang="ts">
import PieceMixin from "@/mixins/PieceMixin";
import { Piece, ShapeSpace } from "@plyb/web-game-core-frontend";
import { mixins, prop, Vue } from "vue-class-component";

class Props {
    piece: Piece = prop({
        required: true
    })
}


export default class PieceComponent extends mixins(PieceMixin, Vue.with(Props)) {

    get colStyle() {
        return `grid-template-columns: repeat(${this.pieceSize.width}, 1fr);`
    }

    getCellColorStyle(cell: ShapeSpace) {
        return cell === ShapeSpace.Filled ? `background-color: ${this.color};` : "";
    }
}
</script>

<style scoped>
.piece {
    height: fit-content;
    display: grid;
    grid-gap: 0;
}

.cell {
    height: 0;
    padding-bottom: 100%;
    margin-left: -1px;
}
</style>