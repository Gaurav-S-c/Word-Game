export default function Alphabets(props) {
    const alphabet = "qwertyuiopasdfghjklzxcvbnm"
    const keyboardElements = alphabet.split("").map(letters => {
        return (<button
            key={letters}
            disabled={props.isGameOver}
            aria-disabled={props.guessedLetters.includes(letters)}
            aria-label={`Letter ${letters}`}
            className={props.getClassNames(letters)}
            onClick={() => props.addGuess(letters)}
        >
            {letters.toUpperCase()}
        </button>)
    }
    )
    return (
        <section className="keyboard">
            {keyboardElements}
        </section>
    )
}