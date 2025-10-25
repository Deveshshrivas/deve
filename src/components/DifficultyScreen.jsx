import React from 'react'

export default function DifficultyScreen({onSelect}){
  return (
    <div className="p-8 rounded-xl bg-white/5 glass max-w-md">
      <h2 className="text-2xl font-bold mb-4">Choose difficulty</h2>
      <div className="space-y-3">
        <button onClick={()=>onSelect('easy')} className="w-full p-3 rounded bg-gradient-to-r from-pink-500 to-red-500 hover:scale-[1.02] transition">Easy</button>
        <button onClick={()=>onSelect('medium')} className="w-full p-3 rounded bg-gradient-to-r from-purple-500 to-indigo-500 hover:scale-[1.02] transition">Medium</button>
        <button onClick={()=>onSelect('hard')} className="w-full p-3 rounded bg-gradient-to-r from-yellow-400 to-orange-500 hover:scale-[1.02] transition">Hard</button>
      </div>
      <p className="mt-4 text-sm text-white/70">Claude will analyze using window.claude.complete when available, otherwise a local fallback AI will be used.</p>
    </div>
  )
}
