import React, { useEffect, useRef } from 'react'

const ROWS = 6
const COLS = 7

export default function Board({board, onPlay, lastMove, winner, animating, disabled}){
  const boardRef = useRef()

  useEffect(()=>{
    // simple focus outline control
  },[])

  return (
    <div className="p-4 rounded-xl bg-white/6 glass">
      <div className="board relative" ref={boardRef} style={{width: 7*72+'px'}}>
        {board.map((row, rIdx)=> (
          <div key={rIdx} className="grid grid-cols-7 gap-2" style={{height:72}}>
            {row.map((cell, cIdx)=> (
              <Cell
                key={cIdx}
                r={rIdx}
                c={cIdx}
                value={cell}
                onPlay={onPlay}
                lastMove={lastMove}
                winner={winner}
                animating={animating}
                disabled={disabled}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function Cell({r,c,value,onPlay,lastMove,winner,animating,disabled}){
  const dropRef = useRef()
  const isLast = lastMove && lastMove.row===r && lastMove.col===c
  const isWinning = winner && winner.cells && winner.cells.some(([wr,wc])=> wr===r && wc===c)

  useEffect(()=>{
    if(value!==0 && dropRef.current){
      // animate drop: from - (row+1)*80 to 0
      const el = dropRef.current
      el.style.transform = `translateY(${-(r+1)*120}px)`
      requestAnimationFrame(()=>{
        el.style.transition = 'transform 480ms cubic-bezier(0.2,0.8,0.2,1)'
        el.style.transform = 'translateY(0)'
      })
    }
  },[value,r])

  return (
    <div className="relative flex items-center justify-center bg-white/5 rounded-lg" onClick={()=>{ if(!disabled) onPlay(c) }}>
      <div className="w-14 h-14 rounded-full bg-transparent" />
      {value!==0 && (
        <div ref={dropRef} className={`absolute w-14 h-14 rounded-full flex items-center justify-center ${value===1? 'human':'ai'}`}>
          <div className={`w-12 h-12 rounded-full ${isWinning? 'pulse':''} ${isLast? 'ring-highlight':''}`} />
        </div>
      )}
    </div>
  )
}
