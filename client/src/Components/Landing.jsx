import { Link } from 'react-router-dom';
import "./Styles/Landing.css";
export default function Landing() {

        return (
                <div className="landing">
                        <div className="bg">
                                <Link to="/home" >
                                        <img className="landingImg" alt=""></img>
                                </Link>
                        </div>
                </div>
        );
}