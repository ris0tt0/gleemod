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
	constructor(model = new Model)
	{
		Logger.info('controller::constructor');
		this.model = model;

		this.init();
	}

	/**
	 * Initialize the class.
	 */
	init()
	{
		Logger.info('controller::init');
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

	// checkForMatches()
	// {
	// 	const retVal = this.findMatches( this.model.getMatches());
	// 	// Logger.info(retVal);
	// 	return  retVal;
	// }

	getBoardColumnList()
	{
		return this.model.getBoardColumnList();
	}

	getBoardColumn(columnIndex)
	{
		return this.model.getColumn(columnIndex);
	}

	/**
	 * view controller.swaps(column,row)
	 * view controller.getMatches()
	 * MAP
	 * keys are columns
	 * value: {
	 * 		column[1,2,3,4],
	 * 		replacedIndices[1,2,3],
	 * 		}
	 * 
	 */

	getMatches()
	{
		const retVal = new Map();
		const {columnMap,rowMap} = this.model.getMatches();
		let rows,cols,entry,entry2,map;

		for(entry of columnMap.entries())
		{
			// entry[0] is the column
			rows = [];	
			for(entry2 of entry[1])
			{
				// cell type that was found. for now ignore.
				// entry2[0]
				rows.push(entry2[1]);
			}

			if(!retVal.get(entry[0])) retVal.set(entry[0],{indices:[],replace:[]});
			retVal.get(entry[0]).indices = this.model.flattenList(rows);
		}

		for(entry of rowMap.entries())
		{
			cols = [];
			// entry[0] is the row
			for(entry2 of entry[1])
			{
				// cell type is entry2[0]
				cols.push(entry2[1]);
			}
			cols = this.model.flattenList(cols);
			// Logger.info(entry[0],cols);
			for( let colIndex of cols)
			{
				Logger.info(typeof colIndex);
				if(!retVal.get(colIndex))
				{
					retVal.set(colIndex,{indices:[],replace:[]});
				}
				map = retVal.get(colIndex);
				if( map.indices.indexOf(entry[0]) < 0)
					map.indices.push(entry[0]);
			}
		}
		// orgainize
		for(entry of retVal.entries())
		{
			
			let indices = entry[1].indices;
			// sort the removed index
			indices.sort();
			// get current column
			let column = this.model.getColumnType(entry[0]);
			entry[1].oldColumn = column.concat();
			// get replacement cell types.
			let replace = this.model.getRandomCellTypesList(
				entry[1].indices.length,
				this.model.itemTypes);
			// remove the items from the column
			this.model.removeIndicesFromList(indices,column);
			// new cell types
			entry[1].replace = replace;
			// new column data with replaced on top.
			entry[1].column = [...replace,...column];
		}

		return retVal;
	}
};