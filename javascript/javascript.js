// get all reference of all necessary nodes
const inputBlocks = document.querySelector(".input-blocks");
const inputBlocksButton = document.querySelector(".input-blocks-button");
const actualSketch = document.querySelector(".actual-sketch");
const sketchCleanButton = document.querySelector(".sketch-clean-button");

let inputNumbers;

// RGB that will change when mouse enter
const redRGB = [];
const greenRGB = [];
const blueRGB = [];

// reduce RGB per mouse enter
const reduceRed = [];
const reduceGreen = [];
const reduceBlue = [];

// main function that work for all
function clickAndExecute() {

    // make input n x n block when click
    inputBlocksButton.addEventListener("click", () => {
        inputNumbers = inputBlocks.value;
        if (inputNumbers > 100) {
            alert("Maximum input is 100. Type again");
            inputBlocks.value = "";
        }
        else {
            sketchClean();
            twoDArray(inputNumbers);
            execute(inputNumbers);
        }
        
    });
    
    // clean all of sketch when click CLEAN button
    sketchCleanButton.addEventListener("click", sketchClean);
}

// clean sketch
function sketchClean() {
    const parentSketchBlock = document.querySelector(".actual-sketch");

    // clean block and inner 2D array
    while(parentSketchBlock.firstChild) {
        parentSketchBlock.removeChild(parentSketchBlock.firstChild);

        // clean inner 2D array
        redRGB[inputNumbers]= [];
        greenRGB[inputNumbers] = [];
        blueRGB[inputNumbers] = [];
        reduceRed[inputNumbers] = [];
        reduceGreen[inputNumbers] = [];
        reduceBlue[inputNumbers] = [];
    }

    // clean outer 2D array
    redRGB.length = 0;
    greenRGB.length = 0;
    blueRGB.length = 0;
    reduceRed.length = 0;
    reduceRed.length = 0;
    reduceRed.length = 0;
}

// change color of blocks
function changeColor(block, rowTime, blocksInRowTime) {
    
    // variable for cleaner format
    let changeRed = redRGB[rowTime][blocksInRowTime];
    let changeGreen = greenRGB[rowTime][blocksInRowTime];
    let changeBlue = blueRGB[rowTime][blocksInRowTime];
    let reduceRedFromBlock = reduceRed[rowTime][blocksInRowTime];
    let reduceGreenFromBlock = reduceGreen[rowTime][blocksInRowTime];
    let reduceBlueFromBlock = reduceBlue[rowTime][blocksInRowTime];

    // run if block has not been colored
    if (changeRed == null) {  

        // randomize RGB color
        changeRed = Math.ceil(Math.random() * 255);
        changeGreen = Math.ceil(Math.random() * 255);
        changeBlue = Math.ceil(Math.random() * 255);  

        // get 10 percent of RGB value to remove if mouse enter agin
        reduceRedFromBlock = Math.ceil(changeRed * 0.1);
        reduceGreenFromBlock = Math.ceil(changeGreen) * 0.1;
        reduceBlueFromBlock = Math.ceil(changeBlue * 0.1);

        // added to array for future use
        reduceRed[rowTime][blocksInRowTime] = reduceRedFromBlock;
        reduceGreen[rowTime][blocksInRowTime] = reduceGreenFromBlock;
        reduceBlue[rowTime][blocksInRowTime] = reduceBlueFromBlock;

    }

    // run if block colored at least one time
    else {

        // reduce by 10 percent of RGB value
        changeRed = changeRed - reduceRedFromBlock;
        changeGreen = changeGreen - reduceGreenFromBlock;
        changeBlue = changeBlue - reduceBlueFromBlock;

        // minimal RGB value of block
        if (changeRed < 0) {
            changeRed = 0;
        }
        if (changeGreen < 0) {
            changeGreen = 0;
        }
        
        if (changeBlue < 0 ) {
            changeBlue = 0;
        }

    }

    // added changed RGB value to block
    block.target.style.backgroundColor = `rgb(${changeRed}, ${changeGreen}, ${changeBlue})`;

    // added to array for future use 
    redRGB[rowTime][blocksInRowTime] = changeRed;
    greenRGB[rowTime][blocksInRowTime] = changeGreen;
    blueRGB[rowTime][blocksInRowTime] = changeBlue;
}

// create blocks
function execute(inputNumbers) {
    for(let i = 0; i < inputNumbers; i++) {
        const rowBlocks = document.createElement("div");
        rowBlocks.classList.add("row-blocks");
        actualSketch.appendChild(rowBlocks);

        for(let j = 0; j < inputNumbers; j++) {
            const blocksInRow = document.createElement("div");
            blocksInRow.classList.add("blocks-in-row");
            rowBlocks.appendChild(blocksInRow);
            blocksInRow.addEventListener("mouseenter", (event) => {
                changeColor(event, i, j);
            });
        }

    }

}

// default input 
function firstTime() {
    const event = new Event("click");
    inputBlocks.value = 16;
    inputBlocksButton.dispatchEvent(event);
    
}


// made 2D array and initialize size of array
function twoDArray(times) {
    for (let i = 0; i < times; i++) {
        redRGB[i] = [];
        greenRGB[i] = [];
        blueRGB[i] = [];
        reduceRed[i] = [];
        reduceGreen[i] = [];
        reduceBlue[i] = [];

        for (let j = 0; j < times; j ++) {
            redRGB[i][j] = null;
            greenRGB[i][j] = null;
            blueRGB[i][j] = null;
            reduceRed[i][j] = 0;
            reduceGreen[i][j] = 0;
            reduceBlue[i][j] = 0;
        }
    }
}

// call to made sketch interactive 
clickAndExecute();
// create default input when browser load first time or reload
firstTime();

