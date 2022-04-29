<template>
<div class="holder" :style="[sizeStyle, positionStyle]">

    <BubbleMenu
        :options="piece.getBoardInteractions(boardId)"
        :gameState="gameState"
        @click.stop
        @option-selected="onInteractionSelected"
    >
        <Piece class="piece"
            :piece="model.piece"
            :color="color"
            :gameState="gameState"
            @long-press="onLongPress"
        />
    </BubbleMenu>

    <InspectPieceModal v-if="interactionModalOpen"
        :piece="model.piece"
        :gameState="gameState"
        class="inspect-piece-modal"
        @close="interactionModalOpen = false"
    />
</div>
</template>

<script lang="ts">
import PieceMixin from "@/mixins/PieceMixin";
import { BoardGameStateProxy, PieceLocation } from "@plyb/web-game-core-frontend";
import { BoardId } from "@plyb/web-game-core-shared/src/model/gameState/Board";
import { Interactions } from "@plyb/web-game-core-shared/src/model/gameState/Piece";
import { mixins, Options, prop, Vue } from "vue-class-component";
import BubbleMenu from "./BubbleMenu.vue";
import Piece from "./Piece.vue";
import InspectPieceModal from "./InspectPieceModal.vue";

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
        InspectPieceModal,
    },
})
export default class PlacedPiece extends mixins(PieceMixin, Vue.with(Props)) {
    interactionModalOpen = false;

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

    onInteractionSelected(interaction: string) {
        if (interaction === Interactions.Inspect) {
            this.interactionModalOpen = true;
        }
    }
}
</script>

<style scoped>
.holder {
    pointer-events: none;
    position: absolute;
}

.piece {
    width: 100%;
}

.cell {
    position: absolute;
}

.inspect-piece-modal {
    pointer-events: all;
}
</style>