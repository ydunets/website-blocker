import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

function Popup() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Personal Website Blocker</h1>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm">Status:</span>
          <span className="text-green-600 font-medium">Active</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">Sites blocked today:</span>
          <span className="font-medium">0</span>
        </div>
        <button className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors">
          Open Dashboard
        </button>
        <button className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300 transition-colors">
          Pause Blocking
        </button>
      </div>
    </div>
  )
}

const container = document.getElementById('root')
if (container) {
  const root = createRoot(container)
  root.render(<Popup />)
}