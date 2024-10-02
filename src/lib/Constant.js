export const Type = {
  ROOK: Symbol('rook'),
  KNIGHT: Symbol('knight'),
  BISHOP: Symbol('bishop'),
  QUEEN: Symbol('queen'),
  KING: Symbol('king'),
  PAWN: Symbol('pawn'),
}

export const Alliance = {
  WHITE: Symbol('white'),
  BLACK: Symbol('black'),
}

export const MoveStatus = {
  DONE: Symbol('DONE'),
  LEAVES_PLAYER_IN_CHECK: Symbol('LEAVES_PLAYER_IN_CHECK'),
  ILLEGAL: Symbol('ILLEGAL'),
}