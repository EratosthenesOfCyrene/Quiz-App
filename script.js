//  HTML-Quiz

let HtmlQuestions = [
    {
        "question": "Wer hat html erfunden?",
        "answer_1": "Robbie Williams",
        "answer_2": "Lady Gaga",
        "answer_3": "George Berners-Lee",
        "answer_4": "Billy Gibbons",
        "right_answer": 3
    },

    {
        "question": "Was ist eine Buche?",
        "answer_1": "ein Baum",
        "answer_2": "ein Tier",
        "answer_3": "eine Farnart",
        "answer_4": "eine norwegische Stadt",
        "right_answer": 1
    },

    {
        "question": "Wer war Axel Schweiß?",
        "answer_1": "ein Rockstar",
        "answer_2": "ein Massenmörder",
        "answer_3": "ein österreicher Kanzler",
        "answer_4": "ein Fitnessguru",
        "right_answer": 4
    },

    {
        "question": "Was ist 'Magen'?",
        "answer_1": "Stadt in den Niederlanden",
        "answer_2": "menschliches Verdauungsorgan",
        "answer_3": "rumänische Brotspezialität",
        "answer_4": "atmendes Pflanzengewebe",
        "right_answer": 2
    },

    {
        "question": "Welches dieser Länder liegt am Nördlichsten?",
        "answer_1": "Lettland",
        "answer_2": "USA",
        "answer_3": "Japan",
        "answer_4": "Norwegen",
        "right_answer": 4
    }

];

let currentHtmlQuestion = 0;

let Htmlquestion = HtmlQuestions[currentHtmlQuestion];

let rightQuestions = 0;


let AUDIO_SUCCES = new Audio('audio/success.mp3');
let AUDIO_FAIL = new Audio('audio/fail.mp3');



function initHtml() {
    document.getElementById('start-btn').disabled = false; // Start-Button aktivieren
    document.getElementById('html-quiz').classList.add('link-menu-selected');

    document.getElementById('css-quiz').classList.add('pointer-none_white-bar-none');
    document.getElementById('js-quiz').classList.add('pointer-none_white-bar-none');
    document.getElementById('java-quiz').classList.add('pointer-none_white-bar-none');

    // Erzeugung eines unsichtbaren Buttons, der bei onclick die Funktion "HtmlQuestion" ausführt
    document.getElementById('questions-body').innerHTML += /*html*/ `  
    
        <button onclick="HtmlQuestion()" class="btn-generated" id="generated-start-btn">
            START NOW <img src="style_dark/arrow_black.png" alt="" class="arrow">
        </button>
    `;


    document.getElementById('quiz-type').innerHTML = 'HTML';
}


function HtmlQuestion() {  // Anzeigen des HTML- und CSS-Layouts der Fragen
    document.getElementById('questions-body').classList.add('d-none');
    document.getElementById('questionsBody').style = 'display';


    showCurrentQuestion();
}

function showCurrentQuestion() {  // Implementieren der aktuellen Frage in das obige Layout
    let Htmlquestion = HtmlQuestions[currentHtmlQuestion];

    document.getElementById('questiontext').innerHTML = Htmlquestion['question'];


    document.getElementById('answer_1').innerHTML = Htmlquestion['answer_1'];

    document.getElementById('answer_2').innerHTML = Htmlquestion['answer_2'];

    document.getElementById('answer_3').innerHTML = Htmlquestion['answer_3'];

    document.getElementById('answer_4').innerHTML = Htmlquestion['answer_4'];
}


function answer(selection) {
    let Htmlquestion = HtmlQuestions[currentHtmlQuestion];
    console.log('selected answer is', selection);
    console.log('current question is', Htmlquestion['right_answer']);


    let selectedHtmlQuestionNumber = selection.slice(-1);
    console.log('selected questionnumber is', selectedHtmlQuestionNumber);

    let idOfRightAnswer = `answer_${Htmlquestion['right_answer']}`;

    if (selectedHtmlQuestionNumber == Htmlquestion['right_answer']) {
        console.log('richtige Antwort!');
        document.getElementById(selection).classList.add('bg-right');

        AUDIO_SUCCES.play();
        rightQuestions++;
    } else {
        console.log('falsche Antwort');
        document.getElementById(selection).classList.add('bg-danger');
        document.getElementById(idOfRightAnswer).classList.add('bg-warning');

        AUDIO_FAIL.play();
    }


    document.getElementById('forward-btn').disabled = false;
}


function nextQuestion() {
    currentHtmlQuestion++;
    document.getElementById('forward-btn').disabled = true;
    document.getElementById('backward-btn').disabled = false;   // Zurück-Btn aktivieren

    resetAnswerButtons();
    showQuestion();
    updateProgressBar();
}


function resetAnswerButtons() {
    document.getElementById('answer_1').classList.remove('bg-right');
    document.getElementById('answer_1').classList.remove('bg-danger');
    document.getElementById('answer_1').classList.remove('bg-warning');

    document.getElementById('answer_2').classList.remove('bg-right');
    document.getElementById('answer_2').classList.remove('bg-danger');
    document.getElementById('answer_2').classList.remove('bg-warning');

    document.getElementById('answer_3').classList.remove('bg-right');
    document.getElementById('answer_3').classList.remove('bg-danger');
    document.getElementById('answer_3').classList.remove('bg-warning');

    document.getElementById('answer_4').classList.remove('bg-right');
    document.getElementById('answer_4').classList.remove('bg-danger');
    document.getElementById('answer_4').classList.remove('bg-warning');
}


function showQuestion() {
    // Testen, ob das Spiel zu Ende ist
    if (gameIsOver()) {
        showEndScreen();
    } else {
        
        showCurrentQuestion(); // zeigt die erste und im Folgenden alle weiteren Fragen an
    }
}


function gameIsOver() {
    return currentHtmlQuestion >= HtmlQuestions.length;
}


function showEndScreen() {   // zeigt den Endscreen an
    document.getElementById('questionsBody').style = 'display: none';
    document.getElementById('endscreen').style = 'display';


    showAmountOfRightQuestions();
}


function showAmountOfRightQuestions() {   // zeigt die Anzahl der richtig beantworteten Fragen an
    document.getElementById('amount-of-right-questions').innerHTML = rightQuestions;
    document.getElementById('amount-of-questions').innerHTML = HtmlQuestions.length;
}


function restartGame() {  // Spiel erneut spielen/starten
    document.getElementById('questions-body').classList.remove('d-none');
    document.getElementById('endscreen').style = 'display: none';


    currentHtmlQuestion = 0;
    rightQuestions = 0;

    document.getElementById('html-quiz').classList.remove('link-menu-selected');


    document.getElementById('css-quiz').classList.remove('pointer-none_white-bar-none');
    document.getElementById('js-quiz').classList.remove('pointer-none_white-bar-none');
    document.getElementById('java-quiz').classList.remove('pointer-none_white-bar-none')

    document.getElementById('start-btn').disabled = true;


    document.getElementById('generated-start-btn') = ``;

    resetProgressBar();
}


function updateProgressBar() {
    let percent = Math.round ((currentHtmlQuestion) / HtmlQuestions.length * 100);
    document.getElementById('progress-bar').style.width = `${percent}%`;
}


function resetProgressBar() {
    document.getElementById('progress-bar').style.width = `0%`;
}



function previousQuestion() {
    currentHtmlQuestion--;
    document.getElementById('forward-btn').disabled = false;
    document.getElementById('backward-btn').disabled = false;   // Zurück-Btn aktivieren

    resetAnswerButtons();
    showQuestion();
    updateProgressBar();
}


























































//  CSS-Quiz:



let CssQuestions = [
    {
        "css_question": "Wer hat CSS erfunden?",
        "css_answer_1": "Mick Jagger",
        "css_answer_2": "Lady Long",
        "css_answer_3": "Mr. Fat",
        "css_answer_4": "CSS-Uwe",
        "css_right_answer": 4
    },

    {
        "css_question": "Was ist eine Linde?",
        "css_answer_1": "eine Stadt",
        "css_answer_2": "eine Baumart",
        "css_answer_3": "eine Katkusart",
        "css_answer_4": "eine belgische Spezialität",
        "css_right_answer": 2
    },

    {
        "question": "Wer war Uwe Umfang?",
        "answer_1": "ein Raketeningenieur",
        "answer_2": "ein Held",
        "answer_3": "ein schweizer Kanzler",
        "answer_4": "ein Fitnessguru",
        "right_answer": 4
    },

    {
        "question": "Was ist 'Magen'?",
        "answer_1": "Stadt in den Niederlanden",
        "answer_2": "menschliches Verdauungsorgan",
        "answer_3": "rumänische Brotspezialität",
        "answer_4": "atmendes Pflanzengewebe",
        "right_answer": 2
    },

    {
        "question": "Welches dieser Länder liegt am Nördlichsten?",
        "answer_1": "Lettland",
        "answer_2": "USA",
        "answer_3": "Japan",
        "answer_4": "Norwegen",
        "right_answer": 4
    }

];







let currentCssQuestion = 0;

let Cssquestion = CssQuestions[currentCssQuestion];

let rightCssQuestions = 0;






function initCss() {
    document.getElementById('start-btn').disabled = false; // Start-Button aktivieren
    document.getElementById('html-quiz').classList.add('pointer-none_white-bar-none');

    document.getElementById('css-quiz').classList.add('link-menu-selected');
    document.getElementById('js-quiz').classList.add('pointer-none_white-bar-none');
    document.getElementById('java-quiz').classList.add('pointer-none_white-bar-none');


        // Erzeugung eines unsichtbaren Buttons, der bei onclick die Funktion "HtmlQuestion" ausführt
    document.getElementById('questions-body').innerHTML += /*html*/ `  
    
        <button onclick="CssQuestion()" class="btn-generated" id="generated-start-btn">
            START NOW <img src="style_dark/arrow_white.png" alt="" class="arrow">
        </button>
    `;

document.getElementById('quiz-type').innerHTML = 'CSS';
}


function CssQuestion() {   // Anzeigen des HTML- und CSS-Layouts der Fragen
    document.getElementById('questions-body').classList.add('d-none');
    document.getElementById('questionsBody').style = 'display';


    showCurrentCssQuestion();
}


function showCurrentCssQuestion() {  // Implementieren der aktuellen Frage in das obige Layout
    let Cssquestion = CssQuestions[currentCssQuestion];

    document.getElementById('questiontext').innerHTML = Cssquestion['css_question'];


    document.getElementById('answer_1').innerHTML = Cssquestion['css_answer_1'];

    document.getElementById('answer_2').innerHTML = Cssquestion['css_answer_2'];

    document.getElementById('answer_3').innerHTML = Cssquestion['css_answer_3'];

    document.getElementById('answer_4').innerHTML = Cssquestion['css_answer_4'];
}


/*function answer(selection) {
    let Cssquestion = CssQuestions[currentCssQuestion];
    console.log('selected answer is', selection);
    console.log('current question is', Cssquestion['css_right_answer']);


    let selectedCssQuestionNumber = selection.slice(-1);
    console.log('selected questionnumber is', selectedCssQuestionNumber);

    let idOfRightCssAnswer = `css_answer_${Cssquestion['css_right_answer']}`;

    if (selectedCssQuestionNumber == Cssquestion['css_right_answer']) {
        console.log('richtige Antwort!');
        document.getElementById(selection).classList.add('bg-right');

        rightCssQuestions++;
    } else {
        console.log('falsche Antwort');
        document.getElementById(selection).classList.add('bg-danger');
        document.getElementById(idOfRightCssAnswer).classList.add('bg-warning');
    }


    document.getElementById('forward-btn').disabled = false;
}*/























































console.log('heeeeh');