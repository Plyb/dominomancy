<template>
<div class="play-table">
    <div class="corner"></div>
    <div class="horiz-seating"
        :style="getHorizWidthStyle(playerSeating.top.length, playerSeating.bottom.length)"
    >
        <PlayerSeat v-for="player in playerSeating.top" :key="player.id"
            :player="player"
            :mat="gameState.mats.get(player.id)"
        /></div>
    <div class="corner"></div>

    <div class="vert-seating">
        <div>
            <PlayerSeat v-for="player in playerSeating.left" :key="player.id"
                :player="player"
                :mat="gameState.mats.get(player.id)"
            />
        </div>
    </div>
    <div class="table-center">
        <Board
            :model="gameState.hub"
        />
    </div>
    <div class="vert-seating">
        <div>
            <PlayerSeat v-for="player in playerSeating.right" :key="player.id"
                :player="player"
                :mat="gameState.mats.get(player.id)"
            />
        </div>
    </div>

    <div class="corner"></div>
    <div class="horiz-seating"
        :style="getHorizWidthStyle(playerSeating.bottom.length, playerSeating.top.length)"
    >
        <PlayerSeat v-for="player in playerSeating.bottom" :key="player.id"
            :player="player"
            :mat="gameState.mats.get(player.id)"
        />
    </div>
    <div class="corner"></div>
</div>
</template>

<script lang="ts">
import Core, { BoardGameStateProxy, Player } from "@plyb/web-game-core-frontend";
import { Options, Vue } from "vue-class-component";
import { LTestPiece } from 'shared'
import Board from '../components/Board.vue'
import PlayerSeat from '../components/PlayerSeat.vue'
type side = 'top' | 'right' | 'bottom' | 'left';
type Seating = {
    'top': Player[];
    'right': Player[];
    'bottom': Player[];
    'left': Player[];
}

@Options({
    components: {
        Board,
        PlayerSeat,
    }
})
export default class GamePage extends Vue {
    public readonly gameState = new BoardGameStateProxy();

    public async created() {
        await this.gameState.load();
        console.log(this.playerSeating);
    }

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
</style>