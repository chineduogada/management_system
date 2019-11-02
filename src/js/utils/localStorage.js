export default class Local {
	static setStorage(value, key = "management system") {
		localStorage.setItem(key, value);
	}
	static getStorage(key = "management system") {
		return JSON.parse(localStorage.getItem(key));
	}
}
