import BoardUtils from "../BoardUtils"
import { Alliance, Type } from "../Constant"
import { AttackMove, EnpassantAttackMove, NormalMove, PawnJump, PromotionMove } from "../Move"
import Piece from "../Piece"
import Bishop from "./Bishop"
import Knight from "./Knight"
import Queen from "./Queen"
import Rook from "./Rook"

export default class Pawn extends Piece {
  static OFFSETS = [7, 8, 9, 16]
  constructor(a, p, fm = true) {
    super(Type.PAWN, a, p, fm)
  }
  calculateMoves(board) {
    const legalMoves = []
    for (const off of Pawn.OFFSETS) {
      const offset = off * BoardUtils.getFront(this.ally)
      const destination = this.position + offset
      if (!BoardUtils.isValidTile(this.position + offset)
        || this.hasExclusion(this.position, offset)) continue
      const tile = board.tiles[destination]
      const tileBehind = board.tiles[destination - 8 * BoardUtils.getFront(this.ally)]
      switch (off) {
        case 7:
        case 9:
          if (tile.empty && board.enpassantPawn != null && board.enpassantPawn.ally !== this.ally) {
            const behindPawn = board.enpassantPawn.position + 8 * BoardUtils.getBehind(board.enpassantPawn.ally)
            if (behindPawn === destination) {
              legalMoves.push(new EnpassantAttackMove(board, this, destination, board.enpassantPawn))
            }
          }
          else if (!tile.empty && tile.piece.ally !== this.ally) {
            // TODO: Attacking move to promotion
            const piece = tile.piece
            const move = new AttackMove(board, this, destination, piece)
            if ((this.ally == Alliance.WHITE && BoardUtils.isSecondRow(this.position))
              || (this.ally == Alliance.BLACK && BoardUtils.isSeventhRow(this.position))) {
              for (const Piece of [Rook, Knight, Bishop, Queen]) {
                const piece = new Piece(this.ally, this.position, false)
                // console.log('piece', piece)
                legalMoves.push(new PromotionMove(move, piece))
              }
            }
            else legalMoves.push(move)
          }
          break
        case 8:
          if (tile.empty) {
            const move = new NormalMove(board, this, destination)
            // TODO: Move to promotion
            if ((this.ally == Alliance.WHITE && BoardUtils.isSecondRow(this.position))
              || (this.ally == Alliance.BLACK && BoardUtils.isSeventhRow(this.position))) {
              for (const Piece of [Rook, Knight, Bishop, Queen]) {
                const piece = new Piece(this.ally, this.position, false)
                // console.log('piece', piece)
                legalMoves.push(new PromotionMove(move, piece))
              }
            }
            else legalMoves.push(move)
          } break
        case 16:
          if (this.firstMove && tileBehind.empty && tile.empty) {
            legalMoves.push(new PawnJump(board, this, destination))
          } break
      }
    }
    // if (this.position == 14)
    //   console.log('Position', this.position, 'Moves', legalMoves)
    return legalMoves
  }
  moveTo(position) {
    return new Pawn(this.ally, position, false)
  }
  isFirstColumnExcluded(pos, off) {
    return BoardUtils.isFirstColumn(pos) && (off == -9 || off == 7)
  }
  isEighthColumnExcluded(pos, off) {
    return BoardUtils.isEighthColumn(pos) && (off == -7 || off == 9)
  }
}