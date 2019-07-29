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
let fallSpeed = 40;
let resetFallSpeed = fallSpeed;

let scale, squareHeight, squareDistance;

/*
*       p5 functions
*
*
*/

function setup() {
    createCanvas(windowWidth, windowHeight);

    scaleField();
}

function draw() {
    background(0);

    field.draw();

    //Create new tetramino
    if (tetraminos[tetraminos.length - 1] == undefined || tetraminos[tetraminos.length - 1].falling == false) {
        spawnTetramino(field.x + 1 + (squareDistance * 5), field.y + 1, squareDistance);
        
        //Check if colliding at spawn
        tetraminos[tetraminos.length - 1].coords.forEach(element => {
            tetraminos.forEach(tetramino => {
                if (!tetramino.falling) {
                    tetramino.coords.forEach(coord => {
                        if (element[0] + squareDistance * 0.2 > coord[0] && 
                            element[0] - squareDistance * 0.2 < coord[0] &&
                            element[1] - squareDistance * 0.2 < coord[1] &&
                            element[1] + squareDistance * 0.2 > coord[1]) {
                                //Game over!
                                tetraminos = [];
                            }
                    });
                }
            });
        });
    }

    //Update position
    //Draw tetramino
    tetraminos.forEach(element => {
        if (element.falling) {
           // element.update(squareDistance);
        }
        element.draw(squareHeight, field);
    });

    //Move down
    if (fallTimer >= fallSpeed) {
        if (downFree(tetraminos[tetraminos.length - 1], squareDistance)) {
            tetraminos[tetraminos.length - 1].moveDown(squareDistance);
        } else {
            tetraminos[tetraminos.length - 1].falling = false;
            //BOOM TETRIS
            removeRow();
        }
        fallTimer = 1;
    }

    //Increase timer
    fallTimer += 1;

}

function keyPressed() {
    if (keyCode === DOWN_ARROW) {
        fallSpeed = 10;
    }
    if (keyCode === LEFT_ARROW && leftFree(tetraminos[tetraminos.length-1], squareDistance)) {
        tetraminos[tetraminos.length-1].moveLeft(squareDistance);

    }
    if (keyCode === RIGHT_ARROW && rightFree(tetraminos[tetraminos.length-1], squareDistance)) {
        tetraminos[tetraminos.length-1].moveRight(squareDistance);
    }
    if (keyCode === 88 && rotationRightFree(tetraminos[tetraminos.length-1], squareDistance)) {
        tetraminos[tetraminos.length-1].rotationRight();
        //tetraminos[tetraminos.length-1].update(squareDistance);
    }
    if (keyCode === 90 && rotationLeftFree(tetraminos[tetraminos.length-1], squareDistance)) {
        tetraminos[tetraminos.length-1].rotationLeft();
    }

}

function keyReleased() {
    if (keyCode === DOWN_ARROW) {
        fallSpeed = resetFallSpeed;
    }
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
    });
}

//other function
function spawnTetramino(x, y, squareDistance) {
    let rnd = Math.ceil(Math.random()*7);
    
    if (rnd == 1) {
        tetraminos.push(new TTetramino(x, y, squareDistance));
    } else if (rnd == 2) {
        tetraminos.push(new OTetramino(x, y, squareDistance));
    } else if (rnd == 3) {
        tetraminos.push(new JTetramino(x, y, squareDistance));
    } else if (rnd == 4) {
        tetraminos.push(new LTetramino(x, y, squareDistance));
    } else if (rnd == 5) {
        tetraminos.push(new ZTetramino(x, y, squareDistance));
    } else if (rnd == 6) {
        tetraminos.push(new STetramino(x, y, squareDistance));
    } else if (rnd == 7) {
        tetraminos.push(new ITetramino(x, y, squareDistance));
    }
}

function scaleField() {
    scale = Math.round(height / 290);
    print(scale);
    squareHeight = 10 * scale;
    squareDistance = squareHeight + 1;

    field.height = (squareHeight * 20) + 21;
    field.width = (squareHeight * 10) + 11;
    field.x = width / 2 - field.width / 2;
    field.y = height / 2 - field.height / 2;
}

function removeRow() {
    let allYValues = {};

    tetraminos.forEach(tetramino => {
        tetramino.coords.forEach(coord => {
            if (coord[1].toFixed(0) in allYValues) {
                allYValues[coord[1].toFixed(0)]++;
            } else {
                allYValues[coord[1].toFixed(0)] = 1;
            }
        });
    });
    print(allYValues);
    Object.keys(allYValues).forEach(key => {
        if (allYValues[key] >= 10) {
            for (let j = 0; j < tetraminos.length; j++) {
                for (let i = 0; i < tetraminos[j].coords.length; i++) {
                    if (tetraminos[j].coords[i][1].toFixed(0) == key) {
                        tetraminos[j].coords.splice(i, 1);
                        i--;
                        
                    } else if (tetraminos[j].coords[i][1] < key){
                        tetraminos[j].coords[i][1] += squareDistance;
                    }
                }
            }
        }
    });
}

function downFree(fallingTetramino, squareDistance) {
    let isSpaceFee = true;

    //Check field
    fallingTetramino.coords.forEach(element => {
        if (element[1] + squareDistance + 1 >= field.y + field.height) {
            isSpaceFee = false;
        }

        //Check y for tetraminos
        tetraminos.forEach(tetramino => {
            if (!tetramino.falling) {
                tetramino.coords.forEach(coord => {
                    if (element[1] + squareDistance * 1.5 > coord[1] && 
                        element[1] + squareDistance * 1.5 < coord[1] + squareDistance &&
                        element[0] - squareDistance * 0.2 < coord[0] &&
                        element[0] + squareDistance * 0.2 > coord[0]) {
                        
                        isSpaceFee = false;
                    }
                });
            }
        });
    });

    return isSpaceFee;
}

function rightFree(fallingTetramino, squareDistance) {
    let isRightFree = true;

    fallingTetramino.coords.forEach(element => {
        if (element[0] + squareDistance * 1.5 >= field.x + field.width) {
            isRightFree = false;
        }

        //Check y for tetraminos
        tetraminos.forEach(tetramino => {
            if (!tetramino.falling) {
                tetramino.coords.forEach(coord => {
                    if (element[0] + squareDistance * 1.5 > coord[0] && 
                        element[0] + squareDistance * 1.5 < coord[0] + squareDistance &&
                        element[1] - squareDistance * 0.2 < coord[1] &&
                        element[1] + squareDistance * 0.2 > coord[1]) {
                        
                        isRightFree = false;
                    }
                });
            }
        });
    });
    
    return isRightFree;
}

function leftFree(fallingTetramino, squareDistance) {
    let isLeftFree = true;

    fallingTetramino.coords.forEach(element => {
        if (element[0] - squareDistance * 0.5 <= field.x) {
            isLeftFree = false;
        }

        //Check y for tetraminos
        tetraminos.forEach(tetramino => {
            if (!tetramino.falling) {
                tetramino.coords.forEach(coord => {
                    if (element[0] - squareDistance * 0.5 > coord[0] && 
                        element[0] - squareDistance * 0.5 < coord[0] + squareDistance &&
                        element[1] - squareDistance * 0.2 < coord[1] &&
                        element[1] + squareDistance * 0.2 > coord[1]) {
                        
                        isLeftFree = false;
                    }
                });
            }
        });
    });
    print(isLeftFree);
    return isLeftFree;
}

function rotationRightFree(fallingTetramino, squareDistance) {
    let rotationFree = true;
    let rotatedCoords = fallingTetramino.rotatedCoordsRight();

    rotatedCoords.forEach(element => {
        if (element[0] >= field.x + field.width || 
            element[0] <= field.x ||
            element[1] >= field.y + field.height) {
            rotationFree = false;
        }

        tetraminos.forEach(tetramino => {
            if (!tetramino.falling) {
                tetramino.coords.forEach(coord => {
                    if (element[0] + squareDistance * 0.2 > coord[0] && 
                        element[0] - squareDistance * 0.2 < coord[0] &&
                        element[1] - squareDistance * 0.2 < coord[1] &&
                        element[1] + squareDistance * 0.2 > coord[1]) {
                        
                        rotationFree = false;
                    }
                });
            }
        });
    });

    return rotationFree;
}

function rotationLeftFree(fallingTetramino, squareDistance) {
    let rotationFree = true;
    let rotatedCoords = fallingTetramino.rotatedCoordsLeft();

    rotatedCoords.forEach(element => {
        if (element[0] >= field.x + field.width || 
            element[0] <= field.x ||
            element[1] >= field.y + field.height) {
            rotationFree = false;
        }

        tetraminos.forEach(tetramino => {
            if (!tetramino.falling) {
                tetramino.coords.forEach(coord => {
                    if (element[0] + squareDistance * 0.2 > coord[0] && 
                        element[0] - squareDistance * 0.2 < coord[0] &&
                        element[1] - squareDistance * 0.2 < coord[1] &&
                        element[1] + squareDistance * 0.2 > coord[1]) {
                        
                        rotationFree = false;
                    }
                });
            }
        });
    });

    return rotationFree;
}