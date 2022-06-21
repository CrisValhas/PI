import notfound from"../Media/notfound.gif"
import Nav from "../Components/Nav"
export default function Notfound() {
return(
    
    <div>
        <Nav />
        <div>
            <img src={notfound} width="800" height="400" alt= ""></img>
        </div>
    </div>
    
)
}