import { Alliance } from "./Constant"

export default class BoardUtils {
  static isValidTile(pos) { return pos >= 0 && pos < 64 }
  static isFirstRow(pos) { return (pos >> 3) == 0 }
  static isSecondRow(pos) { return (pos >> 3) == 1 }
  static isSeventhRow(pos) { return (pos >> 3) == 6 }
  static isEighthRow(pos) { return (pos >> 3) == 7 }
  static isFirstColumn(pos) { return (pos & 7) == 0 }
  static isSecondColumn(pos) { return (pos & 7) == 1 }
  static isSeventhColumn(pos) { return (pos & 7) == 6 }
  static isEighthColumn(pos) { return (pos & 7) == 7 }
  static getOpponent(ally) { return ally == Alliance.WHITE ? Alliance.BLACK : Alliance.WHITE }
  static getFront(ally) { return ally == Alliance.WHITE ? -1 : 1 }
  static getBehind(ally) { return ally == Alliance.WHITE ? 1 : -1 }
}