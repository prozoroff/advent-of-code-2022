const data = `
Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi
`
.split('\n')
.filter(Boolean)

let fromS, toE;
const fromA = [];

data.forEach((line, j) => line.split('').forEach((char, i) => {
    fromS = char === 'S' ? [j, i] : fromS;
    toE = char === 'E' ? [j, i] : toE;
    char === 'a' && fromA.push([j, i]);
}))

const map = data.map(line =>
    line.replace('S', 'a').replace('E', 'z').split(''));

const getLengths = (from, to) => {
    const lengths = [];
    const visited = {};

    const move = ([j, i], path = []) => {
        const {char: prevChar} = path[path.length - 1] || {};
        const char = map[j][i];
        const key = [j,i].join(',');

        if (!prevChar  || (char.charCodeAt() - prevChar.charCodeAt() <= 1)) {
            if (j === to[0] && i === to[1]) {
                lengths.push(path.length);
            } else if (visited[key] === undefined || visited[key] > path.length) {
                visited[key] = path.length;
                map[j + 1] && move([j + 1, i], [...path, {char, key}]);
                map[0][i + 1] && move([j, i + 1], [...path, {char, key}]);
                map[j - 1] && move([j - 1, i], [...path, {char, key}]);
                map[0][i - 1] && move([j, i - 1], [...path, {char, key}]);
            } 
        }
    }
    while (from.length) move(from.pop())
    return lengths;
};

console.log('First puzzle answer:', Math.min(...getLengths([fromS], toE)));
console.log('Second puzzle answer:', Math.min(...getLengths(fromA, toE)));
