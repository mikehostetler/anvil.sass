var sass = require('node-sass');

var sassCompilerFactory = function( _, anvil ) {
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
					done('TEST - Mike');
					if( err === null) {
						done( css );
					}
					else {
						done( "", "\nanvil.sass compiler error: " + err );
					}
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

module.exports = sassCompilerFactory;
