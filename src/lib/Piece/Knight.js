import BoardUtils from "../BoardUtils";
import { Type } from "../Constant";
import { AttackMove, NormalMove } from "../Move";
import Piece from "../Piece";

export default class Knight extends Piece {
  static OFFSETS = [-17, -15, -10, -6, 6, 10, 15, 17]
  constructor(a, p, fm = true) {
    super(Type.KNIGHT, a, p, fm)
  }
  calculateMoves(board) {
    const legalMoves = []
    for (const offset of Knight.OFFSETS) {
      const destination = this.position + offset
      if (!BoardUtils.isValidTile(destination) ||
        this.hasExclusion(this.position, offset)) continue;
      const tile = board.tiles[destination]
      if (!tile.empty) {
        const piece = tile.piece
        if (piece.ally != this.ally) {
          legalMoves.push(new AttackMove(board, this, destination, piece))
        }
      } else {
        legalMoves.push(new NormalMove(board, this, destination))
      }
    }
    return legalMoves
  }
  moveTo(position) {
    return new Knight(this.ally, position, false)
  }
  isFirstColumnExcluded(pos, off) {
    return BoardUtils.isFirstColumn(pos) && (off == -17 || off == -10 || off == 6 || off == 15)
  }
  isSecondColumnExcluded(pos, off) {
    return BoardUtils.isSecondColumn(pos) && (off == -10 || off == 6)
  }
  isSeventhColumnExcluded(pos, off) {
    return BoardUtils.isSeventhColumn(pos) && (off == -6 || off == 10)
  }
  isEighthColumnExcluded(pos, off) {
    return BoardUtils.isEighthColumn(pos) && (off == -15 || off == -6 || off == 10 || off == 17)
  }
}