class Tetramino {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.falling = true;
        this.rotationState = 0;
        this.rotations;
    }

    moveDown(gridSize) {
        this.y += gridSize;
    }

    moveRight(gridSize) {
        this.x += gridSize;
    }

    moveLeft(gridSize) {
        this.x -= gridSize;
    }

    draw(squareHeight, field) {
        strokeWeight(0)
        //stroke(255, 255, 255)
        fill(255, 0, 0)

        this.coords.forEach(element => {
            if (element[0] > field.x && element[1] > field.y) {
                square(element[0], element[1], squareHeight)
            }
        });
    }

    updatePosition(oldSquareDistance, squareDistance, oldField, field) {

        let xCells = (this.x - (oldField.x + 1)) / oldSquareDistance;
        let yCells = (this.y - (oldField.y + 1)) / oldSquareDistance;

        this.x = (field.x + 1) + (xCells * squareDistance);
        this.y = (field.y + 1) + (yCells * squareDistance);
    }

    rotationRight() {
        if (this.rotationState >= 3) {
            this.rotationState = 0
        } else {
            this.rotationState += 1;
        }
    }
    rotationLeft() {
        if (this.rotationState <= 0) {
            this.rotationState = 3
        } else {
            this.rotationState -= 1;
        }
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

        this.update(squareDistance);
    }

    update(squareDistance) {
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
}
