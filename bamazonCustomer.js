var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  //port
  port: 3306,

  //username
  user: "root",

  //password
  password: "S@mpson17",
  database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    showTable();
    connection.end();
  });

  var showTable = function() {
      connection.query("SELECT * FROM products", function(err, res){
        for(var i=0; i<res.length; i++){
          console.log(res[i].item_id+" || "+res[i].product_name+" || "
          +res[i].department_name+" || "+res[i].price+" || "
          +res[i].stock_quanity+"\n");
        }
      promptCustomer(res)
      })
  } 

  var promptCustomer = function(res){
    inquirer.prompt([{
      type: "input",
      name: "choice",
      message: "What would you like to purchase?"
    }]).then(function(answer){
      var correct = false;
      for(var i=0; i<res.length; i++){
        if(res[i].product_name == answer.choice){
          correct = true;
          var product = answer.choice;
          var id = i;
        }
      }
    })
  }
