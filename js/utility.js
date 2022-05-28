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
