//global variables and objects
const field = {
    x: 0,
    y: 0,
    height: 30,
    width: 30,
    draw: function () {
        strokeWeight(1)
        stroke(0, 255, 0)
        fill(0, 0, 0)

        rect(this.x, this.y, this.width, this.height);
    }
}

let tetraminos = [];
let fallTimer = 1;
let fallSpeed = 20;

let scale, squareHeight, squareDistance; 

//p5 functions
function setup() {
    createCanvas(windowWidth, windowHeight);
    scale = (height / 250);
    squareHeight = 10 * scale;
    squareDistance = squareHeight + 1;

    field.height = (squareHeight * 20) + 21;
    field.width = field.height / 2;
    field.x = width / 2 - field.width / 2;
    field.y = 10;
}

function draw() {
    background(0);

    field.draw();

    //Tetraminos
    //Create new tetramino
    if (tetraminos[tetraminos.length-1] == undefined || tetraminos[tetraminos.length-1].falling == false) {
        tetraminos.push(new TTetramino(field.x + 1 + (squareDistance * 4), field.y + 1, squareDistance));
    }
    

    //Move down
    if (fallTimer >= fallSpeed) {
        if (spaceFree(tetraminos[tetraminos.length-1], squareDistance)) {
            tetraminos[tetraminos.length-1].moveDown(squareDistance);
            console.log(spaceFree(tetraminos[tetraminos.length-1]));
            
        } else {
            tetraminos[tetraminos.length-1].falling = false;
        }
        fallTimer = 1;
    }

    //Update position
    //Draw tetramino
    tetraminos.forEach(element => {
        element.update(squareDistance);
        element.draw(squareHeight);
    });

    //Increase timer
    fallTimer += 1;

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);

    scale = (height / 250);
    squareHeight = 10 * scale;
    squareDistance = squareHeight + 1;

    field.height = (squareHeight * 20) + 21;
    field.width = field.height / 2;
    field.x = width / 2 - field.width / 2;
    field.y = 10;
}

//other function

function spaceFree(tet, squareDistance) {
    let isSpaceFee = true;

    tet.coords.forEach(element => {
        if (element[1] + squareDistance + 1 >= field.y + field.height) {
            isSpaceFee = false;
        }

        tetraminos.forEach(tetramino => {
            if (!tetramino.falling) {
                tetramino.coords.forEach(coord => {
                    if (element[1] + squareDistance == coord[1]) {
                        isSpaceFee = false;
                    }
                });
            }
        });
    });

    return isSpaceFee;
}