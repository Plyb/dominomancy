<template>
<div class="holder" :style="[sizeStyle, positionStyle]">

    <BubbleMenu
        :options="piece.getBoardInteractions(boardId)"
        :gameState="gameState"
        @click.stop
    >
        <Piece class="piece"
            :piece="model.piece"
            :color="color"
            :gameState="gameState"
            @long-press="onLongPress"
        />
    </BubbleMenu>
</div>
</template>

<script lang="ts">
import PieceMixin from "@/mixins/PieceMixin";
import { BoardGameStateProxy, PieceLocation } from "@plyb/web-game-core-frontend";
import { BoardId } from "@plyb/web-game-core-shared/src/model/gameState/Board";
import { mixins, Options, prop, Vue } from "vue-class-component";
import BubbleMenu from "./BubbleMenu.vue";
import Piece from "./Piece.vue";

class Props {
    model: PieceLocation = prop({
        required: true
    })

    numSpaces: {x: number, y: number} = prop({
        required: true
    })

    gameState: BoardGameStateProxy = prop({
        required: true
    })

    boardId: BoardId = prop({
        required: true
    })
}

@Options({
    components: {
        Piece,
        BubbleMenu,
    },
})
export default class PlacedPiece extends mixins(PieceMixin, Vue.with(Props)) {
    get piece() {
        return this.model.piece;
    }

    get sizeStyle() {
        return `width: ${this.pieceSize.width * 100 / this.numSpaces.x}%;` +
            `height: ${this.pieceSize.height * 100 / this.numSpaces.y}%;`;
    }

    get positionStyle() {
        return `left: ${(this.model.x - this.model.piece.pivot.x) * 100 / this.numSpaces.x}%;` +
            `top: ${(this.model.y - this.model.piece.pivot.y) * 100 / this.numSpaces.y}%;`;
    }

    onLongPress(piece: Piece) {
        this.$emit("long-press", piece);
    }
}
</script>

<style scoped>
.holder {
    position: absolute;
}

.piece {
    width: 100%;
}

.cell {
    position: absolute;
}
</style>