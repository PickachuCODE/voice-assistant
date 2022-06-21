const key_Data = "BotData"
let Data = {
    user: {
        displayName: null,
    },
    greetings: {
        in: [
            {
                e_text: ['hi', 'hello', 'sup'],
                weight: '0.51'
            }
        ],
        out: [
            {
                o_text: ['hi', 'hello', 'how can i help'],
                weight: '0.51'
            }
        ]
    }
}


function EngineData() {
    if (localStorage.getItem(key_Data) !== null) {
        set_Data(Data);
    }
}

function get_Data() {
    let g_Data = JSON.parse(localStorage.getItem(key_Data))
    return g_Data
}
function set_Data(data) {
    let u_Data = JSON.stringify(data)
    localStorage.setItem(key_Data, u_Data);
}



export {EngineData, get_Data}