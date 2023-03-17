document.getElementById("result").value = "";

function clearScreen() {
    document.getElementById("result").value = "";
}
function deleteValue() {
    document.getElementById("result").value = document.getElementById("result").value.slice(0, -1);
}

function display(value) {
    document.getElementById("result").value += value;
}
function calculate() {
    const p = document.getElementById("result").value;
    document.getElementById("result").value = eval(p);
}

