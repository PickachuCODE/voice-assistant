import gsap from 'gsap'
import React from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { useEngine } from '../Context/EngineManger'
import { useTheme } from '../Context/ThemeManger'
import './Style/bot.css'

export default function Chats() {
    const { theme } = useTheme()
    const { output, forInputFormat, transScript } = useEngine()
    const handleSubmit= (e)=> {
        e.preventDefault()
        forInputFormat()
    }
    const Style = {
        ChatBox: {
            background: theme.mainColor,
            color: theme.altColor,
            opacity: '0',
            display:'none'
        },
        ChatUser: {
            background: theme.mainColor,
            color: theme.altColor,
            opacity: '0',
            display:'none'
        },
        ChatVoice: {
            background: theme.mainColor,
            color: theme.altColor,
        },
        ChatLinks: {
            color: 'red',
            display:'none',
        },
        ChatUserLinks: {
            color: 'green',
            
        },
        ChatUserInput: {
            color: theme.altColor,
        }
    }
    return (
        <>
            <div className='ChatBox' id='chatBox' style={Style.ChatBox}>
                <p><span style={Style.ChatLinks}>[ @Google ] </span>{output}</p>
            </div>

            {/* User Input box */}
            <div className='ChatBox' id='chatUser' style={Style.ChatUser}>
                <div className='userBox'>
                    <span style={Style.ChatUserLinks}>[ @me ]</span>
                    <form action="" onSubmit={handleSubmit}>
                        <input type="text" name="" id='chatUserInput' style={Style.ChatUserInput} onSubmit={ ()=>{console.log("submitted")}} />
                    <span></span>
                    </form>
                </div>
            </div>

            {/* User Voice box */}
            <div className='ChatBox' id='chatVoice' style={Style.ChatVoice}>
                <div className='userBox'>
                    <span style={Style.ChatUserLinks}>[ @me ]</span>
                    <p id='chatUserInputVoice'></p>
                </div>
            </div>
        </>
  )
}



