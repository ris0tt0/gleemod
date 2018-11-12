const Logger = require('js-logger');
const Cell = require('./cell');

module.exports = class
{
	constructor()
	{
		Logger.info('model::constructor');

		/**
		 * Total number of rows
		 */
		this.rows = 0;
		/**
		 * Total number of columns
		 */
		this.columns = 0;
		/**
		 * Match limit, default is 3.
		 */
		this.matchLimit = 3;
		/** 
		 * The different Item types
		 */
		this.itemTypes = [];
		/**
		 * A list of items
		 */
		this.items = [];
	}

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

	getItemByCoords(columnIndex,rowIndex)
	{
		const index = columnIndex + rowIndex * this.columns;
		
		return this.items[index];
	}

	getItemCoord(cell)
	{
		const index = this.items.indexOf(cell);

		return this.getItemCoordByIndex(index);
	}

	getItemCoordByIndex(index)
	{
		let x = index % this.rows;
		let y = Math.floor(index/this.rows);

		return {x,y};
	}

	getColumn(columnIndex)
	{
		const column = [];

		for(let rowIndex = 0; rowIndex<this.rows; rowIndex++)
		{
			column.push(this.getItemByCoords(columnIndex,rowIndex));
		}

		return column;
	}

	getRow(rowIndex)
	{
		const row = [];

		for(let columnIndex = 0; columnIndex < this.columns; ++columnIndex)
		{
			row.push(this.getItemByCoords(columnIndex,rowIndex));
		}

		return row;
	}

	getBoardColumnList()
	{
		const board = [];

		for(let i = 0; i<this.columns; i++)
		{
			board.push(this.getColumn(i));
		}
		
		return board;
	}

	randomizeItems()
	{
		this.items.forEach( item =>
			item.cellType = this.itemTypes[Math.floor(Math.random() * this.itemTypes.length)]
		);
	}

	swap(x1,y1,x2,y2)
	{
		/** TODO create and use setItem method
		 * if more values are needed
		*/
		const item1 = this.getItemByCoords(x1,y1);
		const item2 = this.getItemByCoords(x2,y2);

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

	randomCellTypesList(length)
	{
		const a = new Array(length).fill(null);

		return a.map(() => this.itemTypes[Math.floor(Math.random() * length)] );
	}

	seachList(list,limit = NaN)
	{
		let c1,c2,a,i;
		const retVal = new Map();
		if(isNaN(limit)) limit = this.matchLimit;
		

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
				if( a.length > limit - 1)
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

		return retVal;
	}


	// searchRowsAndColumns(startX,startY)
	// {
	// 	const rows = this.searchRows(startX,startY);
	// 	const columns = this.searchColumns(startX,startY);
	// 	const set = new Set([...rows,...columns]);

	// 	// Logger.info(set);
	// 	return set;
	// }
};
