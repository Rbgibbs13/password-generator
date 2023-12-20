// Assignment code here
let passwordComponents = {
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

  passwordComponents.passLength = num;
  passwordLengthElement.textContent = num;
}

const IncreasePasswordLength = () => {
  var pLength = passwordComponents.passLength +1;
  if(pLength >= maxLength)  {
    pLength = maxLength;
  }

  passwordComponents.passLength = pLength;
  passwordLengthElement.textContent = pLength;
}

const DecreasePasswordLength = () => {
  var pLength = passwordComponents.passLength -1;
  if(pLength <= minLength)  {
    pLength = minLength;
  }

  passwordComponents.passLength = pLength;
  passwordLengthElement.textContent = pLength;
}


// Write password to the #password input

function writePassword() {
  theLength = window.prompt("Enter Password Length 8-128 characters");
  if(theLength > 128 || theLength < 8)  {
    alert("User input was not validated, Try Again.");
    return;
  }

  passwordComponents.passLength = theLength;
  passwordLengthElement.textContent = parseInt(theLength);

  useLower = window.confirm("Do you want lower case letters? Cancel for NO.");
  useUpper = window.confirm("Do you want UPPER case letters? Cancel for NO.");
  useNumbers = window.confirm("Do you want to use numbers? Cancel for NO.");
  useSymbols = window.confirm("Do you want to use Symbols? Cancel for NO.");

  if(useLower === false && useUpper === false && useNumbers === false && useSymbols === false)  {
    var emptyConfirm = window.confirm("You did not select any characters, please make at least one selection.");
    return;
  }

  var password = generatePassword();
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
}

//Second option to generate password with all Default Settings
const writePasswordClean = () => {
  passwordLengthElement.textContent = parseInt(passwordComponents.passLength);
  var password = generatePassword();
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
}

const generatePassword = () => {
  var addPassword = "";
  //Received help on this from W3 Schools and Stack Overflow to point me in the right direction for Object.keys to get an array of keys
  var pLength = Object.keys(passwordComponents).length;

  for(let index = 0; index < passwordComponents.passLength; index++) {
    var roll = Math.floor(Math.random() * pLength);

    if(roll === 0)  {
      index--;
    } else if(roll === 1) {

      //Letters
      if(useLower && useUpper)  {
        var toLower = Math.random();
        if(toLower < 0.5) {
          //Change to lower case randomly
          var letter = passwordComponents.upperLetters[Math.floor(Math.random() * passwordComponents.upperLetters.length)];
          letter = letter.toLowerCase();
          addPassword += letter;
        } else {
          //Add Upper Case Letter
          addPassword += passwordComponents.upperLetters[Math.floor(Math.random() * passwordComponents.upperLetters.length)];
        }
      } else if(useLower) {
          //ONLY LOWER CASE
          var letter = passwordComponents.upperLetters[Math.floor(Math.random() * passwordComponents.upperLetters.length)];
          letter = letter.toLowerCase();
          addPassword += letter;
      } else if(useUpper) {
          //ONLY UPPER CASE
          addPassword += passwordComponents.upperLetters[Math.floor(Math.random() * passwordComponents.upperLetters.length)];
      } else if(useLower === false && useUpper === false) {
        //Strict comparison to make SUUUUURE that we are both false
        index--;
      }
      
    } else if(roll === 2) {

      //Numbers
      if(useNumbers)  {
        addPassword += passwordComponents.numbers[Math.floor(Math.random() * passwordComponents.numbers.length)];
      } else {
        index--;
      }
      
    } else if(roll === 3) {

      //Special Chars
      if(useSymbols)  {
        addPassword += passwordComponents.symbols[Math.floor(Math.random() * passwordComponents.symbols.length)];
      } else {
        index--;
      }

    }
  }

  return addPassword;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
cleanBtn.addEventListener("click", writePasswordClean);
increaseBtn.addEventListener("click", IncreasePasswordLength);
decreaseBtn.addEventListener("click", DecreasePasswordLength);
setPassBtn.addEventListener("input", ChangePasswordLength);

