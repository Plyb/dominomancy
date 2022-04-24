<template>
<div class="play-table">
    <div class="corner"></div>
    <div class="horiz-seating"
        :style="getHorizWidthStyle(playerSeating.top.length, playerSeating.bottom.length)"
    >
        <PlayerSeat v-for="player in playerSeating.top" :key="player.id"
            class="focusable"
            :player="player"
            :mat="gameState.mats.get(player.id)"
            @click="focusOn({ type: ViewType.player, player })"
        /></div>
    <div class="corner"></div>

    <div class="vert-seating">
        <div>
            <PlayerSeat v-for="player in playerSeating.left.reverse()" :key="player.id"
                class="focusable"
                :player="player"
                :mat="gameState.mats.get(player.id)"
                @click="focusOn({ type: ViewType.player, player })"
            />
        </div>
    </div>
    <div class="table-center">
        <Board class="focusable"
            :model="gameState.hub"
            @click="focusOn({ type: ViewType.hub })"
        />
    </div>
    <div class="vert-seating">
        <div>
            <PlayerSeat v-for="player in playerSeating.right" :key="player.id"
                class="focusable"
                :player="player"
                :mat="gameState.mats.get(player.id)"
                @click="focusOn({ type: ViewType.player, player })"
            />
        </div>
    </div>

    <div class="corner"></div>
    <div class="horiz-seating"
        :style="getHorizWidthStyle(playerSeating.bottom.length, playerSeating.top.length)"
    >
        <PlayerSeat v-for="player in playerSeating.bottom.reverse()" :key="player.id"
            class="focusable"
            :player="player"
            :mat="gameState.mats.get(player.id)"
            @click="focusOn({ type: ViewType.player, player })"
        />
    </div>
    <div class="corner"></div>
</div>
</template>

<script lang="ts">
import Core, {BoardGameStateProxy, Player } from "@plyb/web-game-core-frontend";
import { Options, prop, Vue } from "vue-class-component";
import PlayerSeat from "./PlayerSeat.vue";
import Board from './Board.vue'
import { View, ViewType } from "./view";


type side = 'top' | 'right' | 'bottom' | 'left';
type Seating = {
    'top': Player[];
    'right': Player[];
    'bottom': Player[];
    'left': Player[];
}

class Props {
    gameState: BoardGameStateProxy = prop({
        required: true
    });
}

@Options({
    components: {
        Board,
        PlayerSeat,
    }
})
export default class PlayTable extends Vue.with(Props) {
    public readonly ViewType = ViewType;

    public get playerSeating(): Seating {
        // TODO: this should probably use userId not username
        const myIndex = this.gameState.players.findIndex(p => p.username === Core.getUsername());

        const sides: side[] = ['bottom', 'left', 'top', 'right'];
        return this.gameState.players.reduce((seating, player, index) => {
            const side: side = sides[(index + sides.length - myIndex) % sides.length];
            seating[side].push(player);
            return seating;
        }, { top: [], right: [], bottom: [], left: [] } as Seating);
    }

    public getHorizWidthStyle(numSeatsSelf: number, numSeatsOther: number): string {
        if (numSeatsSelf < numSeatsOther) {
            return `width: ${100 * numSeatsSelf / numSeatsOther}%`;
        }
        return 'width: 100%';
    }

    public focusOn(view: View) {
        this.$emit('focus-on', view);
    }
}
</script>

<style scoped>
.play-table {
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
}

.corner {
    background-color: black;
}

.horiz-seating {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-left: auto;
    margin-right: auto;
}

.vert-seating {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}

.horiz-seating > *, .vert-seating > * {
    flex-grow: 1;
    margin: 2em;

    display: flex;
    flex-direction: column;
    justify-content: space-around;
}

.focusable {
    cursor: zoom-in;
}
</style>