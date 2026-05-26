// =========================
// STORY DATA
// =========================

const storyLines = [

    "The city went silent at exactly 2:13 AM. ",
    
    "Only one terminal remained connected. ",

    "A strange signal appeared on the screen. ",

    "If you are reading this... Stay offline"

];

// =========================
// ELEMENTS
// =========================

const storyText = document.getElementById("story-text");

const typingInput = document.getElementById("typing-input");

const startBtn = document.getElementById("start-btn");

// =========================
// VARIABLES
// =========================

let currentLine = 0;
let currentText = "";
let typingIndex = 0;

// =========================
// START GAME
// =========================

startBtn.addEventListener("click",()=> {

    startBtn.style.display="none";

    typingInput.disabled = false;

    typingInput.focus();

    showLine();

});

// =========================
// TYPEWRITTER EFFECT
// =========================

function showLine(){

    storyText.textContent = "";

    currentLine = storyLines[currentLine];

    typingIndex = 0;

    const typingAnimatin = setInterval(() => {

        storyText.textContent += currentText.charAt(typingIndex);

        typingIndex ++;

        if(typingIndex >= currentText.length){

            clearInterval(typingAnimation);
        }

    }, 40);

}

// =========================
// PLAYER TYPING
// =========================

typingInput.addEventListener("input", () =>{

    const typedText = typingInput.value;

    //correct typing
    if(currentText.startsWith(typedText)){

        typingInput.style.borderColor = "lime";

    }

    // wrong typing
    else{
        typingInput.style.borderColor = "red";
    }

    //line completed
    if(typedText === currentText){

        currentLine++;

        typingInput.value = "";

        //end of story
        if(currentLine >= storyLines.length){

            storyText.textContent = "TRANSMISSION TERMINATED.";

            typingInput.disabled = true;

            return;

        }
        showLine();
    }

});