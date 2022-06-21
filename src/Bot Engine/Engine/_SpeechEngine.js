export default function initSpeech(target, callback, delay) {
    var recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    var interim_transcript = "";
    var final_transcript = "";
    var r_event = ""

    recognition.onerror = function (event) {
        console.error(event);
    };

    recognition.onstart = function () {
        console.log("Speech recognition service has started");
    };

    recognition.onend = function () {
        // recognition.start();
        console.log("Speech recognition service disconnected");
    };
    recognition.onspeechend = () => {
        console.log('end talk');
        setTimeout(() => {
            callback;
        }, delay);
    }
    recognition.onresult = function (event) {
        r_event = event.results[event.resultIndex][0].transcript;
        document.getElementById(target).innerText = r_event

        for (var i = event.resultIndex; i < event.results.length; ++i) {
            // Verify if the recognized text is the last with the isFinal property
            if (event.results[i].isFinal) {
                final_transcript += event.results[i][0].transcript;
            } else {
                interim_transcript += event.results[i][0].transcript;
            }
        }

        // Choose which result may be useful for you

        console.log(event);
    };

    recognition.start();
    return r_event

}