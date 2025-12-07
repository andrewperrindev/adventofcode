const { openFile, readAsLines } = require('../utils/file-handler');

class MathProblem {
    constructor() {
        this.numbers = [];
        this.operator = null;
    }

    processValue(value) {
        if (['+', '*'].includes(value)) {
            this.operator = value;
        } else {
            this.numbers.push(parseInt(value, 10));
        }
    }

    calculate() {
        if (this.numbers.length === 0 || !this.operator) {
            return 0;
        }

        return this.numbers.reduce((acc, num) => {
            switch (this.operator) {
                case '+':
                    return acc + num;
                case '*':
                    return acc * num;
                default:
                    return acc;
            }
        });
    }
}

const processLine = (line) => {
    return line.split(/\s+/);
};

const readInput = async () => {
    const data = await openFile('inputs/math.example.txt', __dirname);
    let lines = readAsLines(data);
    return lines.map(processLine);
};

const includeLine = (mathProblems, line) => {
    line.forEach((item, index) => {
        let mathProblem = mathProblems[index] ?? new MathProblem();
        mathProblem.processValue(item.trim());
        mathProblems[index] = mathProblem;
    });
}

const getResult = async () => {
    const lines = await readInput();
    let mathProblems = [];

    lines.forEach((line) => includeLine(mathProblems, line));

    return mathProblems.reduce((acc, problem) => acc + problem.calculate(), 0);
};

getResult().then((result) => {
    console.log(result);
});

module.exports = {
    getResult,
};
