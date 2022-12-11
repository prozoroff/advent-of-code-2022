const data = `
Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1
`
.split('\n\n')
.map(monkeyData => monkeyData.split('\n').filter(Boolean))
.map(([_, itemsData, operationData, testData, ifTrueData, ifFalseData], id) => ({
    id,
    items: itemsData
        .split(': ')[1]
        .split(', ')
        .map(item => parseInt(item)),
    operation: old => eval(operationData.split(' = ')[1]),
    divisible: parseInt(testData.split(' by ')[1]),
    ifTrueId: parseInt(ifTrueData.split('to monkey ')[1]),
    ifFalseId: parseInt(ifFalseData.split('to monkey ')[1])
}));

const factor = data.reduce((acc, {divisible}) => acc * divisible, 1);

class Monkey {
    constructor (data) {
        this.data = {
            ...data,
            items: [...data.items]
        };
        this.id = data.id;
        this.counter = 0;
    }

    init (flock) {
        this.flock = flock;
    }

    check (item) {
        const {divisible, ifFalseId, ifTrueId} = this.data;
        return (item % divisible) ? ifFalseId : ifTrueId;
    }

    addItem (item) {
        this.data.items.push(item);
    }

    operate (reducer) {
        const {items, operation} = this.data
        while (items.length) {
            const item = items.shift();
            const newItem = reducer(operation(item));
            const monkeyId = this.check(newItem);
            this.flock.find(monkey => monkey.id === monkeyId).addItem(newItem);
            this.counter++;
        }
    }
}

const getMonkeyBusiness = (rounds, worryReducer) => {
    const flock = data.map(monkeyData => new Monkey(monkeyData))
    flock.forEach(monkey => monkey.init(flock));

    while (rounds--) {
        flock.forEach(monkey => monkey.operate(worryReducer));
    }

    return flock
        .map(m => m.counter)
        .sort((a, b) => a > b ? -1 : 1)
        .slice(0, 2)
        .reduce((acc, item) => acc * item, 1);
}


console.log('First puzzle answer:', getMonkeyBusiness(20, level => Math.floor(level / 3)));
console.log('First puzzle answer:', getMonkeyBusiness(10000, level => level % factor));

