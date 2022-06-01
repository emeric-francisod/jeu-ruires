class Hitbox {
    constructor(centerX, centerY) {
        this.center = createVector(centerX, centerY);
    }

    furthestPoint(directionVector) {
        throw new Error('You must implement this method');
    }

    support(hitbox, direction) {
        let thisFurthest = this.furthestPoint(direction);
        let otherFurthest = hitbox.furthestPoint(p5.Vector.mult(direction, -1));
        return p5.Vector.sub(this.furthestPoint(direction), hitbox.furthestPoint(p5.Vector.mult(direction, -1)));
    }

    lineCase(simplex) {
        let [pointB, pointA] = simplex;
        let ABVector = p5.Vector.sub(pointB, pointA);
        const ORIGIN = createVector(0, 0);
        let AOVector = p5.Vector.sub(ORIGIN, pointA);
        let ABOrthogonalVector = tripleProduct(ABVector, AOVector, ABVector).normalize();
        return ABOrthogonalVector;
    }

    triangleCase(simplex) {
        let [pointC, pointB, pointA] = simplex;
        let ABVector = p5.Vector.sub(pointB, pointA);
        let ACVector = p5.Vector.sub(pointC, pointA);
        const ORIGIN = createVector(0, 0);
        let AOVector = p5.Vector.sub(ORIGIN, pointA);

        let ABOrthogonalVector = tripleProduct(ACVector, ABVector, ABVector).normalize();
        let ACOrthogonalVector = tripleProduct(ABVector, ACVector, ACVector).normalize();

        if (ABOrthogonalVector.dot(AOVector) > 0) {
            simplex.shift();
            return ABOrthogonalVector;
        }

        if (ACOrthogonalVector.dot(AOVector) > 0) {
            simplex.splice(1, 1);
            return ACOrthogonalVector;
        }

        return true;
    }

    handleSimplex(simplex, directionVector) {
        if (simplex.length === 2) {
            return this.lineCase(simplex, directionVector);
        }

        return this.triangleCase(simplex, directionVector);
    }

    testCollision(hitbox) {
        let directionVector = p5.Vector.sub(hitbox.center, this.center).normalize();

        let simplex = [this.support(hitbox, directionVector)];
        let ORIGIN = createVector(0, 0);

        directionVector = p5.Vector.sub(ORIGIN, simplex[0]).normalize();

        while (true) {
            let pointA = this.support(hitbox, directionVector);

            if (pointA.dot(directionVector) < 0) {
                return false;
            }
            simplex.push(pointA);

            directionVector = this.handleSimplex(simplex, directionVector);

            if (directionVector === true) {
                return true;
            }
        }
    }
}

class CircleHitbox extends Hitbox {
    constructor(centerX, centerY, radius) {
        super(centerX, centerY);
        this.radius = radius;
    }

    furthestPoint(directionVector) {
        let result = p5.Vector.add(this.center, p5.Vector.mult(directionVector, this.radius));
        return result;
    }

    render() {
        stroke('red');
        strokeWeight(2);
        noFill();
        circle(this.center.x, this.center.y, this.radius);
    }
}

class RectangleHitbox extends Hitbox {
    constructor(centerX, centerY, width, height, angle) {
        super(centerX, centerY);
        this.size = {
            width: width,
            height: height,
        };
        this.angle = angle;
        this.corners = [];
        this.getCornersCoordinates();
    }

    render() {
        rectMode(CENTER);
        push();
        translate(this.center.x, this.center.y);
        rotate(-this.angle);
        stroke('red');
        strokeWeight(2);
        noFill();
        rect(0, 0, this.size.width, this.size.height);
        pop();
    }

    setAngle(angle) {
        this.angle = angle;
        this.corners = [];
        this.getCornersCoordinates();
    }

    setPosition(x, y) {
        this.center.set(x, y);
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
    }

    furthestPoint(directionVector) {
        let furthestPoint = this.corners[0];
        let dotProduct = furthestPoint.dot(directionVector);

        for (let i = 1; i < this.corners.length; i++) {
            let newDot = this.corners[i].dot(directionVector);
            if (newDot > dotProduct) {
                dotProduct = newDot;
                furthestPoint = this.corners[i];
            }
        }
        return furthestPoint;
    }
}
