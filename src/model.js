const Logger = require('js-logger');
const Cell = require('./cell');

module.exports = class
{
	constructor(row = 0,column = 0,matchLimit = 3,itemTypes = [],items = [])
	{
		Logger.info('model::constructor');

		/**
		 * Total number of rows
		 */
		this.rows = row;
		/**
		 * Total number of columns
		 */
		this.columns = column;
		/**
		 * Match limit, default is 3.
		 */
		this.matchLimit = matchLimit;
		/** 
		 * The different Item types
		 */
		this.itemTypes = itemTypes;
		/**
		 * A list of items
		 */
		this.items = items;
	}

	/**
	 * Initializes the model
	 */
	init()
	{
		this.initBoard();
		this.randomizeBoardItemCellTypes();
	}

	/**
	 * Initialize the board
	 */
	initBoard()
	{
		Logger.info('model::initboard');

		this.items = new Array(this.rows*this.columns);
		// fill the array with items needed
		for(let i = 0; i < this.items.length; ++i)
		{
			this.items[i] = new Cell();
		}
	}

	/**
	 * Returns a Cell reference from the provided coords.
	 * 
	 * @param {int} columnIndex The X coord
	 * @param {int} rowIndex The Y coord
	 */
	getItemByCoords(columnIndex,rowIndex)
	{
		const index = columnIndex + rowIndex * this.columns;
		
		return this.items[index];
	}

	/**
	 * Returns the coord for the provided Cell instance.s
	 * @param {Cell} cell 
	 */
	getItemCoord(cell)
	{
		const index = this.items.indexOf(cell);

		return this.getItemCoordByIndex(index);
	}

	/**
	 * Returns the coord for the provided index.
	 * @param {int} index 
	 */
	getItemCoordByIndex(index)
	{
		let x = index % this.rows;
		let y = Math.floor(index/this.rows);

		return {x,y};
	}

	/**
	 * Returns the column list.
	 * @param {int} columnIndex 
	 */
	getColumn(columnIndex)
	{
		const column = [];

		for(let rowIndex = 0; rowIndex<this.rows; rowIndex++)
		{
			column.push(this.getItemByCoords(columnIndex,rowIndex));
		}

		return column;
	}

	/**
	 * Returns the row list.
	 * @param {int} rowIndex 
	 */
	getRow(rowIndex)
	{
		const row = [];

		for(let columnIndex = 0; columnIndex < this.columns; ++columnIndex)
		{
			row.push(this.getItemByCoords(columnIndex,rowIndex));
		}

		return row;
	}

	/**
	 * Returns a list that contains columns in order.
	 */
	getBoardColumnList()
	{
		const board = [];

		for(let i = 0; i<this.columns; i++)
		{
			board.push(this.getColumn(i));
		}
		
		return board;
	}

	/**
	 * Radomizes each item's cell type in the game board.
	 */
	randomizeBoardItemCellTypes()
	{
		this.items.forEach( item =>
			item.cellType = this.itemTypes[Math.floor(Math.random() * this.itemTypes.length)]
		);
	}

	/**
	 * Finds and swaps cell types from the provided coords
	 * 
	 * @param {int} column1 item 1 x value
	 * @param {int} row1 item 1 y value
	 * @param {int} column2 item 2 x coord
	 * @param {int} row2 item 2 y coord
	 */
	swap(column1,row1,column2,row2)
	{
		/** TODO create and use setItem method
		 * if more values are needed
		*/
		const item1 = this.getItemByCoords(column1,row1);
		const item2 = this.getItemByCoords(column2,row2);

		if(item1 && item2)
		{
			// store value
			const type = item1.cellType;
			// swap item1 with item2
			item1.cellType = item2.cellType;
			// restore saved value
			item2.cellType = type;
		}
	}

	/**
	 * Searches game board and returns any matches
	 */
	getMatches()
	{
		let i,map,rowList,columnList;
		
		const rowMap = new Map();
		const columnMap = new Map();

		for(i = 0; i<this.columns;++i)
		{
			columnList = this.getColumn(i);
			map = this.seachList(columnList);
			if( map.size > 0) columnMap.set(i,map);

		}
		
		for(i = 0; i<this.rows;++i)
		{
			rowList = this.getRow(i);
			map = this.seachList(rowList);
			if(map.size > 0) rowMap.set(i,map);
		}

		return {columnMap,rowMap};
	}

	/**
	 * Searches through a list to find items that have
	 * the same celltype.
	 * 
	 * Returns a Map
	 */
	seachList(list)
	{
		let c1,c2,a,i;
		const retVal = new Map();

		a = [];
		for(i = 0;i<list.length;i++)
		{
			c1 = list[i];
			c2 = list[i+1];
			if(c2 && c1.cellType === c2.cellType)
			{
				a.push(i);
			}
			else
			{
				if(list[i-1] && list[i].cellType === list[i-1].cellType)
				{
					a.push(i);
				}
				if( a.length > this.matchLimit - 1)
				{
					if(!retVal.has(c1.cellType))
					{
						retVal.set(c1.cellType,[]);
					}
					retVal.get(c1.cellType).push(a);
				}
				a = [];
			}
		}

		// Logger.info(retVal);

		return retVal;
	}
};
