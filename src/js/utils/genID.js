const chars = [
	"a",
	"A",
	"b",
	"B",
	"c",
	"C",
	"d",
	"D",
	1,
	"e",
	"E",
	"f",
	"F",
	"g",
	"G",
	"h",
	"H",
	2,
	"i",
	"I",
	"j",
	"J",
	4,
	"k",
	"K",
	"l",
	"L",
	3,
	"m",
	"M",
	"n",
	"N",
	"o",
	"o",
	"p",
	"P",
	"q",
	"Q",
	8,
	"r",
	"R",
	"s",
	"S",
	6,
	"t",
	"T",
	"u",
	0,
	"U",
	"v",
	"V",
	"w",
	5,
	"W",
	"x",
	"X",
	7,
	"y",
	"Y",
	"z",
	"Z",
	9
];

let randNum = Math.floor(Math.random() * 15) + 21;

export default function ID(context) {
	let id = "";

	if (context) randNum = context;

	for (let i = 0; i < randNum; i += 1) {
		const index = Math.floor(Math.random() * chars.length);

		function randomChar() {
			return chars[index];
		}
		const char = randomChar();

		id += char;
	}

	return id;
}
