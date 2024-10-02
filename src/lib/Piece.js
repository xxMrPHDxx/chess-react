import { Type } from "./Constant"

export default class Piece {
  constructor(t, a, p, fm = true) {
    this.type = t
    this.ally = a
    this.position = p
    this.firstMove = fm
  }
  calculateMoves() { throw new Error('Not Implemented!') }
  moveTo() { throw new Error('Not Implemented!') }
  hasExclusion(pos, off) {
    return this.isFirstColumnExcluded(pos, off) ||
      this.isSecondColumnExcluded(pos, off) ||
      this.isSeventhColumnExcluded(pos, off) ||
      this.isEighthColumnExcluded(pos, off);
  }
  isFirstColumnExcluded() { return false }
  isSecondColumnExcluded() { return false }
  isSeventhColumnExcluded() { return false }
  isEighthColumnExcluded() { return false }
  isKing() { return this.type == Type.KING }
}