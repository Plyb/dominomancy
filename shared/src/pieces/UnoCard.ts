import { Piece } from "@plyb/web-game-core-shared";
import { ShapeSpace } from "@plyb/web-game-core-shared/src/model/gameState/pieces/Piece";

export enum Color {
    Red = "Red",
    Green = "Green",
    Blue = "Blue",
    Yellow = "Yellow",
    Wild = "Wild",
}

export default class UnoCard extends Piece {
    public readonly shape = [
        [ShapeSpace.Filled],
    ];

    public readonly pivot = { x: 0, y: 0 };

    constructor(
        public readonly value: string,
        public readonly color: Color,
    ) {
        super();
    }

    public getName(): string {
        return `${this.color} ${this.value}`;
    }

    public getDescription(): string {
        return "";
    }

    public static getUnoDeck(): UnoCard[] {
        const coloredCards = Object.values(Color).flatMap((color) => {
            if (color === Color.Wild) {
                return [];
            };
            const standardCards = [...Array(9).keys()].flatMap((number) => {
                return [new UnoCard((number + 1).toString(), color), new UnoCard((number + 1).toString(), color)];
            });

            const zero = [new UnoCard("0", color)];
            const skips = [new UnoCard("S", color), new UnoCard("S", color)];
            const reverses = [new UnoCard("R", color), new UnoCard("R", color)];
            const drawTwos = [new UnoCard("+2", color), new UnoCard("+2", color)];

            return [...standardCards, ...zero, ...skips, ...reverses, ...drawTwos];
        });

        const wilds = [...Array(4).fill(new UnoCard("W", Color.Wild)),
            ...Array(4).fill(new UnoCard("+4 W", Color.Wild))
        ];

        return [...coloredCards, ...wilds];
    }
}