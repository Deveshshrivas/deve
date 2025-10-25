import React from 'react'

export default function AIPanel({ascii, aiHistory, aiThinking, difficulty, onAsk}){
  return (
    <aside className="p-4 rounded-xl bg-white/5 glass">
      <h3 className="text-lg font-semibold mb-2">Claude — Thinking Panel</h3>
      <div className="mb-3 text-sm text-white/80">
        Difficulty: <strong>{difficulty}</strong>
      </div>
      <div className="mb-3">
        <div className="p-2 rounded bg-black/30 font-mono text-xs whitespace-pre">{ascii}</div>
      </div>
      <div className="mb-3">
        <button onClick={onAsk} className="px-3 py-1 rounded bg-white/10">Ask Claude</button>
      </div>
      <div className="mb-2 font-semibold">AI Move History</div>
      <div className="space-y-2 max-h-72 overflow-auto">
        {aiHistory.length===0 && <div className="text-sm text-white/60">No moves yet</div>}
        {aiHistory.map((h, i)=> (
          <div key={i} className="p-2 rounded bg-white/3">
            <div className="text-sm">Round {h.round} → col {h.col}</div>
            {h.analysis && h.analysis.length>0 && (
              <ul className="text-xs mt-1 list-disc list-inside text-white/70">
                {h.analysis.map((a,ai)=>(<li key={ai}>{a}</li>))}
              </ul>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 text-xs text-white/60">Claude thinking: {aiThinking? 'yes':'idle'}</div>
    </aside>
  )
}
