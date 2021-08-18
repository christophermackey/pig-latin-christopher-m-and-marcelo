import React, { Component } from 'react'
import './App.css'
import butcherPig from './assets/butcherPig.jpeg'

class App extends Component{
  constructor(props){
    super(props)
    // the state object holds information that can be displayed to the user and updated throughout the program
    this.state = {
      // "phrase" is the text entered by the user - right now there are test words hard coded to make the process of testing your code faster and easier
      // ACTION ITEM: when you are ready for your full user experience, delete the test words so phrase is assigned an empty string
      phrase: "",
      // "phraseTranslated" is what the user will see appear on the page as Pig Latin, it starts as the preset message and updates when your user clicks the "submit" button
      phraseTranslated: "This is where your translated sentence will appear."
    }
  }

  // The "myPigLatinCodeHere" function is where you will put your logic to convert the sentence entered by the user to Pig Latin
  myPigLatinCodeHere = () => {

    // FILTER OUT THE PUNCTUATIONS
    //1. Declare a variable (rawUserInputArray) and store the user input splited by each character (.split('')). 
    //2. declare a variable (formatedUserInputArray). filter the rawUserInputArray array to return an array with no punctuation. 
    //3. declare a variable (formatedUserInput) and store the value of result of joining the formatedUserInputArray into one string (.join(''))
    //4. assign to the userInput variable (this variale is what is being used in the rest of the code) the value of the formatedUserInput.split(' '), which takes the spaces into consideration and will split the string into an array of words.

    let rawUserInputArray = this.state.phrase.split("")
    let formatedUserInputArray = rawUserInputArray.filter((letter) => {
      return letter !== '!' && letter !== '?' && letter !== ',' && letter !== '.' && letter !== "'" && letter !== "-"
    })
    console.log(rawUserInputArray)

    let formatedUserInput = formatedUserInputArray.join("")
    console.log(formatedUserInput)

    // the variable "userInput" will contain the text input from the user modified into an array of words
    // no need to change this variable
    let userInput = formatedUserInput.split(" ")
    console.log("userInput:", userInput)

    /// Use filter on user input to filter out all of the punctuations. And store new array in noPunctuationUserInput variable

    // now that we have an array of words, we can map over the array and access each word
    let translatedWordsArray = userInput.map(currentWord => {
      // ACTION ITEM: use "currentWord" as a starting point for your code
      console.log("currentWord:", currentWord)

      // let vowelsArray = currentWord.split("").filter(vowel => {
      //   return vowel === "a" || vowel === "e" || vowel === "i" || vowel === "o" || vowel === "u"
      // })
      let vowelsArray = currentWord.split("").filter((vowel, index)=> {
        console.log("index of vowel", index);
        return vowel === "a" || vowel === "e" || vowel === "i" || vowel === "o" || vowel === "u"
      })
      console.log("vowelsArray:", vowelsArray)
      console.log("number of elements in array", vowelsArray.length)
      // your code here!
      // Remember: console.log is your friend :)

      //Psuedo code:
      //1.check if word starts with a vowel - access the first element (index = 0) from the currentWord (element of array --> string) and check if it is equal a vowel -- if it equal to a vowel, return the current word 'concatenated' with way in the end
      //2. else if currentWord starts with 'qu' (tyr to use the .startsWith() built in method) --> return the portion of the after 'qu' concatenated with 'quay'
      //3. else if -- find if the vowel array is equal to zero (are there any vowels in this string element??!!!!) ---> if the vowels array is empty (vowelArray.length === 0), we assume that thare are no vowels an this implies that y will be the only vowel in the string. --> declare a variable yPosition and store the index of the first instance of y in the string (.indexOf()). Use the slice method to return the subset of the stringthat begins with y and concatenate with the subset of the string from the 0 index to the index of the character before 'y' and 'ay'.
      //4. If none of the previous conditions are met, the current word (element) starts with a consonant and not a vowel, but also has vowels after the first consonant. Declare a variable and store the index of the first vowel of the currentWord (accessed the first element in the vowelsArray) used indexOf('that first element') on our currentWord -> this will give us the position of the character in the string ---> Use the slice method to return the subset of the string that begins with the index of the first vowel (store in the firstVowelIndex variable) and concatenate with the subset of the string from the 0 index to the index of the character before the first vowel and 'ay'.
      
      let myVariable = '';

      if (currentWord === '') {
        console.log('Please write something!')
        myVariable = 'Please write something!'
      } else if(currentWord[0] === "a" || currentWord[0] === "e" || currentWord[0] === "i" || currentWord[0] === "o" || currentWord[0] === "u") {
        console.log(`${currentWord}way`);
        myVariable = `${currentWord}way`
        // return `${currentWord}way`
      } else if(currentWord.startsWith("qu")){
        console.log(`${currentWord.slice(2)}quay`)
        myVariable = `${currentWord.slice(2)}quay` 
        // return `${currentWord.slice(2)}quay` 
      } else if(vowelsArray.length === 0){
        let yPosition = currentWord.indexOf("y")
        console.log("index of y", yPosition);
        myVariable = `${currentWord.slice(yPosition)}${currentWord.slice(0, yPosition)}ay`
        // return `${currentWord.slice(yPosition)}${currentWord.slice(0, yPosition)}ay`
      } else {
        let firstVowelIndex = currentWord.indexOf(vowelsArray[0])
        console.log("INDEX VALUE", currentWord.indexOf(vowelsArray[0]));
        myVariable = `${currentWord.slice(firstVowelIndex)}${currentWord.slice(0, firstVowelIndex)}ay`
        // return `${currentWord.slice(firstVowelIndex)}${currentWord.slice(0, firstVowelIndex)}ay`
      }
      
      // ACTION ITEM: change the value of currentWord to the name of whatever variable you made containing your Pig Latin'd word
      return myVariable
    })


    // joining the array back to a string of translated words
    // no need to change this variable
    let translatedWords = translatedWordsArray.join(" ")
    console.log("translatedWords:", translatedWords)

    // the setState method will take your information from "translatedWords" and update the state object that is displayed to the user
    // no need to change this method
    this.setState({phraseTranslated: translatedWords})
  }

  restartGame = () => {
    // this method restarts the game by setting the original state
    // ACTION ITEM: when you are ready for your full user experience, delete the test words in phrase so that is assigned an empty string
    this.setState({
      phrase: "",
      phraseTranslated: "This is where your translated sentence will appear."
    })
  }

  // no need to modify this method
  setUpPreventDefault = (e) => {
    // this method prevents React from refreshing the page unnecessarily
    e.preventDefault()
    this.myPigLatinCodeHere()
  }

  // no need to modify this method
  handleInput = (e) => {
    // this method takes the input and saves the value in this.state.phrase so we can use the input in our program
    this.setState({phrase: e.target.value})
  }

  render(){
    return(
      <>
        <h1>Pig Latin Translator</h1>
        <img
          src={butcherPig}
          alt="pig with butcher cut names in pig latin"
          className="butcherPig"
        />
        <div className="inputArea">
          <h4>Enter phrase to be translated:</h4>
          {/* user input field - every DOM event that happens in the input will call the handleChange method and update state */}
          <input
            type="text"
            className="userInput"
            onChange={this.handleInput}
            value={this.state.phrase}
          />
          <br />
          {/* button that called the setUpPreventDefault method which calls the myPigLatinCodeHere method */}

          {/* <button onClick={this.setUpPreventDefault}>Submit</button> */}
          <div onClick={this.setUpPreventDefault} className="bacon">
            <div className="red"></div>
            <div className="white"></div>
            <div className="red"></div>
            <div className="bubble1"></div>
            <div className="bubble2"></div>
          </div>
          <button onClick={this.restartGame}>Clear</button>
        </div>
        {/* Bacon Button!! */}
  
         


        <p>{this.state.phraseTranslated}</p>
        <footer>Coded by Chris and Marcelo</footer>
      </>
    )
  }
}

export default App
