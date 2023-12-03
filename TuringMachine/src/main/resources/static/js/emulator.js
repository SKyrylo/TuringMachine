let tape = [];
let currentIndex = 0;
let tapeCells;
let headAt = 2

let rowsInTable = [0]
let rowsDeleted = []
let colsToDel = []
let colsToAdd = []
let alphabet = ['a', 'b']

class machine{

    static MoveTapeLeft() {
        currentIndex++;
        MoveHead(-1)
        updateTapeView();
    }

    static MoveTapeRight() {
        currentIndex--;
        MoveHead(1)
        updateTapeView();
    }


    static WordToTape() {
        const wordInput = document.getElementById('input-word-box');

        // Insert the word into the tape starting from the calculated index
        for (let i = 0; i < wordInput.value.length; i++) {
            tape[headAt + i] = wordInput.value[i];
        }

        // Set the currentIndex to the middle of the tape
        currentIndex = Math.floor(tapeCells.length / 2);

        // Update the tape view
        updateTapeView();
    }


    static ClearTape() {
        tape = [];
        currentIndex = 0;
        updateTapeView();
    }


    static UpdateAlphabet(){
        const alphabetBox = String(document.getElementById("alphabet-box").value)
        for(let i = 0; i < alphabet.length; i++){
            if(!alphabetBox.includes(alphabet.at(i))){
                const elToDel = document.getElementById("states-header-"+alphabet.at(i))
                elToDel.remove()
                colsToDel.push(alphabet.at(i))
                alphabet.splice(i, 1)
                i -= 1;
            }
        }
        for(let i = 0; i < alphabetBox.length; i++){
            if(!alphabet.includes(alphabetBox.at(i))){
                alphabet.push(alphabetBox.at(i))
                colsToAdd.push(alphabetBox.at(i))
                const lambda_cell = document.getElementById("states-header-λ")
                lambda_cell.insertAdjacentHTML("beforebegin", '<div class="states-cell" id="states-header-'+alphabetBox.at(i)+'">'+alphabetBox.at(i)+'</div>')
            }
        }
        ManageRows()
    }
}
const elements = document.getElementsByClassName("tape-cell-input")

for(let i = 0; i < elements.length; i++){
    elements[i].addEventListener('dblclick', function(){
        let prevHead = document.querySelector(".tape-cell.tape-cell-green")
        prevHead.className = "tape-cell"
        let parent = this.parentNode
        parent.className = "tape-cell tape-cell-green"
        headAt = parseInt(this.id.at(-1))
    })
}

function MoveHead(number){
    let prevHead = document.querySelector(".tape-cell.tape-cell-green")
    let newHeadId =  parseInt(prevHead.querySelector(".tape-cell-input").id.at(-1)) + number
    if(newHeadId >= 0 && newHeadId <= 24){
        prevHead.className = "tape-cell"
        let parent = document.getElementById("tape-cell-"+newHeadId.toString()).parentNode
        parent.className = "tape-cell tape-cell-green"
        headAt = newHeadId
    }
}


function ManageRows(){
    for(let i = 0; i < rowsInTable.length; i++){
        for(let j = 0; j < colsToDel.length; j++){
            const columnToDelete = document.getElementById("states-cell-q"+rowsInTable.at(i)+"-"+colsToDel.at(j))
            if(columnToDelete !== null){
                const parent = columnToDelete.parentElement
                parent.remove()
            }
        }
        for(let j = 0; j < colsToAdd.length; j++){
            const rowCell = document.getElementById("row-q"+rowsInTable.at(i))
            if(rowCell !== null){
                const lambdaCell = rowCell.querySelector("#states-cell-q"+rowsInTable.at(i)+"-λ")
                const parent = lambdaCell.parentElement
                parent.insertAdjacentHTML("beforebegin", '<div class="states-cell"><input type="text" class="states-cell-input" id="states-cell-q'+rowsInTable.at(i)+'-'+colsToAdd.at(j)+'" placeholder="N"></div>')

            }
        }
    }
    colsToAdd = []
    colsToDel = []
}


function initTapeCells() {
    tapeCells = document.querySelectorAll('.tape-cell-input');
}


function updateTapeView() {
    for (let i = 0; i < tapeCells.length; i++) {
        const cellIndex = currentIndex + i - Math.floor(tapeCells.length / 2);
        tapeCells[i].value = tape[cellIndex] || '';
    }
}


function RemoveGrandParent(element){
    let parent = element.parentNode
    let grandParent = parent.parentNode
    let greatGrandParent = grandParent.parentNode
    rowsDeleted.push(parseInt(grandParent.id.at(-1), 10))
    rowsDeleted.sort(function(a, b){
        return a-b;
    })
    greatGrandParent.removeChild(grandParent)
}



const table = document.getElementById("states-box")
const row = document.getElementById("row-header")
const addRowBtn = row.querySelector(".states-btn")

addRowBtn.addEventListener('click', AddRow)


function AddRow(){
    const newRow = document.createElement("div")
    newRow.className = "states-row"
    if(rowsDeleted.length >= 1){
        newRow.setAttribute("id", "row-q"+rowsDeleted.at(0))
    }
    else{
        newRow.setAttribute("id", "row-q"+(rowsInTable.at(-1)+1))
    }

    const stateCell = document.createElement("div")
    stateCell.className = "states-cell"
    const input = document.createElement("input")
    input.setAttribute("type", "text")
    input.className = "states-cell-input states-cell-name-input"
    if(rowsDeleted.length >= 1){
        input.setAttribute("id", "states-cell-q"+rowsDeleted.at(0))
        input.setAttribute("value", "q"+rowsDeleted.at(0))
    }
    else{
        input.setAttribute("id", "states-cell-q"+(rowsInTable.at(-1)+1))
        input.setAttribute("value", "q"+(rowsInTable.at(-1)+1))
    }
    stateCell.appendChild(input)
    const btn = document.createElement("div")
    btn.className = "states-btn"
    btn.setAttribute("onclick", "RemoveGrandParent(this)")
    btn.innerHTML = "-"
    stateCell.appendChild(btn)
    newRow.appendChild(stateCell)


    for(let i = 0; i < alphabet.length; i++){
        const rowCell = document.createElement("div")
        rowCell.className = "states-cell"
        const input = document.createElement("input")
        input.className = "states-cell-input"
        input.setAttribute("placeholder", "N")
        if(rowsDeleted.length >= 1){
            input.setAttribute("id", "states-cell-q"+rowsDeleted.at(0)+"-"+alphabet.at(i))
        }
        else{
            input.setAttribute("id", "states-cell-q"+(rowsInTable.at(-1)+1)+"-"+alphabet.at(i))
        }
        rowCell.appendChild(input)
        newRow.appendChild(rowCell)
    }

    const lambdaCell = document.createElement("div")
    lambdaCell.className = "states-cell"
    const inputLambda = document.createElement("input")
    inputLambda.className = "states-cell-input"
    inputLambda.setAttribute("placeholder", "N")
    if(rowsDeleted.length >= 1){
        inputLambda.setAttribute("id", "states-cell-q"+rowsDeleted.at(0)+"-λ")
    }
    else{
        inputLambda.setAttribute("id", "states-cell-q"+(rowsInTable.at(-1)+1)+"-λ")
    }
    lambdaCell.appendChild(inputLambda)
    newRow.appendChild(lambdaCell)

    const commentCell = document.createElement("div")
    commentCell.className = "states-cell"
    const inputComment = document.createElement("input")
    inputComment.className = "states-cell-input"
    inputComment.setAttribute("placeholder", "N")
    if(rowsDeleted.length >= 1){
        inputComment.setAttribute("id", "comment-q"+rowsDeleted.at(0))
        rowsDeleted.shift()
    }
    else{
        inputComment.setAttribute("id", "comment-q"+(rowsInTable.at(-1)+1))
        rowsInTable.push(rowsInTable.at(-1)+1)
    }
    commentCell.appendChild(inputComment)
    newRow.appendChild(commentCell)

    table.appendChild(newRow)
}


// Initialize tapeCells and set up the initial state
initTapeCells();
updateTapeView();