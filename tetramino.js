class Tetramino {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.falling = true;
        this.rotationState = 0;
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

    draw(squareHeight) {
        strokeWeight(0)
        //stroke(255, 255, 255)
        fill(255, 0, 0)

        this.coords.forEach(element => {
            square(element[0], element[1], squareHeight)
        });
    }

    updatePosition(oldSquareDistance, squareDistance, oldField, field) {

        let xCells = (this.x - (oldField.x + 1)) / oldSquareDistance;
        let yCells = (this.y - (oldField.y + 1)) / oldSquareDistance;

        this.x = (field.x + 1) + (xCells * squareDistance);
        this.y = (field.y + 1) + (yCells * squareDistance);
    }

    rotation() {
        if (this.rotationState >= 3) {
            this.rotationState = 0
        } else {
            this.rotationState += 1;
        }
    }
}

class TTetramino extends Tetramino {
    constructor(x, y, squareDistance) {
        super(x, y);

        this.coords = [
            [this.x, this.y],
            [this.x + squareDistance, this.y],
            [this.x, this.y + squareDistance],
            [this.x - squareDistance, this.y]
        ];

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
