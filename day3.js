
const data =`
vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw
`.split('\n').filter(x => x);

const getScore = char => {
	const code = char.charCodeAt();
	return code > 96 ? code - 96 : code - 38;
}

const intersection = arr =>
	arr.reduce((a, b) => a.filter(c => b.includes(c)))[0];

Array.prototype.sum = function() {
	return [].reduce.call(this, (acc, item) => acc + item, 0);
};

Array.prototype.chunk = function(n) {
    return this.length
    	? [this.slice(0, n)].concat(this.slice(n).chunk(n))
    	: [];
};

const result1 = data
	.map(str => str.split(''))
	.map(items => items.chunk(items.length/2))
	.map(intersection)
	.map(getScore)
	.sum()

const result2 = data
	.map(str => str.split(''))
	.chunk(3)
	.map(intersection)
	.map(getScore)
	.sum()

console.log('First puzzle answer:', result1);
console.log('Second puzzle answer:', result2);
