import { Piece } from "@plyb/web-game-core-shared";
import { prop, Vue } from "vue-class-component";

class Props {
    piece: Piece = prop({
        required: true,
    });
}

export default class PieceOverlay extends Vue.with(Props) {

}