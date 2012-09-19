var should = require( "should" );
var _ = require( "underscore" );
var Harness = require( "anvil.js" ).PluginHarness;

var testNumber = 1;

var harness = new Harness( "anvil.sass", "./" ),
		tests = [];

harness.addFile( "./src/ex1.scss", "#navbar li { float: left; a { font-weight: bold; } }");
harness.expectFile( "./lib/ex1.css", "#navbar li {\n  float: left; }\n  #navbar li a {\n    font-weight: bold; }\n" );

/*
harness.addFile( "./src/ex2.scss", "#navbar li { float: left; }" );
harness.expectFile( "./lib/ex2.css", "#navbar li {\n  float: left; }\n" );

harness.addFile( "./src/ex3.scss", "#mainbar li { float: left; }" );
harness.expectFile( "./lib/ex3.css", "#mainbar li {\n  float: left; }\n" );
*/

describe( "when compiling sass/scss", function() {

	before( function( done ) {
		harness.build(
			function( x, y ) {
				/*
				console.log("======================X: ",x,"\n======================");
				console.log("\nY: ",y,"\n======================\n");
				console.log("Test Number: "+testNumber);
				*/
				x.should.eql(y);
			},
			function( results ) {
				tests = results;
				done(); 
			}
		);
	} );

	it( "should compile sass to css", function() {
		/*
		console.log("++++++++++++++++++++++++++++++++");
		console.log( tests );
		console.log("++++++++++++++++++++++++++++++++");
		*/
		_.each( tests, function( test ) {
			//console.log("\nTest Number "+testNumber+" BEFORE ===============");
			test.call();
			//console.log("\nTest Number "+testNumber+" AFTER ===============");
			testNumber++;
		} );
	} );
} );
