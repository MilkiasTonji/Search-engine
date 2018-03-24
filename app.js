var fs = require('fs');
var bodyParser = require('body-parser');
var express = require('express');
var _ = require('lodash');
var app = express();

var word = fs.readFileSync('./words.json');
var words2 = fs.readFileSync('./words2.json');
var user = fs.readFileSync('./users.json');

var words = JSON.parse(word);
var words2 = JSON.parse(words2);
var users = JSON.parse(user);


// console.log(words);
//load static middlewares...
app.use(express.static('public'));
app.use(express.static('node_modules/bootstrap/dist'));

app.use(bodyParser.urlencoded({ extended:true }));


// app.get('/', function(req, res){
// 	res.send(words);
// });
app.set('views', './views');
app.set('view engine', 'jade');


// app.get('/', function(req, res){
//     console.log(words);	
// // });
// app.use(function(req, res, next){
//     var head = res.setHeader("content-type: ");
       
//     var auth = req.header('Authorization');
//     if(auth==undefined || auth==''){
//         res.send(400);
//     }else{
//         var token = auth.split(' ')[1];
//         var found = false;
//         for(let i = 0; i < words.length; i++){
//             var u = words[i];
//             if(token==u[1]){
//                 found = true;
//                 console.log(u[0]); 
//             }
//         }
//         if(found){
//             next();
//         }else{
//             res.send(401);
//         }
//     }
// });


app.get('/login', function(req, res){
  res.render('login');
});
app.get('/search', function(req, res){
    res.render('search');
});
  
app.get('/signup', function(req, res){
    res.render('signup');
});

app.post('/signup', function(req, res){
    //add the user dats into the users.json file...
    var username = req.body.username;
    var password = req.body.password;
    
    users[username] = password;
    var stringData = JSON.stringify(users);
    fs.writeFile('users.json', stringData, function(err){
        if(err) throw err;
    });

    res.redirect('/words');
    
});

app.get('/words', function(req, res){
    res.render('index', {title: "Index page", words: words});
});
app.post('/login', function(req, res){
    var username = req.body.username;
    var pass = req.body.password;

    if(username == "" || pass == ""){
        res.redirect('/words');
    }
    else if(users[username]==pass){
        res.redirect('/words');
    }
    else{
        res.render('login', {messages: "Login failed"});
    }
});

app.post('/words', function(req, res){
        res.render('index', {title: "Index page", words: words});
});

app.get('/words/add', function(req, res){
    res.render('add');
});

app.post('/words/add', function(req, res){
    //add datas here
    var word = req.body.word;
    var meaning = req.body.meaning; 
    if(word != '' && meaning != ''){
        var wordAdded = {
            word: word,
            meaning:meaning,
            id: 123
        };
    words.push(wordAdded);
    
    }
     
    // res.json(words);
    res.render('index', {words: words});

});

app.get('/words/edit/:id', function(req, res){
    
    var wordId = req.params.id;

    var word = words.filter(r => r.id == wordId);

    // console.log(word[0].word);
    res.render("edit", {word});

});

app.post('/words/edit/:id', function(req, res){
    var wordId = req.params.id;
    var word = words.filter(r => r.id == wordId);

    word[0].word = req.body.word;
    word[0].meaning = req.body.meaning;
    res.redirect('/words');
    
});


// app.get("/rooms/edit/:id")
// .all(function(req, res, next){
//     var roomId = req.params.id;
//     var room = _.find(rooms, r => r.id === roomId);
//     if(!room){
//         next("There happened something... We can't get this web URL for u...");
//         return;
//     }
//     res.locals.room = room;
//     next()
// })
// .get(function (req, res) {
//     res.render("edit");
// })


app.get('/suggestion', function(req, res){
    // res.header('Content-Type', 'text/html');
    var word = req.query['word'];
    var hints = '<ul>';
    
    if(word != ''){
        for(key in words2){
            if((key+'').startsWith(word)){
                
               // hints += '<li><a href='+'http://localhost:8000/dictionary?word='+key+'>'+key+'</a></li>';
                hints += '<ul style="list-style:none;width:700px;cursor: pointer;margin-left:-80px;"><li><a class="btns" onclick=ser("'+key+'") >'+key+'<span class="span">I am lucky</span>'+'</a></li></ul>';
                 
        }
            // res.send(dict[word]);
        }
        
    }
    
    hints += "</ul>";
    res.send(hints);
    
});

app.get('/dictionary', function(req, res){
	var word = req.query['word'];
   if(words2[word]){
   	res.send(words2[word]);
   }
   else if(word == ""){
   	res.send(" ");
   }
   else{   	
   	res.send("Doesn't match our record...");

   }
	
});

app.listen(8080, listening);


function newFunction() {
    var users = JSON.parse(user);
}

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
