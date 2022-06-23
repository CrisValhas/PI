import React, { useEffect } from 'react';
// import { connect } from 'react-redux';// Component
import { useSelector, useDispatch } from 'react-redux'
import Nav from './Nav';
import { getDetails,deleteVideogame } from '../Actions';
import { useParams } from 'react-router-dom';
import "./Styles/Details.css";
import { Link } from 'react-router-dom';

export default function Details() {
    let id = useParams("id");
    let dispatch = useDispatch();
    useEffect(() => { dispatch(getDetails(id)) }, [id,dispatch]);
    let details = useSelector(state => state.details)

    function handleClick(e) {
        e.preventDefault(e);
        dispatch(deleteVideogame(id));
    }

    return ( 
        <div className="back">
            <div>
                <Nav />
                <div  >
                    <div>
                        <div className="bground">
                            <img className="fullimg" src={details.image} alt="" />
                            <div className="title">
                                <p >{details.name} </p>
                            </div>
                        </div>
                        <label className="item">Genres :</label>
                        <div className="gen">{
                            details.genres ? details.genres.map((genre, index) =>
                                (<p key={index} className="gen">{genre}</p>))
                                : <div></div>}
                        </div>
                        <div className="gen">
                            {details.Genres ? details.Genres.map((genre, index) =>
                                (<p key={index} className="gen">{genre.name}</p>))
                                : <div></div>}
                        </div>
                        <label className="item">Platforms :</label>
                        <div className="gen">{
                            details.platforms ? details.platforms.map((details, index) =>
                                (<p key={index} className="gen">{details}</p>))
                                : <div>Sin plataformas asignadas</div>}
                        </div>
                        <div className="des">
                            {details.description}
                        </div>
                        <div className="gen">
                            Rating {details.rating}
                        </div>
                        <div className="gen">
                            released {details.released}
                        </div>
                        <div>{details.createdInDb ?
                            <button className="sbtn" onClick={(e) => handleClick(e)} >
                                <Link to ="/home">Delete </Link>
                            </button>:null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};




// export class Details extends Component {

//     constructor(props){
//         super(props)
//         this.handleClick= this.handleClick.bind(this);
//         this.state={
//             id: this.props.params
//         }
//     }
//     componentDidMount(){
//         const {id}=this.props.Params.id;
//         console.log("id:",id);
//     }

//     handleClick(e) {
//         e.preventDefault(e);
//         this.props.deleteVideogame(this.state.id);
//     }

//     render(){
//         return(
//         <div className="back">
//                         <div>
//                             <Nav />
//                             <div  >
//                                 <div>
//                                 <div className="bground">
//                                         <img className="fullimg" src={this.props.details.image} alt="" />
//                                     <div className="title">
//                                         <p >{this.props.details.name} </p>
//                                 </div>
//                                 </div>
//                                 <label className="item">Genres :</label>
//                                 <div className="gen">{
//                                     this.props.details.genres ? this.props.details.genres.map((genre, index) =>
//                                         (<p key={index} className="gen">{genre}</p>))
//                                         : <div></div>}
//                                 </div>
//                                 <div className="gen">
//                                     {this.props.details.Genres ? this.props.details.Genres.map((genre, index) =>
//                                         (<p key={index} className="gen">{genre.name}</p>))
//                                         : <div></div>}
//                                 </div>
//                                 <label className="item">Platforms :</label>
//                                 <div className="gen">{
//                                     this.props.details.platforms ? this.props.details.platforms.map((details, index) =>
//                                         (<p key={index} className="gen">{details}</p>))
//                                         : <div>Sin plataformas asignadas</div>}
//                                 </div>
//                                 <div className="des">
//                                     {this.props.details.description}
//                                 </div>
//                                 <div className="gen">
//                                     Rating {this.props.details.rating}
//                                 </div>
//                                 <div className="gen">
//                                     released {this.props.details.released}
//                                 </div>
//                                 <div>
//                                                                 <button className="sbtn" onClick={(e) => this.props.handleClick(e)} >
//                                                                         <Link to ="/home">Delete </Link>
//                                                                 </button>
//                                                         </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//         )
//     }
// }


// function mapStateToProps(state) {
//     return {
//         details:  state.details
//     };
// }

// function mapDispatchToProps(dispatch) {
//     return {
//         getDetails: id => dispatch(getDetails(id)),
//         deleteVideogame: (id) => dispatch(deleteVideogame(id)),
//     };
// }

//     export default connect(mapStateToProps,{getDetails})(Details);