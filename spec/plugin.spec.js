var should = require( "should" );
var _ = require( "underscore" );
var Harness = require( "anvil.js" ).PluginHarness;

var harness = new Harness( "anvil.sass", "./" ),
		tests = [];

/*
harness.addFile( "./src/test.sass", " \
$blue: #3bbfce \
$margin: 16px \
 \
.content-navigation \
  border-color: $blue  \
  color: darken($blue, 9%) \
 \
.border \
  padding: $margin / 2 \
  margin: $margin / 2 \
  border-color: $blue \
");

harness.expectFile( "./lib/test.css", 
  ".content-navigation {\n" +
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
*/

harness.addFile( "./src/test.sass", ".content { color: red; }" );
harness.expectFile( "./lib/test.css", ".content { color: red; }" );

describe( "when compiling sass", function() {

	before( function( done ) {
		harness.build(
			function( x, y ) {
				console.log(x, y);
				y.should.equal( x );
			},
			function( results ) {
				tests = results;
				done(); 
			}
		);
	} );

	it( "should compile sass to css", function() {
		_.each( tests, function( test ) {
			test.call();
		} );
	} );

} );
