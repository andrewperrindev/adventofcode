const { openFile } = require('../utils/file-handler');

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
    return line.split('');
};

const rotate = (line, rotated) => {
    line.forEach((item, index) => {
        rotated[index] = rotated[index] ?? [];
        rotated[index].push(item);
    });

    return rotated;
}

const readInput = async () => {
    const data = await openFile('inputs/math.example.txt', __dirname);
    let lines = data.split('\n');
    let arrayLines = lines.map(processLine);
    let rotated = [];

    arrayLines.forEach((line) => {
        rotated = rotate(line, rotated);
    });

    return rotated;
};

const includeLine = (mathProblem, line) => {
    let number = line.substr(0, line.length - 1).trim();
    let operator = line.at(line.length - 1).trim();
    mathProblem.processValue(number);

    if (operator) {
        mathProblem.processValue(operator);
    }
}

const getResult = async () => {
    const lines = await readInput();
    let mathProblems = [new MathProblem()];

    lines.forEach((line) => {
        let lineString = line.join('');

        if (lineString.trim() === '') {
            mathProblems.push(new MathProblem());
        } else {
            let mathProblem = mathProblems.at(-1);
            includeLine(mathProblem, lineString);
        }
    });

    return mathProblems.reduce((acc, problem) => acc + problem.calculate(), 0);
};

getResult().then((result) => {
    console.log(result);
});

module.exports = {
    getResult,
};
