var should = require( "should" );
var _ = require( "underscore" );
var Harness = require( "anvil.js" ).PluginHarness;

var harness = new Harness( "anvil.sass", "./" ),
		tests = [];

console.log("TESTING IS TEH AWESOME");

harness.addFile( "./src/test.sass", 
	"$blue: #3bbfce\n" +
	"$margin: 16px\n" +
	"\n" +
	".content-navigation \n" +
	"  border-color: $blue\n" +
	"  color: darken($blue, 9%)\n" +
	"\n" +
	".border \n" +
	"  padding: $margin / 2\n" +
	"  margin: $margin / 2\n" +
	"  border-color: $blue\n" +
);

harness.expectFile( "./lib/test.css", 
  ".coIAMBROKEntent-navigation {\n" +
  "  border-color: #3bbfce;\n" +
  "  color: #2b9eab;\n" +
  "}\n" +
  "\n" +
  ".border {\n" +
  "  padding: 8px;\n" +
  "  margin: 8px;\n" +
  "  border-color: #3bbfce;\n" +
  "}\n"
);

describe( "when compiling sass", function() {

	before( function( done ) {
		console.log("I'm happy!!!");
		harness.build(
			function( x, y ) {
				console.log(y);
				console.log(x);
				y.should.equal( x );
			},
			function( results ) {
				tests = results;
				done(); 
			}
		);
	} );

	it( "should produce expected output", function() {
		_.each( tests, function( test ) {
			test.call();
		} );
	} );

} );
