const Cell = require('./cell');

describe('testing item cell',() =>
{
	const cell = new Cell();

	test('instantiate',() =>
	{
		expect(cell).toBeInstanceOf(Cell);
	});
});