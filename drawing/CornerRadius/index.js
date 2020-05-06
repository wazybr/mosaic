import { PrivateFields } from "../../utils/index.js";
import { Length } from "../../layout/index.js";

/* Private fields for CornerRadius class */
const privates = new PrivateFields(function() {
    return {
        topLeft: 0,
        topRight: 0,
        bottomRight: 0,
        bottomLeft: 0
    };
});

/**
 * Class to represent corner radiuses.
 */
export class CornerRadius {
    /**
    * Creates a CornerRadius object. If only the first argument is
    * provided it is assumed for all corners.
    * 
    * @param {(Length|number)} topLeft - Top-left corner radius.
    * @param {(Length|number)} topRight - Top-right corner radius.
    * @param {(Length|number)} bottomRight - Bottom-right corner radius.
    * @param {(Length|number)} bottomLeft - Bottom-left corner radius.
    */
    constructor(topLeft, topRight, bottomRight, bottomLeft) {
        if (arguments.length === 1) {
            bottomLeft = bottomRight = topRight = topLeft;
        } else if (arguments.length !== 4) {
            throw new Error("CornerRadius constructor must be called with 1 or 4 arguments");
        }

        privates.apply(this);

        this.topLeft = topLeft;
        this.topRight = topRight;
        this.bottomRight = bottomRight;
        this.bottomLeft = bottomLeft;
    }

    /**
     * Whether all corners are sharp, with 0 radius.
     * @type {boolean}
     */
    get isSharp() {
        return !!(this.topLeft === 0 && this.topRight === 0 && this.bottomRight === 0 && this.bottomLeft === 0);
    }

    /** 
     * Top-left corner radius.
     * @type {number|Length}
     * */
    get topLeft() {
        return this.$.topLeft;
    }

    set topLeft(val) {
        if (isFinite(val) && val >= 0) {
            this.$.topLeft = val;
        } else {
            throw new Error("Corner radius must be a finite positive number");
        }
    }

    /** 
     * Top-right corner radius.
     * @type {number|Length}
     * */
    get topRight() {
        return this.$.topRight;
    }

    set topRight(val) {
        if (isFinite(val) && val >= 0) {
            this.$.topRight = val;
        } else {
            throw new Error("Corner radius must be a finite positive number");
        }
    }

    /** 
     * Bottom-right corner radius.
     * @type {number|Length}
     * */
    get bottomRight() {
        return this.$.bottomRight;
    }

    set bottomRight(val) {
        if (isFinite(val) && val >= 0) {
            this.$.bottomRight = val;
        } else {
            throw new Error("Corner radius must be a finite positive number");
        }
    }

    /** 
     * Bottom-left corner radius.
     * @type {number|Length}
     * */
    get bottomLeft() {
        return this.$.bottomLeft;
    }

    set bottomLeft(val) {
        if (isFinite(val) && val >= 0) {
            this.$.bottomLeft = val;
        } else {
            throw new Error("Corner radius must be a finite positive number");
        }
    }
}