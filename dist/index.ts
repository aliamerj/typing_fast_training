import { Quote } from "./Types/types";

const RANDOM_QUOTE_API_URL = "https://api.quotable.io/random";
const qouteDisplayElement = document.getElementById("quoteDisplay");
const quoteInputElement = document.getElementById(
  "quoteInput"
) as HTMLInputElement;
const timeElement = document.getElementById("timer");
let goToNewQuote: boolean;
let startCounting: number;

const getRandomQuotes = async (): Promise<string> => {
  const quote: Quote = await fetch(RANDOM_QUOTE_API_URL).then((response) =>
    response.json()
  );
  startCounting = new Date().getTime();
  return quote.content;
};

const getNewQuote = async (): Promise<void> => {
  const quote: string = await getRandomQuotes();
  if (qouteDisplayElement) {
    qouteDisplayElement.innerHTML = "";
    splitQuote(quote);
    quoteInputElement.value = "";
    startTimer();
  }
};

const splitQuote = (quote: string): void => {
  quote.split("").forEach((character, index) => {
    if (index + 1 !== quote.length) {
      const characterAddSpan = document.createElement("span");
      characterAddSpan.innerText = character;
      qouteDisplayElement?.appendChild(characterAddSpan);
    }
  });
};

const checkInput = () => {
  quoteInputElement.addEventListener("input", () => {
    const arrayQuote = qouteDisplayElement?.querySelectorAll("span");
    const arrayValue = quoteInputElement.value.split("");
    arrayQuote &&
      arrayQuote.forEach((characterSpan, index) => {
        const character = arrayValue[index];
        if (!character) {
          normalInput(characterSpan);
        } else if (character === characterSpan.innerText) {
          correctInput(characterSpan);
        } else {
          incorrectInput(characterSpan);
        }
      });
    goToNewQuote && getNewQuote();
  });
};

const correctInput = (characterSpan: HTMLSpanElement): void => {
  characterSpan.classList.add("correct");
  characterSpan.classList.remove("incorrect");
  goToNewQuote = true;
};
const incorrectInput = (characterSpan: HTMLSpanElement): void => {
  characterSpan.classList.remove("correct");
  characterSpan.classList.add("incorrect");
  goToNewQuote = false;
};
const normalInput = (characterSpan: HTMLSpanElement): void => {
  characterSpan.classList.remove("correct");
  characterSpan.classList.remove("incorrect");
  goToNewQuote = false;
};
const startTimer = (): void => {
  let timer = 0;
  if (timeElement) {
    timeElement.innerText = timer.toString();
    setInterval(() => {
      timeElement.innerText = timer.toString();
      timer = getTimerTime();
    }, 1000);
  }
};

const getTimerTime = (): number => {
  let timeNow = new Date().getTime();
  return Math.floor((timeNow - startCounting) / 1000);
};

checkInput();
getNewQuote();
