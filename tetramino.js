class Tetramino {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.falling = true;
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
        strokeWeight(1)
        stroke(255, 255, 255)
        fill(255, 0, 0)

        this.coords.forEach(element => {
            square(element[0], element[1], squareHeight)
        });
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
    }

    update(squareDistance) {

        this.coords = [
            [this.x, this.y],
            [this.x + squareDistance, this.y],
            [this.x, this.y + squareDistance],
            [this.x - squareDistance, this.y]
        ];
    }

    updatePosition(oldSquareDistance, squareDistance, oldField, field) {

        let xCells = (this.x - (oldField.x + 1)) / oldSquareDistance;
        let yCells = (this.y - (oldField.y + 1)) / oldSquareDistance;

        this.x = (field.x + 1) + (xCells * squareDistance);
        this.y = (field.y + 1) + (yCells * squareDistance);
    }
}
