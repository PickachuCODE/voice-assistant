function GetUserInput(target, inputType, voice) {
    const trigger = document.getElementById(target);
    const g_voice = document.getElementById(voice);
    // if(trigger === null) return(console.warn('Target not Found!'))
    let input = "";
    if (inputType === "prompt") {
        console.log("Using: prompt");
        input = prompt("[ @me ]");
    }
    if (inputType === "text") {
        console.log("Using: chatBox");
        input = trigger.value;
    }
    if (inputType === "voice") {
        console.log("Using: voice");
        input = g_voice.innerText
    }

    if (input === null) {
        return console.warn("No input from user");
    }
    return input.toLowerCase();
}

export { GetUserInput };

function handleVoice() {
    
}
