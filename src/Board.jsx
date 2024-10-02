import { useState } from "react"
import './Board.css'
import BoardBuilder from "./lib/BoardBuilder"
import BoardUtils from "./lib/BoardUtils"
import { TestCastlingBoard, TestEnpassantBoard } from "./lib/BoardTest"
import { Alliance } from "./lib/Constant"

function chooseMove(moves) {
  if (moves.length === 0) return Promise.reject('Empty move list!')
  if (moves.length === 1) return Promise.resolve(moves[0])
  return new Promise((resolve, reject) => {
    let choices
    const modal = $('<div>', { id: 'ChoosePromotionPiece' })
      .addClass('modal fade')
      .append(
        $('<div>')
          .addClass('modal-dialog').append(
            choices = $('<div>')
              .addClass('modal-content')
          )
      )
      .on('hidden.bs.modal', function () {
        $(this).remove()
      })
    for (const move of moves) {
      const piece = move.promotedPiece
      choices.append(
        $('<div>')
          .addClass('move')
          .append($('<img>', { src: `${piece.ally.description}_${piece.type.description}.png` }))
          .click(function () {
            modal.modal('hide').remove()
            resolve(move)
          })
      )
    }
    $(document.body).append(modal)
    modal.modal('show')
  })
}

export default function BoardView() {
  const [board, setBoard] = useState(BoardBuilder.StandardBoard)
  const [sourceTile, setSourceTile] = useState(null)
  const [moves, setMoves] = useState([])

  const [whitePieces, setWhitePieces] = useState([])
  const [blackPieces, setBlackPieces] = useState([])

  const checkmate = board.players.filter(player => player.inCheckMate)
  const stalemate = board.players.filter(player => player.inStaleMate)
  const checks = board.players.filter(player => player.inCheck)

  function performMove(tile) {
    if (checkmate.length) return
    if (sourceTile === null && !tile.empty) {
      if (tile.piece.ally !== board.currentPlayer.ally) return
      // First click
      const newMoves = board.moves.filter(move => move.position === tile.position)
      if (newMoves.length > 0) {
        setSourceTile(tile)
        setMoves(newMoves)
      }
    } else {
      const moveList = moves.filter(move => move.position == sourceTile.position && move.destination == tile.position)
      if (moveList.length > 0) {
        try {
          chooseMove(moveList)
            .then(move => {
              let board
              // console.log('Move', move)
              try {
                const nextBoard = move.execute()
                if (!nextBoard.opponentPlayer.inCheck) {
                  board = nextBoard
                  if (move.attack) {
                    const takenPieces = move.attackedPiece.ally === Alliance.WHITE
                      ? whitePieces : blackPieces
                    const setTakenPieces = move.attackedPiece.ally === Alliance.WHITE
                      ? setWhitePieces : setBlackPieces
                    setTakenPieces([...takenPieces, move.attackedPiece])
                  }
                }
              } catch (err) {
                console.log('Illegal move', err)
              }
              if (board) setBoard(board)
            })
        } catch (e) {
          console.error('Failed to execute move!', e)
        }
      }
      setSourceTile(null)
      setMoves([])
    }
  }

  return <>
    {checkmate?.map((p, key) => (
      <div className="alert alert-danger m-1" key={key}>
        {BoardUtils.getOpponent(p.ally).description.toUpperCase()} PLAYER WINS!
      </div>
    ))}
    <div className="playground">
      <div className="left-panel">
        {blackPieces.map((p, key) => (
          <img key={key} src={`./${p.ally.description}_${p.type.description}.png`} />
        ))}
      </div>
      <div className="chess-board">
        <div className="tiles">
          {board.tiles.map((tile, key) => {
            const piece = tile.piece
            const row = key % 8, col = (key / 8) | 0
            const backgroundImage = `url(./${(row + col) % 2 == 0 ? 'light' : 'dark'}.png)`
            const move = moves.find(move => move.destination === tile.position)
            const tileClass = ['tile']
            if (!tile.empty && checkmate.find(p => p.king.position == tile.position && p.ally == piece.ally)) tileClass.push('in-checkmate')
            else if (!tile.empty && stalemate.find(p => p.king.position == tile.position && p.ally == piece.ally)) tileClass.push('in-checkmate')
            else if (!tile.empty && checks.find(p => p.king.position == tile.position && p.ally == piece.ally)) tileClass.push('in-check')
            else if (move !== undefined) tileClass.push((move.castling ? 'castling' : move.attack ? 'attack' : 'normal') + '-move')
            return <div key={key} onClick={() => performMove(tile)} className={tileClass.join(' ')} style={{ backgroundImage }}>
              {!tile.empty
                ? <img draggable={false} className="w-100" src={`./${piece.ally.description}_${piece.type.description}.png`} />
                : <></>}
            </div>
          })}
        </div>
      </div>
      <div className="right-panel">
        {whitePieces.map((p, key) => (
          <img key={key} src={`./${p.ally.description}_${p.type.description}.png`} />
        ))}
      </div>
    </div>
  </>
}