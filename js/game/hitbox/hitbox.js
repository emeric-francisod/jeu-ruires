class Hitbox {
    constructor(centerX, centerY) {
        this.center = createVector(centerX, centerY);
    }

    furthestPoint(directionVector) {
        throw new Error('You must implement this method');
    }

    support(hitbox, direction) {
        console.log(
            'Calcul des points les plus loins, object courant:',
            this.furthestPoint(direction),
            'et objet testé:',
            hitbox.furthestPoint(p5.Vector.mult(direction, -1))
        );
        return p5.Vector.sub(this.furthestPoint(direction), hitbox.furthestPoint(p5.Vector.mult(direction, -1)));
    }

    lineCase(simplex) {
        console.log('Cas ligne');
        let [pointB, pointA] = simplex;
        let ABVector = p5.Vector.sub(pointB, pointA);
        console.log('Vecteur AB:', ABVector);
        const ORIGIN = createVector(0, 0);
        let AOVector = p5.Vector.sub(ORIGIN, pointA);
        console.log('Vecteur AO:', AOVector);
        let ABOrthogonalVector = tripleProduct(ABVector, AOVector, ABVector).normalize();
        console.log('Vecteur orthogonal à AB:', ABOrthogonalVector);
        return ABOrthogonalVector;
    }

    triangleCase(simplex) {
        console.log('Cas triangle');
        let [pointC, pointB, pointA] = simplex;
        let ABVector = p5.Vector.sub(pointB, pointA);
        console.log('Vecteur AB:', ABVector);
        let ACVector = p5.Vector.sub(pointC, pointA);
        console.log('Vecteur AC:', ACVector);
        const ORIGIN = createVector(0, 0);
        let AOVector = p5.Vector.sub(ORIGIN, pointA);
        console.log('Vecteur AO:', AOVector);

        let ABOrthogonalVector = tripleProduct(ACVector, ABVector, ABVector).normalize();
        console.log('Vecteur orthogonal à AB:', ABOrthogonalVector);
        let ACOrthogonalVector = tripleProduct(ABVector, ACVector, ACVector).normalize();
        console.log('Vecteur orthogonal à AC:', ACOrthogonalVector);
        console.log(
            'Produit vectoriel entre le vecteur orthogonal à AB et le vecteur AO',
            ABOrthogonalVector.dot(AOVector)
        );
        console.log(
            'Produit vectoriel entre le vecteur orthogonal à AC et le vecteur AO',
            ACOrthogonalVector.dot(AOVector)
        );

        if (ABOrthogonalVector.dot(AOVector) > 0) {
            simplex.shift();
            console.log('Le premier point est retiré :', simplex);
            return ABOrthogonalVector;
        }

        if (ACOrthogonalVector.dot(AOVector) > 0) {
            simplex.splice(1, 1);
            console.log('Le second point est retiré:', simplex);
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

    async testCollision(hitbox) {
        console.log('Nouveau test de collision, entre', this, 'et', hitbox);
        let directionVector = p5.Vector.sub(hitbox.center, this.center).normalize();
        console.log('Premier vecteur directeur, rouge:', directionVector);
        drawVector(directionVector, 'red');
        let simplex = [this.support(hitbox, directionVector)];
        console.log('Premier point du simplex, rouge:', simplex[0]);
        drawSimplex(simplex, 'red', 10);
        let ORIGIN = createVector(0, 0);

        directionVector = p5.Vector.sub(ORIGIN, simplex[0]).normalize();
        console.log('Second vecteur directeur:', directionVector);
        drawVector(directionVector, 'green');

        while (true) {
            console.group();
            console.log("Début d'une nouvelle boucle");
            let pointA = this.support(hitbox, directionVector);
            drawPoint(pointA, 'green', 2);
            console.log('Point de support:', pointA);
            console.log(
                "Tester si le point est bien au delà de l'origine, résultat du produit vectoriel:",
                pointA.dot(directionVector)
            );

            if (pointA.dot(directionVector) < 0) {
                console.groupEnd();
                return false;
            }
            simplex.push(pointA);
            console.log('Le point a été ajouté au simplex:', simplex);
            drawSimplex(simplex, 'green', 5);

            console.group();
            directionVector = this.handleSimplex(simplex, directionVector);
            console.groupEnd();
            console.log('Vecteur directeur suivant, après évalutation du nouveau simplex:', directionVector);

            if (directionVector === true) {
                console.groupEnd();
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
        result.set(round(result.x, 2), round(result.y, 2));
        return result;
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

        for (let i = 1; i < this.corners.length; i++) {
            let newDot = round(this.corners[i].dot(directionVector), 2);
            if (newDot > dotProduct) {
                dotProduct = newDot;
                furthestPoint = this.corners[i];
            }
        }
        return furthestPoint;
    }
}
