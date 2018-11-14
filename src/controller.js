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

		

		return retVal();
	}
};