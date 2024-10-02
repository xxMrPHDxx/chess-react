import { Alliance, MoveStatus, Type } from "./Constant"
import Move from "./Move"

class Tile {
  constructor(pos, piece = null) {
    this.position = pos
    this.piece = piece
  }
  get empty() { return this.piece === null }
}

class MoveTransition {
  constructor(fb, tb, m, s) {
    this.fromBoard = fb
    this.toBoard = tb
    this.move = m
    this.status = s
  }
}

class Player {
  constructor(a, ap, lm, olm) {
    this.ally = a
    this.activePieces = ap
    this.legalMoves = lm
    this.king = ap.find(piece => piece.type === Type.KING)
    if (!this.king) throw new Error('No king found for player!')

    this.inCheck = olm.find(move => move.attack && move.attackedPiece == this.king) && true || false
  }
  get inCheckMate() { return this.inCheck && !this.hasEscapeMoves() }
  get inStaleMate() { return !this.inCheck && !this.hasEscapeMoves() }
  hasEscapeMoves() {
    for (const move of this.legalMoves) {
      try {
        const board = move.execute()
        if (!board.opponentPlayer.inCheck) return true
      } catch (_) { }
    }
    return false
  }
  makeMove(move) {
    if (!(move instanceof Move)) throw new Error('Invalid move!')
    if (!this.legalMoves.includes(move)) return new MoveTransition(this.board, this.board, move, MoveStatus.ILLEGAL)
    const board = move.execute()
    return board.opponentPlayer.inCheck
      ? new MoveTransition(this.board, this.board, move, MoveStatus.LEAVES_PLAYER_IN_CHECK)
      : new MoveTransition(this.board, board, move, MoveStatus.DONE)
  }
}

class WhitePlayer extends Player {
  constructor(ap, lm, olm) {
    super(Alliance.WHITE, ap, lm, olm)
  }
}

class BlackPlayer extends Player {
  constructor(ap, lm, olm) {
    super(Alliance.BLACK, ap, lm, olm)
  }
}

export default class Board {
  constructor(builder) {
    this.tiles = []
    this.whitePieces = []
    this.blackPieces = []
    this.whiteLegals = []
    this.blackLegals = []
    for (let i = 0; i < 64; i++) {
      const piece = builder.pieces.get(i)
      if (!piece) this.tiles.push(new Tile(i))
      else {
        (piece.ally === Alliance.WHITE ? this.whitePieces : this.blackPieces).push(piece)
        this.tiles.push(new Tile(i, piece))
      }
    }

    this.enpassantPawn = builder.enpassantPawn

    for (const piece of this.whitePieces)
      for (const move of piece.calculateMoves(this))
        this.whiteLegals.push(move)
    for (const piece of this.blackPieces)
      for (const move of piece.calculateMoves(this))
        this.blackLegals.push(move)
    this.whitePlayer = new WhitePlayer(this.whitePieces, this.whiteLegals, this.blackLegals)
    this.blackPlayer = new BlackPlayer(this.blackPieces, this.blackLegals, this.whiteLegals)
    this.currentPlayer = builder.moveMaker == Alliance.WHITE ? this.whitePlayer : this.blackPlayer
  }

  get pieces() { return [].concat.apply([], [this.whitePieces, this.blackPieces]) }
  get moves() { return [].concat.apply([], [this.whiteLegals, this.blackLegals]) }
  get players() { return [this.whitePlayer, this.blackPlayer] }
  get opponentPlayer() { return this.currentPlayer === this.whitePlayer ? this.blackPlayer : this.whitePlayer }
}

