export class cList {
	static add(target, name) {
		target.classList.add(name);
	}
	static remove(target, name) {
		target.classList.remove(name);
	}
	static toggle(target, name) {
		target.classList.toggle(name);
	}
	static contains(target, name) {
		return target.classList.contains(name);
	}
}

export class data {
	static async g() {
		const response = await fetch("data.json");
		const data = await response.json();

		return data;
	}
}
