const cubes = `
2,2,2
1,2,2
3,2,2
2,1,2
2,3,2
2,2,1
2,2,3
2,2,4
2,2,6
1,2,5
3,2,5
2,1,5
2,3,5
`
.split('\n')
.filter(Boolean)
.map(line => line
    .split(',')
    .map(side => parseInt(side)));

const stepCoord = (coord, index, sign) => {
    const copy = [...coord];
    copy[index] += sign;
    return copy;
}

const sameCoord = (coord1, coord2) =>
    coord1.join(',') === coord2.join(',');

const countConnected = (cube, cubes) => cubes
    .reduce((acc, c) => {
        return acc 
            + (sameCoord(c, stepCoord(cube, 0, 1)) ? 1 : 0)
            + (sameCoord(c, stepCoord(cube, 0, -1)) ? 1 : 0)
            + (sameCoord(c, stepCoord(cube, 1, 1)) ? 1 : 0)
            + (sameCoord(c, stepCoord(cube, 1, -1)) ? 1 : 0)
            + (sameCoord(c, stepCoord(cube, 2, 1)) ? 1 : 0)
            + (sameCoord(c, stepCoord(cube, 2, -1)) ? 1 : 0);
    }, 0)


const minX = Math.min(...cubes.map(cube => cube[0]));
const maxX = Math.max(...cubes.map(cube => cube[0]));
const minY = Math.min(...cubes.map(cube => cube[1]));
const maxY = Math.max(...cubes.map(cube => cube[1]));
const minZ = Math.min(...cubes.map(cube => cube[2]));
const maxZ = Math.max(...cubes.map(cube => cube[2]));

const inBox = ([x, y, z]) =>
    x >= minX - 1
    && x <= maxX + 1
    && y >= minY - 1
    && y <= maxY + 1
    && z >= minZ - 1
    && z <= maxZ + 1;

const visited = new Set();
const lava = new Set(cubes.map((x) => x.join(",")));
const queue = [[minX - 1, minY - 1, minZ - 1]];

while (queue.length) {
    const cube = queue.pop()
    const key = cube.join(",")
    if (visited.has(key)) continue
    if (lava.has(key) || !inBox(cube)) continue
    visited.add(key)
    queue.push(...[
        stepCoord(cube, 0, 1),
        stepCoord(cube, 0, -1),
        stepCoord(cube, 1, 1),
        stepCoord(cube, 1, -1),
        stepCoord(cube, 2, 1),
        stepCoord(cube, 2, -1)
    ]);
}

const visitedArr = Array.from(visited)
    .map(line => line
    .split(',')
    .map(side => parseInt(side)));

const all = cubes.reduce((acc, cube) => {
    return acc + 6 - countConnected(cube, cubes);
}, 0)

const external = visitedArr.reduce((acc, cube) => {
    return acc + countConnected(cube, cubes);
}, 0)

console.log('First puzzle answer:', all);
console.log('Second puzzle answer:', external);
