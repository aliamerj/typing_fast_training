var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const RANDOM_QUOTE_API_URL = "https://api.quotable.io/random";
const qouteDisplayElement = document.getElementById("quoteDisplay");
const quoteInputElement = document.getElementById("quoteInput");
const timeElement = document.getElementById("timer");
let goToNewQuote;
let startCounting;
const getRandomQuotes = () => __awaiter(void 0, void 0, void 0, function* () {
    const quote = yield fetch(RANDOM_QUOTE_API_URL).then((response) => response.json());
    startCounting = new Date().getTime();
    return quote.content;
});
const getNewQuote = () => __awaiter(void 0, void 0, void 0, function* () {
    const quote = yield getRandomQuotes();
    if (qouteDisplayElement) {
        qouteDisplayElement.innerHTML = "";
        splitQuote(quote);
        quoteInputElement.value = "";
        startTimer();
    }
});
const splitQuote = (quote) => {
    quote.split("").forEach((character, index) => {
        if (index + 1 !== quote.length) {
            const characterAddSpan = document.createElement("span");
            characterAddSpan.innerText = character;
            qouteDisplayElement === null || qouteDisplayElement === void 0 ? void 0 : qouteDisplayElement.appendChild(characterAddSpan);
        }
    });
};
const checkInput = () => {
    quoteInputElement.addEventListener("input", () => {
        const arrayQuote = qouteDisplayElement === null || qouteDisplayElement === void 0 ? void 0 : qouteDisplayElement.querySelectorAll("span");
        const arrayValue = quoteInputElement.value.split("");
        arrayQuote &&
            arrayQuote.forEach((characterSpan, index) => {
                const character = arrayValue[index];
                if (!character) {
                    normalInput(characterSpan);
                }
                else if (character === characterSpan.innerText) {
                    correctInput(characterSpan);
                }
                else {
                    incorrectInput(characterSpan);
                }
            });
        goToNewQuote && getNewQuote();
    });
};
const correctInput = (characterSpan) => {
    characterSpan.classList.add("correct");
    characterSpan.classList.remove("incorrect");
    goToNewQuote = true;
};
const incorrectInput = (characterSpan) => {
    characterSpan.classList.remove("correct");
    characterSpan.classList.add("incorrect");
    goToNewQuote = false;
};
const normalInput = (characterSpan) => {
    characterSpan.classList.remove("correct");
    characterSpan.classList.remove("incorrect");
    goToNewQuote = false;
};
const startTimer = () => {
    let timer = 0;
    if (timeElement) {
        timeElement.innerText = timer.toString();
        setInterval(() => {
            timeElement.innerText = timer.toString();
            timer = getTimerTime();
        }, 1000);
    }
};
const getTimerTime = () => {
    let timeNow = new Date().getTime();
    return Math.floor((timeNow - startCounting) / 1000);
};
checkInput();
getNewQuote();
export {};
