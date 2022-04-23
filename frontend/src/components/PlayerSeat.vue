<template>
<div>
    <p>{{player.username}}</p>
    <Board
        :model="mat"
    />
</div>
</template>

<script lang="ts">import { Board, Player } from "@plyb/web-game-core-frontend";
import { Options, prop, Vue } from "vue-class-component";
import BoardComponent from "./Board.vue";

class Props {
    player: Player = prop({
        required: true
    })

    mat: Board = prop({
        required: true
    })
}

@Options({
    components: {
        Board: BoardComponent
    }
})
export default class PlayerSeat extends Vue.with(Props) {

}

</script>