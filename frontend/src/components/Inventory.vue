<template>
<div v-click-outside="() => close()"
    :class="['container', {'container-open': open}]"
    @mouseleave="onMouseLeave"
>
    <div :class="['trigger', open ? 'trigger-open' : 'trigger-closed']"
        @click="open = !open"
        @mouseenter="onMouseEnter"
    >
        <i :class="['fas', open ? 'fa-caret-down' : 'fa-caret-up']"></i>
    </div>
    <div v-if="open" class="inventory" @mouseup="onMouseUp">
        <template  v-for="(piece, i) in pieces" :key="i">
            <BubbleMenu
                :options="piece.getInventoryInteractions(playerId)"
                @option-selected="onInteractionSelected($event, piece)"
            >
                <Piece
                    :piece="piece"
                    :color="'aqua'"
                    :location="{
                        containerType: ContainerType.Inventory,
                        containerId: playerId,
                        index: i,
                    }"
                    @select="onPieceSelect(i)"
                />
            </BubbleMenu>
        </template>
    </div>

    <InspectPieceModal v-if="inspectingPiece"
        class="inspect-piece-modal"
        :piece="inspectingPiece"
        @close="inspectingPiece = null"
    />
</div>
</template>

<script lang="ts">
import Core, { Piece } from "@plyb/web-game-core-frontend";
import { Options, prop, Vue } from "vue-class-component";
import PieceComponent from "./Piece.vue";
import BubbleMenu from "./BubbleMenu.vue";
import { Interactions } from "@plyb/web-game-core-shared/src/model/gameState/Piece";
import InspectPieceModal from "./InspectPieceModal.vue";
import StateStore from "@plyb/web-game-core-frontend/src/StateStore";
import MovePieceAction, { ContainerType } from "@plyb/web-game-core-shared/src/actions/MovePieceAction";

class Props {
    pieces: Piece[] = prop({
        required: true
    })
}

@Options({
    components: {
        Piece: PieceComponent,
        BubbleMenu,
        InspectPieceModal,
    }
})
export default class Inventory extends Vue.with(Props) {
    public readonly ContainerType = ContainerType;

    public open = false;
    public selectedPieceIndex = -1;
    public inspectingPiece: Piece | null = null;

    onPieceSelect(pieceIndex: number) {
        this.selectedPieceIndex = pieceIndex;
    }

    get playerId() {
        return Core.getUserId() || "";
    }

    onInteractionSelected(interaction: string, piece: Piece) {
        if (interaction === Interactions.Inspect) {
            this.inspectingPiece = piece;
        }
    }

    onMouseEnter() {
        if (StateStore.state.draggingPiece) {
            this.open = true;
            this.$emit('open-close', true);
        }
    }

    close() {
        this.open = false;
        this.$emit('open-close', false);
    }

    onMouseLeave() {
        if (StateStore.state.draggingPiece) {
            this.close();
        }
    }

    onMouseUp() {
        if (StateStore.state.draggingPiece) {
            StateStore.state.executeAction(
                MovePieceAction,
                StateStore.state.draggingPiece.piece.id,
                StateStore.state.draggingPiece.from,
                {
                    containerId: Core.getUserId() || '',
                    index: this.pieces.length,
                    containerType: ContainerType.Inventory
                },
            )
        }
    }
}
</script>

<style scoped>
.container {
    position: fixed;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}

.container-open {
    height: 90vh;
}

.trigger {
    cursor: pointer;
    padding: 0.5rem 2rem 0.5rem 2rem;
    border-radius: 0.5rem 0.5rem 0 0;
}

.trigger-open {
    background-color: #444E;
    color: white;
}
.trigger-closed {
    background-color: #4444;
    bottom: 0;
}

.inventory {
    height: 100%;
    width: 100%;
    background-color: #444E;

    display: grid;
    grid-template-columns: repeat(auto-fit, 5rem);
    grid-gap: 2rem;
    padding: 2rem;
    box-sizing: border-box;

    overflow-y: auto;
}
</style>