const data = `
$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k
`
.split('\n')
.filter(x => x);

class Node {
    constructor (name, parent, size) {
        this.name = name;
        this.parentNode = parent;
        this.sizeValue = size;

        if (parent) {
            this.rootNode = parent.root()
        }

        if (!size) {
            this.children = []
        }
    }

    root() {
        return this.rootNode || this;
    }

    parent() {
        return this.parentNode || this;
    }

    child(name) {
        return this.children
            .find(c => c.name === name);
    }

    addChild(child) {
        this.children.push(child);
    }

    size() {
        return this.sizeValue 
            || this.children
                .map(c => c.size())
                .reduce((sum, size) => sum + size, 0);
    }

    getDirSizes(acc = []) {
        return this.children
        ?    [
                ...(this.children
                        .map(c => c.getDirSizes(acc))
                        .flat()),
                this.size()
            ]
        : acc;
    }
}

const tree = data.reduce((curDir, line) => {
    if(line[0] === '$') {
        const [_, command, path] = line.split(' ');
        if(command === 'cd') {
            if (path === '/') {
                return curDir.root() || curDir;
            } else if (path === '..') {
                return curDir.parent() || curDir;
            } else {
                let targetDir = curDir.child(path)
                if (!targetDir) {
                    targetDir = new Node(path, curDir)
                    curDir.addChild(targetDir);
                }
                return targetDir;
            }
        }
    } else {
        const [sizeOrDir, name] = line.split(' ');
        if (sizeOrDir === 'dir') {
            let targetDir = curDir.child(name)
            if (!targetDir) {
                targetDir = new Node(name, curDir)
                curDir.addChild(targetDir);
            }
        } else {
            let file = curDir.child(name);
            if (!file) {
                file = new Node(name, curDir, parseInt(sizeOrDir));
                curDir.addChild(file);
            }
        }
    }
    return curDir;
}, new Node('/'))

const result1 = tree
    .root()
    .getDirSizes()
    .filter(v => v < 100000)
    .reduce((acc, item) => acc + item, 0);

const result2 = tree
    .root()
    .getDirSizes()
    .filter(v => v > tree.root().size() - 40000000)
    .sort((a,b) => a > b ? 1 : -1)[0];

console.log('First puzzle answer:', result1);
console.log('Second puzzle answer:', result2);


