const rl = require("readline").createInterface({ input: process.stdin, output: process.stdout });

/***
 * Transform the keyboard input into numbers array
 *
 * @example
 * const input = "2 3 5";
 *
 * // [2, 3, 5]
 * const numbers = inputToNumbers(input);
 * 
 * @param {string} answer
 * @returns {Array<number>} numbers
 */
const inputToNumbers = input => input.split(" ").map(Number);

/***
 * Find the path to the bottom of the pyramid which
 * will accumulate the minimum sum of the passed values
 *
 * @param {Array} rows
 */
const findFastestPath = rows => {
	// initials paths, use the first layer value
	let paths = [rows[0][0]];

	// iterate from one because the first layer values is already present in paths
	for (let i = 1; i < rows.length; i++) {
		// create the next row
		let newPaths = [];
		// the most right value of the piramyd
		newPaths[i] = paths[i - 1] + rows[i][i];
		// the most left value of the piramyd
		newPaths[0] = paths[0] + rows[i][0];

		// inbetween values check through our previous entries and see which
		// of the two paths that can land here are best. We only care about
		// the most optimal path to a particular point
		for (let j = 1; j < i; j++) {
			const min = Math.min( paths[j - 1] + rows[i][j],
				paths[j] + rows[i][j]
			);

			newPaths[j] = min;
		}
		paths = newPaths;
	}
	return Math.min.apply(Math, paths);
};

/***
 * Iterate the layers number and get the values keyboard input for each
 *
 * @param {number} layers
 * @returns the list with multiple lists containing values for each layer
 */
const readLayersValues = async layers => {
	const rows = [];
	console.log("Please write the values for this layer, put spaces between numbers, for the next layer press the 'enter' key\n");

	// iterate each pyramid layer
	for (let i = 1; i <= layers; i++) {
		const values = [];

		// block the loop until this layer will not get the values keyboard input
		await new Promise(resolve => {
			rl.question(`Values for the ${i} layer \n`, answer => {
				values.push(...inputToNumbers(answer));

				resolve();
			});
		});

		rows.push(values);
	}
	rl.close();

	return rows;
};

/***
 * Check if layers keyboard input is a number,
 * if so will pass the value to the callback, if not a number
 * will print a warning and await keyboard input again
 *
 * @param {Function} callback		callback called if layers is a number
 */
const validateLayers = callback => layers => {
	isNaN(layers)
		? rl.question(`'${layers}' is not a 'number', please write a 'number' value \n`, validateLayers(callback))
		: callback(layers);
};

// get the keyboard input for the count of pyramid layers
rl.question("Please write the number of layers to be passed \n", validateLayers(async layers => {
	// get the values list for each pyramid layer
	const values = await readLayersValues(layers);
	const fastestPath = findFastestPath(values);

	console.log(`The fastest path sum is ${fastestPath}`);
}));
