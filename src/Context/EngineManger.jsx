import gsap from "gsap";
import { useEffect } from "react";
import { useState, createContext, useContext } from "react";
import { _anim_Hi } from "../Bot Engine/Animations/greeting";
import { initEngine } from "../Bot Engine/Engine/_Engine";
import initSpeech from "../Bot Engine/Engine/_SpeechEngine";

const EngineContext = createContext({})
const useEngine = () => useContext(EngineContext)

const EngineProvider = ({ children }) => {
    const [botResult, setResult] = useState()
    const [output, s_Output] = useState()
    const [transScript, g_tanscript] = useState()
    const [type, s_type] = useState('voice')

    useEffect(() => {
        GoDown(400, '#chatUser', 0.2)
        showBotData()
    }, [botResult])

    if (type === 'voice') {
        initSpeech('chatUserInputVoice', i_Engine, 500)
    }

    function i_Engine() {
        const Engine = initEngine(
            {
                inputType: type,
                chatInputTarget: 'chatUserInput',
                readOut: true,
                volume: 1,
                rate: 0.6,
                delay: 1100,
                greetAnimation: _anim_Hi(),
            }
        )
        setResult(Engine.botInfo);
        console.log(Engine.botInfo);
    }
    function initBot() {
        console.log('botEngine: running');
        GoDown(400, '#chatBox', 0.4)
        setTimeout(() => {
            if (type === 'text') {
                showUserInput('chatUserInput')
            }
            if (type === 'prompt') {
                i_Engine()
            }
        }, 600);
    }
    function forInputFormat() {
        i_Engine()
    }

    function GoDown(duration, target, animationDuration) {
        setTimeout(() => {
            gsap.to(target, {
                opacity: 0,
                duration: animationDuration,
                display: 'none',
                translateY: 20,
            })
        }, duration)
    }
    function showBotData() {
        setTimeout(() => {
            if (botResult) {
                s_Output(botResult.result)

                gsap.to('#chatBox', {
                    display: 'flex',
                    opacity: 1,
                    duration: 0.3,
                    translateY: 0,
                })
            }
        }, 1000)
    }
    function showUserInput(id) {
        const _target = document.getElementById(id)
        _target.value = ''
        setTimeout(() => {
            gsap.to(`#chatUser`, {
                opacity: 1,
                display: 'flex',
                duration: 0.3,
                translateY: 0,
                onComplete: _target.focus(),
            })
        }, 200)
        setTimeout(() => {
            _target.focus()
        }, 300);
    }
    const EngineValues = {
        initBot,
        output,
        forInputFormat,
        transScript,
    }
    return (
        <EngineContext.Provider value={EngineValues}>
            {children}
        </EngineContext.Provider>
    )
}

export { useEngine, EngineProvider }