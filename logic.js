const computer="X", human="O";
let bestrow, bestcol;
let board = new Array(3).fill(0).map(() => new Array(3).fill(" "));
const cells = document.querySelectorAll('.cell');
const warning = document.querySelector('#warning');
const statusplayer = document.querySelector('#statusplayer');
const statustext = document.querySelector('#statustext');
const reset = document.querySelector('#reset');

warning.style.display = "none";

reset.onclick = () => {
    for(let i=0; i<3; i++)
        for(let j=0; j<3; j++)
            board[i][j]=' ';
    counter = 0;
    warning.innerHTML = "Wrong Move";
    warning.style.display = "none";
    cells.forEach((item) => {
        item.innerHTML = "";
        item.className = item.classList[0] + " " + item.classList[1];
    });
    statusplayer.innerHTML = human;
    statustext.innerHTML = "'s turn";

}

function viewboard()
{
    for(let i=0; i<3; i++)
        console.log(...board[i]);
}

function empty()
{
    for(let i=0; i<3; i++)
        for(let j=0; j<3; j++)
            if(board[i][j]===' ')
                return 1;
    return 0;
}

function evaluate()
{
    //check row
    for(let i=0; i<3; i++)
    {
        if(board[i][0]===board[i][1] && board[i][1]===board[i][2])
        {
            if(board[i][0]===computer)
                return 10;
            else if(board[i][0]===human)
                return -10;
        }
    }
    
    //check column
    for(let i=0; i<3; i++)
    {
        if(board[0][i]===board[1][i] && board[1][i]===board[2][i])
        {
            if(board[0][i]===computer)
                return 10;
            else if(board[0][i]===human)
                return -10;
        }
    }
    
    //check diagonals
    if(board[0][0]===board[1][1] && board[1][1]===board[2][2])
    {
        if(board[0][0]===computer)
            return 10;
        else if(board[0][0]===human)
            return -10;
    }
    if(board[0][2]===board[1][1] && board[1][1]===board[2][0])
    {
        if(board[0][2]===computer)
            return 10;
        else if(board[0][2]===human)
            return -10;
    }
    
    return 0;
}


function findbestval(depth, player)
{
    let score=evaluate();
    if(score===10 || score===-10)
        return score-depth;
    else
    {
        if(!empty())
            return 0-depth;
    }
    
    let bestval;
    
    if(player===computer)
    {
        bestval=-99;
        for(let i=0; i<3; i++)
        {
            for(let j=0; j<3; j++)
            {
                if(board[i][j]===' ')
                {
                    board[i][j]=computer;
                    let val=findbestval(depth+1, human);
                    bestval=Math.max(bestval, val);
                    board[i][j]=' ';
                }
            }
        }
    }
    else
    {
        bestval=99;
        for(let i=0; i<3; i++)
        {
            for(let j=0; j<3; j++)
            {
                if(board[i][j]===' ')
                {
                    board[i][j]=human;
                    let val=findbestval(depth+1, computer);
                    bestval=Math.min(bestval, val);
                    board[i][j]=' ';
                }
            }
        }
    }
    return bestval;
}


function findbestmove()
{
    let bestval=-99;
    for(let i=0; i<3; i++)
    {
        for(let j=0; j<3; j++)
        {
            if(board[i][j]===' ')
            {
                board[i][j]=computer;
                let val=findbestval(0, human);
                if(bestval<val)
                {
                    bestval=val;
                    bestrow=i;  bestcol=j;
                }
                board[i][j]=' ';
            }
        }
    }
}

let counter = 0;

cells.forEach((item) => {
    item.onclick = () => {
        if(counter<9)
        {
            let rowcol = parseInt(item.classList[1]);
            let row = parseInt(rowcol/3);
            let col = rowcol%3;
            if(board[row][col]===" ")
            {
                warning.style.display = "none";
                counter++;
                board[row][col] = human;
                item.innerHTML = human;
                item.className += " " + human;
                statusplayer.innerHTML = computer;                
                viewboard();
                console.log(computer);

                let score=evaluate();
                if (score===0)
                {
                    if(!empty())
                    {
                        statusplayer.innerHTML = "";
                        statustext.innerHTML = "TIE";
                        counter = 10;
                        console.log("The game has been drawn.");
                        warning.innerHTML = "Game Over";
                        warning.style.display = "block";
                    }
                    else
                    {
                        findbestmove();
                        board[bestrow][bestcol] = computer;
                        counter++;
                        let targetcell = bestrow*3 + bestcol;
                        cells.forEach((e) => {
                            if(targetcell === parseInt(e.classList[1]))
                            {
                                e.innerHTML = computer;
                                e.className += " " + computer;
                            }
                        });
                        statusplayer.innerHTML = human;

                        viewboard();
                        let score=evaluate();
                        if (score===0)
                        {
                            if(!empty())
                            {
                                statusplayer.innerHTML = "";
                                statustext.innerHTML = "TIE";
                                console.log("The game has been drawn.");
                                warning.innerHTML = "Game Over";
                                warning.style.display = "block";
                            }                            
                        }
                        else
                        {
                            counter = 10;
                            if(score===10)
                            {
                                statusplayer.innerHTML = computer;
                                statustext.innerHTML = " WON";
                                console.log("Computer won.");
                                warning.innerHTML = "Game Over";
                                warning.style.display = "block";
                            }
                            else
                            {
                                statusplayer.innerHTML = human;
                                statustext.innerHTML = " WON";
                                console.log("Human won.");
                                warning.innerHTML = "Game Over";
                                warning.style.display = "block";
                            }
                        }
                    }
                }
                else
                {
                    counter = 10;
                    if(score===10)
                    {
                        statusplayer.innerHTML = computer;
                        statustext.innerHTML = " WON";
                        console.log("Computer won.");
                        warning.innerHTML = "Game Over";
                        warning.style.display = "block";
                    }
                    else
                    {
                        statusplayer.innerHTML = human;
                        statustext.innerHTML = " WON";
                        console.log("Human won.");
                        warning.innerHTML = "Game Over";
                        warning.style.display = "block";
                    }
                }
            }
            else
            {
                console.log("Wrong Move");
                warning.innerHTML = "Wrong Move";
                warning.style.display = "block";
            }
        }
        else
        {
            console.log("The game is already over.");
            warning.innerHTML = "The Game is already over";
            warning.style.display = "block";
        }
    };
});
