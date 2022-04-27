<template>
<div>
    <Board
        :model="mat"
        :gameState="gameState"
        @cell-mouse-up="onCellMouseUp($event)"
    />
    <p><strong>{{player.username}}</strong>: {{inventory.length}} item(s)</p>
</div>
</template>

<script lang="ts">import { Board, BoardGameStateProxy, Piece, Player, Vec2 } from "@plyb/web-game-core-frontend";
import { Options, prop, Vue } from "vue-class-component";
import BoardComponent from "./Board.vue";

class Props {
    player: Player = prop({
        required: true
    })

    mat: Board = prop({
        required: true
    })

    inventory: Piece[] = prop({
        required: true
    })

    gameState: BoardGameStateProxy = prop({
        required: true
    })
}

@Options({
    components: {
        Board: BoardComponent
    }
})
export default class PlayerSeat extends Vue.with(Props) {
    onCellMouseUp(cell: Vec2) {
        this.$emit('cell-mouse-up', cell);
    }
}

</script>