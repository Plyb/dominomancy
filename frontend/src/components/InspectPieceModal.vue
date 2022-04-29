<template>
<div class="modal-background" @click="close">
    <div class="modal">
        <h2>{{piece.getName()}}</h2>
        <Piece class="piece"
            :piece="piece"
            :gameState="gameState"
            color="green"
        />
        <p>{{piece.getDescription()}}</p>
    </div>
</div>
</template>

<script lang="ts">
import { BoardGameStateProxy } from "@plyb/web-game-core-frontend";
import { Piece } from "@plyb/web-game-core-shared";
import { Options, prop, Vue } from "vue-class-component";
import PieceComponent from "./Piece.vue";

class Props {
    piece: Piece = prop({
        required: true
    })

    gameState: BoardGameStateProxy = prop({
        required: true
    })
}

@Options({
    components: {
        Piece: PieceComponent,
    },
})
export default class InspectPieceModal extends Vue.with(Props) {
    close() {
        this.$emit("close");
    }
}
</script>

<style scoped>
.modal-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 100;

    display: flex;
    justify-content: center;
}

.modal {
    position: absolute;
    top: 15%;
    width: 40em;
    max-width: 100%;
    height: 70%;
    background-color: #fff;
    overflow: auto;

    display: flex;
    flex-direction: column;
    align-items: center;
}

.piece {
    width: 50%;
}
</style>