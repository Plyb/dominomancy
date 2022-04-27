<template>
<div class="piece" :style="colStyle">
    <template v-for="(row, r) in piece.shape" :key="r">
        <template v-for="(cell, c) in row" :key="c">
            <div
                class="cell"
                :style="getCellColorStyle(cell)"
            >
                <div v-if="cell" class="click-hit-box"
                    @mousedown="onMouseDown"
                    @mouseup="onMouseUp"
                    @mouseleave="onMouseLeave"
                    @click="onClick"
                ></div>
            </div>
        </template>
    </template>
</div>
</template>

<script lang="ts">
import PieceMixin from "@/mixins/PieceMixin";
import { Piece, ShapeSpace, BoardGameStateProxy } from "@plyb/web-game-core-frontend";
import { mixins, prop, Vue } from "vue-class-component";

class Props {
    piece: Piece = prop({
        required: true
    })

    gameState: BoardGameStateProxy = prop({
        required: true
    })
}


export default class PieceComponent extends mixins(PieceMixin, Vue.with(Props)) {
    private pressing: boolean = false;

    get colStyle() {
        return `grid-template-columns: repeat(${this.pieceSize.width}, 1fr);`
    }

    getCellColorStyle(cell: ShapeSpace) {
        return cell === ShapeSpace.Filled ? `background-color: ${this.color};` : "";
    }

    public onMouseDown() {
        this.pressing = true;
        const longPressLength = 500;
        setTimeout(() => {
            if (this.pressing) {
                this.onLongPress();
            }
            this.pressing = false;
        }, longPressLength);
    }

    public onLongPress() {
        this.$emit('long-press', this.piece);
    }

    public onMouseLeave() {
        this.pressing = false;
    }

    public onMouseUp() {
        this.pressing = false;
    }

    public onClick() {
        this.$emit('select', this.piece);
        console.log(this.piece);
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

.click-hit-box {
    width: 100%;
    padding-bottom: 100%;
    cursor: pointer;
}
</style>