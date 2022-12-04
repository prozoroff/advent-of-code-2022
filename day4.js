
const data =`
2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8
`

const countOverlaps = isFull => data
	.split('\n')
	.filter(x => x)
	.map(line => line.split(',')
		.map(range => range.split('-')
			.map(val => parseInt(val))))
	.filter(([r1, r2]) => isFull
		? (r1[1] >= r2[0] && r1[0] < r2[0] || r2[1] >= r1[0] && r2[0] <= r1[0]) 
		: (r1[0] >= r2[0] && r1[1] <= r2[1] || r2[0] >= r1[0] && r2[1] <= r1[1]))
	.length;

console.log('First puzzle answer:', countOverlaps(true));
console.log('Second puzzle answer:', countOverlaps(false));
