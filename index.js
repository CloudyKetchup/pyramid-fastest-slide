const rl = require("readline").createInterface({ input: process.stdin, output: process.stdout });

const inputToNumbers = answer => answer.split(" ").map(Number);

const findFastestPath = rows => {
	// initials paths
	let paths = [rows[0][0]];

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
			const min = Math.min(
				paths[j - 1] + rows[i][j],
				paths[j] + rows[i][j]
			);

			newPaths[j] = min;
		}
		paths = newPaths;
	}
	return Math.min.apply(Math, paths);
};

const getLayersValues = async layers => {
	const rows = [];
	console.log("Please write the values for this layer, put spaces between numbers, for the next layer press the 'enter' key\n");

	for (let i = 1; i <= layers; i++) {
		const values = [];

		// block the loop until this layer will not get the values
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

const validateLayers = callback => layers => {
	isNaN(layers)
		? rl.question(`'${layers}' is not a 'number', please write a 'number' value \n`, validateLayers(callback))
		: callback(layers);
};

rl.question("Please write the number of layers to be passed \n", validateLayers(async layers => {
	const values = await getLayersValues(layers)

	const fastestPath = findFastestPath(values);

	console.log(`The fastest path summ is ${fastestPath}`);
}));