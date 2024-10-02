import BoardUtils from "../BoardUtils"
import { Type } from "../Constant"
import { AttackMove, NormalMove } from "../Move"
import Piece from "../Piece"

export default class Bishop extends Piece {
  static OFFSETS = [-9, -7, 7, 9]
  constructor(a, p, fm = true) {
    super(Type.BISHOP, a, p, fm)
  }
  calculateMoves(board) {
    const legalMoves = []
    for (const offset of Bishop.OFFSETS) {
      let destination = this.position
      while (BoardUtils.isValidTile(destination + offset)) {
        if (this.hasExclusion(destination, offset)) break
        destination += offset
        const tile = board.tiles[destination]
        if (!tile.empty) {
          const piece = tile.piece
          if (piece.ally !== this.ally) {
            legalMoves.push(new AttackMove(board, this, destination, piece))
          }
          break
        } else {
          legalMoves.push(new NormalMove(board, this, destination))
        }
      }
    }
    return legalMoves
  }
  moveTo(position) {
    return new Bishop(this.ally, position, false)
  }
  isFirstColumnExcluded(pos, off) {
    return BoardUtils.isFirstColumn(pos) && (off == -9 || off == 7)
  }
  isEighthColumnExcluded(pos, off) {
    return BoardUtils.isEighthColumn(pos) && (off == -7 || off == 9)
  }
}