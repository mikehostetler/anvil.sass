var sass = require('node-sass');

var sassCompilerFactory = function( _, anvil ) {
	var compile = _.compose( marked, showdown );

	return anvil.plugin( {
		name: "anvil.sass",
		
		configure: function( config, command, done ) {
			anvil.addCompiler( ".sass", this );
			anvil.addCompiler( ".scss", this );
			done();
		},

		compile: function( content, done ) {
			try {
				sass.render( content, function( err, css ) {
					done( css );
				});
			} catch ( error ) {
				done( "", error );
			}
		},

		rename: function( name ) {
			name.replace( ".sass", ".css" );
			return name.replace( ".scss", ".css" );
		}
	} );
};

module.exports = markdownCompilerFactory;
