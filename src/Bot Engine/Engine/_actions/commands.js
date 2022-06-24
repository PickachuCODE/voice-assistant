import { BotError } from "../ErrorManger.js";
import { get_Max } from "../LoigicEngine.js";
import { get_Data } from "../_EngineData";

export default function Commands(text) {
    const resultFinal = {
        result: "",
        type: "unknown",
        vote: 0.0,
        expectResponse: false,
    };
    let g_greet = get_Data().commands;

    const t_userIn = g_greet.in;
    const t_userOut = g_greet.out;
    if (text === "" || text === undefined) {
        resultFinal.result = BotError("confused");
        return resultFinal;
    }

    let s_text = text.split(" ");
    for (let i = 0; i < t_userIn.length; i++) {
        const element = t_userIn[i];

        for (let e = 0; e < element.e_text.length; e++) {
            const text_e = element.e_text[e];

            if (s_text.length === 1 && s_text[0] === "open") {
                for (let o = 0; o < t_userOut.length; o++) {
                    const o_element = t_userOut[o];
                    if (element.weight === o_element.weight) {
                        resultFinal.result =
                            o_element.o_text[
                                Math.floor(
                                    Math.random() * o_element.o_text.length
                                )
                            ];
                        // add Animation
                        resultFinal.type = "command";
                        resultFinal.vote = element.weight;
                        resultFinal.expectResponse = true;
                        return resultFinal;
                    }
                    //
                }
            }
            
            console.log(s_text, text_e, s_text.includes(text_e));
            if (s_text.includes(text_e)) {
                for (let o = 0; o < t_userOut.length; o++) {
                    const o_element = t_userOut[o];
                    if (element.weight === o_element.weight) {
                        let outWord =
                            o_element.o_text[
                                Math.floor(
                                    Math.random() * o_element.o_text.length
                                )
                            ];
                        resultFinal.type = "command";
                        resultFinal.vote = element.weight;
                        resultFinal.expectResponse = false;
                        return get_Max([
                            openApp("a", resultFinal, s_text, text_e),
                            tellTime(resultFinal, s_text, text_e, outWord),
                        ]);
                    }
                }
            }
            if (element.e_text.includes(text)) {
                for (let o = 0; o < t_userOut.length; o++) {
                    const o_element = t_userOut[o];
                    if (element.weight === o_element.weight) {
                        resultFinal.result =
                            o_element.o_text[
                                Math.floor(
                                    Math.random() * o_element.o_text.length
                                )
                            ];
                        resultFinal.type = "greeting";
                        resultFinal.vote = o_element.weight;
                        resultFinal.expectResponse = true;
                        return resultFinal;
                    }
                }
            }
        }
    }
    resultFinal.result = BotError("confused")
    return resultFinal;
}

function openApp(app, _r, s_text, text_e) {
    if (s_text.includes('open')) {
        console.log("opening");
        _r.result = "opening app";
        return _r;
    }
    return _r;
}
function tellTime(_r, s_text, text_e, preWord) {
    if (s_text.includes(text_e) && s_text.includes("can")) {
        console.log("opening can");
        _r.result = `yes, ${preWord} 9:00`;
        return _r;
    } else {
        if (s_text.includes("time")) {
            console.log("opening t");
            _r.result = `${preWord} ${getTime()} m`;
            return _r;
        }
    }

    function getTime() {
        let time = new Date()
        var hour = time.getHours()
        var mins
        return time.getHours().toString()
    }
    return _r;
}
