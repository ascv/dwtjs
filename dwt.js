var jsdwt = {


    // This function is not yet finished.
    // TODO: fix multi-level transform so that higher levels are in the
    // canonical array locations
    Haar_1d: function(arr, level) {

        if (arr.length % 2 != 0)
            throw "The array must be of even length.";

	if (level <= 0)
	    throw "Level must be at least 1."

	var n = arr.length;
	var result = arr.slice(0);

	for (var i = 1; i <= level; i++) {
	    this._Haar_1d(result, n);
	    console.log(result);
	}
    },

    _Haar_1d: function(arr, n) {

	var diff = new Array(n/2);
	var sample;

	for (i = 0; i < n/2; i++) {
	    sample = arr[2*i];

	    arr[i] = (sample + arr[2*i + 1]) / 2;
	    diff[i] = arr[i] - sample;

	    arr[i] = arr[i] / Math.sqrt(2);
	    diff[i] = diff[i] / Math.sqrt(2);
	}

	for (var i = 0; i < n/2; i++)
	    arr[i + n/2] = diff[i];
    },

    // This function is not yet finished.
    // TODO: re-factor to use 1d transform in loop
    // TODO: add row transform
    // TODO: fix multi-level transform so that higher levels are in the
    // canonical array location
    Haar_2d: function(arr, level) {

	for (var m = 0; m < arr.length; m++) {
            if (arr[m].length % 2 != 0) {
		throw "Column " + m + " is not of even length.";   
            }
	}

        while (level >= 1) {
	    for (var m = 0; m < arr.length; m++) {

		var n = arr[m].length;
		var avg = new Array(n/2);
		var diff = new Array(n/2);
	    
		for (var count = n; count > 1; count /= 2) {
		    for (i = 0; i < count/2; i++) {
			avg[i] = (arr[m][2*i] + arr[m][2*i + 1]) / 2;
			avg[i] = avg[i] / Math.sqrt(2);
			diff[i] = arr[m][2*i] - avg[i];
		    }
		}
			
		arr[m] = avg;
		
		if (level == 1) {
		    var column = new Array(n);
		    for (i = 0; i < n/2; i++) {
			column[i] = avg[i];
			column[i + n/2] = diff[i];
		    }
		    arr[m] = column;
		}
	    }
	    level -= 1;
	}
	//TODO: add row-wise transform

	return arr;
    }
}
