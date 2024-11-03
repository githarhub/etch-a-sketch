// get all reference of all necessary nodes
const inputBlocks = document.querySelector(".input-blocks");
const inputBlocksButton = document.querySelector(".input-blocks-button");
const actualSketch = document.querySelector(".actual-sketch");
const sketchCleanButton = document.querySelector(".sketch-clean-button");


// main function that work for all
function clickAndExecute() {

    // make input n x n block when click
    inputBlocksButton.addEventListener("click", () => {
        const inputNumbers = inputBlocks.value;
        if (inputNumbers > 100) {
            alert("Maximum input is 100. Type again");
            inputBlocks.value = "";
        }
        else {
            execute(inputNumbers);
        }
        
    });
    
    // clean all of sketch when click CLEAN button
    sketchCleanButton.addEventListener("click", sketchClean);
}

// clean sketch
function sketchClean() {
    const parentSketchBlock = document.querySelector(".actual-sketch")
    while(parentSketchBlock.firstChild) {
        parentSketchBlock.removeChild(parentSketchBlock.firstChild);
    }
}

// change color of blocks
function changeColor(block) {
    const redRGB = Math.ceil(Math.random() * 255);
    const greenRGB = Math.ceil(Math.random() * 255);
    const blueRGB = Math.ceil(Math.random() * 255);

    block.target.style.backgroundColor = `rgb(${redRGB}, ${greenRGB}, ${blueRGB})`;
}

// create blocks
function execute(inputNumbers) {
    sketchClean();
    for(let i = 0; i < inputNumbers; i++) {
        const rowBlocks = document.createElement("div");
        rowBlocks.classList.add("row-blocks");
        actualSketch.appendChild(rowBlocks);

        for(let j = 0; j < inputNumbers; j++) {
            const blocksInRow = document.createElement("div");
            blocksInRow.classList.add("blocks-in-row");
            rowBlocks.appendChild(blocksInRow);
            blocksInRow.addEventListener("mouseenter", changeColor);
        }

    }

}

// default input 
function firstTime() {
    const event = new Event("click");
    inputBlocks.value = 16;
    inputBlocksButton.dispatchEvent(event);
    
}

clickAndExecute();
firstTime();

