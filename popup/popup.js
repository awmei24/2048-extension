var board; 
var score;

// setup
window.onload = function() {
    startGame();
}

function startGame() {
    board = [ 
        [2,2,0,2], 
        [0,0,4,8], 
        [0,8,0,8], 
        [2,2,4,4], 
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

