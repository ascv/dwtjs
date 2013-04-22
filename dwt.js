var jsdwt = {

    Haar_1d: function(arr, level) {

        if (arr.length % 2 != 0)
            throw "The array must be of even length.";

	if (level <= 0)
	    throw "Level must be at least 1."

	var n = arr.length;
	var result = arr.slice(0);

	for (var i = 1; i <= level; i++) {
	    this._Haar_1d(result, n);
	    n /= 2;
	}

	return result;
    },

    _Haar_1d: function(arr, n) {

	var diff = new Array(n/2);
	var sample;

	for (i = 0; i < n/2; i++) {
	    sample = arr[2*i];

	    arr[i] = (sample + arr[2*i + 1]) / 2;
	    diff[i] = (sample - arr[i]) / 2;

	    arr[i] = arr[i] * Math.sqrt(2);
	    diff[i] = diff[i] * Math.sqrt(2);
	}

	for (var i = 0; i < n/2; i++)
	    arr[i + n/2] = diff[i];
    }
}
