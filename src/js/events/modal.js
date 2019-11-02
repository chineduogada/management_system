import Form from "../components/modal/form.js";

import { data } from "../utils/methods.js";

import { MODAL, MODAL_CONTENT } from "../DOM.js";

export function modalToggle(target, parent) {
	if (
		target.classList.contains("modal-show-btn") ||
		parent.classList.contains("modal-show-btn")
	) {
		MODAL.classList.add("modal-toggle");
		if (
			target.classList.contains("form-btn") ||
			parent.classList.contains("form-btn")
		) {
			data.g().then(data => {
				const props = data.props.find(
					d => d.id == [target.name || parent.name]
				);

				Form.render(MODAL_CONTENT, props);
			});
		}
	} else if (
		parent &&
		(target.classList.contains("modal-close-btn") ||
			parent.classList.contains("modal-close-btn"))
	) {
		MODAL.classList.remove("modal-toggle");
	}
}

class Modal {
	constructor() {
		MODAL.addEventListener("click", event => {
			const target = event.target;
			const parent = event.target.parentNode;

			modalToggle(target, parent);
		});
	}
}
export default Modal;
