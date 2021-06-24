const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');

// Calculate size of canvas from constants
ctx.canvas.width= COLS * BLOCK_SIZE;
ctx.canvas.height= ROWS * BLOCK_SIZE;

// Scale blocks
ctx.scale(BLOCK_SIZE,BLOCK_SIZE);

let board = new Board();
// let button= document.getElementsByClassName("play-button").addEventListener("click", Play);
const Play = () => {
    board.reset();
    let piece = new Piece(ctx);
    piece.draw();
    board.piece=piece;
    console.table(board.grid);
}

const moves = {
    [KEY.LEFT]: p => ({...p, x: p.x-1}),
    [KEY.RIGHT]: p => ({...p, x: p.x+1}),
    [KEY.DOWN]: p => ({...p, y: p.y+1})
};

document.addEventListener('keydown', event =>{
    if(moves[event.key])
        {
            console.log(event);
            //Stop the event from bubbling.
            event.preventDefault();

            // Get new state of piece
            let p =moves[event.key](board.piece);

            if(board.valid(p))
            {
                board.piece.move(p);

                // Clear old position before drawing.
                ctx.clearRect(0,0, ctx.canvas.width, ctx.canvas.height);

                board.piece.draw();
            }
        }
})