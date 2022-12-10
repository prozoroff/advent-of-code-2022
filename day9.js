const steps = `
R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2
`
.split('\n')
.filter(Boolean)
.map(line => line.split(' '))
.map(([direction, count]) => new Array(parseInt(count)).fill(direction)).flat()

const moveHead = (rope, dir) => {
    'LR'.includes(dir) && (rope[0][0] += 'LR'.indexOf(dir) ? 1 : -1);
    'DU'.includes(dir) && (rope[0][1] += 'DU'.indexOf(dir) ? 1 : -1);
}

const moveChain = (rope, i) => {
    const change = [rope[i - 1][0] - rope[i][0], rope[i - 1][1] - rope[i][1]];
    if ((Math.abs(change[0]) === 2 || Math.abs(change[1]) === 2)) {
        change.map((_, j) => rope[i][j] += Math.sign(change[j]));
    }
}

const countVisited = ropeLength => {
    const visited = {};
    const rope = new Array(ropeLength).fill(0).map(() => [0, 0]);
    steps.forEach(direction => {
            moveHead(rope, direction);
            rope.slice(1).forEach((_, i) => moveChain(rope, i + 1))
            visited[rope[rope.length - 1]] = true;
        });
    return Object.keys(visited).length;
}

console.log('First puzzle answer:', countVisited(2));
console.log('Second puzzle answer:', countVisited(10));

