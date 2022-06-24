import gsap from "gsap";
import { useEffect } from "react";
import { useState, createContext, useContext } from "react";
import { _anim_Hi } from "../Bot Engine/Animations/greeting";
import { initEngine } from "../Bot Engine/Engine/_Engine";

const EngineContext = createContext({})
const useEngine = () => useContext(EngineContext)

const EngineProvider = ({ children }) => {
    const [botResult, setResult] = useState()
    const [output, s_Output] = useState()
    const [type, s_type] = useState('text')

    useEffect(() => {
        GoDown(400, '#chatUser', 0.2)
        GoDown(400, '#chatVoice', 0.2)
        showBotData()
        // showUserInput()
    }, [botResult])

    

    function i_Engine() {
        const Engine = initEngine(
            {
                inputType: type,
                chatInputTarget: 'chatUserInput',
                readOut: true,
                voiceResult: 'chatUserInputVoice',
                volume: 1,
                rate: 0.6,
                delay: 1100,
                greetAnimation: _anim_Hi(),
            }
        )
        setResult(Engine.botInfo);
        console.log(Engine.botInfo);
    }
    if (type === 'voice') {
        initSpeech('chatUserInputVoice')
    }
    
    function initSpeech(target) {
        var recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = "en-US";

        var r_event = ""

        recognition.onerror = function (event) {
            console.error(event);
        };

        recognition.onstart = function () {
            console.log("Speech recognition service has started");
        };

        recognition.onend = function () {
            
            console.log("Speech recognition service disconnected");
        };
        recognition.onspeechend = () => {
            i_Engine()
            console.log('end talk');
        }
        recognition.onresult = function (event) {
            r_event = event.results[event.resultIndex][0].transcript;
            document.getElementById(target).innerText = r_event

            console.log(event);
        };


        return recognition;

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
            if (type === 'voice') {
                showVoiceInput()
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
    function showVoiceInput() {
        setTimeout(() => {
            gsap.to(`#chatVoice`, {
                opacity: 1,
                display: 'flex',
                duration: 0.3,
                translateY: 0,
                onComplete: `` ,
            })
        }, 200)
        initSpeech('chatUserInputVoice').start()
    }
    const EngineValues = {
        initBot,
        output,
        forInputFormat,
    }
    return (
        <EngineContext.Provider value={EngineValues}>
            {children}
        </EngineContext.Provider>
    )
}

export { useEngine, EngineProvider }