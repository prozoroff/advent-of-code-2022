const numbers = `
1
2
-3
3
-2
0
4
`
.split('\n')
.filter(Boolean)
.map(n => parseInt(n))

const move = (data, item) => {
    let from = data.indexOf(item);
    let shift = parseInt(item.split(',')[0]);
    const size = data.length - 1;
    const to = ((from + shift) % size + size) % size || size;
    data.splice(from, 1);
    data.splice(to, 0, item);
};

const decrypt = (times, multiplier) => {
    const data = numbers.map((n, i) => `${n * multiplier},${i}`);
    const dataCopy = [...data];
    [...Array(times)].forEach(() => dataCopy.forEach(item => move(data, item)));
    const zeroIndex = data.findIndex(item => item.split(',')[0] === '0');

    return [1000, 2000, 3000]
        .reduce((acc, shift) =>
            acc + parseInt(data[(zeroIndex + shift) % data.length].split(',')[0]), 0);
}

console.log('First puzzle answer:', decrypt(1, 1));
console.log('Second puzzle answer:', decrypt(10, 811589153));
