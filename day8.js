const data = `
30373
25512
65332
33549
35390
`
.split('\n')
.filter(Boolean)

const rows = data
    .map(line => line.split(''));

const columns = rows[0]
    .map((_, i) => rows
        .map(row => row[i]));

const getVisibility = (arr, height) => {
    let i = 0;
    while (height > arr[i]) i++;
    return i + (i < arr.length ? 1 : 0);
}

const scenicScore = (i, j) => {
    const height = rows[j][i];
    return getVisibility(rows[j].slice(0, i).reverse(), height)
        * getVisibility(rows[j].slice(i + 1), height)
        * getVisibility(columns[i].slice(0, j).reverse(), height)
        * getVisibility(columns[i].slice(j + 1), height)
}

const isVisible = (i, j) => {
    const height = rows[j][i];
    return Math.max(...rows[j].slice(0, i), -1) < height
        || Math.max(...rows[j].slice(i + 1), -1) < height
        || Math.max(...columns[i].slice(0, j), -1) < height
        || Math.max(...columns[i].slice(j + 1), -1) < height;
}

const countVisible =
    rows.reduce((sum, row, j) => 
        sum + row.reduce((rowSum, tree, i) =>
            rowSum + (isVisible(i, j) ? 1 : 0), 0), 0);

const scenicScores =
    rows.reduce((arr, row, j) => [...arr,
        ...row.reduce((rowArr, tree, i) =>
            [...rowArr, scenicScore(i, j)], [])], []);


console.log('First puzzle answer:', countVisible);
console.log('Second puzzle answer:', Math.max(...scenicScores));

