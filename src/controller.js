const Logger = require('js-logger');
const Model = require('./model');

module.exports = class
{
	/**
	 * CTOR
	 * @param {int} columns The total number of columns
	 * @param {int} rows The total number of rows
	 * @param {Array} itemTypes A list of available cell item types
	 */
	constructor(columns,rows,itemTypes)
	{
		Logger.info('controller::constructor');

		this.model = new Model();
		this.model.columns = columns;
		this.model.rows = rows;
		this.model.itemTypes = itemTypes;
	}

	/**
	 * Initialize the class.
	 */
	init()
	{
		Logger.info('controller::init');
		this.model.initBoard();
		this.model.randomizeItems();
	}

	/**
	 * Swap cells in either TOP,BOTTOM,LEFT,RIGHT directions
	 * 
	 * @param {int} column The column coord
	 * @param {int} row The row coord
	 * @param {string} direction A direction in which to swap the (column,row)
	 */
	swap(column,row,direction)
	{
		let x = column;
		let y = row;
		
		switch(direction.toLowerCase())
		{
		case 'top':
			--y;
			break;
		case 'bottom':
			++y;
			break;
		case 'left':
			++x;
			break;
		case 'right':
			--x;
			break;
		}

		this.model.swap(column,row,x,y);
	}

	findMatches(matches)
	{
		// Logger.info(matches);
		const {columnMap,rowMap} = matches;

		const retVal = new Map();

		/**
		 * ColumnMap
		 * key is column index
		 * value is the search map.
		 * 
		 * RowMap
		 * key: row index
		 * value: search map
		 * 
		 * SearchMap
		 * key: cell type
		 * value: array of array of indices
		 */

		const addToRetVal = (column , row) =>
		{
			if( !retVal.get(column))
			{
				retVal.set(column,{indices:[],replace:[]});
			}
			retVal.get(column).indices.push(row);
		};

		// Logger.info('column');
		// add column data
		columnMap.forEach((searchMap,columnIndex) =>
		{
			// Logger.info(columnIndex,searchMap);
			
			searchMap.forEach( 
				indices => indices.forEach(
					indexList => indexList.forEach(
						rowIndex => addToRetVal(columnIndex,rowIndex)
					)
				)
			);
		});

		// Logger.info('row');
		// add row data.
		rowMap.forEach((searchMap,rowIndex) =>
		{
			// Logger.info(rowIndex,searchMap);
			searchMap.forEach( 
				indices => indices.forEach(
					indexList => indexList.forEach(
						colunmIndex => addToRetVal(colunmIndex,rowIndex)
					)
				)
			);
		});
		// now add random replace cell types.
		for(let entry of retVal.entries())
		{
			const columnIndex = entry[0];
			const value = entry[1];
			const length = value.indices.length;
			// get type infomrmation
			const modelColumnTypes = this.model.getColumn(columnIndex).map( cell => cell.cellType);
			value.replace = this.model.randomCellTypesList(length);
			value.indices.sort();
			//copy, reverse and remove items.
			value.indices.concat()
				.reverse()
				.map( i => modelColumnTypes.splice(i,1));
			// update the column model data
			for(let entry2 of [...value.replace,...modelColumnTypes].entries())
			{
				// Logger.info(entry[0],entry[1]);
				this.model.getItemByCoords(columnIndex,entry2[0]).cellType = entry2[1];
			}
			// Logger.info(columnIndex);
			Logger.info(this.model.getColumn(columnIndex));
		}

		return retVal;
	}

	
	checkForMatches()
	{
		const retVal = this.findMatches( this.model.getMatches());
		// Logger.info(retVal);
		return  retVal;
	}

	getBoard()
	{
		return this.model.getBoardColumnList();
	}

	removeMatchesFromBoard()
	{
		let matches = this.checkForMatches();
		while(matches.size > 0)
		{
			matches = this.checkForMatches();
		}
	}
};