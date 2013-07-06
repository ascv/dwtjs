var dwt = {

    Haar1d: function(arr, level, n) {
        if (arr.length % 2 != 0)
            throw "The array must be of even length.";
	if (level <= 0)
	    throw "Level must be at least 1.";

	if (n == null)
	    n = arr.length;

	var result = arr.slice(0);

	for (var i = 1; i <= level; i++) {
	    this._HaarSingleLevel(result, n);
	    n /= 2;
	}

	return result;
    },

    _HaarSingleLevel: function(arr, n, rowBuffer, rowBufferIndex) {
	var diff = new Array(n/2);
	var sample;
	var sqrtTwo = Math.sqrt(2);

	for (i = 0; i < n/2; i++) {
	    sample = arr[2*i];

	    arr[i] = (sample + arr[2*i + 1]) / 2;
	    diff[i] = (sample - arr[i]);

	    arr[i] *= sqrtTwo;
	    diff[i] *= sqrtTwo;
	}

	for (var i = 0; i < n/2; i++)
	    arr[i + n/2] = diff[i];
    },

    Haar2d: function(arr, level, n) {
        if (arr.length % 2 != 0)
            throw "The array must be of even length.";
	if (level <= 0)
	    throw "Level must be at least 1.";

	if (n == null)
	    n = arr.length;

	var result = arr.slice(0);

	// loop over the number of levels
	for (var j = 0; n > 1 && j < level; j++) {
	    var rowIndex = 0;
	    var rowBuffer = new Array(n/2);
	    for (var i = 0; i < n/2; i++)
		rowBuffer[i] = new Array(n/2);

	    // loop over the number of columns
	    for (var k = 0; k < n; k++) {
		var diff = new Array(n/2);
		var sample;
	    
		// compute the dwt on the column
		for (i = 0; i < n/2; i++) {
		    sample = arr[k][2*i];

		    arr[k][i] = (sample + arr[k][2*i + 1]) / 2;
		    diff[i] = (sample - arr[k][i]);

		    arr[k][i] = arr[k][i] * Math.sqrt(2);
		    diff[i] = diff[i] * Math.sqrt(2);

		    // make a copy of the result for each row e.g.
		    // rowBuffer[row][ith element in row] = arr[col][ith element in col]
		    rowBuffer[i][rowIndex] = arr[k][i];
		}

		for (var i = 0; i < n/2; i++)
		    arr[k][i + n/2] = diff[i];
		rowIndex++;
	    }

	    //loop over the rows
	    for (var k = 0; k < n/2; k++) {
		var diff = new Array(n/2);
		var sample;

		for (i = 0; i < n; i++) {
		    // sample = rowBuffer[row][ith element in the row]
		    sample = rowBuffer[k][2*i];

		    arr[k][i] = (sample + rowBuffer[k][2*i + 1]) / 2;
		    diff[i] = (sample - arr[k][i]);

		    arr[k][i] = arr[k][i] * Math.sqrt(2);
		    diff[i] = diff[i] * Math.sqrt(2);
		}

		for (var i = 0; i < n/2; i++)
		    arr[k][i + n/2] = diff[i];
	    }
	}
	return result;
    }
}
