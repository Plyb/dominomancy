<template>
<div class="piece" :style="[colStyle, rotationStyle]"
    v-mouseup-outside="() => onMouseupOutside()"
>
    <template v-for="(row, r) in piece.shape" :key="r">
        <template v-for="(cell, c) in row" :key="c">
            <div
                class="cell"
                :style="getCellColorStyle(cell)"
            >
                <div v-if="cell" :class="['click-hit-box', {'click-through': clickThrough}]"
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
import { Piece, ShapeSpace } from "@plyb/web-game-core-frontend";
import StateStore from "@plyb/web-game-core-frontend/src/StateStore";
import { MoveLocation } from "@plyb/web-game-core-shared/src/actions/MovePieceAction";
import { mixins, prop, Vue } from "vue-class-component";

class Props {
    piece: Piece = prop({
        required: true
    })

    location?: MoveLocation = undefined;
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
        if (!this.location) {
            return;
        }
        StateStore.state.draggingPiece = {
            piece: this.piece,
            from: this.location
        };
    }

    public onMouseLeave() {
        this.pressing = false;
    }

    public async onMouseUp(event: MouseEvent) {
        this.pressing = false;
    }

    public onClick() {
        this.$emit('select', this.piece);
    }

    public get rotationStyle() {
        const pivotPercents = this.piece.getPivotPercents();
        const xOffset = 50 - (pivotPercents.x * 100); // / 2 because rotate uses the center of the element
        const yOffset = 50 - (pivotPercents.y * 100);
        return `transform: translate(${-xOffset}%, ${-yOffset}%) rotate(${-this.piece.rotation}deg) translate(${xOffset}%, ${yOffset}%)`
    }

    get clickThrough() {
        return StateStore.state.draggingPiece;
    }

    async onMouseupOutside() {
        if (StateStore.state.draggingPiece && StateStore.state.draggingPiece.piece === this.piece) {
            await this.$nextTick();
            StateStore.state.draggingPiece = null;
        }
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
    pointer-events: all;
}

.click-through {
    pointer-events: none;
}
</style>