const { openFile, readAsLines } = require('../utils/file-handler');

const readInput = async () => {
    const data = await openFile('inputs/mul.example.txt');

    return readAsLines(data);
};

const findCommands = (line) => {
    const matches = [...line.matchAll(/do\(\)|don't\(\)|mul\([0-9]{1,3},[0-9]{1,3}\)/g)];
    return matches.map((match) => match[0]);
};

// We should evaluate `mul` commands moving forward if this command !== "don't".
// Assumes `command` param is not `mul`.
const shouldEvaluate = (command) => !command.startsWith("don't");

const evaluateMul = (mulString) => {
    const matches = [...mulString.matchAll(/[0-9]{1,3}/g)];
    const numStrs = matches.map((match) => match[0]);
    return numStrs.reduce((currentTotal, numStr) => currentTotal * parseInt(numStr, 10), 1);
};

const evaluateAllCommands = (commandStrings) => {
    const results = [];
    let evaluate = true;

    commandStrings.forEach((command) => {
        if (command.startsWith('do')) {
            evaluate = shouldEvaluate(command);
        } else {
            if (evaluate) {
                results.push(evaluateMul(command));
            }
        }
    });

    return results;
}

const getSum = async() => {
    const lines = await readInput();

    const commandStrings = lines.reduce((commands, line) => [...commands, ...findCommands(line)], []);
    const results = evaluateAllCommands(commandStrings);
    return results.reduce((sum, result) => sum + result, 0);
}

getSum().then((result) => {
    console.log(result);
});
