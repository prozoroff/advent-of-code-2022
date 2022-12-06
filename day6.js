const buffer = 'nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg'.split('');

const solveOptimized = packetSize => {
	let packet = [];
	let i = 0;
	while (true) {
		const char = buffer[i++];
		const indexOfSame = packet.indexOf(char);
		if (indexOfSame > -1) {
			packet = packet.slice(indexOfSame + 1);
		}
		packet.push(char);
		if (packet.length === packetSize) {
			return i;
		}
	}
};

const solveBruteforce = packetSize =>
	buffer.findIndex((_, i) =>
		new Set(buffer.slice(i, i + packetSize)).size === packetSize) + packetSize;

console.log('First puzzle answer:', solveOptimized(4));
console.log('Second puzzle answer:', solveOptimized(14));
