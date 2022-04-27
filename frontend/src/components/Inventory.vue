<template>
<div v-click-outside="() => open = false"
    :class="['container', {'container-open': open}]"
>
    <div :class="['trigger', open ? 'trigger-open' : 'trigger-closed']"
        @click="open = !open"
    >
        <i :class="['fas', open ? 'fa-caret-down' : 'fa-caret-up']"></i>
    </div>
    <div v-if="open" class="inventory">
        <template  v-for="(piece, i) in pieces" :key="i">
            <BubbleMenu
                :options="piece.inventoryInteractions"
            >
                <Piece
                    :piece="piece"
                    :color="'aqua'"
                    :gameState="gameState"
                    @long-press="onPieceLongPress(piece)"
                    @select="onPieceSelect(i)"
                />
            </BubbleMenu>
        </template>
    </div>
</div>
</template>

<script lang="ts">
import { BoardGameStateProxy, Piece } from "@plyb/web-game-core-frontend";
import { Options, prop, Vue } from "vue-class-component";
import PieceComponent from "./Piece.vue";
import BubbleMenu from "./BubbleMenu.vue";

class Props {
    pieces: Piece[] = prop({
        required: true
    })

    gameState: BoardGameStateProxy = prop({
        required: true
    })
}

@Options({
    components: {
        Piece: PieceComponent,
        BubbleMenu,
    }
})
export default class Inventory extends Vue.with(Props) {
    public open = false;
    public selectedPieceIndex = -1;

    onPieceLongPress(piece: Piece) {
        this.open = false;
        this.$emit('selected-piece-for-placement', piece);
    }

    onPieceSelect(pieceIndex: number) {
        this.selectedPieceIndex = pieceIndex;
    }
}
</script>

<style scoped>
.container {
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
}

.container-open {
    height: 90vh;
    width: 100%;
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