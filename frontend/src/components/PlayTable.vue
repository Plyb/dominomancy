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
            :inventory="gameState.inventories.get(player.id)"
            :gameState="gameState"
            @click="focusOn({ type: ViewType.player, player })"
        /></div>
    <div class="corner"></div>

    <div class="vert-seating">
        <div>
            <PlayerSeat v-for="player in playerSeating.left.reverse()" :key="player.id"
                class="focusable"
                :player="player"
                :mat="gameState.mats.get(player.id)"
                :inventory="gameState.inventories.get(player.id)"
                :gameState="gameState"
                @click="focusOn({ type: ViewType.player, player })"
            />
        </div>
    </div>
    <div class="table-center">
        <BoardComponent :class="{'focusable': selectMode === SelectMode.default}"
            :model="gameState.hub"
            :gameState="gameState"
            @click="focusOn({ type: ViewType.hub })"
            @cell-selected="onCellSelected(gameState.hub, $event)"
        />
    </div>
    <div class="vert-seating">
        <div>
            <PlayerSeat v-for="player in playerSeating.right" :key="player.id"
                class="focusable"
                :player="player"
                :mat="gameState.mats.get(player.id)"
                :inventory="gameState.inventories.get(player.id)"
                :gameState="gameState"
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
            :inventory="gameState.inventories.get(player.id)"
            :gameState="gameState"
            @click="focusOn({ type: ViewType.player, player })"
        />
    </div>
    <div class="corner"></div>
</div>
</template>

<script lang="ts">
import Core, {Board, BoardGameStateProxy, Player, Vec2 } from "@plyb/web-game-core-frontend";
import { Options, prop, Vue } from "vue-class-component";
import PlayerSeat from "./PlayerSeat.vue";
import BoardComponent from './Board.vue'
import { View, ViewType } from "./view";
import { placeholder } from "@babel/types";


type side = 'top' | 'right' | 'bottom' | 'left';
type Seating = {
    'top': Player[];
    'right': Player[];
    'bottom': Player[];
    'left': Player[];
}

export enum SelectMode {
    default,
    place,
}

class Props {
    gameState: BoardGameStateProxy = prop({
        required: true
    });

    selectMode: SelectMode = prop({
        required: true
    });
}

@Options({
    components: {
        BoardComponent,
        PlayerSeat,
    }
})
export default class PlayTable extends Vue.with(Props) {
    public readonly ViewType = ViewType;
    public readonly SelectMode = SelectMode;

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
        if (this.selectMode === SelectMode.default) {
            this.$emit('focus-on', view);
        }
    }

    onCellSelected(board: Board, cell: Vec2) {
        this.$emit('cell-selected', {
            board,
            cell
        });
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