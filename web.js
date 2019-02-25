var express =require("express");
var app=express();
var  methodOverride = require('method-override');
var mongosse= require("mongoose");
var post =process.env.PORT || 4000;
app.use(methodOverride("_method"));
app.listen(post,function(req,res){
    console.log("server is started"+ post);
    
})

var body_parser =require("body-parser");
app.use(body_parser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine","ejs");

mongosse.connect("mongodb://localhost/gallry");

var bloper =new mongosse.Schema({
    name: String,
    image:String,
    created: { type: Date, default: Date.now },
    Discription:String
    
})

blog =mongosse.model("blog",bloper);


//blog.create({
//    
//    name:'yashas',
//    image:"https://s3.amazonaws.com/imagescloud/images/medias/camping/camping-tente.jpg",
//    Discription:"This is wonder og life"
//    
//},function(err,blog){
//    
//    if(err){
//        console.log("error in data base");
//    }
//    else{
//        
//        console.log(blog);
//        console.log("blog  database is created");
//        
//        
//    }
//});




app.get("/blog", function(req,res){
    
 blog.find({},(err,blog)=>{
     
     if(err){
         console.log("error");
     }
     else{
         
       res.render("index",{blog:blog});  
     }
     
 })
    })


app.get("/blog/new",function(req,res){
    
    res.render("new");
    
})

app.post("/blog",function(req,res){
    var data =req.body.blog;
    console.log(data);
    blog.create(data,(err,newdata)=>{
        if(err){
            console.log("new data is not added")
            
        }
        else {
            
            res.redirect("/blog");
        }
        
        
    })
    
})

app.get("/blog/:id",function(req,res){
    var id = req.params.id;
    console.log(id);
    
    blog.findById(id,function(err,blog){
     
     if(err){
         console.log("error");
     }
     else{
         console.log(blog);
         
      res.render("show",{blog:blog});  
     }
     
 })
      
})


 app.get("/blog/:id/edit",(req,res)=>{
        
     var id = req.params.id;
     blog.findById(id,function(err,blog){
         
         
        res.render("edit",{blog:blog});   
     })
     
      
        
    });
    app.put("/blog/:id",(req,res)=>{
        var id = req.params.id
        
        blog.findByIdAndUpdate(id,req.body.blog,(err,blog)=>{
            
            if(err){
                console.log("updated is not posible")
            }
            else{
//            var showUrl = "/blog/" +blog._id;
            res.redirect("/blog/"+blog._id);
        }
        })
        
    }
        )


app.delete("/blog/:id",(req,res)=>{
    
    var id= req.params.id;
    
    blog.findByIdAndRemove(id,(err,blog)=>{
                           
        if(err){
        console.log("deletion is not possible");
    }
    else
        {
            
            res.redirect("/blog");
            
        }
                           })
    
})