var fs = require("fs");
var BasicCard = require("./BasicCard.js");
var inquirer = require('inquirer');

function ClozeCard(text, cloze, partial){
    this.text = text;
    this.cloze = cloze;
    this.partial = partial;
  }
    
  function Menu(){
    inquirer.prompt([{
    
            type: "list",
            name: "type",
            message: "What would you like to do?",
            choices: ["Create Basic Card", "Create Cloze Card", "Study Cards"]
    
    }]).then(function(user) {
        if (user.type === "Create Basic Card") {
            CreateBasicCard();
        }
        else if (user.type === "Create Cloze Card"){
            CreateClozeCard();
        }
        else{
            StudyCards();
        }
    });
    }
    Menu();
        
    function CreateBasicCard(){
      return inquirer.prompt([
            {
                type: "input",
                name: "front",
                message: "Enter your question?"
            },
            {
                type: "input",
                name: "back",
                message: "Enter your answer?"
            }
          ]).then(function(basicInfo) {
        
            var newBasic = new BasicCard(basicInfo.front, basicInfo.back);
                console.log(newBasic);
        
              fs.appendFile("log.txt", JSON.stringify(newBasic), function(err) {
                if (err) {
                  console.log(err);
                  }
              });
              inquirer.prompt([
                {
                  type:"confirm",
                  name:"confirm",
                  message:"Do you want to write another basic card?",
                  default: true
                }
              ]).then(function(userConfirm){
                if(userConfirm.confirm === true){
                  CreateBasicCard();
                }else{
                  Menu();
                }
              });
            });
    }
    
    
    function CreateClozeCard(){
      return inquirer.prompt([
              {
                type: "input",
                name: "text",
                message: "Enter the full text."
              },
              {
                  type: "input",
                  name: "cloze",
                  message: "Enter the cloze text."
              },
              {
                  type: "input",
                  name: "partial",
                  message: "Enter the partial text."
              },
            ]).then(function(clozeInfo) {

                var newCloze = new ClozeCard(clozeInfo.text, clozeInfo.cloze, clozeInfo.partial);
                console.log(newCloze);
    
              fs.appendFile("log.txt", JSON.stringify(newCloze), function(err) {
                if (err) {
                  console.log(err);
                  }
              });
              inquirer.prompt([
                {
                  type:"confirm",
                  name:"confirm",
                  message:"Do you want to write another cloze card?",
                  default: true
                }
              ]).then(function(userConfirm){
                if(userConfirm.confirm === true){
                  CreateBasicCard();
                }else{
                  Menu();
                }
              });
            });
    }
        
    function StudyCards (){
      fs.readFile("log.txt", "utf8",function (err, data){
        if (err){
          throw err;
        } else {
          if (data === ClozeCard) {
            console.log(clozeInfo.partial);
            setTimeout(3000);
            console.log(clozeInfo.cloze);
          } else if (data === BasicCard) {
            console.log(basicInfo.front);
            setTimeout(3000);
            console.log(basicInfo.back);
          }
        }
        console.log(data);
      });
    }