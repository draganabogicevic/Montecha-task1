const canvas = document.querySelector("#rechtangleForDrawings");
const context = canvas.getContext("2d");
const drawDot = document.querySelector("#drawDot");
let arrOfDots = [];
const errorP = document.getElementById("error");
let error = ""; 

class Dot {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

const getDataFromInput = () => {
  return {
    inputX: document.getElementById("xPos").value,
    inputY: document.getElementById("yPos").value,
    color: document.getElementById("color").value,
    size: document.getElementById("size").value,
    label: document.getElementById("label").value
  }
}

const validateInputs = (input1, input2, input3) => {
  
  if(input1 === "" || input2 === "" || input3 === "") {
    throw new Error ("Please fill in filds X position, Y position and label");
  } else if(input1 > 699 || input1 < 1) {
    throw new Error ("X position must be number between 1 and 699");
  } else if(input2 > 299 || input2 < 1) {
    throw new Error ("Y position must be number between 1 and 299");
  } 
}

const printError = (message) => {
  errorP.innerHTML = message;
}

const clearErrorP = () => {
  errorP.innerHTML = "";
}

const clearInput = () => {
  document.getElementById("xPos").value = "";
  document.getElementById("yPos").value = "";
  document.getElementById("label").value = "";
} 

const drawPoints = (data) => {
  console.log(data)
  clearErrorP();
  if (data.color == "") {
    data.color = "white";
  }
  if (data.size == "") {
    data.size = 5;
  }

  const roundedX = Math.round(data.inputX);
  const roundedY = Math.round(data.inputY);

  const newDot = new Dot(roundedX, roundedY);
  arrOfDots.push(newDot);
  console.log(data.size)
  context.beginPath();
  context.fillStyle = data.color;
  context.arc(roundedX, roundedY, data.size, 0 * Math.PI, 2 * Math.PI);
  context.fill();

  if(label) {
    const textX = roundedX;
    const textY = Math.round(roundedY - data.size - 5);

    context.font = "15px Arial";
    context.fillStyle = data.color;
    context.textAligne = "center";
    context.fillText(data.label, textX, textY);
  }

}

const onDotsDraw = () => {
  const dataFromForm = getDataFromInput();
  console.log(dataFromForm)
  try {
    validateInputs(dataFromForm.inputX, dataFromForm.inputY, dataFromForm.label);
    drawPoints(dataFromForm);
    clearInput();
  } catch (error) {
    printError(error.message);
  }
}

const hideDots = () => {
  context.clearRect(0, 0, 700, 300);
}

const connectDots = () => {
  context.setLineDash([5, 15]);
  context.beginPath();
  context.lineWidth = "5";
  context.strokeStyle = "white";
  for(let i = 0; i<=arrOfDots.length-1; i++) {
    if(i === arrOfDots.length-1) {
      context.moveTo(arrOfDots[i].x, arrOfDots[i].y);
      context.lineTo(arrOfDots[0].x, arrOfDots[0].y);
    } else if(arrOfDots.length === 2) {
      context.moveTo(arrOfDots[0].x, arrOfDots[0].y);
      context.lineTo(arrOfDots[1].x, arrOfDots[1].y);
    } else {
    context.moveTo(arrOfDots[i].x, arrOfDots[i].y );
    context.lineTo(arrOfDots[i+1].x, arrOfDots[i+1].y );
    }
    
  }
  hideDots()
  context.stroke();
}


const clearCanvas = () => {
  location.reload();
}