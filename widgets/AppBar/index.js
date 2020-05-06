import { Color, ShadowStyle } from "../../drawing/index.js";
import { ThemeColor } from "../../resources/index.js";
import { PropertySet } from "../../utils/index.js";
import { Surface } from "../index.js";

/* Default properties for AppBar class. */
const properties = new PropertySet(function() {
	return {
		background: new ThemeColor(this, "appBarBackground", new ThemeColor(this, "primary", Color.royalBlue)),
		shadow: new ShadowStyle(0, 4, 6, Color.fromRgb(0, 0, 0, .25))
	};
});

export class AppBar extends Surface {
	constructor(props) {
		super(props);
		properties.apply(this, props);
	}
}