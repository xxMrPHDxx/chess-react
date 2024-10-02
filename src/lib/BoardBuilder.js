import Board from "./Board"
import { Alliance } from "./Constant"
import Piece from "./Piece"
import Bishop from "./Piece/Bishop"
import King from "./Piece/King"
import Knight from "./Piece/Knight"
import Pawn from "./Piece/Pawn"
import Queen from "./Piece/Queen"
import Rook from "./Piece/Rook"

export default class BoardBuilder {
  constructor() {
    this.pieces = new Map
    this.moveMaker = Alliance.WHITE
    this.enpassantPawn = null
  }
  setPiece(piece) {
    if (piece instanceof Piece)
      this.pieces.set(piece.position, piece)
  }
  setMoveMaker(moveMaker) {
    this.moveMaker = moveMaker
  }
  setEnpassantPawn(pawn) {
    this.enpassantPawn = pawn
  }
  removePieceAt(pos) {
    this.pieces.delete(pos)
  }
  build() {
    return new Board(this)
  }
  static get StandardBoard() {
    const builder = new BoardBuilder()
    builder.setPiece(new Rook(Alliance.BLACK, 0))
    builder.setPiece(new Knight(Alliance.BLACK, 1))
    builder.setPiece(new Bishop(Alliance.BLACK, 2))
    builder.setPiece(new Queen(Alliance.BLACK, 3))
    builder.setPiece(new King(Alliance.BLACK, 4))
    builder.setPiece(new Bishop(Alliance.BLACK, 5))
    builder.setPiece(new Knight(Alliance.BLACK, 6))
    builder.setPiece(new Rook(Alliance.BLACK, 7))
    builder.setPiece(new Rook(Alliance.WHITE, 63 - 7))
    builder.setPiece(new Knight(Alliance.WHITE, 63 - 6))
    builder.setPiece(new Bishop(Alliance.WHITE, 63 - 5))
    builder.setPiece(new Queen(Alliance.WHITE, 63 - 3))
    builder.setPiece(new King(Alliance.WHITE, 63 - 4))
    builder.setPiece(new Bishop(Alliance.WHITE, 63 - 2))
    builder.setPiece(new Knight(Alliance.WHITE, 63 - 1))
    builder.setPiece(new Rook(Alliance.WHITE, 63 - 0))
    for (const ally of Object.values(Alliance)) {
      const offset = ally === Alliance.WHITE ? 48 : 8
      for (let i = 0; i < 8; i++) {
        builder.setPiece(new Pawn(ally, offset + i))
      }
    }
    return builder.build();
  }
}