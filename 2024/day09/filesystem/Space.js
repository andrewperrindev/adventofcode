module.exports = class Space {
    constructor(blocks) {
        this.blocks = blocks;
    }

    get isFree() {
        return true;
    }
};
