const data = `
root: pppw + sjmn
dbpl: 5
cczh: sllz + lgvd
zczc: 2
ptdq: humn - dvpt
dvpt: 3
lfqf: 4
humn: 5
ljgn: 2
sjmn: drzm * dbpl
sllz: 4
pppw: cczh / lfqf
lgvd: ljgn * ptdq
drzm: hmdt - zczc
hmdt: 32
`
.split('\n')
.filter(Boolean)
.reduce((acc, line) => {
    const [id, commandOrValue] = line.split(': ');
    const value = parseInt(commandOrValue);
    const command = commandOrValue.match(/(\w+) ([\/\*\-\+]) (\w+)/)?.slice(1);
    return {
        ...acc,
        [id]: isNaN(value) ? command : value
    }
}, {});


const getRootResult = data => {
    while (Array.isArray(data.root)) {
        Object.keys(data).map(id => {
            if (!isFinite(data[id])) {
                const [a, action, b] = data[id];
                if (isFinite(data[a]) && isFinite(data[b])){
                    data[id] = eval(`${data[a]} ${action} ${data[b]}`);
                }
            }
        })
    }
    return data.root;
}

const getHumnValue = data => {
    data.root[1] = '-';
    let guess = 0;
    let power = 10;
    let sign = 1;
    let dataCopy = {};
    let prevResult;

    while (dataCopy.root !== 0) {
        dataCopy = {...data};
        dataCopy.humn = guess;
        const result = getRootResult(dataCopy);
        
        if (prevResult * result < 0) {
            sign *= -1;
            power -= 1;
        }

        if (result) {
            guess += Math.pow(10, power) * sign;
            prevResult = result;
        }
    }
    
    return guess;
}


console.log('First puzzle answer:', getRootResult({...data}));
console.log('Second puzzle answer:', getHumnValue({...data}));
