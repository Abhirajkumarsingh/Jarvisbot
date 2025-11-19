const btn = document.querySelector('.talk'); 
const content = document.querySelector('.content');


function speak(text) {
    const text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;
    window.speechSynthesis.speak(text_speak);
}

const greetings = [
    "Hello Sir, How may I help you?",
    "At your service, boss.",
    "Yes master, what can I do?",
    "I’m here, what’s your command?"
];

function wishMe() {
    const hour = new Date().getHours();
    if (hour >= 0 && hour < 12) {
        speak("Good Morning Boss...");
    } else if (hour >= 12 && hour < 17) {
        speak("Good Afternoon Master...");
    } else {
        speak("Good Evening Sir...");
    }
}

window.addEventListener('load', () => {
    speak("Initializing JARVIS..");
    wishMe();
});


const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.continuous = true;   
recognition.interimResults = false;
recognition.lang = "en-US";

let isListening = false;
let sleepMode = false;

recognition.onresult = (event) => {
    const transcript = event.results[event.resultIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());
};


btn.addEventListener('click', () => {
    if (!isListening) {
        content.textContent = "Listening....";
        recognition.start();
        isListening = true;
        speak("I am listening...");
    } else {
        recognition.stop();
        isListening = false;
        speak("Stopped listening. Tap mic to start again.");
    }
});

function takeCommand(message) {
    console.log("Command received:", message);

    if (sleepMode && !message.includes("wake up") && !message.includes("start listening")) {
        return;
    }

    if (message.includes('hey') || message.includes('hello')) {
        speak(greetings[Math.floor(Math.random() * greetings.length)]);
    } 

    else if (message.includes("open google")) {
        window.open("https://google.com", "_blank");
        speak("Opening Google...");
    } 

    else if (message.includes("open youtube")) {
        window.open("https://youtube.com", "_blank");
        speak("Opening YouTube...");
    } 

    else if (message.includes("search youtube for")) {
        let query = message.replace("search youtube for", "").trim();
        if (query) {
            window.open(`https://www.youtube.com/results?search_query=${query}`, "_blank");
            speak("Searching YouTube for " + query);
        } else {
            speak("Please say the video name after 'search YouTube for'.");
        }
    } 

    else if (message.includes("open facebook")) {
        window.open("https://facebook.com", "_blank");
        speak("Opening Facebook...");
    } 

    else if (message.includes("open instagram")) {
        window.open("https://instagram.com", "_blank");
        speak("Opening Instagram...");
    } 

    else if (message.includes("open gmail")) {
        window.open("https://mail.google.com", "_blank");
        speak("Opening Gmail...");
    }

    else if (message.includes("open whatsapp")) {
        window.open("https://web.whatsapp.com", "_blank");
        speak("Opening WhatsApp Web...");
    }

    else if (message.includes("open twitter")) {
        window.open("https://twitter.com", "_blank");
        speak("Opening Twitter...");
    }

    else if (message.includes("play")) {
        let song = message.replace("play", "").trim();
        if (song) {
            window.open(`https://www.youtube.com/results?search_query=${song}`, "_blank");
            speak("Playing " + song + " on YouTube");
        } else {
            speak("Please tell me the song name after play.");
        }
    } 

    else if (message.includes("time")) {
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        speak("The time is " + time);
    } 

    else if (message.includes("date")) {
        const date = new Date().toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });
        speak("Today's date is " + date);
    } 

    else if (message.includes("calculator")) {
        speak("Opening Calculator");
        window.open('Calculator:///', "_blank");
    } 

    else if (message.includes("joke")) {
        const jokes = [
            "Why don’t programmers like nature? It has too many bugs.",
            "I told my computer I needed a break, and now it won’t stop sending me KitKats.",
            "Why do Java developers wear glasses? Because they don’t see sharp."
        ];
        speak(jokes[Math.floor(Math.random() * jokes.length)]);
    }

    else if (message.includes("quote")) {
        const quotes = [
            "Push yourself, because no one else is going to do it for you.",
            "Success is not for the lazy.",
            "Work hard in silence, let success make the noise."
        ];
        speak(quotes[Math.floor(Math.random() * quotes.length)]);
    }

    else if (message.includes("who created you") || message.includes("your name")) {
        speak("I was created by Abhiraj, powered by College Brains!");
    } 

    else if (message.includes("stop listening") || message.includes("sleep")) {
        sleepMode = true;
        speak("Going to sleep mode. Say wake up to activate me again.");
    }

    else if (message.includes("wake up") || message.includes("start listening")) {
        sleepMode = false;
        speak("I am back online and ready.");
    }

    else {
        
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        speak("Here is what I found for " + message + " on Google.");
    }
}
