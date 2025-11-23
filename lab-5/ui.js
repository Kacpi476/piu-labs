import { store } from './store.js';
import { randomHsl } from './helpers.js';

export function initUI() {
    const board = document.querySelector('#board');
    const cntSq = document.querySelector('#cntSquares');
    const cntCi = document.querySelector('#cntCircles');

    const showCounts = () => {
        cntSq.textContent = store.countByType('square');
        cntCi.textContent = store.countByType('circle');
    };

    const createShapeEl = ({ id, type, color }) => {
        const node = document.createElement('div');
        node.className = `shape ${type}`;
        node.style.backgroundColor = color;
        node.dataset.id = id;
        return node;
    };

    const drawShape = (shape) => board.appendChild(createShapeEl(shape));

    const drawAll = (shapes) => {
        board.innerHTML = '';
        shapes.forEach(drawShape);
        showCounts();
    };

    board.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        if (!id) return;

        const shape = store.shapes.find((s) => s.id === id);
        if (shape) store.removeShape(id);
    });

    const bind = (id, action) => document.querySelector(id).addEventListener('click', action);

    bind('#addSquare', () => store.addShape('square', randomHsl()));
    bind('#addCircle', () => store.addShape('circle', randomHsl()));
    bind('#recolorSquares', () => store.recolorShapes('square'));
    bind('#recolorCircles', () => store.recolorShapes('circle'));

    store.subscribe(drawAll);

    drawAll(store.shapes);
}
