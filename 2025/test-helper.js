const originals = {
    log: console.log,
    warn: console.warn,
    error: console.error,
};

const testLog = (msg) => {
    originals.log(msg);
};

const disableLogging = () => {
    ['log', 'warn', 'error'].forEach((level) => {
        console[level] = () => {};
    });
};

const restoreLogging = () => {
    ['log', 'warn', 'error'].forEach((level) => {
        console[level] = originals[level];
    });
};

module.exports = {
    testLog,
    disableLogging,
    restoreLogging,
};
