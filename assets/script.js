// Assignment code here
let passPieces = {
  passLength: 12,
  upperLetters: ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
  numbers: ["0","1","2","3","4","5","6","7","8","9"],
  symbols: [" ", "!", "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", ":", ";", "<", "=", ">", "?", "@", "[", "]", "^", "_", "`", "{", "|", "}", "~", "\"", "\\"],

}

const minLength = 8;
const maxLength = 128;

let theLength = 8;
let useLower = true;
let useUpper = true;
let useNumbers = true;
let useSymbols = true;

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");
var cleanBtn = document.querySelector("#cleanGenerate");
var setPassBtn = document.querySelector("#passLength");

var increaseBtn = document.querySelector("#increaseLength");
var decreaseBtn = document.querySelector("#decreaseLength");

var passwordLengthElement = document.getElementById("passwordLength");

const ChangePasswordLength = () => {
  var inputValue = document.getElementById("passLength").value;
  var num = parseInt(inputValue);

  if(num <= minLength)  {
    num = minLength;
  } else if(num >= maxLength) {
    num = maxLength;
  }

  passPieces.passLength = num;
  passwordLengthElement.textContent = num;
}

const IncreasePasswordLength = () => {
  var pLength = passPieces.passLength +1;
  if(pLength >= maxLength)  {
    pLength = maxLength;
  }

  passPieces.passLength = pLength;
  passwordLengthElement.textContent = pLength;
}

const DecreasePasswordLength = () => {
  var pLength = passPieces.passLength -1;
  if(pLength <= minLength)  {
    pLength = minLength;
  }

  passPieces.passLength = pLength;
  passwordLengthElement.textContent = pLength;
}


// Write password to the #password input

function writePassword() {
  theLength = window.prompt("Enter Password Length 8-128 characters");
  if(theLength > 128 || theLength < 8)  {
    alert("User input was not validated, Try Again.");
    return;
  }

  passwordLengthElement.textContent = parseInt(theLength);
  console.log(theLength);

  useLower = window.confirm("Do you want lower case letters?");
  useUpper = window.confirm("Do you want UPPER case letters?");
  useNumbers = window.confirm("Do you want to use numbers?");
  useSymbols = window.confirm("Do you want to use Symbols? #$%&");

  console.log(useLower + " : " + useUpper + " : " + useNumbers + " : " + useSymbols);

  if(useLower === false && useUpper === false && useNumbers === false && useSymbols === false)  {
    var emptyConfirm = window.confirm("You did not select any characters, would you like to start over?");
    if(emptyConfirm)  {

    }
  }

  var password = generatePassword(false);
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
}

const writePasswordClean = () => {
  passwordLengthElement.textContent = parseInt(passPieces.passLength);
  var password = generatePassword(true);
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
}

const generatePassword = (x) => {
  var addPass = "";
  var useLength = 0;
  var pLength = Object.keys(passPieces).length;

  if(x === true)  {
    useLength = passPieces.passLength;
  } else {
    useLength = theLength;
  }
  //Received help on this from W3 Schools and Stack Overflow to point me in the right direction for Object.keys to get an array of keys
  

  for(let index = 0; index < useLength; index++) {
    var roll = Math.floor(Math.random() * pLength);
    console.log(roll);

    if(roll === 0)  {
      index--;
    } else if(roll === 1) {

      //Letters
      if(useLower && useUpper)  {
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
      } else if(useLower) {
          //ONLY LOWER CASE
          var letter = passPieces.upperLetters[Math.floor(Math.random() * passPieces.upperLetters.length)];
          letter = letter.toLowerCase();
          addPass += letter;
      } else if(useUpper) {
          //ONLY UPPER CASE
          addPass += passPieces.upperLetters[Math.floor(Math.random() * passPieces.upperLetters.length)];
      } else if(useLower === false && useUpper === false) {
        index--;
      }
      
    } else if(roll === 2) {

      //Numbers
      if(useNumbers)  {
        addPass += passPieces.numbers[Math.floor(Math.random() * passPieces.numbers.length)];
      } else {
        index--;
      }
      
    } else if(roll === 3) {

      //Special Chars
      if(useSymbols)  {
        addPass += passPieces.symbols[Math.floor(Math.random() * passPieces.symbols.length)];
      } else {
        index--;
      }

    }
  }

  return addPass;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
cleanBtn.addEventListener("click", writePasswordClean);
increaseBtn.addEventListener("click", IncreasePasswordLength);
decreaseBtn.addEventListener("click", DecreasePasswordLength);
setPassBtn.addEventListener("input", ChangePasswordLength);

