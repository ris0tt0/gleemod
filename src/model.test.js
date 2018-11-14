const Logger = require('js-logger');
const Model = require('./model');
const Cell = require('./cell');


Logger.useDefaults();

describe('model',() =>
{
	const row = 8;
	const column = 4;
	const limit = 3;
	const itemTypes = [2,3,4,5,6];

	const c0 =
	[
		new Cell(2),
		new Cell(2),
		new Cell(2),
		new Cell(2),
		new Cell(3),
		new Cell(4),
		new Cell(4),
		new Cell(4),
	];
	const c1 = 
	[
		new Cell(5),
		new Cell(6),
		new Cell(7),
		new Cell(8),
		new Cell(9),
		new Cell(10),
		new Cell(11),
		new Cell(12),
	];
	const c2 = 
	[
		new Cell(13),
		new Cell(14),
		new Cell(15),
		new Cell(16),
		new Cell(17),
		new Cell(18),
		new Cell(19),
		new Cell(20),
	];
	const c3 = 
	[
		new Cell(21),
		new Cell(22),
		new Cell(23),
		new Cell(24),
		new Cell(25),
		new Cell(26),
		new Cell(27),
		new Cell(28),
	];

	const items = [
		c0[0],c1[0],c2[0],c3[0],
		c0[1],c1[1],c2[1],c3[1],
		c0[2],c1[2],c2[2],c3[2],
		c0[3],c1[3],c2[3],c3[3],
		c0[4],c1[4],c2[4],c3[4],
		c0[5],c1[5],c2[5],c3[5],
		c0[6],c1[6],c2[6],c3[6],
		c0[7],c1[7],c2[7],c3[7],
		c0[8],c1[8],c2[8],c3[8],
	];

	const model = new Model(row,column,limit,itemTypes,items);

	test('is Model instance',() =>
	{
		expect(model).toBeInstanceOf(Model);
	});

	test('basic properties',() =>
	{
		expect.assertions(5);

		expect(model.rows).toBe(row);
		expect(model.columns).toBe(column);
		expect(model.items).toMatchObject(items);
		expect(model.matchLimit).toBe(limit);
		expect(model.itemTypes).toMatchObject(itemTypes);
	});
});