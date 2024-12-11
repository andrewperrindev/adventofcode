const Space = require('./Space');
const File = require('./File');

module.exports = class Filesystem {
    constructor(initData) {
        let isFile = true;

        this.contents = initData.map((item, index) => {
            let result;

            if (isFile) {
                result = new File(index / 2, item);
            } else {
                result = new Space(item);
            }

            isFile = !isFile;
            return result;
        });
    }

    get freeSpaceCount() {
        return this.contents.filter((item) => item.isFree).length;
    }

    get checksum() {
        let block = 0;

        return this.contents.reduce((tally, space) => {
            for (let i = 0; i < space.blocks; i++) {
                if (!space.isFree) {
                    tally += block * space.id;
                }
                block++;
            }
            return tally;
        }, 0);
    }

    at(index) {
        return this.contents.at(index);
    }

    findIndex(predicate) {
        return this.contents.findIndex(predicate);
    }

    findLastIndex(predicate) {
        return this.contents.findLastIndex(predicate);
    }

    move(fromIndex, toIndex) {
        const file = this.at(fromIndex);
        const free = this.at(toIndex);
        let newFree;

        if (file.isFree || !free.isFree) {
            return;
        }

        if (file.blocks >= free.blocks) {
            [newFree] = this.contents.splice(toIndex, 1, new File(file.id, free.blocks));

            if (file.blocks > free.blocks) {
                file.blocks -= free.blocks;
            } else if (file.blocks === free.blocks) {
                this.contents.splice(fromIndex, 1);
            }
        } else {
            const [fileSpace] = this.contents.splice(fromIndex, 1);
            newFree = new Space(file.blocks);

            free.blocks -= file.blocks;
            this.contents.splice(toIndex, 0, fileSpace);
            // Even though the net total blocks remains the same (we removed the file
            // at `fromIndex` and inserted it at `toIndex`), we now have an extra
            // element preceding `fromIndex` (there used to be just the free space --
            // now there's the remaining free space PLUS the relocated file).
            // To compensate, increment `fromIndex` so we add the displaced free
            // space in the correct location.
            fromIndex++;
        }

        // Replace moved file blocks with free space
        this.contents.splice(fromIndex, 0, newFree);
    }

    compact() {
        let indexA = 0;
        let indexB = 1;

        while (this.contents.length > 1 && indexA < this.contents.length && indexB < this.contents.length) {
            if (
                (this.at(indexA).isFree && this.at(indexB).isFree) ||
                this.at(indexA).id === this.at(indexB).id
            ) {
                this.at(indexA).blocks += this.at(indexB).blocks;
                this.contents.splice(indexB, 1);
            } else {
                indexA++;
                indexB++;
            }
        }
    }
};
