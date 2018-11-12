const Logger = require('js-logger');
const Model = require('./model');

module.exports = class
{
	constructor(columns,rows,itemTypes)
	{
		Logger.info('controller::constructor');

		this.model = new Model();
		this.model.columns = columns;
		this.model.rows = rows;
		this.model.itemTypes = itemTypes;
	}

	init()
	{
		Logger.info('controller::init');
	}

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

		return this.checkForMatches();
	}

	checkForMatches()
	{
		const matches = this.model.getMatches();
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
		for(let values of retVal.values())
		{
			const length = values.indices.length;
			values.replace = this.model.randomCellTypesList(length);
			values.indices.sort();

			// Logger.info(values);
		}

		return  retVal;
	}

	resetBoard()
	{
		const retVal =  new Promise( (reslove) =>
		{
			// randomize the board.
			this.model.randomizeItems();
			// return the board
			reslove(this.model.getBoardColumnList());
		});

		return retVal;
	}
};