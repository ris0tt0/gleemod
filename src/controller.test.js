const Controller = require('./controller');
const Cell = require('./cell');
const Model = require('./model');
const Logger = require('js-logger');

Logger.useDefaults();

describe('testing controller',() =>
{
	const rows = 4;
	const columns = 4;
	const itemTypes = [0,1];

	const controller = new Controller(columns,rows,itemTypes);
	
	test('instance of controller',() =>
	{
		expect(controller).toBeInstanceOf(Controller);
	});
});

describe('testing match data',() =>
{
	let c0,c1,c2,c3,c4,c5,c6,matches;

	const rows = 9;
	const columns = 7;
	const itemTypes = [0,1];

	const controller = new Controller(columns,rows,itemTypes);
	/**
	 * TODO use manuel mock.
	 */
	const model = new Model();
	model.rows = rows;
	model.columns = columns;
	model.itemTypes = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
	// overwrite
	controller.model = model;

	beforeAll(() =>
	{
		c0 = [
			new Cell(3),//(0,0)
			new Cell(4),//(0,1)
			new Cell(5),//(0,2)
			new Cell(21),//(0,3)
			new Cell(7),//(0,4)
			new Cell(8),//(0,5)
			new Cell(9),//(0,6)
			new Cell(10),//(0,7)
			new Cell(11),//(0,8)
		];
		c1 = [
			new Cell(12),//(1,0)
			new Cell(13),//(1,1)
			new Cell(14),//(1,2)
			new Cell(21),//(1,3)
			new Cell(16),//(1,4)
			new Cell(17),//(1,5)
			new Cell(18),//(1,6)
			new Cell(19),//(1,7)
			new Cell(20),//(1,8)
		];
		c2 = [
			new Cell(2),//(2,0)
			new Cell(2),//(2,1)
			new Cell(2),//(2,2)
			new Cell(21),//(2,3)
			new Cell(1),//(2,4)
			new Cell(1),//(2,5)
			new Cell(1),//(2,6)
			new Cell(1),//(2,7)
			new Cell(1),//(2,8)
		];

		c3 = [
			new Cell(22),//(3,0)
			new Cell(23),//(3,1)
			new Cell(24),//(3,2)
			new Cell(25),//(3,3)
			new Cell(27),//(3,4)
			new Cell(28),//(3,5)
			new Cell(29),//(3,6)
			new Cell(30),//(3,7)
			new Cell(46),//(3,8)
		];

		c4 = [
			new Cell(35),//(4,0)
			new Cell(36),//(4,1)
			new Cell(37),//(4,2)
			new Cell(21),//(4,3)
			new Cell(42),//(4,4)
			new Cell(43),//(4,5)
			new Cell(44),//(4,6)
			new Cell(45),//(4,7)
			new Cell(46),//(4,8)
		];
		c5 = [
			new Cell(47),//(4,0)
			new Cell(48),//(4,1)
			new Cell(49),//(4,2)
			new Cell(21),//(4,3)
			new Cell(51),//(4,4)
			new Cell(52),//(4,5)
			new Cell(53),//(4,6)
			new Cell(54),//(4,7)
			new Cell(46),//(4,8)
		];
		c6 = [
			new Cell(56),//(4,0)
			new Cell(57),//(4,1)
			new Cell(58),//(4,2)
			new Cell(21),//(4,3)
			new Cell(60),//(4,4)
			new Cell(61),//(4,5)
			new Cell(61),//(4,6)
			new Cell(61),//(4,7)
			new Cell(61),//(4,8)
		];
	
		model.items = [
			c0[0],c1[0],c2[0],c3[0],c4[0],c5[0],c6[0],
			c0[1],c1[1],c2[1],c3[1],c4[1],c5[1],c6[1],
			c0[2],c1[2],c2[2],c3[2],c4[2],c5[2],c6[2],
			c0[3],c1[3],c2[3],c3[3],c4[3],c5[3],c6[3],
			c0[4],c1[4],c2[4],c3[4],c4[4],c5[4],c6[4],
			c0[5],c1[5],c2[5],c3[5],c4[5],c5[5],c6[5],
			c0[6],c1[6],c2[6],c3[6],c4[6],c5[6],c6[6],
			c0[7],c1[7],c2[7],c3[7],c4[7],c5[7],c6[7],
			c0[8],c1[8],c2[8],c3[8],c4[8],c5[8],c6[8],
		];

		matches = controller.checkForMatches();
	});

	test('correct data format',() =>
	{
		expect(matches).toBeInstanceOf(Object);
	});

	test('column matches',() =>
	{
		// expect();
	});
});

describe('testing match data',() =>
{
	let c0,c1,c2,matches;

	const rows = 4;
	const columns = 3;
	const itemTypes = [0,1];

	const controller = new Controller(columns,rows,itemTypes);
	/**
	 * TODO use manuel mock.
	 */
	const model = new Model();
	model.rows = rows;
	model.columns = columns;
	model.itemTypes = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
	// overwrite
	controller.model = model;

	beforeAll(() =>
	{
		c0 = [
			new Cell(3),//(0,0)
			new Cell(4),//(0,1)
			new Cell(5),//(0,2)
			new Cell(6),//(0,3)
		];
		c1 = [
			new Cell(12),//(1,0)
			new Cell(13),//(1,1)
			new Cell(14),//(1,2)
			new Cell(7),//(1,3)
		];
		c2 = [
			new Cell(2),//(2,0)
			new Cell(2),//(2,1)
			new Cell(2),//(2,2)
			new Cell(21),//(2,3)
		];
		model.items = [
			c0[0],c1[0],c2[0],
			c0[1],c1[1],c2[1],
			c0[2],c1[2],c2[2],
			c0[3],c1[3],c2[3],
		];

		matches = controller.checkForMatches();
	});

	test('correct data format',() =>
	{
		expect(matches).toBeInstanceOf(Object);
	});

	test('column matches replacement',() =>
	{
		let col,value,cell;
		for( let entry of matches.entries())
		{
			col = entry[0];
			value = entry[1];

			for( let i = 0; i< value.indices.length;i++)
			{
				cell = model.getItemByCoords(col,value.indices[i]);
				
				expect(cell.cellType).toBe(value.replace[i]);
			}
		}
	});
});

describe('testing match data',() =>
{
	let c0,c1,c2,matches;

	const rows = 4;
	const columns = 3;
	const itemTypes = [0,1];

	const controller = new Controller(columns,rows,itemTypes);
	/**
	 * TODO use manuel mock.
	 */
	const model = new Model();
	model.rows = rows;
	model.columns = columns;
	model.itemTypes = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
	// overwrite
	controller.model = model;

	beforeEach(() =>
	{
		c0 = [
			new Cell(1),//(0,0)
			new Cell(2),//(0,1)
			new Cell(3),//(0,2)
			new Cell(4),//(0,3)
		];
		c1 = [
			new Cell(5),//(1,0)
			new Cell(6),//(1,1)
			new Cell(7),//(1,2)
			new Cell(8),//(1,3)
		];
		c2 = [
			new Cell(8),//(2,0)
			new Cell(9),//(2,1)
			new Cell(0),//(2,2)
			new Cell(11),//(2,3)
		];
		model.items = [
			c0[0],c1[0],c2[0],
			c0[1],c1[1],c2[1],
			c0[2],c1[2],c2[2],
			c0[3],c1[3],c2[3],
		];

		matches = controller.checkForMatches();
	});

	test('empty matches',() =>
	{
		expect(matches.size).toBe(0);
	});
});

describe('testing match data remove matches',() =>
{
	let c0,c1,c2,matches;

	const rows = 4;
	const columns = 3;
	const itemTypes = [0,1];

	const controller = new Controller(columns,rows,itemTypes);
	/**
	 * TODO use manuel mock.
	 */
	const model = new Model();
	model.rows = rows;
	model.columns = columns;
	model.itemTypes = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
	// overwrite
	controller.model = model;

	beforeEach(() =>
	{
		c0 = [
			new Cell(1),//(0,0)
			new Cell(1),//(0,1)
			new Cell(1),//(0,2)
			new Cell(3),//(0,3)
		];
		c1 = [
			new Cell(2),//(1,0)
			new Cell(2),//(1,1)
			new Cell(2),//(1,2)
			new Cell(3),//(1,3)
		];
		c2 = [
			new Cell(4),//(2,0)
			new Cell(4),//(2,1)
			new Cell(4),//(2,2)
			new Cell(3),//(2,3)
		];
		model.items = [
			c0[0],c1[0],c2[0],
			c0[1],c1[1],c2[1],
			c0[2],c1[2],c2[2],
			c0[3],c1[3],c2[3],
		];

		matches = controller.checkForMatches();
	});

	test('remove matches',() =>
	{
		Logger.info('remove matches');

		controller.removeMatchesFromBoard();
		matches = controller.checkForMatches();

		expect(matches.size).toBe(0);
	});
});


describe('testing match data remove matches',() =>
{
	let c0,c1,matches;

	const rows = 10;
	const columns = 2;
	const itemTypes = [0,1,3,4,5,6];

	const controller = new Controller(columns,rows,itemTypes);
	/**
	 * TODO use manuel mock.
	 */
	const model = new Model();
	model.rows = rows;
	model.columns = columns;
	model.itemTypes = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
	// overwrite
	controller.model = model;

	beforeEach(() =>
	{
		c0 = [
			new Cell(1),//(0,0)
			new Cell(1),//(0,1)
			new Cell(1),//(0,2)
			new Cell(3),//(0,3)
			new Cell(4),//(0,4)
			new Cell(4),//(0,5)
			new Cell(4),//(0,6)
			new Cell(4),//(0,7)
			new Cell(5),//(0,8)
			new Cell(6),//(0,9)
			new Cell(7),//(0,10)

		];
		c1 = [
			new Cell(8),//(1,0)
			new Cell(9),//(1,1)
			new Cell(9),//(1,2)
			new Cell(9),//(1,3)
			new Cell(9),//(1,4)
			new Cell(10),//(1,5)
			new Cell(1),//(1,6)
			new Cell(1),//(1,7)
			new Cell(1),//(1,8)
			new Cell(3),//(1,9)
			new Cell(3),//(1,10)

		];
		model.items = [
			c0[0],c1[0],
			c0[1],c1[1],
			c0[2],c1[2],
			c0[3],c1[3],
			c0[4],c1[4],
			c0[5],c1[5],
			c0[6],c1[6],
			c0[7],c1[7],
			c0[8],c1[8],
			c0[9],c1[9],
			c0[10],c1[10],
		];

		matches = controller.checkForMatches();
	});

	test('remove matches',() =>
	{
		Logger.info('remove matches');

		controller.removeMatchesFromBoard();
		matches = controller.checkForMatches();

		expect(matches.size).toBe(0);
	});
});