var sass = require('node-sass');

var sassCompilerFactory = function( _, anvil ) {
	return anvil.plugin( {
		name: "anvil.sass",
		
		configure: function( config, command, done ) {
			anvil.config[ "anvil.combiner" ].patterns.push({
				extensions: [ ".less" ],
				alternateExtensions: [ ".css" ],
				find: "/([@]).?import[(]?.?[\"'].*[\"'].?[)]?/g",
				replace: "/([ \t]*)([@]).?import[(]?.?[\"']replace[\"'].?[)]?/g"
			});
			anvil.addCompiler( ".sass", this );
			done();
		},

		compile: function( content, done ) {
			try {
				sass.render( content, function( err, css ) {
					if( err === null) {
						done( css );
					}
					else {
						done( "", "anvil.sass compiler error: " + err );
					}
				});
			} catch ( error ) {
				done( "", error );
			}
		},

		rename: function( name ) {
			return name.replace( ".scss", ".css" ).replace( ".sass", ".css" );
		}
	} );
};

module.exports = sassCompilerFactory;
