const data = `
Blueprint 1: Each ore robot costs 4 ore. Each clay robot costs 2 ore. Each obsidian robot costs 3 ore and 14 clay. Each geode robot costs 2 ore and 7 obsidian.

Blueprint 2: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 8 clay. Each geode robot costs 3 ore and 12 obsidian.
`;

const units = ['ore', 'clay', 'obsidian', 'geode'];
const costsRegexps = units.map(unit => new RegExp(` \(\\d+\) \(${unit}\)`));

const getCosts = line => line
    .split('and')
    .reduce((costs, item) => {
        costsRegexps.forEach(regexp => {
            const [_, cost, unit] = item.match(regexp) || [];
            unit && (costs[units.indexOf(unit)] = parseInt(cost));
        })
        return costs;
    }, [0, 0, 0, 0]);


const blueprints = data
    .split('\n')
    .filter(Boolean)
    .map(blueprint => blueprint
        .split('.')
        .filter(Boolean)
        .map(getCosts));

const canBuy = (resources, cost) => cost.every((unitCost, i) => unitCost <= resources[i]);
const add = (a, b) => a.map((_, i) => a[i] + b[i]); 
const sub = (a, b) => a.map((_, i) => a[i] - b[i]);

const dfs = (costs, step, robots = [1, 0, 0, 0], resources = [0, 0, 0, 0], cache = {}) => {
    const key = `${step} ${robots.join(',')} ${resources.join(',')}`;

    if (cache[key] !== undefined) {
        return cache[key];
    }

    if (step === 0){
        return resources[3];
    }

    const variants = [];

    costs.slice(2).forEach((cost, i) => {
        if (canBuy(resources, cost)) {
            variants.push(dfs(
                costs,
                step - 1,
                robots.map((robot, j) => robot + (i + 2 === j)),
                add(sub(resources, cost), robots),
                cache)
            );
        }
    })

    if (!variants.length) {
        costs.slice(0, 2).forEach((cost, i) => {
            if (canBuy(resources, cost)) {
                variants.push(dfs(
                    costs,
                    step - 1,
                    robots.map((robot, j) => robot + (i === j)),
                    add(sub(resources, cost), robots),
                    cache)
                );
            }
        });

        variants.push(dfs(
            costs,
            step - 1,
            robots,
            add(resources, robots),
            cache)
        );
    }

    cache[key] = Math.max(...variants);
    return cache[key];
}

const result1 = blueprints
    .reduce((acc, blueprint, i) => acc + dfs(blueprint, 24) * (i + 1), 0);

const result2 = blueprints
    .reduce((acc, blueprint, i) => acc * dfs(blueprint, 32), 1);

console.log('First puzzle answer:', result1);
console.log('Second puzzle answer:', result2);
