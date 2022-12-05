const data =`
    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2
`
.split('\n\n')
.map(p => p.split('\n')
.filter(p => p));

const parseData = ([columns, moves]) => [
	columns
		.filter((_, i) => i < columns.length - 1)
		.reduce((acc, line, i) => {
			line
				.split('')
				.filter((_, n) => !((n - 1) % 4))
				.forEach((crate, k) =>
					crate !== ' ' && (acc[k] = acc[k] || []).push(crate))
			return acc;
		}, []),
	moves
		.map(line => line
			.split(' ')
			.filter((_, i) => i % 2)
			.map(str => parseInt(str)))
];

const moveCrates = sameOrder => {
	const [columns, moves] = parseData(data);
	console.log(parseData(data))
	moves.forEach(([count, from, to]) => {
		const items = columns[from - 1].slice(0, count);
		columns[from - 1] = columns[from - 1].slice(count);
		columns[to - 1] = [
			...(sameOrder ? items.reverse() : items),
			...columns[to - 1]
		];
	});
	return columns.map(c => c[0]).join('');
} 

console.log('First puzzle answer:', moveCrates(true));
console.log('Second puzzle answer:', moveCrates(false));
