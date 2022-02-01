var DEBUG = true;
var collection = document.getElementsByClassName("cell");
var buttonList = document.getElementsByClassName("put-btn");
var debugCollection = document.getElementsByClassName("debug");
var alreadyClicked = document.getElementById("alreadyClicked");
var player = document.getElementById("player");


var turn = -1;

function newTurn(){
    turn ++;
    document.getElementById("turn").innerText = whoseTurn() + 1;
}

function whoseTurn(){
    return turn % 2;
}

var matrice = [ [], [], [], [], [], []];
var valori = [ [], [], [], [], [], []];

function initializeObjectmatrice(){
    var k = 0;
    for(var i = 0; i < 6; ++i){
        for(var j = 0; j < 7; ++j){
            matrice[i][j] = collection[k];
            k++;
        }
    }
    if(DEBUG){console.log(matrice)}
}

function getValuematrice(){
    for(var i = 0; i < 6; ++i){
        for(var j = 0; j < 7; ++j){
            valori[i][j] = matrice[i][j].getAttribute("played");
        }
    }
    return valori;
}

// GESTIONE COLONNE
function nextCell(column){ // todo
    if(DEBUG){
        console.log("Colonna: (nextCell())")
        console.log(column)
    }

    for(var i = 0; i < column.length-1; ++i){
        if(column[i+1] in [1, 2]){
            if(DEBUG){console.log("La prima cella Ã¨" + i)}
            if(column[i] != -1){
                return undefined;
            }
            return i;
        }
    }
    return 5;
}

function getmatriceColumn(column, matrice){
    var col = []
    for(var i = 0; i < 6; ++i){
        col[i] = matrice[i][column]
    }
    return col;
}

function insert(row, col){
    getValuematrice()[row][col] = whoseTurn();
    if(DEBUG){
        console.log("\nGetValuematrice (placed in insert()): ")
        console.log(getValuematrice())
    }
    matrice[row][col].setAttribute("played", whoseTurn());
    if(whoseTurn() == 0){
        matrice[row][col].classList.add("bg-danger");
        matrice[row][col].classList.remove("bg-warning");
    } else {
        matrice[row][col].classList.add("bg-warning");
        matrice[row][col].classList.remove("bg-danger");
    }
}

function put(){
    var col = event.target.getAttribute("data");
    var row = nextCell(getmatriceColumn(col, getValuematrice()))

    if (row != undefined){
        newTurn();
        insert(row, col)
        hideMessage(alreadyClicked)
    }
    else {
        showMessage(alreadyClicked)
    }


    if(DEBUG){
        var col = event.target.getAttribute("data");
        console.log("Row: " + row);
        console.log("Column: " + col)
        console.log("Column Array: " + getmatriceColumn(col, getValuematrice()))
        console.log("valori matrice:" );
        console.log(getValuematrice())
    }

    if(check()){
        endgame();
    }
}

function showMessage(obj){
    obj.classList.remove("d-none")
}

function hideMessage(obj){
    obj.classList.add("d-none")
}

// ONLOAD
window.onload = function(){
    newTurn();
    hideMessage(alreadyClicked);
    hideMessage(winMessage);

    if(DEBUG){
        for(var i = 0; i < debugCollection.length; ++i){
            debugCollection[i].classList.remove("d-none");
        }
    }

    var father = document.getElementById("container");
    var w = 0;

    var buttonRow = document.createElement("div");
    buttonRow.classList.add("row");

    for(var i = 0; i < 7; ++i){
        var button = document.createElement("button");
        button.innerHTML = "Put";
        button.classList.add("btn", "btn-primary", "put-btn");
        button.onclick = put;
        button.setAttribute("data", i)
        var cell = document.createElement("div"); 
        cell.classList.add("col-1")
        cell.appendChild(button);
        buttonRow.appendChild(cell);
    }
    buttonRow.classList.add("button-collection");
    
    father.appendChild(buttonRow);

    for(var i = 0; i < 6; ++i){
        var row = document.createElement("div");
        row.classList.add("row");


        for(var j = 0; j < 7; ++j){
            var cell = document.createElement("div");
            cell.classList.add("cell", "col-1")
            cell.setAttribute("played", -1)
            row.appendChild(cell)
            w++;
        }
        father.appendChild(row);
    }

    initializeObjectmatrice();
}