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

    _HaarSingleLevel: function(arr, n) {
	if (n == null)
	    n = arr.length;

	var diff = new Array(n/2);
	var sample;
	var sqrtTwo = Math.sqrt(2);

	for (var i = 0; i < n/2; i++) {
	    sample = arr[2*i];

	    arr[i] = (sample + arr[2*i + 1]) / 2;
	    diff[i] = (sample - arr[i]);

	    arr[i] *= sqrtTwo;
	    diff[i] *= sqrtTwo;
	}

	for (var i = 0; i < n/2; i++)
	    arr[i + n/2] = diff[i];
    },

    // TODO: perf test loop optimizations
    // TODO: refactor to reduce redundancy
    Haar2d: function(arr, level) {
        if (arr.length % 2 != 0)
            throw "The array must be of even length.";
	if (level <= 0)
	    throw "Level must be at least 1.";

	var n = arr.length;
	var result = arr.slice(0);
	var rowBuffer = new Array(n/2);
	var sample;
	var sqrtTwo = Math.sqrt(2);

	for (var z = 0; z < n/2; z++)
	    rowBuffer(z) = new Array();

	for (var z = 0; z < level; z++) { // loop over levels
	    for (var j = 0; j < n; j++) { // loop over columns
		var diff = new Array(n/2);
		for (var i = 0; i < n/2; i++) { // do dwt on the current column
		    sample = result[j][2*i];

		    result[j][i] = (sample + result[j][2*i + 1]) / 2;
		    diff[i] = (sample - result[j][i]);

		    result[j][i] *= sqrtTwo;
		    diff[i] *= sqrtTwo;
		}

		for (var i = 0; i < n/2; i++)
		    result[j][i + n/2] = diff[i];
	    }
	    // now loop over the rows
	    // do dwt on the current row

	    n /= 2;
	}
	console.log(result);

	return result;
    }
}
