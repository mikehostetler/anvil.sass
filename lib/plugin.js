/*
	anvil.sass - SASS/SCSS compiler plugin for anvil.js
	version: 0.0.1
	author: Mike Hostetler <mike.hostetler@gmail.com> (http://mike-hostetler.com)
	copyright: 2012
	license: Dual licensed 
			 MIT (http://www.opensource.org/licenses/mit-license)
			 GPL (http://www.opensource.org/licenses/gpl-license)
*/

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
