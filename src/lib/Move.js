import Board from "./Board"
import BoardBuilder from "./BoardBuilder"
import BoardUtils from "./BoardUtils"
import { Alliance } from "./Constant"
import Piece from "./Piece"

export default class Move {
  constructor(b, p, d, ap = null) {
    this.board = b
    this.piece = p
    this.destination = d
    this.attackedPiece = ap
  }
  execute() { throw new Error('Not implemented') }
  get position() { return this.piece.position }
  get attack() { return this.attackedPiece !== null }
  get castling() { return this instanceof CastlingMove }
}

export class NormalMove extends Move {
  constructor(b, p, d) {
    super(b, p, d)
  }

  execute() {
    const builder = new BoardBuilder
    for (const piece of this.board.pieces) {
      if (piece != this.piece) builder.setPiece(piece)
    }
    builder.setPiece(this.piece.moveTo(this.destination))
    builder.setMoveMaker(BoardUtils.getOpponent(this.piece.ally))
    return new Board(builder)
  }
}

export class AttackMove extends Move {
  constructor(b, p, d, ap) {
    super(b, p, d, ap)
  }

  execute() {
    const builder = new BoardBuilder
    for (const piece of this.board.pieces) {
      if (piece != this.piece && piece != this.attackedPiece)
        builder.setPiece(piece)
    }
    builder.setPiece(this.piece.moveTo(this.destination))
    builder.setMoveMaker(BoardUtils.getOpponent(this.piece.ally))
    return new Board(builder)
  }
}

export class PromotionMove extends Move {
  constructor(move, pp) {
    super(move.board, move.piece, move.destination, move.attackedPiece)
    if (!(pp instanceof Piece)) throw new Error('Invalid promoted piece!')
    this.promotedPiece = pp
  }

  execute() {
    const builder = new BoardBuilder
    for (const piece of this.board.pieces) {
      if (piece != this.piece && piece != this.attackedPiece)
        builder.setPiece(piece)
    }
    builder.setPiece(this.promotedPiece.moveTo(this.destination))
    builder.setMoveMaker(BoardUtils.getOpponent(this.piece.ally))
    return new Board(builder)
  }
}

export class CastlingMove extends Move {
  constructor(b, p, d, k) {
    super(b, p, d)
    this.king = k
  }

  execute() {
    const builder = new BoardBuilder
    for (const piece of this.board.pieces) {
      if (piece != this.piece) builder.setPiece(piece)
    }
    const offset = this.king.position > this.position ? -1 : 1
    builder.setPiece(this.piece.moveTo(this.destination))
    builder.setPiece(this.king.moveTo(this.destination + offset))
    builder.setMoveMaker(BoardUtils.getOpponent(this.piece.ally))
    return new Board(builder)
  }
}

export class PawnJump extends Move {
  constructor(b, p, d) {
    super(b, p, d)
  }

  execute() {
    const builder = new BoardBuilder
    for (const piece of this.board.pieces) {
      if (piece != this.piece) builder.setPiece(piece)
    }
    const enpassantPawn = this.piece.moveTo(this.destination)
    builder.setPiece(enpassantPawn)
    builder.setMoveMaker(BoardUtils.getOpponent(this.piece.ally))
    builder.setEnpassantPawn(enpassantPawn)
    return new Board(builder)
  }
}

export class EnpassantAttackMove extends AttackMove {
  constructor(b, p, d, ap) {
    super(b, p, d, ap)
  }

  execute() {
    const builder = new BoardBuilder
    for (const piece of this.board.pieces) {
      if (piece != this.piece && piece != this.attackedPiece)
        builder.setPiece(piece)
    }
    builder.setPiece(this.piece.moveTo(this.destination))
    builder.setMoveMaker(BoardUtils.getOpponent(this.piece.ally))
    return new Board(builder)
  }
}