import { Piece } from "@plyb/web-game-core-frontend";
import { prop, Vue } from "vue-class-component";

class Props {
    color: string = prop({
        required: true
    })
}

export default abstract class PieceMixin extends Vue.with(Props) {
    get pieceSize() {
        return {
            width: this.piece.shape[0].length,
            height: this.piece.shape.length
        }
    }

    abstract piece: Piece;
}