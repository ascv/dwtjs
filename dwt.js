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


    Haar2d: function(arr, level) {
        if (arr.length % 2 != 0)
            throw "The array must be of even length.";
	if (level <= 0)
	    throw "Level must be at least 1.";

	var m = arr[0].length; // column of rows
	var n = arr.length; // number of columns

	var result = arr.slice(0);
	var sample;
	var sqrtTwo = Math.sqrt(2);

	// TODO: refactor for loop optmizations and performance test
	for (var z = 0; z < level; z++) {
	    for (var j = 0; j < n; j++) {
		var diff = new Array(m/2);
		for (var i = 0; i < m/2; i++) {

		    sample = result[j][2*i];

		    result[j][i] = (sample + result[j][2*i + 1]) / 2;
		    diff[i] = (sample - result[j][i]);

		    result[j][i] *= sqrtTwo;
		    diff[i] *= sqrtTwo;
		}

		for (var i = 0; i < m/2; i++) {
		    result[j][i + m/2] = diff[i];
		}
	    }
	    
	    for (var j = 0; j < m/2; j++) {
		var diff = new Array(n/2);
		for (var i = 0; i < n/2; i++) {
		    sample = result[2 * i][j];

		    result[i][j] = (sample + result[i][2*j +1]) / 2;
		    diff[j] = sample - result[i][j];

		    result[i][j] *= sqrtTwo;
		    diff[j] *= sqrtTwo;
		}
		for (var i = 0; i < n/2; i++)
		    result[i + n/2][j] = diff[j];
	    }
	    n /= 2;
	    m /= 2;
	}

	return result;
    }
}
