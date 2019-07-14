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

    scaleField();
}

function draw() {
    background(0);

    field.draw();

    //Tetraminos
    //Create new tetramino
    if (tetraminos[tetraminos.length - 1] == undefined || tetraminos[tetraminos.length - 1].falling == false) {
        tetraminos.push(new TTetramino(field.x + 1 + (squareDistance * 1), field.y + 1, squareDistance));
    }

    //Update position
    //Draw tetramino
    tetraminos.forEach(element => {
        element.update(squareDistance);
        element.draw(squareHeight);
    });

    //Move down
    if (fallTimer >= fallSpeed) {
        if (spaceFree(tetraminos[tetraminos.length - 1], squareDistance)) {
            tetraminos[tetraminos.length - 1].moveDown(squareDistance);
            console.log(tetraminos[tetraminos.length - 1].y);

        } else {
            tetraminos[tetraminos.length - 1].falling = false;
        }
        fallTimer = 1;
    }

    //Increase timer
    fallTimer += 1;

}

function windowResized() {
    const oldField = {
        x: field.x,
        y: field.y,
        width: field.width,
        height: field.height
    }

    let oldSquareDistance = squareDistance;

    resizeCanvas(windowWidth, windowHeight);

    scaleField();

    tetraminos.forEach(element => {
        element.updatePosition(oldSquareDistance, squareDistance, oldField, field);
        element.update(squareDistance);
    });
}

//other function

function scaleField() {
    scale = (height / 250);
    squareHeight = 10 * scale;
    squareDistance = squareHeight + 1;

    field.height = (squareHeight * 20) + 21;
    field.width = field.height / 2;
    field.x = 10;//width / 2 - field.width / 2;
    field.y = 10;
}

function spaceFree(tet, squareDistance) {
    let isSpaceFee = true;

    //Check field
    tet.coords.forEach(element => {
        if (element[1] + squareDistance + 1 >= field.y + field.height) {
            isSpaceFee = false;
        }

        //Check y for tetraminos
        tetraminos.forEach(tetramino => {
            if (!tetramino.falling) {
                tetramino.coords.forEach(coord => {
                    if (element[1] + squareDistance * 1.5 > coord[1] && element[1] + squareDistance * 1.5 < coord[1] + squareDistance) {
                        isSpaceFee = false;
                        //Fix condition if stuck under block
                    }
                });
            }
        });
    });

    return isSpaceFee;
}