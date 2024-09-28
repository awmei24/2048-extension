var board; 
var score;

// setup
window.onload = function() {
    startGame();
}

function startGame() {
    board = [ 
        [2,2,0,2], 
        [0,0,0,0], 
        [0,0,0,0], 
        [0,0,0,0], 
    ]

    // create tile with id 'rc' for each tile at start
    for (let r=0; r<4; r++) {
        for (let c=0; c<4; c++) {
            let tile = document.createElement("div"); 

            tile.id = r.toString() + c.toString();      // tile.id = 'rc'

            // update tile value
            let val = board[r][c]; 
            updateTile(tile, val)

            document.getElementById("board").append(tile)
        }
    }
}

function updateTile(tile, val) {

    // reset tile
    tile.innerText = "";        // clear tile text
    tile.classList.value = "tile"       // clear extra tile classes (t2, t4, etc.)

    if (val > 0) {
        tile.innerText = val.toString();
        
        if (val < 2048) {
            tile.classList.add("t" + val.toString());
        }
        else {
            tile.classList.add("t2048");
        }
    }
}

// gameplay
document.addEventListener("keyup", (ev) => {
    if (ev.code == "ArrowUp") {
        slideUp();
    } else if (ev.code == "ArrowDown") {
        slideDown();
    } else if (ev.code == "ArrowLeft") {
        slideLeft();
    } else if (ev.code == "ArrowRight") {
        slideRight();
    } else {
        return
    }
})



function slide(row) {
    // remove zeroes
    row = row.filter((elt) => elt != 0);

    // slide
    for (let r=(row.length-1); r>0; r--) {
        if (row[r] == row[r+1]) {
            row[r] *= 2;
            row[r+1] = 0;

            score += row[r];
        };
    };

    // remove zeroes
    row = row.filter((elt) => elt != 0);

    // reinsert zeroes
    while (row.length < 4) {
        row.unshift(0);
    };
    return row;
};


function slideUp() {
    // edgy code
}

function slideDown() {
    // edgy code
}

function slideLeft() {
    // edgy code
}

function slideRight() {
    // for each row, slide
    for (let r=0; r<4; r++) {
        row = board[r];
        row = slide(row);
        board[r] = row;
        
        // update tiles
        for (let c=0; c<4; c++) {
            tile = document.getElementById(r.toString() + c.toString());
            newVal = board[r][c];
            updateTile(tile, newVal);
        };
    };
};

