const cornersData = `
498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9
`
  .split("\n")
  .filter(Boolean)
  .map((line) =>
    line
      .split(" -> ")
      .map((point) => point.split(",").map((coord) => parseInt(coord)))
  );

const grainStart = 500;

const countGrains = (hasFloor) => {
  const floor =
    2 +
    cornersData.reduce(
      (acc, line) =>
        Math.max(
          acc,
          line.reduce((acc, [_, j]) => Math.max(acc, j), 0)
        ),
      0
    );

  const cave = new Array(floor)
    .fill(true)
    .map(() => new Array(grainStart * 2).fill("."));

  cave.push(new Array(grainStart * 2).fill("#"));

  cornersData.forEach((corners) =>
    corners.slice(1).forEach((cur, i) => {
      const prev = corners[i];

      const from_i = Math.min(prev[0], cur[0]);
      const from_j = Math.min(prev[1], cur[1]);
      const to_i = Math.max(prev[0], cur[0]);
      const to_j = Math.max(prev[1], cur[1]);

      for (let i = from_i; i <= to_i; i += 1) {
        for (let j = from_j; j <= to_j; j += 1) {
          cave[j][i] = "#";
        }
      }
    })
  );

  const grains = [];

  const moveGrain = ([j, i] = [0, grainStart]) => {
    if (cave[j + 1][i] === ".") {
      return moveGrain([j + 1, i]);
    } else if (cave[j + 1][i - 1] === ".") {
      return moveGrain([j + 1, i - 1]);
    } else if (cave[j + 1][i + 1] === ".") {
      return moveGrain([j + 1, i + 1]);
    }

    if (hasFloor || j !== floor - 1) {
      grains.push([j, i]);
      cave[j][i] = "o";
    }

    return hasFloor ? j !== 0 : j !== floor - 1;
  };

  while (moveGrain()) {}
  return grains.length;
};

console.log("First puzzle answer:", countGrains(false));
console.log("Second puzzle answer:", countGrains(true));
