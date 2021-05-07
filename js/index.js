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

function Euler(f, a, b, y0, N) {
    let h = (b - a) / N;
    let X = []
    let Y = [y0]

    for (let i = 0; i < N; i++) {
        X.push(a + h * i);
        Y.push(Y[Y.length - 1] + h * f(X[X.length - 1], Y[Y.length - 1]))
    }

    return [X, Y];
}

function Runge_Kutta2(f, a, b, y0, N) {
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

function Runge_Kutta3(f, a, b, y0, N) {
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

function Runge_Kutta4(f, a, b, y0, N) {
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

// function test(x) {
//     return 1 + x / 3;
// }

// function test1(x) {
//     return 1 / Math.log(x);
// }

// function test2(x, y) {
//     return x * x - 2 * y;
// }

// window.addEventListener('DOMContentLoaded', (event) => {
//     console.log("leftRect", leftRect(test, 2, 5, 128))
//     console.log("rightRect", rightRect(test, 2, 5, 128))
//     console.log("middleRect", middleRect(test, 2, 5, 128))
//     console.log("trapezoidal", trapezoidal(test, 2, 5, 128))
//     console.log("parabolic", parabolic(test, 2, 5, 128))

//     console.log("Euler", Euler(test2, 0, 1, 1, 10))
//     console.log("Runge_Kutta2", Runge_Kutta2(test2, 0, 1, 1, 10))
//     console.log("Runge_Kutta3", Runge_Kutta3(test2, 0, 1, 1, 10))
//     console.log("Runge_Kutta4", Runge_Kutta4(test2, 0, 1, 1, 10))
// });

let integralFunctions = [function(x) {return 1 + x / 3;}, function(x) {return 1 / Math.log(x);}, function(x) {return Math.sin(x)}, function(x) {return Math.exp(-(x*x))}]
let integralMethods = [leftRect, rightRect, middleRect, trapezoidal, parabolic]

function solveI(){
    if (document.getElementById('i_a').value && document.getElementById('i_a').value != "" && document.getElementById('i_b').value && document.getElementById('i_b').value != "" && document.getElementById('i_N').value && document.getElementById('i_N').value != "") {
        let a = parseFloat(document.getElementById('i_a').value);
        let b = parseFloat(document.getElementById('i_b').value);
        let N = parseInt(document.getElementById('i_N').value);
        if (a > b) {
            alert("b must be biger than a!");
            return;
        }
        let method = parseInt(document.getElementById('i_m').value - 1);
        let func = parseInt(document.getElementById('i_f').value - 1);
        let answ = document.createElement('p');
        answ.innerHTML= "Integral value using selected method: <b>" + integralMethods[method](integralFunctions[func], a, b, N).toFixed(5) + "</b>";
        document.getElementById('i_results').appendChild(answ);

        for (let i = 0; i < 5; i++) {
            let data = document.createElement('td');
            data.innerText = integralMethods[i](integralFunctions[func], a, b, N).toFixed(5)
            document.getElementById('i_vals').appendChild(data);
        }

        document.getElementById('i_results').classList.remove("hidden")
    } else {
        alert("Input all fields!")
    }
}


let diffEqFunctions = [function(x, y) {return -x * y;}, function(x, y) {return y + x;}, function(x, y) {return (3 * x - 12 * x * x) * y}, function(x, y) {return x * x - 2 * y}]
let diffEqlMethods = [Euler, Runge_Kutta2, Runge_Kutta3, Runge_Kutta4]

function solveDE() {
    if (document.getElementById('d_a').value && document.getElementById('d_a').value != "" && document.getElementById('d_b').value && document.getElementById('d_b').value != "" && document.getElementById('d_N').value && document.getElementById('d_N').value != "" && document.getElementById('d_y0').value && document.getElementById('d_y0').value != "") {
        let a = parseFloat(document.getElementById('d_a').value);
        let b = parseFloat(document.getElementById('d_b').value);
        let N = parseInt(document.getElementById('d_N').value);
        let y0 = parseInt(document.getElementById('d_y0').value);

        if (a > b) {
            alert("b must be biger than a!");
            return;
        }
        let method = parseInt(document.getElementById('d_m').value - 1);
        let func = parseInt(document.getElementById('d_f').value - 1);

        let result = diffEqlMethods[method](diffEqFunctions[func], a, b, y0, N);
        let x = result[0];
        let y = result[1]
        console.log(result);

        let chart = new Chart(document.getElementById('chart').getContext('2d'), {
            type: 'line',
            responsive:false,
            maintainAspectRatio: false,
            data: {
                labels: x,
                datasets: [{
                    backgroundColor: 'rgb(37, 238, 245)',
                    borderColor: 'rgb(0, 0, 0)',
                    data: y
                }]
            }
        })
    } else {
        alert("Input all fields!")
    }
}

function mode(id) {
    document.getElementById('container').innerHTML = "";
    switch (id) {
        case 1:
            document.getElementById('integral').classList.remove("hidden")
            break;
        case 2:
            document.getElementById('diffeq').classList.remove("hidden")
            break;
        default:
            break;
    }
}
