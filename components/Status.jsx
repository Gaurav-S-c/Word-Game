import {clsx} from "clsx"

export default function Status(props){

    const gameStatusClass=clsx("game-status",{
        won:props.isGameWon,
        loses:props.isGameLost,
        bye:props.fareWell
    })

    return(
        <section aria-live="polite" role="status" className={gameStatusClass}>
            { props.isGameOver? (
                props.isGameWon ? (
                    <>
                        <h1>You Win!</h1>
                        <h2>Well Done!🎉</h2>
                    </>
                ):(
                    <>
                        <h1>Game Over!</h1>
                        <h2>You lose! Better start learning Assembly 😭</h2>
                    </>
                )
            ):(
                    <h2>{props.fareWell}</h2>
            )
            }
        </section>
    )
}