
require('dotenv').config();
const joi= require('joi');
const express= require('express');
const app = express();
app.use(express.json());

var DOMAIN = process.env.MyMailGunDomain;
var api_key = process.env.MyMailGunKey;
var mailgun = require('mailgun-js')({ apiKey: api_key, domain: DOMAIN });



var data = {
    from: 'MWASocialNetwork <mwasocialnetwork@gmail.com>',
    to: 'ThanhLuanluan.tt87@gmail.com',
   // cc: 'baz@example.com',
   // bcc: 'bar@example.com',
    subject: 'Complex',
   // text: 'Testing some Mailgun awesomness!',
    html: "<html>HTML version of the body</html>"
  };

  
app.post('/api/v1/send',(req, res)=>{
   
    //Validate here. 
    const schema={
       from:joi.string().required(),
       to: joi.string().required(),
       subject: joi.string().min(5).required(),
     //  text: joi.string().min(5).required(),
       html:joi.string().required(),    
      
    }
 
    const result = joi.validate(req.body,schema);
 
    //400 Badrequest
    if(result.error) return res.status(400).send(result.error.details[0].message);
 
 
   
    //Send email
    mailgun.messages().send(req.body, (error, body) => {     
        res.send(body);
      });
      
  
   
 
 });
 
 const port=process.env.PORT || 3000;
 app.listen(port,()=>console.log("listening on port 3000..."));
 
