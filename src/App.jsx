import React from "react"
import Confetti from "react-confetti"
import {clsx} from "clsx"
import { languages } from "../languages"
import { getFarewellText } from "../utils"
import { getNewWord } from "../utils"
import Header from "../components/Header"
import Status from "../components/Status"
import Languages from "../components/Languages"
import Boxes from "../components/Boxes"
import Alphabets from "../components/Alphabets"

export default function AssemblyEndgame() {
    const[currentWord,setCurrentWord]=React.useState(()=>getNewWord())
    const[guessedLetters,setGuessedLetters]=React.useState([])  

    const wrongGuessCount=guessedLetters.filter(letter=>
        !currentWord.includes(letter)).length

    const letterElements=currentWord.split("")

    const isGameWon = letterElements.every(letter=>
        guessedLetters.includes(letter)
    )
    const isGameLost=wrongGuessCount >= languages.length-1
    const isGameOver= isGameLost || isGameWon
        
    const boxElement=letterElements.map((letter,index)=>{
        const shouldRevealLetter = isGameLost || guessedLetters.includes(letter)
        const letterClassName=clsx(
            isGameLost && !guessedLetters.includes(letter) && "missed-letter"
        )
        return (
        <span key={index} className={letterClassName} >
            {shouldRevealLetter ? letter.toUpperCase() : ""}
        </span>
        )
    })

    function addGuessedLetter(letter){
        
        setGuessedLetters(prevGuess=>
            prevGuess.includes(letter)? prevGuess:[...prevGuess,letter])
    }

    function getClassNames(letters){
        const isGuessed=guessedLetters.includes(letters)
        const isCorrect=isGuessed && currentWord.includes(letters)
        const isWrong=isGuessed && !currentWord.includes(letters)
        return clsx({
            correct:isCorrect,
            wrong:isWrong
        })
    }

    const lastGuessedLetter = guessedLetters[guessedLetters.length - 1]
    const isLastGuessWrong = lastGuessedLetter && 
            !currentWord.includes(lastGuessedLetter)
    const lastLostLang=languages[wrongGuessCount-1]
    const fareWell=isLastGuessWrong &&lastLostLang &&  !isGameOver ? 
        getFarewellText(lastLostLang.name):null

    function newGame(){
        setCurrentWord(getNewWord)
        setGuessedLetters([])
    }

    return (
        <main>
            {isGameWon && <Confetti
                recycle={false}
                numberOfPieces={1000}/>}
            {isGameLost && <Confetti
                recycle={false}
                numberOfPieces={1000}
                gravity={0.4}
                colors={["#444", "#222", "#555", "#111"]}/>}
            
            <Header/>
            <Status
             isGameWon={isGameWon}
             isGameLost={isGameLost}
             isGameOver={isGameOver}
             fareWell={fareWell}
            />
            <Languages
                wrongGuessCount={wrongGuessCount}
            />
            <Boxes 
                boxElement={boxElement}    
            />
            <section className="sr-only" aria-live="polite" role="status">
                <p>Current word:{currentWord.split("").map(letter => 
                guessedLetters.includes(letter) ? letter + ".": "blank.")
                .join(" ")}</p>
            </section>
            <Alphabets 
                addGuess={addGuessedLetter}
                getClassNames={getClassNames}
                isGameOver={isGameOver}
                guessedLetters={guessedLetters}
            />
            {isGameOver && <button onClick={newGame} className="new-game" >New Game</button>}
        </main>
    )
}
