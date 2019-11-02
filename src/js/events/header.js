import { HEADER_NAV } from "../DOM.js";
import { modalToggle } from "./modal.js";
import { cList } from "../utils/methods.js";

class Header {
	isToggled = false;

	constructor() {
		HEADER_NAV.addEventListener("click", event => {
			const element = event.target;
			const parent = event.target.parentNode;

			if (cList.contains(element, "bars-btn")) {
				const navBottom = [...HEADER_NAV.children].find(element =>
					cList.contains(element, "nav-bottom")
				);

				this.isToggled = !this.isToggled;

				if (this.isToggled) {
					cList.add(element, "fa-bars");
					cList.remove(element, "fa-close");
					element.classList.remove("fa-close");
				} else {
					cList.remove(element, "fa-bars");
					cList.add(element, "fa-close");
				}
				navBottom.classList.toggle("toggle-nav-links");
			}

			modalToggle(element, parent);
		});
	}
}

export default Header;
