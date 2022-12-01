const data =`
1000
2000
3000

4000

5000
6000

7000
8000
9000

10000
`;

const maxSnacks = count => data
		.split('\n\n')
		.map(nums => nums
			.split('\n')
			.filter(x => x)
			.map(num => parseInt(num))
			.reduce((acc,n)=>acc+n,0))
		.sort((a,b) => a > b ? 1 : -1)
		.slice(-count)
		.reduce((acc,n)=>acc+n,0)

console.log('First puzzle answer:', maxSnacks(1));
console.log('Second puzzle answer:', maxSnacks(3));
