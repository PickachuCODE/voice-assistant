import { BotError } from "../ErrorManger";
import { get_Data } from "../_EngineData";



export default function Greetings(text, GreetingAnimations) {
    const resultFinal = {
        result: "",
        type: "unknown",
        vote: 0.0,
        expectResponse: false,
    };
    let g_greet = get_Data().greetings;

    const t_userIn = g_greet.in;
    const t_userOut = g_greet.out;
    if (text === "" || text === undefined) {
        resultFinal.result = BotError("confused");
        return resultFinal;
    }

    for (let i = 0; i < t_userIn.length; i++) {
        const element = t_userIn[i];
        if (element.e_text.includes(text)) {
            for (let o = 0; o < t_userOut.length; o++) {
                const o_element = t_userOut[o];
                if (element.weight === o_element.weight) {
                    resultFinal.result =
                        o_element.o_text[
                            Math.floor(Math.random() * o_element.o_text.length)
                        ];
                    GreetingAnimations;
                    resultFinal.type = "greeting";
                    resultFinal.vote = o_element.weight;
                    resultFinal.expectResponse = true;
                    return resultFinal;
                }
            }
        }
    }
    resultFinal.result = BotError("confused");
    return resultFinal;
}
