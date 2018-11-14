const Logger = require('js-logger');
const Model = require('./model');
const Cell = require('./cell');

Logger.useDefaults();

describe('Model should error out with bad data',() =>
{
	test('Throws error',() =>
	{
		expect(()=>{
			new Model(0,0,3,[1,2,3],[3,3,]);
		}).toThrowError();
	});
});

describe('results from model',() =>
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

	test('item by coords',() =>
	{
		expect.assertions(5);

		expect(model.getItemByCoords(2,4)).toMatchObject(c2[4]);
		expect(model.getItemByCoords(1,8)).toMatchObject(c1[8]);
		expect(model.getItemByCoords(1,6)).toMatchObject(c1[6]);
		expect(model.getItemByCoords(3,2)).toMatchObject(c3[2]);
		expect(model.getItemByCoords(2,1)).toMatchObject(c2[1]);
	});

	test('coord by item',() =>
	{
		expect.assertions(6);

		expect(model.getItemCoord(c1[8])).toMatchObject({x:1,y:8});
		expect(model.getItemCoord(c2[4])).toMatchObject({x:2,y:4});
		expect(model.getItemCoord(c3[0])).toMatchObject({x:3,y:0});
		expect(model.getItemCoord(c1[7])).toMatchObject({x:1,y:7});
		expect(model.getItemCoord(c0[8])).toMatchObject({x:0,y:8});
		expect(model.getItemCoord(c2[1])).toMatchObject({x:2,y:1});
	});

	test('item coord by index',() =>
	{
		expect.assertions(3);

		expect(model.getItemCoordByIndex(0)).toMatchObject({x:0,y:0});
		expect(model.getItemCoordByIndex(7)).toMatchObject({x:3,y:1});
		expect(model.getItemCoordByIndex(20)).toMatchObject({x:0,y:5});
	});

	test('column 0 match data',() =>
	{
		let data = model.getColumn(0);
		expect.assertions(9);

		expect(data[0].cellType).toBe(1);
		expect(data[1].cellType).toBe(3);
		expect(data[2].cellType).toBe(3);
		expect(data[3].cellType).toBe(3);
		expect(data[4].cellType).toBe(2);
		expect(data[5].cellType).toBe(2);
		expect(data[6].cellType).toBe(2);
		expect(data[7].cellType).toBe(2);
		expect(data[8].cellType).toBe(6);
	});

	test('column 0 match cell type data',() =>
	{
		let data = model.getColumnType(0);
		expect.assertions(9);

		expect(data[0]).toBe(1);
		expect(data[1]).toBe(3);
		expect(data[2]).toBe(3);
		expect(data[3]).toBe(3);
		expect(data[4]).toBe(2);
		expect(data[5]).toBe(2);
		expect(data[6]).toBe(2);
		expect(data[7]).toBe(2);
		expect(data[8]).toBe(6);
	});

	test('column 1 match data',() =>
	{
		let data = model.getColumn(1);
		expect.assertions(9);

		expect(data[0].cellType).toBe(7);
		expect(data[1].cellType).toBe(8);
		expect(data[2].cellType).toBe(9);
		expect(data[3].cellType).toBe(10);
		expect(data[4].cellType).toBe(2);
		expect(data[5].cellType).toBe(11);
		expect(data[6].cellType).toBe(12);
		expect(data[7].cellType).toBe(13);
		expect(data[8].cellType).toBe(6);
	});

	test('column 1 match cell type data',() =>
	{
		let data = model.getColumnType(1);
		expect.assertions(9);

		expect(data[0]).toBe(7);
		expect(data[1]).toBe(8);
		expect(data[2]).toBe(9);
		expect(data[3]).toBe(10);
		expect(data[4]).toBe(2);
		expect(data[5]).toBe(11);
		expect(data[6]).toBe(12);
		expect(data[7]).toBe(13);
		expect(data[8]).toBe(6);
	});
	test('column 2 match data',() =>
	{
		let data = model.getColumn(2);
		expect.assertions(9);

		expect(data[0].cellType).toBe(4);
		expect(data[1].cellType).toBe(4);
		expect(data[2].cellType).toBe(4);
		expect(data[3].cellType).toBe(4);
		expect(data[4].cellType).toBe(2);
		expect(data[5].cellType).toBe(6);
		expect(data[6].cellType).toBe(6);
		expect(data[7].cellType).toBe(6);
		expect(data[8].cellType).toBe(6);
	});
	test('column 3 match data',() =>
	{
		let data = model.getColumn(3);
		expect.assertions(9);

		expect(data[0].cellType).toBe(3);
		expect(data[1].cellType).toBe(4);
		expect(data[2].cellType).toBe(1);
		expect(data[3].cellType).toBe(1);
		expect(data[4].cellType).toBe(1);
		expect(data[5].cellType).toBe(5);
		expect(data[6].cellType).toBe(5);
		expect(data[7].cellType).toBe(5);
		expect(data[8].cellType).toBe(5);
	});
	test('Row 0 data',() =>
	{
		let data = model.getRow(0);
		
		expect.assertions(4);

		expect(data[0].cellType).toBe(c0[0].cellType);
		expect(data[1].cellType).toBe(c1[0].cellType);
		expect(data[2].cellType).toBe(c2[0].cellType);
		expect(data[3].cellType).toBe(c3[0].cellType);
	});

	test('Row 1 data',() =>
	{
		let data = model.getRow(1);
		
		expect.assertions(4);

		expect(data[0].cellType).toBe(c0[1].cellType);
		expect(data[1].cellType).toBe(c1[1].cellType);
		expect(data[2].cellType).toBe(c2[1].cellType);
		expect(data[3].cellType).toBe(c3[1].cellType);
	});

	test('Row 2 data',() =>
	{
		let data = model.getRow(2);
		
		expect.assertions(4);

		expect(data[0].cellType).toBe(c0[2].cellType);
		expect(data[1].cellType).toBe(c1[2].cellType);
		expect(data[2].cellType).toBe(c2[2].cellType);
		expect(data[3].cellType).toBe(c3[2].cellType);
	});

	test('Row 3 data',() =>
	{
		let data = model.getRow(3);
		
		expect.assertions(4);

		expect(data[0].cellType).toBe(c0[3].cellType);
		expect(data[1].cellType).toBe(c1[3].cellType);
		expect(data[2].cellType).toBe(c2[3].cellType);
		expect(data[3].cellType).toBe(c3[3].cellType);
	});

	test('search list returns map',() =>
	{
		let data = model.searchList([]);

		expect(data).toBeInstanceOf(Map);
	});

	test('search row 0',() =>
	{
		let data = model.searchList(model.getRow(0));
	
		expect(data.size).toBe(0);
	});

	test('search row 1',() =>
	{
		let data = model.searchList(model.getRow(1));
	
		expect(data.size).toBe(0);
	});
	test('search row 2',() =>
	{
		let data = model.searchList(model.getRow(2));
	
		expect(data.size).toBe(0);
	});
	test('search row 3',() =>
	{
		let data = model.searchList(model.getRow(3));
	
		expect(data.size).toBe(0);
	});
	test('search row 4',() =>
	{
		let data = model.searchList(model.getRow(4));
	
		expect(data.size).toBe(1);
	});
	test('search row 5',() =>
	{
		let data = model.searchList(model.getRow(5));
	
		expect(data.size).toBe(0);
	});
	test('search row 6',() =>
	{
		let data = model.searchList(model.getRow(6));
	
		expect(data.size).toBe(0);
	});
	test('search row 7',() =>
	{
		let data = model.searchList(model.getRow(7));
	
		expect(data.size).toBe(0);
	});

	test('search row 8',() =>
	{
		let data = model.searchList(model.getRow(8));
	
		Logger.info(data);
		expect(data.size).toBe(1);
	});

	test('returns found data',() =>
	{
		let data = model.searchList(model.getRow(8));
		let result = data.get(6);

		expect(result).toBeInstanceOf(Array);
		// found one match.
		expect(result.length).toBe(1);
		// that contains 3 items
		expect(result[0].length).toBe(3);
		// found correct index
		expect(result[0][0]).toBe(0);
		expect(result[0][1]).toBe(1);
		expect(result[0][2]).toBe(2);
	});


	test('search column 0',() =>
	{
		let data = model.searchList(model.getColumn(0));
	
		expect(data.size).toBe(2);
	});
	test('search column 1',() =>
	{
		let data = model.searchList(model.getColumn(1));
	
		expect(data.size).toBe(0);
	});
	test('search column 2',() =>
	{
		let data = model.searchList(model.getColumn(2));
	
		expect(data.size).toBe(2);
	});
	test('search column 3',() =>
	{
		let data = model.searchList(model.getColumn(3));
	
		expect(data.size).toBe(2);
	});

	test('matches',() =>
	{
		let data = model.getMatches();

		Logger.info(data);
	});
});

describe('radomize tests',() =>
{
	const model = new Model();
	const items = [
		new Cell(),new Cell(),new Cell(),new Cell(),
		new Cell(),new Cell(),new Cell(),new Cell(),
		new Cell(),new Cell(),new Cell(),new Cell(),
	];
	const itemTypes = [1,2,3,4,5,6];

	test('basic random method',() =>
	{
		model.randomizeItems(items,itemTypes);

		expect(items.length).toBe(12);
	});
});

describe('initialize new board with zero items',() =>
{
	const itemTypes = [1,2,3,4,5,6];
	const column = 5;
	const row = 7;
	const model = new Model(column,row,3,itemTypes);

	test('basic random',() =>
	{
		// Logger.info(model);
		expect(model.items.length).toBe(column*row);
	});
});

describe('random cell types list',() =>
{
	const model = new Model();

	test('random return',() =>
	{
		let data = model.getRandomCellTypesList(5,[2,3,4,5,6]);
		
		expect(data.length).toBe(5);
	});
});

describe('remove indices',() =>
{
	const model = new Model();

	test('remove',() =>
	{
		const indices = [2,4];
		const list = [1,2,3,4,5];
		const expected = [1,2,4];

		model.removeIndicesFromList(indices,list);
		
		expect(list.length).toBe(3);
		expect(list).toMatchObject(expected);
	});
});

describe('update column',() =>
{
	const row = 9;
	const column = 2;
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

	const items = [
		c0[0],c1[0],
		c0[1],c1[1],
		c0[2],c1[2],
		c0[3],c1[3],
		c0[4],c1[4],
		c0[5],c1[5],
		c0[6],c1[6],
		c0[7],c1[7],
		c0[8],c1[8],
	];

	const model = new Model(row,column,limit,itemTypes,items);

	test('update column',() =>
	{
		const replace = [0,0,0,0,0,0,0,0,0];
		expect(replace.length).toBe(c0.length);

		model.updateColumnType(0,replace);

		expect(model.getColumnType(0)).toMatchObject(replace);
	});
});