import BoardUtils from "../BoardUtils"
import { Type } from "../Constant"
import { AttackMove, NormalMove } from "../Move"
import Piece from "../Piece"

export default class King extends Piece {
  static OFFSETS = [-9, -8, -7, -1, 1, 7, 8, 9]
  constructor(a, p, fm = true) {
    super(Type.KING, a, p, fm)
  }
  calculateMoves(board) {
    const legalMoves = []
    for (const offset of King.OFFSETS) {
      let destination = this.position + offset
      if (!BoardUtils.isValidTile(destination) ||
        this.hasExclusion(destination, offset)) continue
      const tile = board.tiles[destination]
      if (!tile.empty) {
        const piece = tile.piece
        if (piece.ally !== this.ally) {
          legalMoves.push(new AttackMove(board, this, destination, piece))
        }
      } else {
        legalMoves.push(new NormalMove(board, this, destination))
      }
    }
    return legalMoves
  }
  moveTo(position) {
    return new King(this.ally, position, false)
  }
  isFirstColumnExcluded(pos, off) {
    return BoardUtils.isFirstColumn(pos) && (off == -9 || off == -1 || off == 7)
  }
  isEighthColumnExcluded(pos, off) {
    return BoardUtils.isEighthColumn(pos) && (off == -7 || off == 1 || off == 9)
  }
}