import { Piece } from "@plyb/web-game-core-shared";
import { Vec2 } from "@plyb/web-game-core-shared/src/model/gameState/Board";
import { ShapeSpace } from "@plyb/web-game-core-shared/src/model/gameState/Piece";

export default class LTestPiece extends Piece {
    public readonly shape: ShapeSpace[][] = [
        [ShapeSpace.Filled, ShapeSpace.None],
        [ShapeSpace.Filled, ShapeSpace.None],
        [ShapeSpace.Filled, ShapeSpace.Filled],
    ];

    public readonly pivot: Vec2 = {
        x: 0,
        y: 2,
    };
}