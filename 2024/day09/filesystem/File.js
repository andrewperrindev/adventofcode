const Space = require('./Space');

module.exports = class File extends Space {
    constructor(id, blocks) {
        super(blocks);
        this.id = id;
    }

    get isFree() {
        return false;
    }
};
