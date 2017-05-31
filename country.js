
(function(){
	var getJson = function(url,successHandler){
		var xmlhttp = new XMLHttpRequest();

		xmlhttp.open('GET',url,true);
		xmlhttp.onreadystatechange = function(){
			if (xmlhttp.readyState === 4 && xmlhttp.status ===200){
				successHandler(xmlhttp.response);
			}
		}

		xmlhttp.send();
	}


	getJson('https://restcountries.eu/rest/v2/all', function(data){
		var data = JSON.parse(data);
		var myOl = document.querySelector('#collapse-1 .panel-body');
		var group = [
					'A-B-C',
					'D-E-F',
					'G-H-I',
					'J-K-L',
					'M-N-O',
					'P-Q-R',
					'S-T-U',
					'V-W-X',
					'Y-Z'
					];
		var b;
		var index;
		var nameA;
		var nameCountryGot;
		var population;
		var region;
		var timezones;
		var block = document.querySelector('.panel');
		var datagroups = []

		for (var i = 0; i < group.length; i++) {
			datagroups.push([]);
			nameA = group[i];

			var str = "<div class='panel-heading' role='tab' id='heading-1"+index+"'>"+
							"<h4 class='panel-title'>"+
								"<a role='button' data-toggle='collapse' data-parent='#accordion' href='#collapse-1"+index+"' aria-expanded='true' aria-controls='collapse-1"+index+"'>"+nameA+"</a>"+	
							"</h4>"+
						"</div>"+
						"<div id='collapse-1"+index+"' class='panel-collapse collapse in' role='tabpanel' aria-labelledby='heading-1"+index+"'>"+
							"<div class='panel-body'>"+
								
							"</div>"+
						"</div>";
			index = [i];
			block.insertAdjacentHTML('beforeEnd',str);	
		}

		for (var i = 0; i < data.length; i++) {
			var country = data[i];
			var countryName = country.name;
			var countryGroupLetter = countryName.charAt(0).toUpperCase();

			for (var b =0; b < group.length;  b++) {
		  
				if(group[b].indexOf(countryGroupLetter) > -1){
					datagroups[b].push(country);
					break;
				}
			}			
		}
		console.log('datagroups',datagroups);

		var blockAll = document.querySelectorAll('.panel-body');

		
		for(var i = 0; i< datagroups.length;  i++){
			console.log('datagroups.length',datagroups.length);
			var block = datagroups[i];
			console.log('block',block);

			for (var s = 0; s < block.length;  s++) {
				nameCountryGot = block[s].name;
				b = block[s].flag;
				population = block[s].population;
				region = block[s].region;
				timezones =block[s].timezones[0];
				var str ="<div class='container'>"+
							"<div>"+
								"<img src="+b+" alt="+nameCountryGot+" class='flag' />&nbsp;"+
								"<h2>"+nameCountryGot+"</h2>"+
							"</div>"+
							"<div>"+
								"<h3>Additional info:</h3>"+
								"<div>Region: "+region+"</div>"+
								"<div>Population: "+population+" (live)</div>"+
								"<div>Time-zones: "+timezones+"</div>"+
							"</div>"+
						"</div>"+
				console.log('block[s]',block[s].name);
				console.log('block[s]',block[s].timezones[0]);
				blockAll[i].insertAdjacentHTML('beforeEnd',str);
			}	
		}		
	})
})()