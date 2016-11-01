### Interactive Population Dashboard using D3 and Cordova ###
			-----------------------------------
				|	Requirements:		|
			-----------------------------------
			
 -apache php v5 and above
 -world database i.e. world.sql
 -firefox / chrome browser with Developer tools
 -editor /IDE

 Result:: Demo population distribution application which allows drilldown via a single request with nested country population
			The data for continent chart can be used to drill down to show case top 4 most populated countries from different continents, check it out.
			On later stage I will proceed to develop a drill down for:
				-City
				-District
 A. Setup the Backend:
		1.Access the api directory, it contains php code developed using slimframework which allows exposing population endpoints 
		  in json format.
		2.Configure your code to read from MySQL DB using PDO
		3.Create a db and dump the file world.sql
		4.Configure the index.php appropriately to expose continent population
			-->Access endpoint via post man
				i.e http://localhost:8081/population-dashboard/api/continent
		
B. Setup the Frontend/Mobile/Web:

		To run in your browser:

		1. Open www/index.html in your browser
				e.g. http://localhost:8081/population-dashboard/www/index.html

		To run as a Cordova app:

		1. Open Terminal and type:

			```
			cordova create population-dashboard-d3
			cd population-dashboard-d3
			cordova platforms add ios
			cordova plugin add org.apache.cordova.device
			cordova plugin add org.apache.cordova.console
			cordova plugin add org.apache.cordova.statusbar
			```

		2. Delete the www folder that was created and replace it with the www folder from this repo

		3. In terminal type:

			```
			cordova build android
			```

		4. Open the .xcodeproj file in the platforms/ios folder and run the app in the emulator or on your iOS device. To run the app on your iOS device, you need an Apple developer certificate and an app provisioning profile.

**Disclaimer:: This is a dummy app not to be used on a production environment, needs more patch ups.