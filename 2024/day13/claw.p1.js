const { openFile, readAsLines } = require('../utils/file-handler');

const BUTTONA = 'buttonA';
const BUTTONB = 'buttonB';
const PRIZE = 'prize';
const X = 'x';
const Y = 'y';

const readInput = async () => {
    const data = await openFile('inputs/claw.example.txt', __dirname);

    return readAsLines(data);
};

const parseButton = (buttonInfo) => {
    const [xInfo, yInfo] = buttonInfo.split(', ');
    const [, xNum] = xInfo.split('+');
    const [, yNum] = yInfo.split('+');
    return [parseInt(xNum, 10), parseInt(yNum, 10)];
};

const parseData = (lines) => {
    const machines = [];
    let machine = {};

    for (let line of lines) {
        if (line.startsWith('Button A')) {
            const [, button] = line.split(': ');
            const [x, y] = parseButton(button);
            machine.buttonA = { x, y };
        } else if (line.startsWith('Button B')) {
            const [, button] = line.split(': ');
            const [x, y] = parseButton(button);
            machine.buttonB = { x, y };
        } else if (line.startsWith('Prize')) {
            const [, goal] = line.split(': ');
            const [xGoal, yGoal] = goal.split(', ');
            const [, xNum] = xGoal.split('=');
            const [, yNum] = yGoal.split('=');
            machine.prize = { x: parseInt(xNum, 10), y: parseInt(yNum, 10) };
        }

        if (machine[BUTTONA] && machine[BUTTONB] && machine[PRIZE]) {
            machines.push(machine);
            machine = {};
        }
    }

    return machines;
};

// While part 1 could be solved with brute force by recursively or iteratively trying all combinations
// to find the right answer, I had a feeling that part 2 would make that solution unworkable.
// After a bit of research, found that Cramer's Rule would work for solving for two unknowns (A & B)
// using linear algebra, which this function implements.
const calculatePushes = (machine) => {
    const determinant = machine[BUTTONA][X] * machine[BUTTONB][Y] - machine[BUTTONA][Y] * machine[BUTTONB][X];
    const a =
        (machine[PRIZE][X] * machine[BUTTONB][Y] - machine[PRIZE][Y] * machine[BUTTONB][X]) / determinant;
    const b =
        (machine[PRIZE][Y] * machine[BUTTONA][X] - machine[PRIZE][X] * machine[BUTTONA][Y]) / determinant;

    if (Number.isInteger(a) && Number.isInteger(b)) {
        return a * 3 + b;
    } else {
        return 0;
    }
};

const getResult = async () => {
    const data = await readInput();
    const machines = parseData(data);
    return machines.reduce((tally, machine) => tally + calculatePushes(machine), 0);
};

if (!module.parent) {
    getResult().then(console.log);
}

module.exports = {
    getResult,
};
