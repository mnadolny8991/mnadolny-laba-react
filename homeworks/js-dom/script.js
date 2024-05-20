const ROWS_COUNT = 30;
const COLS_COUNT = 20;

let activeCell;
let selectedCells = new Set();

let shiftPressed = false;

const container = document.querySelector('.container');
const body = document.querySelector('.body');

container.style.gridTemplateColumns = `repeat(${COLS_COUNT}, auto)`;
container.style.gridTemplateRows = `repeat(${ROWS_COUNT}, auto)`;

for (let i = 0; i < ROWS_COUNT; i++) {
    for (let j = 0; j < COLS_COUNT; j++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.setAttribute('data-row', i.toString());
        cell.setAttribute('data-col', j.toString());
        container.appendChild(cell);
    }
}

function selectCell(cellNode, row, col) {
    cellNode.innerHTML = `${col}/${row}`;
    cellNode.classList.toggle('cell_selected');
}

function deselectCell(cellNode) {
    cellNode.innerHTML = '';
    cellNode.classList.toggle('cell_selected');
}

body.addEventListener('click', e => {
    const t = e.target;
    if (!t.classList.contains('cell')) {
        return;
    }
    const row = parseInt(t.getAttribute('data-row'));
    const col = parseInt(t.getAttribute('data-col'));
    const rowColStr = `${row} ${col}`;
    if (selectedCells.has(rowColStr)) {
        deselectCell(t);
        selectedCells.delete(rowColStr);
        return;
    }
    if (shiftPressed) {
        selectCell(t, row, col);
        selectedCells.add(rowColStr);
        return;
    }
    for (const val of selectedCells) {
        const [prevRow, prevCol] = val.split(' ').map(v => parseInt(v));
        const cell = document.querySelector(`[data-row="${prevRow}"][data-col="${prevCol}"]`);
        deselectCell(cell);
    }
    selectedCells.clear();
    selectCell(t, row, col);
    selectedCells.add(rowColStr);
});

function toggleHighlight(row, col) {
    if (!row || !col) return;
    const rowCells = document.querySelectorAll(`[data-row="${row}"]`);
    const colCells = document.querySelectorAll(`[data-col="${col}"]`);
    rowCells.forEach(c => !c.classList.contains('cell_selected') && c.classList.toggle('cell_active'));
    colCells.forEach(c => !c.classList.contains('cell_selected') && c.classList.toggle('cell_active'));
}

function getPosition(cell) {
    const row = parseInt(cell.getAttribute('data-row'));
    const col = parseInt(cell.getAttribute('data-col'));
    return [row, col];
}

body.addEventListener('mousedown', e => {
    const t = e.target;
    if (!t.classList.contains('cell')) return;
    const [row, col] = getPosition(t);
    activeCell = [row, col];
    toggleHighlight(row, col);
});

body.addEventListener('mouseup', e => {
    const t = e.target;
    if (!activeCell) return;
    const [activeRow, activeCol] = activeCell;
    const [row, col] = getPosition(t);
    if (row != activeRow || col != activeCol) {
        toggleHighlight(activeRow, activeCol);
    } else {
        toggleHighlight(row, col);
    }
    activeCell = null;
});

body.addEventListener('keydown', e => {
    if (e.code === 'ShiftLeft') {
        shiftPressed = true;
    }
});

body.addEventListener('keyup', e => {
    if (e.code === 'ShiftLeft') {
        shiftPressed = false;
    }
});