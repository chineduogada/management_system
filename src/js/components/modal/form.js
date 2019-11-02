import { cList } from "../../utils/methods.js";
import UserCard from "./userCard.js";

import ID from "../../utils/genID.js";

import Local from "../../utils/localStorage.js";

import { MODAL_CONTENT, MODAL_CONTENT_FLAG, OVERLAY, PROFILE } from "../../DOM.js";

const users = Local.getStorage() || [];

export default class Form {
	static render(element, { id, title, inputs }) {
		let Input = ``;

		for (let i = 0; i < inputs.length; i += 1) {
			const { name, maxLength, required, type, label, icon } = inputs[i];

			let inputElement = `<input id="input-${i}" name="${name}" maxlength="${maxLength}" type="${type}" class="form-control" `;
			inputElement += required ? `required/>` : `/>`;

			Input += `
          <div class="form-group">
            ${inputElement}
            <label class="form-control-label" for="input-${i}">${label}</label>
            <i class="fa ${icon} form-control-icon"></i>
          </div>
        `;
		}

		element.innerHTML = `
        <form id="${id}" class="form">
          <h4 class="text-align-center text-t-cap p-t-1">${title}</h4>

          ${Input}

					<button class="btn-primary form-submit-btn">${
						id == "login" ? "login" : "register"
					}</button>
        </form>
      `;

		const INPUT_ALL = [...document.querySelectorAll("input")];

		const FORM = document.querySelector("form");

		INPUT_ALL.forEach((elem, i) => {
			elem.addEventListener("input", () => {
				const target = inputs[i];
				const parent = elem.parentElement;

				const regex = new RegExp(target.pattern);
				const isValid = regex.test(elem.value);
				if (!isValid) {
					elem.valid = false;
					cList.add(parent, "error");
					cList.remove(parent, "success");
				} else {
					elem.valid = true;
					cList.add(parent, "success");
					cList.remove(parent, "error");
				}

				if (elem.value) {
					parent.classList.add("slide-up");
				} else {
					parent.classList.remove("slide-up");
				}
			});
		});

		const user = {};
		let tempUser;
		let trials = 5;
		const inputTargets = [];

		FORM.addEventListener("submit", event => {
			event.preventDefault();

			let flag = false;

			const id = ID(8);
			user.password = id;

			INPUT_ALL.forEach((elem, i) => {
				const target = inputs[i];
				const regex = new RegExp(target.pattern);
				const value = elem.value;
				const name = elem.name;

				const isValid = regex.test(value);

				if (!isValid) flag = true;

				user[name] = value;
				tempUser = { ...user };
				inputTargets.push(elem);
			});

			if (!flag) {
				if (FORM.id == "register") postRequest();
				else if (FORM.id == "login") getRequest();
			} else if (flag) {
				flagger(MODAL_CONTENT_FLAG);
			}
		});

		function flagger(
			target,
			msg,
			time = 2800,
			class1 = "show",
			class2 = "hide"
		) {
			cList.add(target, class1);
			cList.remove(target, class2);

			if (msg) target.textContent = msg;

			setTimeout(() => {
				cList.add(target, class2);
				cList.remove(target, class1);
			}, time);
		}

		function getRequest() {
			const { password, email } = tempUser;

			const user = users.find(
				user => user.password == password && user.email == email
			);

			if (user) {
				setTimeout(() => {
					cList.add(PROFILE, "show")
					cList.remove(PROFILE, "hide")
				}, 2000)
				submit(user, "GET")
			}
			else {
				trials -= 1;
				flagger(
					MODAL_CONTENT_FLAG,
					"email or password is incorrect! please re-try carefully"
				);
				const children = [
					document.querySelector(".form-submit-btn"),
					...inputTargets
				];
				console.log(children, trials);

				if (!trials) {
					children.forEach(child => {
						const parent = child.parentElement;

						child.disabled = true;
						child.value = "";
						cList.add(child, "disabled");

						inputTargetDisable(parent);
					});

					console.log(user);
				}
			}

			tempUser = {};
		}

		function inputTargetDisable(parent) {
			if (cList.contains(parent, "form-group")) {
				cList.add(parent, "slide-down");
				cList.remove(parent, "slide-up");
				cList.remove(parent, "error");
				cList.remove(parent, "success");
			}
		}

		function postRequest() {
			user["full name"] = `${user["first name"]} ${user["last name"]}`;
			users.push(user);
			console.log(users);

			const value = JSON.stringify(users);

			Local.setStorage(value);

			submit(user);
		}

		function submit(props, request = "POST") {
			flagger(OVERLAY, "", 2000);

			UserCard.render(request, MODAL_CONTENT, props);
		}
	}
}
