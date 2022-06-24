import { GetUserInput } from "./InputEngine";
import { LogicManger } from "./LoigicEngine";
import { EngineData } from "./_EngineData";

EngineData()

function initEngine(values) {
    const userText = GetUserInput(values.chatInputTarget ,values.inputType, values.voiceResult)

    const Botdata = {
        userInput: {
            type: values.inputType,
            text: userText,
        },
        botInfo: LogicManger(userText, values.readOut, values.volume, values.delay, values.greetAnimation, values.callback),
    };
    
    return Botdata
}
export { initEngine }

