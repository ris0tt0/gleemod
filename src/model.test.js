const Model = require('./model');
const Cell = require('./cell');
const Logger = require('js-logger');

Logger.useDefaults();

const model = new Model();

let c0,c1,c2,c3,c4,columnList;

describe('expected row data',() =>
{
	let r;

	beforeAll(() =>
	{
		c0 = [
			new Cell(0),//(0,0)
			new Cell(1),//(0,1)
			new Cell(2),//(0,2)
		];
		c1 = [
			new Cell(3),//(1,0)
			new Cell(4),//(1,1)
			new Cell(5),//(1,2)
		];
		c2 = [
			new Cell(6),//(2,0)
			new Cell(7),//(2,1)
			new Cell(8),//(2,2)
		];
		c3 = [
			new Cell(9),//(3,0)
			new Cell(10),//(3,1)
			new Cell(11),//(3,2)
		];
	
		model.rows = 3;
		model.columns = 4;

		columnList = [
			c0,c1,c2,c3,
		];
		
		model.items = [
			c0[0],c1[0],c2[0],c3[0],
			c0[1],c1[1],c2[1],c3[1],
			c0[2],c1[2],c2[2],c3[2],
		];
	});

	test('get row index 0',() =>
	{
		r = model.getRow(0);
		expect(r).toMatchObject([c0[0],c1[0],c2[0],c3[0],]);
	});
	test('get row index 1',() =>
	{
		r = model.getRow(1);
		expect(r).toMatchObject([c0[1],c1[1],c2[1],c3[1],]);
	});
	test('get row index 2',() =>
	{
		r = model.getRow(2);
		expect(r).toMatchObject([c0[2],c1[2],c2[2],c3[2],]);
	});
});

describe('expected column data',() =>
{
	let c;

	beforeAll(() =>
	{
		c0 = [
			new Cell(0),//(0,0)
			new Cell(1),//(0,1)
			new Cell(2),//(0,2)
		];
		c1 = [
			new Cell(3),//(1,0)
			new Cell(4),//(1,1)
			new Cell(5),//(1,2)
		];
		c2 = [
			new Cell(6),//(2,0)
			new Cell(7),//(2,1)
			new Cell(8),//(2,2)
		];
		c3 = [
			new Cell(9),//(3,0)
			new Cell(10),//(3,1)
			new Cell(11),//(3,2)
		];
	
		model.rows = 3;
		model.columns = 4;

		columnList = [
			c0,c1,c2,c3,
		];
		
		model.items = [
			c0[0],c1[0],c2[0],c3[0],
			c0[1],c1[1],c2[1],c3[1],
			c0[2],c1[2],c2[2],c3[2],
		];
	});

	test('Instance is a Model',() =>
	{
		expect(model).toBeInstanceOf(Model);
	});

	test('Column 0 is correct',() =>
	{
		c = model.getColumn(0);
		expect(c).toMatchObject(c0);
	});
	
	test('Column 1 is correct',() =>
	{
		c = model.getColumn(1);
		expect(c).toMatchObject(c1);
	});
	
	test('Column 2 is correct',() =>
	{
		c = model.getColumn(2);
		expect(c).toMatchObject(c2);
	});

	test('Column 3 is correct',() =>
	{
		c = model.getColumn(3);
		expect(c).toMatchObject(c3);
	});

	test('Column list',() =>
	{
		const list = model.getBoardColumnList();
		expect(list).toMatchObject(columnList);
	});
});

describe('get expected item by coords',() =>
{
	beforeEach(() =>
	{
		c0 = [
			new Cell(0),//(0,0)
			new Cell(1),//(0,1)
			new Cell(2),//(0,2)
		];
		c1 = [
			new Cell(3),//(1,0)
			new Cell(4),//(1,1)
			new Cell(5),//(1,2)
		];
		c2 = [
			new Cell(6),//(2,0)
			new Cell(7),//(2,1)
			new Cell(8),//(2,2)
		];
		c3 = [
			new Cell(9),//(3,0)
			new Cell(10),//(3,1)
			new Cell(11),//(3,2)
		];
		c4 = [
			new Cell(12),//(4,0)
			new Cell(13),//(4,1)
			new Cell(14),//(4,2)
		];
	
		model.rows = 3;
		model.columns = 5;
		
		model.items = [
			c0[0],c1[0],c2[0],c3[0],c4[0],
			c0[1],c1[1],c2[1],c3[1],c4[1],
			c0[2],c1[2],c2[2],c3[2],c4[2],
		];
	});

	test('(1,1) coord returns type 4',() =>
	{
		const cell = model.getItemByCoords(1,1);
		expect(cell.cellType).toBe(4);
	});

	test('(0,1) coord returns type 1',() =>
	{
		const cell = model.getItemByCoords(0,1);
		expect(cell.cellType).toBe(1);
	});

	test('(2,0) coord returns type 6',() =>
	{
		const cell = model.getItemByCoords(2,0);
		expect(cell.cellType).toBe(6);
	});
});

describe('swap cell types',() =>
{
	beforeEach(() =>
	{
		c0 = [
			new Cell(0),//(0,0)
			new Cell(1),//(0,1)
			new Cell(2),//(0,2)
		];
		c1 = [
			new Cell(3),//(1,0)
			new Cell(4),//(1,1)
			new Cell(5),//(1,2)
		];
		c2 = [
			new Cell(6),//(2,0)
			new Cell(7),//(2,1)
			new Cell(8),//(2,2)
		];
		c3 = [
			new Cell(9),//(3,0)
			new Cell(10),//(3,1)
			new Cell(11),//(3,2)
		];
	
		model.rows = 3;
		model.columns = 4;

		columnList = [
			c0,c1,c2,c3,
		];
		
		model.items = [
			c0[0],c1[0],c2[0],c3[0],
			c0[1],c1[1],c2[1],c3[1],
			c0[2],c1[2],c2[2],c3[2],
		];
	});

	test('left swap cells',() =>
	{
		expect(model.getItemByCoords(1,1).cellType).toBe(4);
		expect(model.getItemByCoords(2,1).cellType).toBe(7);

		model.swap(1,1,2,1);

		expect(model.getItemByCoords(1,1).cellType).toBe(7);
		expect(model.getItemByCoords(2,1).cellType).toBe(4);
	});

	test('right swap cells',() =>
	{
		expect(model.getItemByCoords(1,1).cellType).toBe(4);
		expect(model.getItemByCoords(0,1).cellType).toBe(1);

		model.swap(1,1,0,1);

		expect(model.getItemByCoords(1,1).cellType).toBe(1);
		expect(model.getItemByCoords(0,1).cellType).toBe(4);
	});

	test('top swap cells',() =>
	{
		expect(model.getItemByCoords(3,1).cellType).toBe(10);
		expect(model.getItemByCoords(3,0).cellType).toBe(9);

		model.swap(3,1,3,0);

		expect(model.getItemByCoords(3,1).cellType).toBe(9);
		expect(model.getItemByCoords(3,0).cellType).toBe(10);
	});

	test('bottom swap cells',() =>
	{
		expect(model.getItemByCoords(2,1).cellType).toBe(7);
		expect(model.getItemByCoords(2,2).cellType).toBe(8);

		model.swap(2,1,2,2);

		expect(model.getItemByCoords(2,1).cellType).toBe(8);
		expect(model.getItemByCoords(2,2).cellType).toBe(7);
	});
});

describe('should get correct coords from index',() =>
{
	let coord;
	beforeAll(() =>
	{
		c0 = [
			new Cell(0),//(0,0)
			new Cell(3),//(0,1)
			new Cell(6),//(0,2)
		];
		c1 = [
			new Cell(1),//(1,0)
			new Cell(4),//(1,1)
			new Cell(7),//(1,2)
		];
		c2 = [
			new Cell(2),//(2,0)
			new Cell(5),//(2,1)
			new Cell(8),//(2,2)
		];
	
		columnList = [
			c0,c1,c2
		];

		model.rows = 3;
		model.columns = 3;
		
		model.items = [
			c0[0],c1[0],c2[0],
			c0[1],c1[1],c2[1],
			c0[2],c1[2],c2[2],
		];
	});

	test('should get (0,0) for index 0',() =>
	{
		coord = model.getItemCoordByIndex(0);
		expect(coord).toMatchObject({x:0,y:0});
	});

	test('should get (1,1) for index 4',() =>
	{
		coord = model.getItemCoordByIndex(4);
		expect(coord).toMatchObject({x:1,y:1});
	});

	test('should get (2,2) for index 8',() =>
	{
		coord = model.getItemCoordByIndex(8);
		expect(coord).toMatchObject({x:2,y:2});
	});
});

describe('search list array',() =>
{
	let searchResultMap,expectedMap;
	beforeAll(() =>
	{
		c0 = [
			new Cell(1),//0
			new Cell(1),//1
			new Cell(1),//2
			new Cell(1),//3
		];

		c1 = [
			new Cell(11),//0
			new Cell(1),//1
			new Cell(1),//2
			new Cell(10),//3
		];

		c2 = [
			new Cell(8),//0
			new Cell(1),//0
			new Cell(1),//1
			new Cell(1),//2
			new Cell(0),//3
		];

		c2 = [
			new Cell(0),//0
			new Cell(1),//1
			new Cell(1),//2
			new Cell(1),//3
		];

		c3 = [
			new Cell(0),//0
			new Cell(1),//1
			new Cell(1),//2
			new Cell(1),//3
			new Cell(0),//4
			new Cell(0),//5
			new Cell(0),//6
			new Cell(0),//7
			new Cell(0),//8
			new Cell(1),//9
			new Cell(0),//10
		];

		c4 = [
			new Cell(1),//0
			new Cell(1),//1
			new Cell(1),//2
			new Cell(2),//3
			new Cell(2),//4
			new Cell(2),//5
			new Cell(1),//6
			new Cell(1),//7
			new Cell(1),//8
			new Cell(1),//9
			new Cell(0),//10
		];
	});

	beforeEach(() =>
	{
		expectedMap = new Map();
	});
	test('return must be a Map',() =>
	{
		searchResultMap = model.seachList([],3);

		expect(searchResultMap).toBeInstanceOf(Map);
	});
	test('should empty map because of limit',()=>
	{
		searchResultMap = model.seachList(c1,3);

		expect(searchResultMap.size).toBe(0);
	});
	test('should find cellType 1',()=>
	{
		searchResultMap = model.seachList(c0,3);
		
		expectedMap = new Map();
		expectedMap.set(1,[[0,1,2,3,]]);
		
		expect(searchResultMap).toMatchObject(expectedMap);
	});
	test('should find cellType 1, index 1,2,3',()=>
	{
		searchResultMap = model.seachList(c2,3);
	
		expectedMap.set(1,[[1,2,3,]]);
		
		expect(searchResultMap).toMatchObject(expectedMap);
	});
	test('should find cellType 0,1',()=>
	{
		searchResultMap = model.seachList(c3,3);
		
		expectedMap.set(0,[[4,5,6,7,8,]]);
		expectedMap.set(1,[[1,2,3,]]);

		expect(searchResultMap).toMatchObject(expectedMap);
	});
	test('should find cellType 1,2 with multiple found indices',()=>
	{
		searchResultMap = model.seachList(c4,3);
		
		expectedMap.set(1,[[0,1,2,],[6,7,8,9,]]);
		expectedMap.set(2,[[3,4,5,]]);

		expect(searchResultMap).toMatchObject(expectedMap);
	});
});

describe('get random celltypes with provided data',() =>
{
	let randomResult;
	beforeAll(() =>
	{
		model.rows = 3;
		model.columns = 3;

		model.itemTypes = [3,4,5,6,7];
	});
	test('return is instance of array',() =>
	{
		randomResult = model.randomCellTypesList(4);
		
		expect(randomResult).toBeInstanceOf(Array);
		expect(randomResult.length).toBe(4);
	});

	test('random list of length 4',() =>
	{
		randomResult = model.randomCellTypesList(4);
		
		expect(randomResult.length).toBe(4);
	});

	test('random is greater than 2',() =>
	{
		randomResult = model.randomCellTypesList(4);
		
		expect(randomResult.some(item => item > 2)).toBeTruthy();
	});

	test('random list is less than 8',() =>
	{
		randomResult = model.randomCellTypesList(4);
		
		expect(randomResult.some(item => item < 8)).toBeTruthy();
	});
});

describe('should get correct coords from index',() =>
{
	let matched;

	beforeEach(() =>
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
			new Cell(31),//(3,8)
		];

		c4 = [
			new Cell(35),//(4,0)
			new Cell(36),//(4,1)
			new Cell(37),//(4,2)
			new Cell(41),//(4,3)
			new Cell(42),//(4,4)
			new Cell(43),//(4,5)
			new Cell(44),//(4,6)
			new Cell(45),//(4,7)
			new Cell(46),//(4,8)
		];
	
		model.rows = 9;
		model.columns = 5;
		
		model.items = [
			c0[0],c1[0],c2[0],c3[0],c4[0],
			c0[1],c1[1],c2[1],c3[1],c4[1],
			c0[2],c1[2],c2[2],c3[2],c4[2],
			c0[3],c1[3],c2[3],c3[3],c4[3],
			c0[4],c1[4],c2[4],c3[4],c4[4],
			c0[5],c1[5],c2[5],c3[5],c4[5],
			c0[6],c1[6],c2[6],c3[6],c4[6],
			c0[7],c1[7],c2[7],c3[7],c4[7],
			c0[8],c1[8],c2[8],c3[8],c4[8],
		];

		matched = model.getMatches();
	});

	test('returned column and row is Map',() =>
	{
		expect(matched.columnMap).toBeInstanceOf(Map);
		expect(matched.rowMap).toBeInstanceOf(Map);
	});
		
	test('only one column match',() =>
	{
		const {columnMap} = matched;

		expect(columnMap.size).toBe(1);
	});

	test('should be column index 2',() =>
	{
		const {columnMap} = matched;
		const columnIndex = 2;

		expect(columnMap.get(columnIndex)).toBeInstanceOf(Map);
	});

	test('should be cellType 1 and 2',() =>
	{
		const {columnMap} = matched;
		const columnIndex = 2;
		const cellTypeMap = columnMap.get(columnIndex);

		const type1 = 1;
		const type2 = 2;
		//  Map { 2 => [ [ 0, 1, 2 ] ], 1 => [ [ 4, 5, 6, 7, 8 ] ] }
		// We have arrays',() =>
		expect(cellTypeMap.get(type1)).toBeInstanceOf(Array);
		expect(cellTypeMap.get(type2)).toBeInstanceOf(Array);
		// We have correct type list length
		expect(cellTypeMap.get(type1).length).toBe(1);
		expect(cellTypeMap.get(type2).length).toBe(1);
	});
});