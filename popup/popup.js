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
    // edgy code
}