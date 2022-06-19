import { setUpVueApp } from "@plyb/web-game-core-frontend";
import PieceOverlays from "@plyb/web-game-core-frontend/src/components/pieceOverlays/PieceOverlays";
import UnoCardOverlay from "./UnoCardOverlay.vue";
import UnoCard from "./../../shared/src/pieces/UnoCard";
import { PieceTypes } from "@plyb/web-game-core-shared/src/model/gameState/pieces/PieceTypes";

PieceTypes.addPieceType(UnoCard, "UnoCard");
PieceOverlays.addOverlay(UnoCard, UnoCardOverlay);
setUpVueApp();