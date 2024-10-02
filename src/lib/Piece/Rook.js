import BoardUtils from "../BoardUtils";
import { Type } from "../Constant";
import { AttackMove, CastlingMove, NormalMove } from "../Move";
import Piece from "../Piece";

export default class Rook extends Piece {
  static OFFSETS = [-8, -1, 1, 8]
  constructor(a, p, fm = true) {
    super(Type.ROOK, a, p, fm)
  }
  calculateMoves(board) {
    const legalMoves = []
    for (const offset of Rook.OFFSETS) {
      let destination = this.position
      while (BoardUtils.isValidTile(destination + offset)) {
        if (this.hasExclusion(destination, offset)) break
        destination += offset
        const tile = board.tiles[destination]
        if (!tile.empty) {
          const piece = tile.piece
          if (piece.ally !== this.ally) {
            legalMoves.push(new AttackMove(board, this, destination, piece))
          } else if (this.firstMove && piece.isKing() && piece.firstMove) {
            legalMoves.push(new CastlingMove(board, this, destination, piece))
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
    return new Rook(this.ally, position, false)
  }
  isFirstColumnExcluded(pos, off) {
    return BoardUtils.isFirstColumn(pos) && off == -1
  }
  isEighthColumnExcluded(pos, off) {
    return BoardUtils.isEighthColumn(pos) && off == 1
  }
}