import { PrivateFields, PropertySet, HandlerList } from "../../utils/index.js";
import { Length } from "../../layout/index.js";
import { Visibility } from "../index.js";

/* Default properties for Widget class. */
const properties = new PropertySet(function() {
	return {
		x: 0,
		y: 0,
		width: 0,
		height: 0,
		hitTestEnabled: true,
		visibility: Visibility.visible,
		focusable: false
	}
});

/* Private fields for Widget class. */
const privates = new PrivateFields(function(props = {}) {
	return {
		drawHandle: undefined,

		events: {
			onClick: new HandlerList(),
			onPointerDown: new HandlerList(),
			onPointerMove: new HandlerList(),
			onPointerUp: new HandlerList(),
			onFocus: new HandlerList(),
			onFocusLost: new HandlerList()
		},
		
		get props() {
			return props;
		}
	};
});

/**
 * A widget that can be drawn 
 * on user's screen by the application.
 */
export class Widget {
	/**
	 * @param {Widget~properties} props - Initial properties.
	 */
	constructor(props) {
		privates.apply(this);
		
		Object.defineProperty(this, "application", {
			enumerable: true,
			configurable: false,
			
			get() {
				if (this.parent) {
					return this.parent.application;
				}
				
				return undefined;
			}
		});

		properties.apply(this, props);
	}

	/**
	 * Top-left x-axis coordinate of the widget.
	 * @type {number}
	 */
	get x() {
		return this.$.props.x;
	}
	
	set x(val) {
		this.$.props.x = val;
		this.invalidate();
	}

	/**
	 * Top-left y-axis coordinate of the widget.
	 * @type {number}
	 */
	get y() {
		return this.$.props.y;
	}

	set y(val) {
		this.$.props.y = val;
		this.invalidate();
	}

	get intrinsicWidth() {
		return new Length(0);
	}

	get intrinsicHeight() {
		return new Length(0);
	}

	get width() {
		return this.visibility !== Visibility.gone ? this.$.props.width : 0
	}

	set width(val) {
		this.$.props.width = Length.parse(val, () => this.parent ? this.parent.width : 0);
		this.invalidate();
	}
	
	get height() {
		return this.visibility !== Visibility.gone ? this.$.props.height : 0;
	}
	
	set height(val) {
		this.$.props.height = Length.parse(val, () => this.parent ? this.parent.height : 0);
		this.invalidate();
	}

	get hitTestEnabled() {
		return this.$.props.hitTestEnabled;
	}

	set hitTestEnabled(val) {
		this.$.props.hitTestEnabled = val;
	}

	get focusable() {
		return this.$.props.focusable;
	}

	set focusable(val) {
		this.$.props.focusable = val;
	}

	get visibility() {
		return this.$.props.visibility;
	}

	set visibility(val) {
		if (val instanceof Visibility) {
			this.$.props.visibility = val;
		}
	}

	/** @type {HandlerList} */
	get onClick() {
		return this.$.events.onClick;
	}

	set onClick(val) {
		throw new Error("Event handler lists are readonly, use the 'add(handler)' function");
	}

	/** @type {HandlerList} */
	get onPointerDown() {
		return this.$.events.onPointerDown;
	}

	set onPointerDown(val) {
		throw new Error("Event handler lists are readonly, use the 'add(handler)' function");
	}

	/** @type {HandlerList} */
	get onPointerMove() {
		return this.$.events.onPointerMove;
	}

	set onPointerMove(val) {
		throw new Error("Event handler lists are readonly, use the 'add(handler)' function");
	}

	/** @type {HandlerList} */
	get onPointerUp() {
		return this.$.events.onPointerUp;
	}

	set onPointerUp(val) {
		throw new Error("Event handler lists are readonly, use the 'add(handler)' function");
	}

	/** @type {HandlerList} */
	get onFocus() {
		return this.$.events.onFocus;
	}

	set onFocus(val) {
		throw new Error("Event handler lists are readonly, use the 'add(handler)' function");
	}

	/** @type {HandlerList} */
	get onFocusLost() {
		return this.$.events.onFocusLost;
	}

	set onFocusLost(val) {
		throw new Error("Event handler lists are readonly, use the 'add(handler)' function");
	}

	focus() {
		if (this.application) {
			this.application.focusedWidget = this;
		}
	}

	hitTest(x, y) {
		return this.hitTestEnabled && this.visibility !== Visibility.gone
			&& this.x <= x && x <= this.x + this.width
			&& this.y <= y && y <= this.y + this.height;
	}

	draw(canvas) {
		
	}
	
	invalidate() {
		if (this.application) {
			this.application.invalidate();
		}
	}
}

/**
 * @typedef {object} Widget~properties
 * @prop {number} [x = 0] Horizontal coordinate.
 * @prop {number} [y = 0] Vertical coordinate.
 * @prop {number} [width = 0] Desired width.
 * @prop {number} [height = 0] Desired height.
 * @prop {boolean} [visibility = Visibility.visible] Visibility state of the widget.
 * @prop {boolean} [hitTestEnabled = true] Whether or not the widget is valid for hit testing.
 * If disabled, the element can't be interacted with using a pointer.
 */