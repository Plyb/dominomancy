import { Player } from "@plyb/web-game-core-frontend";

export enum ViewType {
    overall,
    player,
    hub,
}
export type View = (
        { type: ViewType.overall } 
        | { type: ViewType.player, player: Player }
        | { type: ViewType.hub }
    ) & {
    label: string;
};