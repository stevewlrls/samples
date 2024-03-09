/**
 * @module maze.js
 *
 * Provides the interaction logic to move a rabbit through a maze, to reach
 * the 'goal' at the centre.
 */

const layout = [
  '+--------+-----+---+',
  '|        |     |   |',
  '| +----+ +---- | | |',
  '  |    | |     | | |',
  '| | +--+ | +---+-| |',
  '| | |    | |     | |',
  '| | | +--+ | +-+ | |',
  '| | |      | | | | |',
  '| | | +----+ | | | |',
  '| | | |      | | | |',
  '| | | | ---+ | | | |',
  '| | | |   x| | | | |',
  '| | | +--+-+   | | |',
  '| | |    | +---+ | |',
  '| | +--+ |       | |',
  '| |    | +---- --+ |',
  '| +--+ |         | |',
  '|    | +-- ------+ |',
  '+--+ |             |',
  '++ | +-------------|',
  '|  | |             |',
  '| ++ +------------ |',
  '|                  |',
  '+------------------+'
]

const hedge = 'images/thujenhecke-1487722_640.jpg'
const path = 'images/imageBlank.png'
const goal = 'images/carrot-6300849_640.png'

const maze = document.getElementById('maze')
const rabbit = document.getElementById('rabbit')

let row, col

function moveRabbit(r, c) {
  rabbit.style.top = r * 40 + 'px'
  rabbit.style.left = c * 40 + 'px'
  row = r
  col = c
  if (mazeAt(r, c) === 'x') alert('Yay! Reached the goal!')
}

function mazeAt(r, c) {
  const row = layout[r]
  return row && row[c]
}

// Set up maze:
for (const row of layout) {
  for (const c of Array.from(row)) {
    let el = new Image(40, 40)
    el.src = c === 'x' ? goal : c === ' ' ? path : hedge
    maze.appendChild(el)
  }
}

moveRabbit(3, 0)

// Put your code here. You need to catch the button click events and then test
// whether the rabbit is able to move in that direction, before updating its
// position.
