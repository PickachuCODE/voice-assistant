import Commands from "./_actions/commands";
import Greetings from "./_actions/greet";
import Randoms from "./_actions/random";
var synth = window.speechSynthesis;
const voice = new SpeechSynthesisUtterance();

function LogicManger(
    data,
    readBool,
    readVolume,
    readDelay,
    g_GreetingAnimations,
    callback
) {
    let output = "";
    output = [
        Greetings(data, g_GreetingAnimations),
        Randoms(data, g_GreetingAnimations),
        Commands(data, g_GreetingAnimations),
    ];

    output = get_Max(output);
    setTimeout(() => {
        readOut(output.result, readBool, readVolume, callback);
    }, readDelay);
    return output;
}



function readOut(text, bool, volume, g_callback) {
    if (text === undefined) return;
    if (bool && text !== undefined) {
voice.voice = synth.getVoices()[2];
        console.log("speaking");
        voice.volume = volume;
        voice.text = text;
        voice.rate = 0.8;
        voice.pitch = 0.2;
        voice.onend = () => {
            g_callback;
        };

        window.speechSynthesis.speak(voice);
    }
}

function get_Max(array) {
    let max = {
        result: "",
        type: "unknown",
        vote: 0.0,
        expectResponse: false,
    };
    let maxContent;
    for (let i = 0; i < array.length; i++) {
        const rawData = array[i];
        if (rawData.vote >= max.vote) {
            max = rawData;
        }
    }
    return max;
}
export { LogicManger, get_Max };