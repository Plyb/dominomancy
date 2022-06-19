import { BoardGameState, Player } from "@plyb/web-game-core-shared/src";
import DrawPile from "@plyb/web-game-core-shared/src/model/gameState/pieces/DrawPile";
import PlayingCard, { Suit } from "@plyb/web-game-core-shared/src/model/gameState/pieces/PlayingCardPiece";
import UnoCard from "../pieces/UnoCard";

export default class PlayingCardGameState extends BoardGameState {
    public constructor(players: Player[]) {
        super(players, {x: 10, y: 10}, {x: 8, y: 8});

        this.hub.placePiece(new DrawPile(PlayingCard.get52Cards()), 6, 4);
        this.hub.placePiece(new DrawPile([], true), 2, 4);
        this.hub.placePiece(new PlayingCard(0, Suit.Joker), 0, 0);
        this.hub.placePiece(new PlayingCard(0, Suit.Joker), 1, 0);

        this.hub.placePiece(new DrawPile(UnoCard.getUnoDeck()), 8, 0);
    }
}