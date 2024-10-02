import BoardBuilder from "./BoardBuilder"
import { Alliance } from "./Constant"
import Bishop from "./Piece/Bishop"
import King from "./Piece/King"
import Knight from "./Piece/Knight"
import Pawn from "./Piece/Pawn"
import Queen from "./Piece/Queen"
import Rook from "./Piece/Rook"

export function TestCheckBoard() {
  const builder = new BoardBuilder()
  builder.setPiece(new King(Alliance.BLACK, 4))
  builder.setPiece(new Queen(Alliance.WHITE, 31))
  builder.setPiece(new King(Alliance.WHITE, 63 - 4))
  builder.setMoveMaker(Alliance.BLACK)
  return builder.build();
}
export function TestCheckMateBoard() {
  const builder = new BoardBuilder()
  builder.setPiece(new King(Alliance.BLACK, 4))
  builder.setPiece(new Queen(Alliance.WHITE, 11))
  builder.setPiece(new Queen(Alliance.WHITE, 13))
  builder.setPiece(new King(Alliance.WHITE, 63 - 4))
  builder.setMoveMaker(Alliance.BLACK)
  return builder.build();
}
export function TestStaleMateBoard() {
  const builder = new BoardBuilder()
  builder.setPiece(new King(Alliance.BLACK, 4))
  builder.setPiece(new Rook(Alliance.WHITE, 11))
  builder.setPiece(new Rook(Alliance.WHITE, 13))
  builder.setPiece(new King(Alliance.WHITE, 63 - 4))
  builder.setMoveMaker(Alliance.BLACK)
  return builder.build();
}
export function TestCastlingBoard() {
  const builder = new BoardBuilder()
  builder.setPiece(new Rook(Alliance.BLACK, 0))
  builder.setPiece(new King(Alliance.BLACK, 4))
  builder.setPiece(new Rook(Alliance.BLACK, 7))
  builder.setPiece(new Rook(Alliance.WHITE, 63 - 7))
  builder.setPiece(new King(Alliance.WHITE, 63 - 4))
  builder.setPiece(new Rook(Alliance.WHITE, 63 - 0))
  for (const ally of Object.values(Alliance)) {
    const offset = ally === Alliance.WHITE ? 48 : 8
    for (let i = 0; i < 8; i++) {
      builder.setPiece(new Pawn(ally, offset + i))
    }
  }
  return builder.build();
}
export function TestEnpassantBoard() {
  const builder = new BoardBuilder()
  builder.setPiece(new Rook(Alliance.BLACK, 0))
  builder.setPiece(new King(Alliance.BLACK, 4))
  builder.setPiece(new Rook(Alliance.BLACK, 7))
  builder.setPiece(new Rook(Alliance.WHITE, 63 - 7))
  builder.setPiece(new King(Alliance.WHITE, 63 - 4))
  builder.setPiece(new Rook(Alliance.WHITE, 63 - 0))
  for (const ally of Object.values(Alliance)) {
    const offset = ally === Alliance.WHITE ? 48 : 8
    for (let i = 0; i < 8; i++) {
      builder.setPiece(new Pawn(ally, offset + i))
    }
  }
  builder.setPiece(new Pawn(Alliance.BLACK, 36))
  return builder.build();
}