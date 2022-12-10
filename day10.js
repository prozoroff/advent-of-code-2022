const data = `
noop
addx 3
addx -5
...
`
.split('\n')
.filter(Boolean)
.map(line => line.split(' '));

let x = 1;
const xValues = [x];
let stack = [];

const execute = (command, cycles) => {
    const internal = () => {
        xValues.push(x);
        if (--cycles > 0) {
            return internal;
        } else {
            command();
            return 'done';
        }
    }
    return internal;
}

const commands = data
    .map(([name, param]) => name === 'noop'
        ? execute(() => {})
        : execute(() => x += parseInt(param), 2));

while (commands.length) {
    stack.push(commands.shift());
    stack = stack.map(command => command())
        .filter(result => result !== 'done');
}

const result1 = [20,60,100,140,180,220]
    .reduce((acc, cycle) => acc + xValues[cycle] * cycle, 0);

const printCRT = () => {
    let str;
    xValues.forEach((x, i) => {
        if (!(i % 40)) {
            console.log(str);
            str = '';
        }
        str += Math.abs(x - (i % 40) + 1) < 2 ? '#' : '.';
    })
};

console.log('First puzzle answer:', result1);
console.log('Second puzzle answer:', 'RBPARAGF');

