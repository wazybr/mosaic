import { PrivateFields } from "../index.js";
import { Widget } from "../../core/index.js";

/* Private fields for WidgetList class */
const privates = new PrivateFields(function() {
    return {
        list: [],
        observers: [],

        notify(added, removed) {
            for (let observer of this.$.observers) {
                observer(this, added, removed);
            }
        }
    };
});

/**
 * An observable list of widgets.
 */
export class WidgetList {
    /**
     * @param {Widget[]} widgets - Initial widgets to be stored in the list.
     */
    constructor(widgets) {
        privates.apply(this);

        if (Array.isArray(widgets)) {
            for (let widget of widgets) {
                if (widget instanceof Widget && !this.$.list.includes(widget)) {
                    this.$.list.push(widget);
                }
            }
        }
    }

    /**
     * The number of widgets in the list.
     * @type {number}
     */
    get length() {
        return this.$.list.length;
    }

    /**
     * Add one or more widgets to the list.
     * @param {...Widget} widgets - Widgets to add.
     */
    add(...widgets) {
        for (let widget of widgets) {
            if (!(widget instanceof Widget)) {
                throw new Error("Only Widgets can be added to WidgetList");
            }
        }

        this.$.list.push(...widgets);
        this.$.notify([...widgets], []);
    }

    /**
     * Remove widget from the list.
     * @param {Widget} widget - Widget to remove.
     * @returns {boolean} Wheter or not the widget was removed from the list.
     */
    remove(widget) {
        const idx = this.$.list.indexOf(widget);
        
        if (idx >= 0) {
            this.$.list.splice(idx, 1);
            this.$.notify([], [widget]);
            return true;
        }

        return false;
    }

    /**
     * Get widget position in the list.
     * @param {Widget} widget - Widget to get position.
     * @returns {number} Position of the widget or -1 if not there.
     */
    indexOf(widget) {
        return this.$.list.indexOf(widget);
    }

    /**
     * Get widget based on it's position in the list.
     * @param {number} index - Position of the desired widget.
     * @returns {Widget} Widget at the specified position.
     */
    get(index) {
        return this.$.list[index];
    }

    /**
     * Insert widget in the specified position.
     * @param {number} index - Desired position.
     * @param {Widget} widget - Widget to insert.
     * @returns {number} Position where the widget was inserted.
     */
    insert(index, widget) {
        if (!(widget instanceof Widget)) {
            throw new Error("Only Widgets can be added to WidgetList");
        }

        index = Math.min(Math.max(0, index), this.length);
        this.$.list.splice(index, 0, widget);
        this.$.notify([widget], []);
        return index;
    }

    /**
     * Register an observer to be notified about changes on the list.
     * @param {WidgetList~observer} callback - Function that will be called when changes occurs.
     */
    observe(callback) {
        if (!this.$.observers.includes(callback)) {
            this.$.observers.push(callback);
        }
    }

    /**
     * Unregister list changes observer.
     * @param {WidgetList~observer} callback - Function to unregister.
     */
    unobserve(callback) {
        const idx = this.$.observers.indexOf(callback);

        if (idx >= 0) {
            this.$.observers.splice(idx, 1);
        }
    }

    /**
     * Create a static array based on this list.
     * @returns {Widget[]}
     */
    toArray() {
        return Array.from(this);
    }

    [Symbol.iterator]() {
        return this.$.list.values();
    }
}

/**
 * @callback WidgetList~observer
 * @param {Widget[]} added - Widgets that were added to the list.
 * @param {Widget[]} removed - Widgets that were removed from the list.
 */