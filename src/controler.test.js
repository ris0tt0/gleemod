const Logger = require('js-logger');
const Model = require('./model');
const Controller = require('./controller');
const Cell = require('./cell');


Logger.useDefaults();

describe('controller',() =>
{
	const row = 9;
	const column = 4;
	const limit = 3;
	const itemTypes = [2,3,4,5,6];

	const c0 =
	[
		new Cell(1),//(0,0)
		new Cell(3),//(0,1)
		new Cell(3),//(0,2)
		new Cell(3),//(0,3)
		new Cell(2),//(0,4)
		new Cell(2),//(0,5)
		new Cell(2),//(0,6)
		new Cell(2),//(0,7)
		new Cell(6),//(0,8)
	];
	const c1 = 
	[
		new Cell(7),//(1,0)
		new Cell(8),//(1,1)
		new Cell(9),//(1,2)
		new Cell(10),//(1,3)
		new Cell(2),//(1,4)
		new Cell(11),//(1,5)
		new Cell(12),//(1,6)
		new Cell(13),//(1,7)
		new Cell(6),//(1,8)
	];
	const c2 = 
	[
		new Cell(4),//(2,0)
		new Cell(4),//(2,1)
		new Cell(4),//(2,2)
		new Cell(4),//(2,3)
		new Cell(2),//(2,4)
		new Cell(6),//(2,5)
		new Cell(6),//(2,6)
		new Cell(6),//(2,7)
		new Cell(6),//(2,8)
	];
	const c3 = 
	[
		new Cell(3),//(3,0)
		new Cell(4),//(3,1)
		new Cell(1),//(3,2)
		new Cell(1),//(3,3)
		new Cell(1),//(3,4)
		new Cell(5),//(3,5)
		new Cell(5),//(3,6)
		new Cell(5),//(3,7)
		new Cell(5),//(3,8)
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
	const controller = new Controller(model);

	test('',() =>
	{
		// Logger.info(controller.model);
		controller.getMatches();

		expect(1).toBe(1);
	});
});