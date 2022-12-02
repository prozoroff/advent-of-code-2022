const data =`
A Y
B X
C Z
`;

const formulas = [
	(a, b) => ((b - a + 4) % 3) * 3 + (b + 1),
	(a, b) => (b * 3) + ((a + b) % 3 || 3)
];

const getScore = type => data
	.split('\n')
	.filter(x => x)
	.map(pairs => pairs
		.split(' '))
		.map(([a, b]) => [a.charCodeAt() - 65, b.charCodeAt() - 88])
	.reduce((acc, [a, b]) => acc + formulas[type](a, b), 0);

console.log('First puzzle answer:', getScore(0));
console.log('Second puzzle answer:', getScore(1));
