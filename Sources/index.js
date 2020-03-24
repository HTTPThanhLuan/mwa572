const joi= require('joi');

const express= require('express');
//require('dotenv').config();
const sgmail=require('@sendgrid/mail');
sgmail.setApiKey('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');
const app = express();





app.use(express.json());

const obj={  
    subject:"subject",
    heading:"heading",
    description:"desciption", //html;
    image:"https://cdn.jemediacorp.com/tracyjongblog/uploads/2017/08/BAD-WORD-940x500.jpg",  
    to:[{name:"Khai An", email:'luan.tt87@gmail.com'}]
};

app.post('/send',(req, res)=>{
   
   //Validate here. 
   const schema={
      subject: joi.string().min(5).required(),
      heading: joi.string().min(5).required(),
      description: joi.string().min(5).required(),
      to:joi.array().min(1).required(),    
      image: joi.string()
   }

   const result = joi.validate(req.body,schema);

   //400 Badrequest
   if(result.error) return res.status(400).send(result.error.details[0].message);


   
   //Send email
  const ms=createMessage(req.body);

   sgmail.send(ms);
 
   res.send(req.body);

});

const port=process.env.PORT || 3000;
app.listen(port,()=>console.log("listening on port 3000..."));

function createMessage(message) {
   return {
      personalizations: [
         {
            to: message.to,
            subject: message.subject
         }
      ],
      from: { email: 'thaiduongnguyen@gmail.com', name: 'SocialNetworking' },    
      content: [{ type: "text/html", value: createTemplate(message) }]
   };
}

function createTemplate(obj) {
   return `<!DOCTYPE html>
<html lang="en">
  <head>
     <title>${obj.heading} </title>	 
  </head>
 <body> 
    <h3>${obj.heading}</h3>
    <p>${obj.description}</p>
    <img src="${obj.image}" alt="noimage" width="300px" height="300px">
 </body> 
</html>`;

}
 