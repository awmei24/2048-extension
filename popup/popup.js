var board; 
var score;

// setup
window.onload = function() {
    startGame();
}

function startGame() {
    board = [ 
        [0,0,0,0], 
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
    randTwo(); 
    randTwo();
}

function hasEmptyTile() {
    for (let r=0; r<4; r++) {
        for (let c=0; c<4; c++) {
            if (board[r][c] == 0){
                return true; 
            }
        }
    }
    return false;
}

function randTwo() {
    if (!hasEmptyTile()) {
        return;
    }

    // is needed?
    needNew = true; 
    
    let randRow = Math.floor(Math.random() * 4);
    let randCol = Math.floor(Math.random() * 4);

    let randFour = Math.random()

    // if not another number
    while (needNew) {
        if (board[randRow][randCol] == 0) {
            val = 2; 

            if (randFour < 0.05) {
                val = 4;
            }

            board[randRow][randCol] = val
            
            valString = val.toString()
            tile = document.getElementById(randRow.toString() + randCol.toString());
            tile.innerText = valString
            tile.classList.add('t' + valString);
            needNew = false
        }
    }
}
function updateTile(tile, val) {

    // reset tile
    tile.innerText = "";        // clear tile text
    tile.classList.value = "tile"       // clear extra tile classes (t2, t4, etc.)

    if (val > 0) {
        tile.innerText = val.toString();
        
        if (val < 4096) {
            tile.classList.add("t" + val.toString());
        }
        else {
            tile.classList.add("t4096");
        }
    }
}

// gameplay
document.addEventListener("keyup", (ev) => {
    if (ev.code == "ArrowUp") {
        slideUp();
        randTwo();
    } else if (ev.code == "ArrowDown") {
        slideDown();
        randTwo();
    } else if (ev.code == "ArrowLeft") {
        slideLeft();
        randTwo();
    } else if (ev.code == "ArrowRight") {
        slideRight();
        randTwo();
    } 
    document.getElementsByTagName('score').innerText = score
})

function slide(row) {
    // remove zeroes
    row = row.filter((elt) => elt != 0);

    // slide
    for (let r=(row.length-1); r>0; r--) {
        if (row[r] == row[r-1]) {
            row[r] *= 2;
            row[r-1] = 0;

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
    for (let c=0; c<4; c++) {
        col = [board[3][c], board[2][c], board[1][c], board[0][c]]
        col = slide(col); 
        
        for (let r=0; r<4; r++) {
            board[r][c] = col[3-r]
            tile = document.getElementById(r.toString() + c.toString());
            newVal = board[r][c];
            updateTile(tile, newVal);
        }
    }
}

function slideDown() {
    for (let c=0; c<4; c++) {
        col = [board[0][c], board[1][c], board[2][c], board[3][c]]
        col = slide(col); 
        
        for (let r=0; r<4; r++) {
            board[r][c] = col[r]
            tile = document.getElementById(r.toString() + c.toString());
            newVal = board[r][c];
            updateTile(tile, newVal);
        }
    }
}

function slideLeft() {
    for (let r=0; r<4; r++) {
        row = board[r].reverse();
        row = slide(row); 
        board[r] = row.reverse();

        // update tiles
        for (let c=0; c<4; c++) {
            tile = document.getElementById(r.toString() + c.toString());
            newVal = board[r][c];
            updateTile(tile, newVal);
        };
    }
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

