import React from 'react'
import BotVisuals from './Bot Engine/BotVisuals'
import './App.css'
import { useTheme } from './Context/ThemeManger'
import { useEffect } from 'react'
import Chats from './Bot Engine/BotChats'
import { EngineProvider, useEngine } from './Context/EngineManger'

export default function App() {
  const { theme } = useTheme()
  console.clear()

  

  return (
    <EngineProvider>
      <BotDisplay />
    </EngineProvider>
  )
}


function BotDisplay() {
  const { theme } = useTheme()

  return (
    <div className="main">
      <div className="dilougeBox">
        <Chats />
      </div>
      <div className="botBox" style={{ background: theme.mainColor }}>
        <BotVisuals />
      </div>
    </div>
  )
}
