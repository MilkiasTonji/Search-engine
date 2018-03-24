var fs = require('fs');
var express = require('express');
var app = express();

var data = fs.readFileSync('words.json');
var words = JSON.parse(data);

// console.log(words);
//load static middlewares...
app.use(express.static('public'));
// app.get('/', function(req, res){
// 	res.send(words);
// });
app.set('views', 'public');
app.set('view engine', 'jade');


// app.get('/', function(req, res){
//     console.log(words);	
// });

app.get('/', function(req, res){
  res.render('index');
});

app.get('/suggestion', function(req, res){
    // res.header('Content-Type', 'text/html');
    var word = req.query['word'];
    var hints = '<ul>';
    for(key in words){
        if((key+'').startsWith(word)){
           // hints += '<li><a href='+'http://localhost:8000/dictionary?word='+key+'>'+key+'</a></li>';
            hints += '<ul><li><button class="btns" onclick=ser("'+key+'") >'+key+'</a><span class="span">&#8598</span></li></ul>';
        
    }
        // res.send(dict[word]);
    }
    hints += "</ul>";
    res.send(hints);
    
});


app.get('/dictionary', function(req, res){
	var word = req.query['word'];
   if(words[word]){
   	res.send(words[word]);
   } 
   else if(word == ""){
   	res.send(" ");
   }
   else{
   	
   	res.send("Doesn't match our record...");

   }
	
});

app.get('/edit', function(req, res){
    
  res.render('edit', words: words);


});
  
app.get('/add', function(req, res){
 res.send("Edit view");
});


app.listen(8080, listening);


// app.get('/add/:word/:score?', addWord);
// app.get('/all', sendUsers);
// app.get('/search/:word', searchWord);

// function addWord(req, res){

// 	var data = req.params;
// 	var word = data.word;
// 	var score = Number(data.score);
// 	var reply;
		
// 	if(!score){
// 		reply = {
// 			msg: "Score is required..."
// 		}


// 		res.send(reply);

// 	}
// 	else if(words[word]){
// 		reply = {
// 			msg: "Double entry is not permitted..."
// 		}
// 		res.send(reply);
// 	}

// 	else{
		
// 		words[word] = score;
// 		var data = JSON.stringify(words, null, 2);
// 		fs.writeFile('words.json', data, finished);

// 		function finished(err){
// 			reply = {
// 				word: word,
// 				score:score,
// 				status: "Success"
// 			}

// 			res.send(reply);
		
// 		}
			

		
			
//    }

	

// }

// function sendUsers(req, res){
// 	res.send(words);
// }
// function searchWord(req, res){
// 	var word  = req.params.word;
// 	var reply;
// 	if(words[word]){
// 		reply = {
// 			status: "found",
// 			word: word,
// 			score: words[word]
// 		}
// 	}
// 	else{
// 		reply = {
// 			status: "Not found",
// 			word: word
// 		}
// 	}
// 	res.send(reply);
// }

function listening(){
	console.log("Listening on port 8080...");
}
