const ROWS_COUNT = 30;
const COLS_COUNT = 20;
let activeCell;

const container = document.querySelector('.container');
const body = document.querySelector('.body');

container.style.gridTemplateColumns = `repeat(${COLS_COUNT}, 1fr)`;
container.style.gridTemplateRows = `repeat(${ROWS_COUNT}, 1fr)`;

for (let i = 0; i < ROWS_COUNT; i++) {
    for (let j = 0; j < COLS_COUNT; j++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.style.cursor = 'pointer';
        cell.style.userSelect = 'none';
        cell.setAttribute('data-row', i.toString());
        cell.setAttribute('data-col', j.toString());
        container.appendChild(cell);
    }
}

body.addEventListener('click', e => {
    const t = e.target;
    if (!t.classList.contains('cell')) {
        return;
    }
    const row = parseInt(t.getAttribute('data-row'));
    const col = parseInt(t.getAttribute('data-col'));
    if (t.innerHTML === '') {
        t.innerHTML = `${col}/${row}`;
    } else {
        t.innerHTML = '';
    }
    t.classList.toggle('cell__selected');
});

function toggleHighlight(row, col) {
    if (!row || !col) return;
    const rowCells = document.querySelectorAll(`[data-row="${row}"]`);
    const colCells = document.querySelectorAll(`[data-col="${col}"]`);
    rowCells.forEach(c => !c.classList.contains('cell__selected') && c.classList.toggle('cell__active'));
    colCells.forEach(c => !c.classList.contains('cell__selected') && c.classList.toggle('cell__active'));
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
    const [activeRow, activeCol] = activeCell;
    if (!t.classList.contains('cell')) {
        toggleHighlight(activeRow, activeCol);
        activeCell = null;
        return;
    }
    const [row, col] = getPosition(t);
    if (row != activeRow || col != activeCol) {
        toggleHighlight(activeRow, activeCol);
    } else {
        toggleHighlight(row, col);
    }
    activeCell = null;
});
