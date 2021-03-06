function randomNormal(min = 0, max = 1, skew = 1) {
    let u = 0;
    let v = 0;
    let num;

    while (u === 0) {
        u = random();
    }

    while (v === 0) {
        v = random();
    }

    num = sqrt(-2 * log(u)) * cos(TWO_PI * v);
    num = num / 10.0 + 0.5;

    if (num > 1 || num < 0) {
        num = randn_bm(min, max, skew);
    } else {
        num = Math.pow(num, skew);
        num *= max - min;
        num += min;
    }

    return num;
}

tripleProduct = function (v1, v2, v3) {
    return p5.Vector.cross(p5.Vector.cross(v1, v2), v3);
};

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

function circleCollision({ c1x, c1y, r1 }, { c2x, c2y, r2 }) {
    let distance = sqrt(sq(c1x - c2x) + sq(c1y - c2y));
    let minimumDistance = r1 + r2;
    return distance <= minimumDistance;
}
