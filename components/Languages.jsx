import { languages } from "../languages"
import {clsx} from 'clsx'

export default function Languages(props){

        const languageElements=languages.map((lang,index)=>{
    
            const isLost= index<props.wrongGuessCount
    
            const styles={
                backgroundColor:lang.backgroundColor,
                color:lang.color
            }
            return(
                <span 
                    className={clsx("chip",{"lost":isLost})} 
                    style={styles}
                    key={lang.name}
                >
                        {lang.name}
                </span>
            )
        })

    return(
        <section className="language-chips">
            {languageElements}
        </section>
    )
}