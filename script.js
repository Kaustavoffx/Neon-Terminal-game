// =========================
// STORY DATA
// =========================

const storyLines = [

    "The city went silent at exactly 2:13 AM.",

    "Emergency broadcasts stopped without warning.",
    
    "Only one terminal remained connected to the Network.",

    "A strange encrypted message appeared on the screen.",

    "If you are reading this... Disconnect immediately."

];

// =========================
// ELEMENTS
// =========================

const storyText = document.getElementById("story-text");

const typingInput = document.getElementById("typing-input");

const startBtn = document.getElementById("start-btn");

const restartBtn = document.getElementById("restart-btn");

const systemStatus = document.getElementById("system-status");

const charCount = document.getElementById("char-count");

// =========================
// VARIABLES
// =========================

let currentLine = 0;
let currentText = "";
let typingIndex = 0;
let isAnimating = false;

// =========================
// START GAME
// =========================

startBtn.addEventListener("click",()=> {

    systemStatus.textContent = "system status: CONNECTED";

    startBtn.style.display="none";

    typingInput.disabled = false;

    typingInput.focus();

    showLine();

});

// =========================
// TYPEWRITTER EFFECT
// =========================

function showLine(){

    isAnimating = true;

    typingInput.disabled = true;

    storyText.style.opacity = 0;

    setTimeout(() => {

        storyText.style.opacity = 1;

    }, 200);

    storyText.textContent = "";

    currentText = storyLines[currentLine];

    typingIndex = 0;

    const typingAnimation = setInterval(() => {

        storyText.textContent += currentText.charAt(typingIndex);

        typingIndex ++;

        if(typingIndex >= currentText.length){

            clearInterval(typingAnimation);

            isAnimating = false;

            typingInput.disabled = false;

            typingInput.focus();
        }

    }, 40);

}

// =========================
// PLAYER TYPING
// =========================

typingInput.addEventListener("input", () =>{

    // prevent typing during animation
    if(isAnimating){

        return;
    }
    
    const typedText = typingInput.value;
    
    charCount.textContent = typedText.length;

    //terminal glow feedback
    storyText.classList.add("typing-active");

    setTimeout(() => {

        storyText.classList.remove("typing-active");

    },100)

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

            systemStatus.textContent = "System Status: TERMINATED";

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

    typingInput.value = "";

    typingInput.focus();

    restartBtn.style.display = "none";

    showLine();

});