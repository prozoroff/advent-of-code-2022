const pairs = `
[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]
`
.split('\n\n')
.map(pair => pair
    .split('\n')
    .filter(Boolean)
    .map(JSON.parse));

const dividerPackets = [[[2]], [[6]]];

const compare = (a, b) => {
    if (b === undefined) {
        return -1;
    } else if (Number.isFinite(a) && Number.isFinite(b)) {
        return Math.sign(b - a);
    } else if (Array.isArray(a) && Array.isArray(b)) {
        return a.map((item, i) => compare(item, b[i])).find(Boolean) || compare(a.length, b.length);
    } else if (Number.isFinite(a) && Array.isArray(b)) {
        return compare([a], b);
    } else if (Number.isFinite(b) && Array.isArray(a)) {
        return compare(a, [b]);
    }
};

const result1 = pairs
    .map((pair, i) => ({pair, i: i + 1}))
    .filter(({pair}) => compare(...pair) > 0)
    .map(({i}) => i)
    .reduce((acc, item) => acc + item, 0);

const ordered = dividerPackets
    .concat(...pairs)
    .sort(compare)
    .reverse()
    .map(JSON.stringify);

const result2 = dividerPackets
    .map(JSON.stringify)
    .reduce((acc, packet) =>
        acc * (ordered.indexOf(packet) + 1), 1)

console.log('First puzzle answer:', result1);
console.log('Second puzzle answer:', result2);
