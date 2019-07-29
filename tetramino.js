class Tetramino {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.falling = true;
        this.rotationState = 0;
        this.rotations;
    }

    moveDown(squareDistance) {
        this.rotations.forEach(rotation => {
            rotation.forEach(element => {
                element[1] += squareDistance;   
            });
        });
        //this.y += squareDistance;
    }

    moveRight(squareDistance) {
        this.rotations.forEach(rotation => {
            rotation.forEach(element => {
                element[0] += squareDistance;   
            });
        });
        //this.x += squareDistance;
    }

    moveLeft(squareDistance) {
        this.rotations.forEach(rotation => {
            rotation.forEach(element => {
                element[0] -= squareDistance;   
            });
        });
        //this.x -= squareDistance;
    }

    draw(squareHeight, field) {
        strokeWeight(0);
        //stroke(255, 255, 255)
        this.color();

        this.coords.forEach(element => {
            if (element[1] > field.y) {
                square(element[0], element[1], squareHeight);
            }
        });
    }

    updatePosition(oldSquareDistance, squareDistance, oldField, field) {

        this.coords.forEach(element => {
            let xCells = (element[0] - (oldField.x + 1)) / oldSquareDistance;
            let yCells = (element[1] - (oldField.y + 1)) / oldSquareDistance;
            
            element[0] = (field.x + 1) + (xCells * squareDistance);
            element[1] = (field.y + 1) + (yCells * squareDistance);
        }); 
    }

    rotationRight() {
        if (this.rotationState >= 3) {
            this.rotationState = 0
        } else {
            this.rotationState += 1;
        }
        this.coords = this.rotations[this.rotationState];
    }
    rotationLeft() {
        if (this.rotationState <= 0) {
            this.rotationState = 3
        } else {
            this.rotationState -= 1;
        }
        this.coords = this.rotations[this.rotationState];
    }
    rotatedCoordsRight() {
        this.rotationRight();
        let coordsRight = this.rotations[this.rotationState];
        this.rotationLeft();
        return coordsRight;
    }
    rotatedCoordsLeft() {
        this.rotationLeft();
        let coordsLeft = this.rotations[this.rotationState];
        this.rotationRight();
        return coordsLeft;
    }
}

class TTetramino extends Tetramino {
    constructor(x, y, squareDistance) {
        super(x, y);

        this.rotations = [
            [
                [this.x, this.y],
                [this.x + squareDistance, this.y],
                [this.x, this.y + squareDistance],
                [this.x - squareDistance, this.y]
            ],
            [
                [this.x, this.y],
                [this.x, this.y - squareDistance],
                [this.x, this.y + squareDistance],
                [this.x - squareDistance, this.y]
            ],
            [
                [this.x, this.y],
                [this.x, this.y - squareDistance],
                [this.x + squareDistance, this.y],
                [this.x - squareDistance, this.y]
            ],
            [
                [this.x, this.y],
                [this.x, this.y - squareDistance],
                [this.x + squareDistance, this.y],
                [this.x, this.y + squareDistance]
            ]
        ];

        this.coords = this.rotations[this.rotationState];
    }

    color() { 
        return fill(204,34,0);
    }
}

class OTetramino extends Tetramino {
    constructor(x, y, squareDistance) {
        super(x, y);

        this.rotations = [
            [
                [this.x, this.y],
                [this.x, this.y + squareDistance],
                [this.x - squareDistance, this.y + squareDistance],
                [this.x - squareDistance, this.y]
            ],
            [
                [this.x, this.y],
                [this.x, this.y + squareDistance],
                [this.x - squareDistance, this.y + squareDistance],
                [this.x - squareDistance, this.y]
            ],
            [
                [this.x, this.y],
                [this.x, this.y + squareDistance],
                [this.x - squareDistance, this.y + squareDistance],
                [this.x - squareDistance, this.y]
            ],
            [
                [this.x, this.y],
                [this.x, this.y + squareDistance],
                [this.x - squareDistance, this.y + squareDistance],
                [this.x - squareDistance, this.y]
            ]
        ];

        
        this.coords = this.rotations[this.rotationState];
    }

    color() { 
        return fill(0, 128, 128);
    }
}

class JTetramino extends Tetramino {
    constructor(x, y, squareDistance) {
        super(x, y);

        this.rotations = [
            [
                [this.x, this.y],
                [this.x + squareDistance, this.y],
                [this.x + squareDistance, this.y + squareDistance],
                [this.x - squareDistance, this.y]
            ],
            [
                [this.x, this.y],
                [this.x, this.y - squareDistance],
                [this.x, this.y + squareDistance],
                [this.x - squareDistance, this.y + squareDistance]
            ],
            [
                [this.x, this.y],
                [this.x + squareDistance, this.y],
                [this.x - squareDistance, this.y],
                [this.x - squareDistance, this.y - squareDistance]
            ],
            [
                [this.x, this.y],
                [this.x, this.y - squareDistance],
                [this.x + squareDistance, this.y - squareDistance],
                [this.x, this.y + squareDistance]
            ]
        ];

        this.coords = this.rotations[this.rotationState];
    }

    color() { 
        return fill(255,187,51);
    }
}

class LTetramino extends Tetramino {
    constructor(x, y, squareDistance) {
        super(x, y);

        this.rotations = [
            [
                [this.x, this.y],
                [this.x + squareDistance, this.y],
                [this.x - squareDistance, this.y + squareDistance],
                [this.x - squareDistance, this.y]
            ],
            [
                [this.x, this.y],
                [this.x, this.y - squareDistance],
                [this.x, this.y + squareDistance],
                [this.x - squareDistance, this.y - squareDistance]
            ],
            [
                [this.x, this.y],
                [this.x + squareDistance, this.y - squareDistance],
                [this.x + squareDistance, this.y],
                [this.x - squareDistance, this.y]
            ],
            [
                [this.x, this.y],
                [this.x, this.y - squareDistance],
                [this.x + squareDistance, this.y + squareDistance],
                [this.x, this.y + squareDistance]
            ]
        ];

        this.coords = this.rotations[this.rotationState];
    }

    color() { 
        return fill(51, 0, 77);
    }
}

class ZTetramino extends Tetramino {
    constructor(x, y, squareDistance) {
        super(x, y);

        this.rotations = [
            [
                [this.x, this.y],
                [this.x + squareDistance, this.y + squareDistance],
                [this.x, this.y + squareDistance],
                [this.x - squareDistance, this.y]
            ],
            [
                [this.x, this.y],
                [this.x + squareDistance, this.y - squareDistance],
                [this.x + squareDistance, this.y],
                [this.x, this.y + squareDistance]
            ],
            [
                [this.x, this.y],
                [this.x + squareDistance, this.y + squareDistance],
                [this.x, this.y + squareDistance],
                [this.x - squareDistance, this.y]
            ],
            [
                [this.x, this.y],
                [this.x + squareDistance, this.y - squareDistance],
                [this.x + squareDistance, this.y],
                [this.x, this.y + squareDistance]
            ]
        ];

        this.coords = this.rotations[this.rotationState];
    }

    color() { 
        return fill(153,255,170);
    }
}

class STetramino extends Tetramino {
    constructor(x, y, squareDistance) {
        super(x, y);

        this.rotations = [
            [
                [this.x, this.y],
                [this.x + squareDistance, this.y],
                [this.x, this.y + squareDistance],
                [this.x - squareDistance, this.y + squareDistance]
            ],
            [
                [this.x, this.y],
                [this.x, this.y - squareDistance],
                [this.x + squareDistance, this.y],
                [this.x + squareDistance, this.y + squareDistance]
            ],
            [
                [this.x, this.y],
                [this.x + squareDistance, this.y],
                [this.x, this.y + squareDistance],
                [this.x - squareDistance, this.y + squareDistance]
            ],
            [
                [this.x, this.y],
                [this.x, this.y - squareDistance],
                [this.x + squareDistance, this.y],
                [this.x + squareDistance, this.y + squareDistance]
            ]
        ];

        this.coords = this.rotations[this.rotationState];
    }

    color() { 
        return fill(77,166,255);
    }
}

class ITetramino extends Tetramino {
    constructor(x, y, squareDistance) {
        super(x, y);

        this.rotations = [
            [
                [this.x, this.y],
                [this.x + squareDistance, this.y],
                [this.x - squareDistance, this.y],
                [this.x - squareDistance - squareDistance, this.y]
            ],
            [
                [this.x, this.y],
                [this.x, this.y - squareDistance],
                [this.x, this.y - squareDistance - squareDistance],
                [this.x, this.y + squareDistance]
            ],
            [
                [this.x, this.y],
                [this.x + squareDistance, this.y],
                [this.x - squareDistance, this.y],
                [this.x - squareDistance - squareDistance, this.y]
            ],
            [
                [this.x, this.y],
                [this.x, this.y - squareDistance],
                [this.x, this.y - squareDistance - squareDistance],
                [this.x, this.y + squareDistance]
            ]
        ];

        this.coords = this.rotations[this.rotationState];
    }

    color() { 
        return fill(255,179,230);
    }
}