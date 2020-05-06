import { Color, ShadowStyle, CornerRadius, RectangleShape } from "../../drawing/index.js";
import { ThemeColor } from "../../resources/index.js";
import { PropertySet } from "../../utils/index.js";
import { Surface } from "../index.js";

/* Default properties for Button class. */
const properties = new PropertySet(function() {
	return {
		background: new ThemeColor(this, "primary", Color.royalBlue),
		shadow: new ShadowStyle(0, 2, 4, Color.fromRgb(0, 0, 0, .25)),
		shape: new RectangleShape(new CornerRadius(4)),
		focusable: true
	};
});

export class Button extends Surface {
	constructor(props) {
		super(props);
		properties.apply(this, props);
	}
}