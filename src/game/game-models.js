const beggining = String.raw`
---------
|
|
|
|
|
`;

const head = String.raw`
---------
|     O
|
|
|
|
`;

const body = String.raw`
---------
|     O
|     |
|
|
|
`;

const leftArm = String.raw`
---------
|     O
|    /|
|
|
|
`;

const rightArm = String.raw`
---------
|     O
|    /|\
|
|
|
`;

const leftLeg = String.raw`
---------
|     O
|    /|\
|    /
|
|
`;

const rightLeg = String.raw`
---------
|     O
|    /|\
|    / \
|
|
`;

const mapModels = new Map([
	[6, beggining],
	[5, head],
	[4, body],
	[3, leftArm],
	[2, rightArm],
	[1, leftLeg],
	[0, rightLeg]
]);

module.exports = {
	mapModels
};
