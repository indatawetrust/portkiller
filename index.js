#!/usr/bin/env node

const exec = require('child_process').exec,
	  port = process.argv[2]

const killer = (port) => {

	new Promise(( resolve,reject ) => {

		exec('sudo netstat -lnp | grep ' + port, (err, out, stderr) => {
			const match = out.match(/LISTEN {1,}([0-9]+)\//)
			if( match != undefined ) {
				if( match.length )
					resolve(match[1])
			}else{
				console.log(`port ${port} is not open.`)
			}
		})

	}).then(pid => {

		exec(`kill ${pid}`,(err, out, stderr) => {
			if( err ) throw err

			console.log(`port ${port} was closed.`)
		})

	})

}

if (typeof port != 'undefined')
	killer(port)
else
	console.log('port number is missing.')

module.exports = killer