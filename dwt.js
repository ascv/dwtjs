var jsdwt = {
    
    Haar_1d: function(arr, level) {

        if (arr.length % 2 != 0) {
            throw "The array must be of even length.";   
        }
		
	var result;	
        while (level >= 1) {	
	    n = arr.length;
	    var avg = new Array(n/2);
	    var diff = new Array(n/2);
	    
	    for (var count = n; count > 1; count /= 2) {
		for (i=0; i<count/2; i++) {
		    avg[i] = (arr[2*i] + arr[2*i + 1]) / 2;
		    avg[i] = avg[i] / Math.sqrt(2);
		    diff[i] = arr[2*i] - avg[i];
		}

	    }
			
	    arr = avg;
	    level -= 1;
			
	    if (level == 0) {
		result = new Array(n/2);
		for (i=0; i<n/2; i++) {
		    result[i] = avg[i];
		    result[i + n/2] = diff[i];
		}
	    }
	}
	return result;
    }
}
