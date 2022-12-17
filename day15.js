const data = `
Sensor at x=2, y=18: closest beacon is at x=-2, y=15
Sensor at x=9, y=16: closest beacon is at x=10, y=16
Sensor at x=13, y=2: closest beacon is at x=15, y=3
Sensor at x=12, y=14: closest beacon is at x=10, y=16
Sensor at x=10, y=20: closest beacon is at x=10, y=16
Sensor at x=14, y=17: closest beacon is at x=10, y=16
Sensor at x=8, y=7: closest beacon is at x=2, y=10
Sensor at x=2, y=0: closest beacon is at x=2, y=10
Sensor at x=0, y=11: closest beacon is at x=2, y=10
Sensor at x=20, y=14: closest beacon is at x=25, y=17
Sensor at x=17, y=20: closest beacon is at x=21, y=22
Sensor at x=16, y=7: closest beacon is at x=15, y=3
Sensor at x=14, y=3: closest beacon is at x=15, y=3
Sensor at x=20, y=1: closest beacon is at x=15, y=3
`
  .split("\n")
  .filter(Boolean);

const regex =
  /Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)/;
let xMin = Infinity,
  yMin = Infinity,
  xMax = -Infinity,
  yMax = -Infinity;

const coords = data.map((line) => {
  const [_, sx, sy, bx, by] = line.match(regex).map((x) => parseInt(x));
  const distance = Math.abs(bx - sx) + Math.abs(by - sy);

  xMin = Math.min(xMin, sx - distance);
  yMin = Math.min(yMin, sy - distance);
  xMax = Math.max(xMax, sx + distance);
  yMax = Math.max(yMax, sy + distance);

  return {
    beacon: [bx, by],
    sensor: [sx, sy],
    distance,
  };
});

const getRangesAt = (y) => {
  return coords
    .filter(
      ({ sensor, distance }) =>
        sensor[1] - distance <= y && sensor[1] + distance >= y
    )
    .reduce((ranges, { sensor, distance }) => {
      const range = [
        sensor[0] - distance + Math.abs(y - sensor[1]),
        sensor[0] + distance - Math.abs(y - sensor[1]),
      ];
      const includesMin = ranges.find(
        (r) => r[0] - 1 <= range[0] && r[1] + 1 >= range[0]
      );
      const includesMax = ranges.find(
        (r) => r[0] - 1 <= range[1] && r[1] + 1 >= range[1]
      );
      const newRange = [
        includesMin ? Math.min(includesMin[0], range[0]) : range[0],
        includesMax ? Math.max(includesMax[1], range[1]) : range[1],
      ];

      return [
        newRange,
        ...ranges.filter(
          (range) => !(range[0] >= newRange[0] && range[1] <= newRange[1])
        ),
      ];
    }, []);
};

const getCoverageAt = (y) => {
  return getRangesAt(y).reduce((acc, range) => acc + range[1] - range[0], 0);
};

const getTuningFrequencyWithin = (limit) => {
  const yCoord = new Array(limit)
    .fill(true)
    .map((_, y) => y)
    .find(
      (_, y) =>
        getRangesAt(y).filter((range) => range[0] < limit && range[1] > 0)
          .length === 2
    );
  const xCoord = getRangesAt(yCoord).flat().sort()[1] + 1;

  return xCoord * 4000000 + yCoord;
};

console.log("First puzzle answer:", getCoverageAt(10));
console.log("Second puzzle answer:", getTuningFrequencyWithin(20));
