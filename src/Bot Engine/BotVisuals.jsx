import React from 'react'
import { useEffect } from 'react'
import { useEngine } from '../Context/EngineManger'
import { useTheme } from '../Context/ThemeManger'
import './Style/bot.css'

export default function BotVisuals() {
  const { theme } = useTheme()
  const { initBot } = useEngine()

  const handleinit = () => {
    initBot()
    document.getElementById('chatUserInput').focus()
  }

  const Styles = {
    generalStyle: {
      fill: theme.altColor,
      stroke: theme.altColor
    },
    smileStyle: {
      stroke: theme.altColor,
    }
  }
  return (
    <div className='bot' id='bot' onClick={handleinit} >
      <svg className='bot_svg' width="198" height="140" viewBox="0 0 198 140" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect style={Styles.generalStyle} id='eyeLeft' x="126.75" y="29" width="43.5" height="44" rx="21.75" fill="black" stroke="black" strokeWidth="6" />
        <rect style={Styles.generalStyle} id='browLeft' x="99.0002" width="99" height="50" fill="black" />
        <rect style={Styles.generalStyle} id='eyeRight' x="27.7502" y="29" width="43.5" height="44" rx="21.75" fill="black" stroke="black" strokeWidth="6" />
        <rect style={Styles.generalStyle} id='browRight' width="99" height="50" fill="black" />
        <path style={Styles.smileStyle} id='smile' d="M64 105.222C64 105.222 78.8423 120.104 97.9411 119.75C117.04 119.396 133.163 103.941 133.163 103.941" stroke="black" strokeWidth="10" strokeLinecap="round" />
      </svg>

    </div>
  )
}
