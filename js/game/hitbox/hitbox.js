class Hitbox {
    furthestPoint(directionVector) {
        throw new Error('You must implement this method');
    }
}

class CircleHitbox extends Hitbox {
    constructor(centerX, centerY, radius) {
        super();
        this.center = createVector(centerX, centerY);
        this.radius = radius;
    }

    furthestPoint(directionVector) {
        let result = p5.Vector.add(this.center, p5.Vector.mult(directionVector, this.radius));
        result.set(round(result.x, 2), round(result.y, 2));
        return result;
    }
}

class RectangleHitbox extends Hitbox {
    constructor(centerX, centerY, width, height, angle) {
        super();
        this.center = createVector(centerX, centerY);
        this.size = {
            width: width,
            height: height,
        };
        this.angle = angle;
        this.corners = [];
        this.getCornersCoordinates();
    }

    getCornersCoordinates() {
        this.corners.push(
            createVector(-this.size.width / 2, -this.size.height / 2),
            createVector(this.size.width / 2, -this.size.height / 2),
            createVector(this.size.width / 2, this.size.height / 2),
            createVector(-this.size.width / 2, this.size.height / 2)
        );
        this.corners.forEach((coordinates) => coordinates.setHeading(coordinates.heading() + this.angle));
        this.corners.forEach((coordinates) => coordinates.add(this.center));
        this.corners.forEach((coordinates) => coordinates.set(round(coordinates.x, 2), round(coordinates.y, 2)));
    }

    furthestPoint(directionVector) {
        let furthestPoint = this.corners[0];
        let dotProduct = round(furthestPoint.dot(directionVector), 2);
        console.log(dotProduct);

        for (let i = 1; i < this.corners.length; i++) {
            let newDot = round(this.corners[i].dot(directionVector), 2);
            console.log(newDot);
            if (newDot > dotProduct) {
                dotProduct = newDot;
                furthestPoint = this.corners[i];
            }
        }
        return furthestPoint;
    }
}
