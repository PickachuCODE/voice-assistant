import { BotError } from "./ErrorManger";
import { get_Data } from "./_EngineData";

function LogicManger(
    data,
    readBool,
    readVolume,
    readDelay,
    g_GreetingAnimations
) {
    let output = "";
    output = Greetings(data, g_GreetingAnimations);

    setTimeout(() => {
        readOut(output.result, readBool, readVolume);
    }, readDelay);
    return output;
}

function Greetings(text, GreetingAnimations) {
    let say = "";
    let g_greet = get_Data().greetings;

    const t_userIn = g_greet.in;
    const t_userOut = g_greet.out;
    if (text === "" || text === undefined) {
        say = BotError("confused");
        return {
            result: say,
            type: "unknown",
            vote: 0.0,
        };
    }

    for (let i = 0; i < t_userIn.length; i++) {
        const element = t_userIn[i];
        if (element.e_text.includes(text)) {
            for (let o = 0; o < t_userOut.length; o++) {
                const o_element = t_userOut[o];
                if (element.weight === o_element.weight) {
                    say =
                        o_element.o_text[
                            Math.floor(Math.random() * o_element.o_text.length)
                        ];
                    GreetingAnimations;
                    return {
                        result: say,
                        type: "greeting",
                        vote: 0.5,
                    };
                }
            }
        } else {
            say = BotError("confused");
            return {
                result: say,
                type: "unknown",
                vote: 0.0,
            };
        }
    }
}

export { LogicManger };

function readOut(text, bool, volume) {
    if (text === undefined) return;
    if (bool && text !== undefined) {
        console.log("speaking");
        const voice = new SpeechSynthesisUtterance();
        voice.volume = volume;
        voice.text = text;
        voice.rate = 0.8;
        voice.pitch = 0.20;

        window.speechSynthesis.speak(voice);
    }
}
