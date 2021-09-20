
import HistogramStats from "./HistogramStats"
export default function Display(props) {
    const {visibility} = props
    const {results} = props
    return (
        <div>
            {visibility ? <HistogramStats results={results}/> : ""}
        </div>
    )
}
