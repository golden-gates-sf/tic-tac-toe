import './style.scss';
import {every} from 'lodash';
import {upperCase} from 'lodash'

// game

let playfield = [
    ['','',''], 
    ['','',''], 
    ['','','']
];
// player1 - cross 1
// player2 - circle 2

let currentPlayer = 'player1';
let isGameOver = false;

function checkCombination(matr) {
    for (let i = 0; i < matr.length; i++) {
        if (matr[i][0] !== '' && every(matr[i], (el) => el === matr[i][0])) {
            for (let j = 1; j <= 3; j++) {
                document.getElementById(`${i+1}${j}`).style.background = '#f0f098';
            };
            return playfield[i][0];
        } 
    };
    if (matr[1][1] !== '' && matr[1][1] === matr[0][0] && matr[1][1] === matr[2][2]) {
        for (let j = 1; j <= 3; j++) {
            document.getElementById(`${j}${j}`).style.background = '#f0f098';
        };
        return matr[1][1];
    } 
    if (matr[1][1] !== '' && matr[1][1] === matr[0][2] && matr[1][1] === matr[2][0]) {
        document.getElementById('13').style.background = '#f0f098';
        document.getElementById('22').style.background = '#f0f098';
        document.getElementById('31').style.background = '#f0f098';
        return matr[1][1];
    } 
    for (let i = 0; i < matr.length; i++) {
        if (matr[0][i] !== '' && matr[0][i] === matr[1][i] && matr[0][i] === matr[2][i]) {
            for (let j = 1; j <= 3; j++) {
                document.getElementById(`${j}${i+1}`).style.background = '#f0f098';
            };
            return matr[0][i];
        } 
    };
    return false;
}

// modal window

const overlay = document.querySelector('.overlay');
overlay.classList.add('active');

const modalStartBtn = document.querySelector('.modal-start-btn');
modalStartBtn.addEventListener('click', () => {   
    let player1Span =  document.getElementById('player1');
    let player2Span = document.getElementById('player2');

    document.getElementById('input-p1').value === '' 
        ? player1Span.textContent = 'Karate boy' 
        : player1Span.textContent = document.getElementById('input-p1').value;

    document.getElementById('input-p2').value === '' 
        ? player2Span.textContent = 'Katana fencer' 
        : player2Span.textContent = document.getElementById('input-p2').value
    
    overlay.classList.remove('active');
});

const restartBtn = document.querySelector('.restart-btn');
restartBtn.addEventListener('click', () => {
    overlay.classList.add('active');
    playfield = [
        ['','',''], 
        ['','',''], 
        ['','','']
    ];
    const cells = document.querySelectorAll('.cell');
    for (let cell of cells) {
        cell.innerHTML = '';
        cell.style.background = '#fff';
        cell.setAttribute('data-status', '0');
    }
    isGameOver = false;
});

// display (playfield, players)

document.getElementById(`${currentPlayer}`).style.color = '#C40B0B';

const playEl = document.querySelector('.play-field');
playEl.addEventListener('click', (e) => {
    if (isGameOver) return;
    const {target} = e;
    if (target.matches('.cell') && !(target.dataset.status === '1')) {
        document.getElementById(`${currentPlayer}`).style.color = '#000';
        const targetId = target.id.split('');
        if (currentPlayer === 'player1') {
            target.insertAdjacentHTML('afterbegin', `
                <span class="material-icons-round md-108">close</span>
            `);
            playfield[+targetId[0]-1][+targetId[1]-1] = 1;
            document.getElementById('player2').style.color = '#C40B0B';
            currentPlayer = 'player2';
        }
        else {
            target.insertAdjacentHTML('afterbegin', `
                <span class="material-icons-round md-96"> favorite_border </span>
            `);
            playfield[+targetId[0]-1][+targetId[1]-1] = 2;
            document.getElementById('player1').style.color = '#C40B0B';
            currentPlayer = 'player1';
        }; 
        const winComb = checkCombination(playfield);
        if (winComb) {
            isGameOver = true;
            const winPlayer = document.getElementById(`player${winComb}`).textContent;
            document.querySelectorAll('.win-player-name').forEach(el => {
                el.textContent = upperCase(`${winPlayer} wins`);
            });
            document.querySelectorAll('.player-name').forEach(el => {
                el.style.color = '#000';
            });
        };
        target.setAttribute('data-status', '1');
    };
});




