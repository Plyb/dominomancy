<template>
<div class="view-menu-holder">
    <BubbleMenu
        :options="viewOptions"
    >
        <i class="view-menu-trigger fas fa-bars"></i>
    </BubbleMenu>
</div>
<PlayTable v-if="view.type === ViewType.overall"
    :gameState="gameState"
    @focus-on="view = $event"
/>
<PlayerSeat v-else-if="view.type === ViewType.player"
    :player="view.player"
    :mat="gameState.mats.get(view.player.id)"
/>
<Board v-else-if="view.type === ViewType.hub"
    :model="gameState.hub"
/>
</template>

<script lang="ts">
import { BoardGameStateProxy } from "@plyb/web-game-core-frontend";
import { Options, Vue } from "vue-class-component";
import Board from '../components/Board.vue'
import PlayerSeat from '../components/PlayerSeat.vue'
import BubbleMenu, { MenuOption } from "../components/BubbleMenu.vue";
import PlayTable from "../components/PlayTable.vue";
import { View, ViewType } from "../components/view";

@Options({
    components: {
        Board,
        PlayerSeat,
        BubbleMenu,
        PlayTable,
    }
})
export default class GamePage extends Vue {
    public readonly gameState = new BoardGameStateProxy();
    public readonly ViewType = ViewType;
    public view: View = {
        type: ViewType.overall,
        label: 'Overall'
    };

    public async created() {
        await this.gameState.load();
    }

    public get availableViews(): View[] {
        return [
            { type: ViewType.overall, label: 'Overall' },
            { type: ViewType.hub, label: 'Table Center' },
            ...this.gameState.players.map(p => ({
                type: ViewType.player,
                player: p,
                label: p.username,
            } as View))
        ];
    }

    public get viewOptions(): MenuOption[] {
        return this.availableViews.map(v => ({
            label: v.label,
            action: () => this.view = v,
        }));
    }
}
</script>

<style scoped>
.view-menu-holder {
    position: absolute;
    top: 1em;
    left: 1em;

    z-index: 100;
}

.view-menu-trigger {
    padding: 1em;
    cursor: pointer;

    background-color: #4444;
    border-radius: 0.5em;
}
</style>