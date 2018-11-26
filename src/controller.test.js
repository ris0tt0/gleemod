const Logger = require('js-logger');
const Model = require('./model');
const Controller = require('./controller');
const Cell = require('./cell');


Logger.useDefaults();

describe('controller matches',() =>
{
	let row, column, limit, itemTypes;
	let c0,c1,c2,c3;
	let items, model, controller;

	beforeEach(() =>
	{
		c0 =
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
		c1 = 
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
		c2 = 
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
		c3 = 
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

		items = [
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

		row = 9;
		column = 4;
		limit = 3;
		itemTypes = [2,3,4,5,6];

		model = new Model(row,column,limit,itemTypes,items);
		controller = new Controller(model);
	});

	test('expected result matches for column 0',() =>
	{
		const resultMap = controller.getMatches();
		let {indices, oldColumn,column} = resultMap.get(0);

		Logger.info(resultMap);

		// 0 => { indices: [ 1, 2, 3, 4, 5, 6, 7, 8 ],
		// 	replace:   [ 4, 5, 5, 5, 2, 5, 6, 3 ],
		// 	oldColumn: [ 1, 3, 3, 3, 2, 2, 2, 2, 6 ],
		// 	column:    [ 4, 5, 5, 5, 2, 5, 6, 3, 1 ] },
		expect(indices.length).toBe(8);
		expect(indices).toMatchObject([ 1, 2, 3, 4, 5, 6, 7, 8 ]);
		
		expect(oldColumn.length).toBe(9);
		expect(oldColumn).toMatchObject([ 1, 3, 3, 3, 2, 2, 2, 2, 6 ]);

		expect(column.length).toBe(9);
	});

	test('expected result matches for column 1',() =>
	{
		const resultMap = controller.getMatches();
		let {indices, oldColumn,column} = resultMap.get(1);

		// 1 => { indices: [ 4, 8 ],
		// 	replace:   [ 5, 5 ],
		// 	oldColumn: [ 7, 8, 9, 10, 2, 11, 12, 13, 6 ],
		// 	column:    [ 5, 5, 7, 8, 9, 10, 11, 12, 13 ] } }

		expect(indices.length).toBe(2);
		expect(indices).toMatchObject([ 4, 8 ]);

		expect(oldColumn.length).toBe(9);
		expect(oldColumn).toMatchObject([ 7, 8, 9, 10, 2, 11, 12, 13, 6 ]);
		expect(column.length).toBe(9);
		// make sure the new colunm is set in the model.
		expect(column).toMatchObject(controller.getBoardColumnType(1));
	});

	test('expected result matches for column 2',() =>
	{
		const resultMap = controller.getMatches(2);
		let {indices, oldColumn,column} = resultMap.get(2);

		// 2 => { indices: [ 0, 1, 2, 3, 4, 5, 6, 7, 8 ],
		// 	replace: [ 5, 6, 6, 3, 6, 6, 4, 6, 2 ],
		// 	oldColumn: [ 4, 4, 4, 4, 2, 6, 6, 6, 6 ],
		// 	column: [ 5, 6, 6, 3, 6, 6, 4, 6, 2 ] },

		expect(indices.length).toBe(9);
		expect(indices).toMatchObject([ 0, 1, 2, 3, 4, 5, 6, 7, 8 ]);
	
		expect(oldColumn.length).toBe(9);
		expect(oldColumn).toMatchObject([ 4, 4, 4, 4, 2, 6, 6, 6, 6 ]);
		expect(column.length).toBe(9);
		expect(column).toMatchObject(controller.getBoardColumnType(2));
	});

	test('expected result matches for column 3',() =>
	{
		const resultMap = controller.getMatches();
		let {indices, oldColumn,column} = resultMap.get(3);

		Logger.info(resultMap);

		// 3 => { indices: [ 2, 3, 4, 5, 6, 7, 8 ],
		// 	replace: [ 6, 3, 6, 6, 5, 2, 4 ],
		// 	oldColumn: [ 3, 4, 1, 1, 1, 5, 5, 5, 5 ],
		// 	column: [ 6, 3, 6, 6, 5, 2, 4, 3, 4 ] },

		expect(indices.length).toBe(7);
		expect(indices).toMatchObject([ 2, 3, 4, 5, 6, 7, 8 ]);
	
		expect(oldColumn.length).toBe(9);
		expect(column.length).toBe(9);
		expect(column).toMatchObject(controller.getBoardColumnType(3));
	});
});

describe('controller match and replcement',() =>
{
	let row, column, limit, itemTypes;
	let c0,c1,c2,c3;
	let items, model, controller;

	beforeAll(() =>
	{
		c0 =
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
		c1 = 
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
		c2 = 
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
		c3 = 
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

		items = [
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

		row = 9;
		column = 4;
		limit = 3;
		itemTypes = [2,3,4,5,6];

		model = new Model(row,column,limit,itemTypes,items);
		controller = new Controller(model);
	});

	test('',() =>
	{
		const matches = controller.getMatches();

		Logger.info(matches);
	});

	test('',() =>
	{
		const matches = controller.getMatches();

		Logger.info(matches);
	});
});