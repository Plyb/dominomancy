<template>
<div class="board">
    <!--BG grid-->
    <div class="bg-grid" :style="gridStyle">
        <div class="bg-grid-cell" v-for="_ in numGridCells" :key="_"></div>
    </div>

    <Piece v-for="(piece, i) in model.pieces" :key="i"
        :model="piece"
        :numSpaces="{
            x: model.size.x,
            y: model.size.y
        }"
        :color="'green'"
    />
</div>
</template>

<script lang="ts">
import { Board } from "@plyb/web-game-core-frontend";
import { Options, prop, Vue } from "vue-class-component";
import Piece from "./Piece.vue";

class Props {
    model: Board = prop({
        required: true
    })
}

@Options({
    components: {
        Piece
    }
})
export default class BoardComponent extends Vue.with(Props) {

    get gridStyle() {
        return `grid-template-columns: repeat(${this.model.size.x}, 1fr);` +
            `grid-template-rows: repeat(${this.model.size.y}, 1fr);`
    }

    get numGridCells() {
        return this.model.size.x * this.model.size.y;
    }
}
</script>

<style scoped>
.board {
    position: relative;
}

.bg-grid {
    display: grid;
    grid-gap: 1px;
    border: 1px solid black;
}

.bg-grid-cell {
    background-color: #fff;
    border: 1px solid black;
    height: 0;
    padding-bottom: 100%;
}
</style>