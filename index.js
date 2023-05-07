const SIZE = 256, sampleNum = 7;
let inputCanvas, outputContainer, statusMsg,textElement, transferBtn, sampleIndex = 0, modelReady = false, isTransfering = false;
const inputImgs = [], outputImgs = [];

const edges2pikachu = pix2pix('./models/photos_BtoA11.pict', modelLoaded);

function setup() {
  // Create canvas
  inputCanvas = createCanvas(SIZE, SIZE);
  inputCanvas.class('border-box pencil').parent('canvasContainer');

  // Selcect output div container
  outputContainer = select('#output');
  statusMsg = select('#status');
  textElement = select('#textElementp');
  transferBtn = select('#transferBtn').hide();

  // Display initial input image
  loadImage('./images/input9.png', inputImg => image(inputImg, 0, 0));

  // Display initial output image
  let out = createImg('./images/output9.png');
  outputContainer.html('');
  out.class('border-box').parent('output');

  // Load other sample input/output images
  for (let i = 1; i <= sampleNum; i += 1) {
    loadImage(`./images/input${i}.png`, inImg => {
      inputImgs.push(inImg);
      let outImg = createImg(`./images/output${i}.png`);
      outImg.hide().class('border-box');
      outputImgs.push(outImg);
     
    });
  }

  // Set stroke to black
  stroke(0);
  pixelDensity(1);
}

// Draw on the canvas when mouse is pressed
function draw() {
  if (mouseIsPressed) {
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
}

function mouseReleased() {
  if (modelReady && !isTransfering) {
    transfer()

  }
}

function transfer() {
  isTransfering = true;
  // Update status message
  statusMsg.html('Applying Style Transfer...!');

  // Select canvas DOM element
  let canvasElement = document.getElementById('defaultCanvas0');
  // Apply pix2pix transformation
  edges2pikachu.transfer(canvasElement, result => {
    // Clear output container
    outputContainer.html('');
    // Create an image based result
    createImg(result.src).class('border-box').parent('output');
    statusMsg.html('done!');
     // Create a new paragraph element and append it to the output container
    //  let textElement = createP(' Zhou Gong interprets dreams:1. To dream of bamboo is a symbol of great wealth, implying that if you meet a son, you will become a powerful person in the future. 2. Dreaming that the yard is full of bamboo is a very auspicious dream, a dream that brings prosperity to the family and guarantees the future of future generations.3. Dreaming that the yard is full of bamboo, you will have good luck and everything goes well. Entrepreneurs dream that the yard is full of bamboo, and their career will be improved to a higher level.4. An office worker dreams that the yard is full of bamboo, indicating that you may be promoted and raise your salary.5. Dreaming of entering the bamboo forest and being unable to get out is an ominous sign, implying that disasters will continue in the near future, so you must be cautious in your affairs.6. To dream of towering bamboo is a bad omen, implying that you will offend someone because you speak too straight, and the other party may retaliate against you. Pay special attention to your words and deeds, and leave room for what you say.Psychological dream interpretation 1. Dream interpretation: One of the characteristics of bamboo is that it can be bent. It shows obedience and accommodation, and at the same time it symbolizes the strength of endurance, thus reflecting the same character. 2. Psychoanalysis: Bamboo represents good education, health, longevity and a fulfilling life. It shows due forbearance in difficult situations that call for an intelligent response. 3. Spiritual symbol: Bamboo symbolizes a perfect person who is good at seeking perfection. If you realize that you have these two characters of bamboo, you can calmly deal with the various breaks in your character.');
    //  textElement.parent('outputContainer');
   
    textElement.html('<h1>Zhou Gong interprets dreams:</h1> <p>1. To dream of bamboo is a symbol of great wealth, implying that if you meet a son, you will become a powerful person in the future.</p> <p>2. Dreaming that the yard is full of bamboo is a very auspicious dream, a dream that brings prosperity to the family and guarantees the future of future generations.</p><p>3. Dreaming that the yard is full of bamboo, you will have good luck and everything goes well. Entrepreneurs dream that the yard is full of bamboo, and their career will be improved to a higher level.</p> <p>4. An office worker dreams that the yard is full of bamboo, indicating that you may be promoted and raise your salary.</p><h2> Psychological dream interpretation</h2> <p>1. Dream interpretation: One of the characteristics of bamboo is that it can be bent. It shows obedience and accommodation, and at the same time it symbolizes the strength of endurance, thus reflecting the same character.</p> <p>2. Psychoanalysis: Bamboo represents good education, health, longevity and a fulfilling life. It shows due forbearance in difficult situations that call for an intelligent response. </p> <p>3. Spiritual symbol: Bamboo symbolizes a perfect person who is good at seeking perfection. If you realize that you have these two characters of bamboo, you can calmly deal with the various breaks in your character.</p></div>');
  
    

    isTransfering = false;

  });
}


// A function to be called when the models have loaded
function modelLoaded() {
  if (!statusMsg) statusMsg = select('#status');
  statusMsg.html('Model Loaded!');
  transferBtn.show();
  modelReady = true;
}

// Clear the canvas
function clearCanvas() {
  background(255);
}

function getRandomOutput() {
  image(inputImgs[sampleIndex], 0, 0);
  outputContainer.html('');
  outputImgs[sampleIndex].show().parent('output');
  sampleIndex += 1;
  if (sampleIndex > 6) sampleIndex = 0;
}

function usePencil() {
  stroke(0);
  strokeWeight(1);
  inputCanvas.removeClass('eraser');
  inputCanvas.addClass('pencil');
}

function useEraser() {
  stroke(255);
  strokeWeight(15);
  inputCanvas.removeClass('pencil');
  inputCanvas.addClass('eraser');
}

