//TODO - Your ES6 JavaScript code (if any) goes here
import "bootstrap"
let x = 0
let y = 0
const maxX = 30
const maxY = 15
const shapeSize = 10
const colorData = []
const shapeData = []
const canvas = document.getElementById("draw");
const ctx = canvas.getContext("2d");

function setup() {
    /*const can = document.getElementById("scenel");
    const ct = can.getContext("2d");
    ct.fillStyle = "#804000";
    ct.fillRect(100,50,100,100)
    ct.fillStyle = "#008000";
    ct.beginPath()
    ct.arc(100, 40, 50, 0, Math.PI * 2, true)
    ct.fill()
    ct.beginPath()
    ct.arc(200, 20, 50, 0, Math.PI * 2, true)
    ct.fill()
    ct.beginPath()
    ct.arc(150, 10, 50, 0, Math.PI * 2, true)
    ct.fill()
    const cn = document.getElementById("scener");
    const cx = cn.getContext("2d");
    cx.fillStyle = "#ffff00"
    cx.beginPath()
    cx.arc(250, 0, 75, 0, Math.PI * 2, true)
    cx.fill()
    cx.fillStyle = "#008000";
    cx.beginPath()
    cx.arc(50, 200, 100, 0, Math.PI * 2, true)
    cx.fill()*/
    for (let i = 0; i < maxX; i++) {
        for (let j = 0; j < maxY; j++) {
            colorData[j + (i * maxY)] = "b"
            shapeData[j + (i * maxY)] = 0
            brickTile(i, j)
        }
    }
    onHideChange()
}

function brickTile(a, b) {
    ctx.fillStyle = document.querySelector('[id="background"]').value
    ctx.fillRect((a*shapeSize), (b*shapeSize), shapeSize, shapeSize);
    ctx.fillStyle = "#000000";
    ctx.fillRect((a*shapeSize), (b*shapeSize)+2, shapeSize, 1);
    ctx.fillRect((a*shapeSize), (b*shapeSize)+7, shapeSize, 1);
    ctx.fillRect((a*shapeSize)+2, (b*shapeSize), 1, 2);
    ctx.fillRect((a*shapeSize)+2, (b*shapeSize)+8, 1, 2);
    ctx.fillRect((a*shapeSize)+7, (b*shapeSize)+3, 1, 4);
}

function fill(shapeId, color, a, b) {
    brickTile(a, b)
    ctx.fillStyle = color
    switch(shapeId) {
        case "1":
            ctx.beginPath()
            ctx.arc((a*shapeSize)+5, (b*shapeSize)+5, 5, 0, Math.PI * 2, true)
            ctx.fill()
            break;
        case "2":
            ctx.beginPath()
            ctx.moveTo((a*shapeSize), (b*shapeSize)+5)
            ctx.lineTo((a*shapeSize)+5, (b*shapeSize))
            ctx.lineTo((a*shapeSize)+10, (b*shapeSize)+5)
            ctx.lineTo((a*shapeSize)+5, (b*shapeSize)+10)
            ctx.fill()
            break;
    }
}

function keyPressed(key) {
    if (key.keyCode >= 37 && key.keyCode <= 40) {
        ctx.fillStyle = colorData[y + (x * maxY)]
        if (colorData[y + (x * maxY)] == "b") {
            ctx.fillStyle = document.querySelector('[id="background"]').value
        }
        ctx.fillRect((x*shapeSize)+shapeSize * 0.3, (y*shapeSize)+shapeSize * 0.3, shapeSize * 0.4, shapeSize * 0.4);
        switch(key.keyCode) {
            case 37:
                if (x > 0) {
                    x -= 1
                }
                break;
            case 38:
                if (y > 0) {
                    y -= 1
                }
                break;
            case 39:
                if (x < maxX - 1) {
                    x += 1
                }
                break;
            case 40:
                if (y < maxY - 1) {
                    y += 1
                }
                break;
        }
        if (document.querySelector('[id="hide"]').checked == false) {
            if (document.querySelector('[id="paint"]').value == colorData[y + (x * maxY)]) {
                ctx.fillStyle = document.querySelector('[id="background"]').value
                ctx.fillRect((x*shapeSize)+shapeSize * 0.3, (y*shapeSize)+shapeSize * 0.3, shapeSize * 0.4, shapeSize * 0.4);
                ctx.fillStyle = document.querySelector('[id="paint"]').value
                ctx.fillRect((x*shapeSize)+shapeSize * 0.4, (y*shapeSize)+shapeSize * 0.4, shapeSize * 0.2, shapeSize * 0.2);
            }
            else {
                ctx.fillStyle = document.querySelector('[id="paint"]').value
                ctx.fillRect((x*shapeSize)+shapeSize * 0.3, (y*shapeSize)+shapeSize * 0.3, shapeSize * 0.4, shapeSize * 0.4);
            }
        }
    }
    else if (key.keyCode == 13) {
        if (document.querySelector('[id="eraser"]').checked == true) {
            colorData[y + (x * maxY)] = "b"
            shapeData[y + (x * maxY)] = "0"
            fill("0", "0", x, y)
        }
        else {
            colorData[y + (x * maxY)] = document.querySelector('[id="paint"]').value
            shapeData[y + (x * maxY)] = document.querySelector('[id="shape"]').value
            fill(document.querySelector('[id="shape"]').value, document.querySelector('[id="paint"]').value, x, y)
        }
    }
}

function fillRow() {
    for (let i = 0; i < maxX; i++) {
        colorData[y + (i * maxY)] = document.querySelector('[id="paint"]').value
        shapeData[y + (i * maxY)] = document.querySelector('[id="shape"]').value
        fill(document.querySelector('[id="shape"]').value, colorData[y + (i * maxY)], i, y)
    }
}

function fillCol() {
    for (let i = 0; i < maxY; i++) {
        colorData[i + (x * maxY)] = document.querySelector('[id="paint"]').value
        shapeData[i + (x * maxY)] = document.querySelector('[id="shape"]').value
        fill(document.querySelector('[id="shape"]').value, colorData[i + (x * maxY)], x, i)
    }
}

function backgroundChange() {
    for (let i = 0; i < maxX; i++) {
        for (let j = 0; j < maxY; j++) {
            fill(shapeData[j + (i * maxY)], colorData[j + (i * maxY)], i, j)
        }
    }
}

function onHideChange() {
    if (document.querySelector('[id="hide"]').checked == false) {
        if (document.querySelector('[id="paint"]').value == colorData[y + (x * maxY)]) {
            ctx.fillStyle = document.querySelector('[id="background"]').value
            ctx.fillRect((x*shapeSize)+shapeSize * 0.3, (y*shapeSize)+shapeSize * 0.3, shapeSize * 0.4, shapeSize * 0.4);
            ctx.fillStyle = document.querySelector('[id="paint"]').value
            ctx.fillRect((x*shapeSize)+shapeSize * 0.4, (y*shapeSize)+shapeSize * 0.4, shapeSize * 0.2, shapeSize * 0.2);
        }
        else {
            ctx.fillStyle = document.querySelector('[id="paint"]').value
            ctx.fillRect((x*shapeSize)+shapeSize * 0.3, (y*shapeSize)+shapeSize * 0.3, shapeSize * 0.4, shapeSize * 0.4);
        }
    }
    else {
        ctx.fillStyle = colorData[y + (x * maxY)]
        if (colorData[y + (x * maxY)] == "b") {
            ctx.fillStyle = document.querySelector('[id="background"]').value
        }
        ctx.fillRect((x*shapeSize)+shapeSize * 0.3, (y*shapeSize)+shapeSize * 0.3, shapeSize * 0.4, shapeSize * 0.4);
    }
}

document.querySelector('[id="background"]').onchange = backgroundChange
document.querySelector('[id="hide"]').onchange = onHideChange
document.body.onload = setup
document.onkeydown = keyPressed;
document.querySelector('[id="reset"]').onclick = setup
document.querySelector('[id="row"]').onclick = fillRow
document.querySelector('[id="col"]').onclick = fillCol