function cpy(obj) {
    return JSON.parse(JSON.stringify(obj))
}

function leftRect(f, a, b, N) {
    let h = (b - a) / N;
    let I = 0;

    for (let i = 0; i < N; i++) {
        I += f(a + i * h);
    }

    return I * h;
}

function rightRect(f, a, b, N) {
    let h = (b - a) / N;
    let I = 0;

    for (let i = 1; i <= N; i++) {
        I += f(a + i * h);
    }

    return I * h;
}

function middleRect(f, a, b, N) {
    let h = (b - a) / N;
    let I = 0;

    for (let i = 0; i < N; i++) {
        I += f(a + i * h + h/2);
    }

    return I * h;
}

function trapezoidal(f, a, b, N) {
    let h = (b - a) / N;
    let I = 0;

    for (let i = 1; i <= N; i++) {
        I += f(a + i * h);
    }

    return h * ((f(a) + f(b)/ 2)) + I * h;
}


function parabolic(f, a, b, N) {
    let h = (b - a) / (2 * N);

    let I1 = 0;
    for (let i = 1; i <= N; i++) {
        I1 += f(a + 2 * h * i - h)
    }

    let I2 = 0;
    for (let i = 1; i < N; i++) {
        I2 += f(a + 2 * h * i)
    }

    return (h / 3) * (f(a) + f(b) + 4 * I1 + 2 * I2)
}

function euler(f, a, b, y0, N) {
    let h = (b - a) / N;
    let X = []
    let Y = [y0]

    for (let i = 0; i < N; i++) {
        X.push(a + h * i);
        Y.push(Y[Y.length - 1] + h * f(X[X.length - 1], Y[Y.length - 1]))
    }

    return [X, Y];
}

function runge2(f, a, b, y0, N) {
    let h = (b - a) / N;
    let X = []
    let Y = [y0]

    for (let i = 0; i < N; i++) {
        let k1 = f(a + h * i, Y[Y.length - 1]);
        let k2 = f(a + h * i + h / 2, Y[Y.length - 1] + (h / 2) * k1);

        X.push(a + h * i);
        Y.push(Y[Y.length - 1] + (h/6) * (k1 + 2 * k2))
    }

    return [X, Y];
}

function runge3(f, a, b, y0, N) {
    let h = (b - a) / N;
    let X = []
    let Y = [y0]

    for (let i = 0; i < N; i++) {
        let k1 = f(a + h * i, Y[Y.length - 1]);
        let k2 = f(a + h * i + h / 2, Y[Y.length - 1] + (h / 2) * k1);
        let k3 = f(a + h * i + h / 2, Y[Y.length - 1] + (h / 2) * k2);

        X.push(a + h * i);
        Y.push(Y[Y.length - 1] + (h/6) * (k1 + 2 * k2 + 2 * k3))
    }

    return [X, Y];
}

function runge4(f, a, b, y0, N) {
    let h = (b - a) / N;
    let X = []
    let Y = [y0]

    for (let i = 0; i < N; i++) {
        let k1 = f(a + h * i, Y[Y.length - 1]);
        let k2 = f(a + h * i + h / 2, Y[Y.length - 1] + (h / 2) * k1);
        let k3 = f(a + h * i + h / 2, Y[Y.length - 1] + (h / 2) * k2);
        let k4 = f(a + h * i + h, Y[Y.length - 1] + h * k3);

        X.push(a + h * i);
        Y.push(Y[Y.length - 1] + (h/6) * (k1 + 2 * k2 + 2 * k3 + k4))
    }

    return [X, Y];
}

function test(x) {
    return 1 + x / 3;
}

function test1(x) {
    return 1 / Math.log(x);
}

function test2(x, y) {
    return x * x - 2 * y;
}

window.addEventListener('DOMContentLoaded', (event) => {
    console.log("leftRect", leftRect(test1, 2, 5, 128))
    console.log("rightRect", rightRect(test1, 2, 5, 128))
    console.log("middleRect", middleRect(test1, 2, 5, 128))
    console.log("trapezoidal", trapezoidal(test1, 2, 5, 128))
    console.log("parabolic", parabolic(test1, 2, 5, 128))

    console.log("euler", euler(test2, 0, 1, 1, 10))
    console.log("runge2", runge2(test2, 0, 1, 1, 10))
    console.log("runge3", runge3(test2, 0, 1, 1, 10))
    console.log("runge4", runge4(test2, 0, 1, 1, 10))
});

function mode(id) {
    document.getElementById('container').innerHTML = "";

    switch (id) {
        case 1:
            let header = document.createElement('h1');
            header.innerText = "Integral";

            document.getElementById('container').appendChild(header);
            break;
        case 2:
            let header = document.createElement('h1');
            header.innerText = "Differential equation";

            document.getElementById('container').appendChild(header);
            break;
        default:
            break;
    }
}
