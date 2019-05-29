var exp=require('express');
var cookieparser=require('cookie-parser');
var app=exp();
app.listen(9000,function(){console.log("server created at 9000")});

app.use(cookieparser());
var bodyparser=require('body-parser');

app.use(bodyparser.urlencoded({extended:false}));

app.use('/loginform',function(req,res,next){
	if(req.cookies.mycookie)
		res.write("<p>error : "+req.cookies.mycookie+"<p>");
	next();
});

app.get('/loginform',function(req,res){
    //res.sendFile(__dirname+"/login.html");
	var str="<html><body><form action='login' method='post'>Enter Uid:<input type='text' name='uid' /><br/>Enter Pwd:<input type='password' name='pwd' /><br/><input type='submit' value='login'/></form></body></html>"
    res.write(str);
    res.end();
});


app.post('/login',function(req,res)
{  
   if(req.body.uid=="tanu" && req.body.pwd=="renu")
  {
	  res.write("<br/>uid:"+req.body.uid);
	  res.write("<br/>pwd:"+req.body.pwd);
	  res.write("your login is successful");
	
	  res.end();
  }
  else
  {
	  res.cookie("mycookie",'wrong id/password');
	  //res.write("login failed");
	  //res.end();

	  res.redirect('/loginform');
  } 
});

//this is post method login form
