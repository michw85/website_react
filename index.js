const http =require('http');
const mysql2 = require('mysql2');
const fs = require('fs');

function httpContext(request, response) 
{
	// делаем существующий файл
	const fname = request.url.substr(1);
	if (fs.existsSync(fname)){ // есть такой файл
		var stream = fs.createReadStream(fname);
		stream.on("open", ()=>{
				response.writeHead(200);
				stream.pipe(response);
		});
		return;
	}
	console.log(request.url)
	if(request.url.indexOf("/api/")===0)
	{ 
	var details=parseInt(request.url.substr(11));
	//console.log(details);
	if (isNaN(details)){
		details=1;
		// response.end();
		// con_p.end();
	}
	var booksPerPage = 2;
	var offset = booksPerPage*(details-1);
	con_p.query(`SELECT * FROM Books b JOIN Author a on b.id_author = a.id LIMIT ${offset}, ${booksPerPage}`)
	.then (([data, colDef])=> {
		/*console.log(data)*/
		var str = JSON.stringify(data);
		response.writeHead(200);
		response.end(str);
	})
	.catch( (err)=>{console.error(err)})
	}
	else{
		response.writeHead(404);
		response.end();
	}
}

fs.readFile('db_config.json', function(err,data)
{
	if(err){console.error(err); return;}
	try{ 
		db_conf = JSON.parse(data);
		con_p = mysql2
			.createPool(db_conf)
			.promise();
	}
	catch(ex){error(ex); return;}
	// console.log(routes);
	const server = http.createServer(httpContext);
	server.listen(80);
	console.log("Hotim zapustit server");
});