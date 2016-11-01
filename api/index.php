<?php

/*
 *
 *Requirements:
 *-apache php v5 and above
 *-world database i.e. world.sql
 *-firefox / chrome browser with Developer tools
 *-editor /IDE
 * RESTFul API for World population [world.sql] to demonstrate integration with the web dashboard
 *			SETUP: 	1. Install POSTMAN REST CLIENT on chrome or firefox browser
 *					2. copy paste url~/api/countries
 *					3. press the SEND Button
 *					4. JSON data is retrieved from this url
 *					5. On the dashboard1.js ensure that your ajax url resembles the above tested url
 *					6. you can proceed to customizing your dashboard template
 */

require 'Slim/Slim.php';

session_start();

$app = new Slim(array(
    'debug' => false
));

$app->error(function ( Exception $e ) use ($app) {
    echo $e->getMessage();
});

$app->get('/continent','getContinent');

$app->run();

function getContinent(){
	$db = connect(); //country.SurfaceArea as z,
	$stmt = $db->prepare('SELECT
							country.Continent as x,
							SUM(country.Population) as y
						FROM `country`
						GROUP BY country.Continent
						');
	$stmt->execute();
	$rows_continent = $stmt->fetchAll(PDO::FETCH_OBJ);

	$stmt = $db->prepare('SELECT
								country.`Name`,
								country.`Code`,
								country.Continent,
								MAX(country.Population) as Population
							FROM `country`
							GROUP BY country.`Name`
							ORDER BY Population DESC');
	$stmt->execute();
	$rows_countries = $stmt->fetchAll(PDO::FETCH_OBJ);

	$stmt = $db->prepare('SELECT
							c.`Name`,
							c.CountryCode,
							c.District,
							c.Population
						FROM
							`city` c
						ORDER BY
							`CountryCode` ASC');
	$stmt->execute();
	$row_cities = $stmt->fetchAll(PDO::FETCH_OBJ);
  //Delay execution of the current script for 5 seconds:
  sleep(5);
	echo json_encode((object)array("className"=>".Continent","continent"=>"Continent","data"=>$rows_continent,"countries"=>$rows_countries,"cities"=>$row_cities));//
}

function connect(){
	try{
		$db = new PDO('mysql:host=localhost;dbname=world;charset=utf8', 'root', 'mysql123');
		$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
		return $db;
	}catch(PDOException $e){
		return $e->getMessage();
	}

}

?>
