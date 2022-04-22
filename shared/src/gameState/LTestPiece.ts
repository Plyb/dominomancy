import { Piece } from "@plyb/web-game-core-shared";
import { ShapeSpace } from "@plyb/web-game-core-shared/src/gameState/Piece";

export default class LTestPiece extends Piece {
    public readonly shape: ShapeSpace[][] = [
        [ShapeSpace.Filled, ShapeSpace.None],
        [ShapeSpace.Filled, ShapeSpace.None],
        [ShapeSpace.Pivot, ShapeSpace.Filled],
    ];
}