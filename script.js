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

const restartBtn = document.getElementById("restart-btn");

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

    currentText = storyLines[currentLine];

    typingIndex = 0;

    const typingAnimation = setInterval(() => {

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

            restartBtn.style.display = "block";

            return;

        }
        showLine();
    }

});

// =========================
// RESTART LOGIC
// =========================

restartBtn.addEventListener("click", ()=>{
    
    currentLine = 0;

    typingInput.disabled = false;

    typingInput,value = "";

    typingInput.focus();

    restartBtn.style.display = "none";

    showLine();

});