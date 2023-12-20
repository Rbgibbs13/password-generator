// Assignment code here
let passPieces = {
  passLength: 12,
  upperLetters: ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
  numbers: ["0","1","2","3","4","5","6","7","8","9"],
  symbols: [" ", "!", "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", ":", ";", "<", "=", ">", "?", "@", "[", "]", "^", "_", "`", "{", "|", "}", "~"],

}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

const ChangePasswordLength = (x) => {
  var num = parseInt(x);
  passPieces.passLength = x;
  console.log(x + " : " + num + " : " + passPieces.passLength);
}

// Write password to the #password input

const generatePassword = () => {
  var addPass = "";

  //Received help on this from W3 Schools and Stack Overflow to point me in the right direction for Object.keys to get an array of keys
  var passLength = Object.keys(passPieces).length;
  console.log(passLength);

  for(let index = 0; index < passPieces.passLength; index++) {
    var roll = Math.floor(Math.random() * passLength);
    console.log(roll);

    if(roll === 0)  {
      index--;
    } else if(roll === 1) {
      //Letters
      var toLower = Math.random();
      if(toLower < 0.5) {
        //Change to lower case randomly
        var letter = passPieces.upperLetters[Math.floor(Math.random() * passPieces.upperLetters.length)];
        letter = letter.toLowerCase();
        addPass += letter;
      } else {
        //Add Upper Case Letter
        addPass += passPieces.upperLetters[Math.floor(Math.random() * passPieces.upperLetters.length)];
      }
    } else if(roll === 2) {
      //Numbers
      addPass += passPieces.numbers[Math.floor(Math.random() * passPieces.numbers.length)];
    } else if(roll === 3) {
      //Special Chars
      addPass += passPieces.symbols[Math.floor(Math.random() * passPieces.symbols.length)];
    }
  }

  return addPass;
}

function writePassword() {
  var password = generatePassword();
  console.log(password);
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
