import {Link, useMatch, useResolvedPath} from "react-router-dom"
import "./index.css"

export default function Navbar(){
    console.log("Navbar component is rendering");
    return(
        <nav className = "nav" >
            <Link to = "/" className = "title">Constellation </Link>
       
                <ul>
                  <CustomLink to="/home">Home</CustomLink>
                  <CustomLink to="/prompt">Prompt Page</CustomLink>
                  <CustomLink to="/details">Details Page</CustomLink>
                </ul>
            <hr></hr>
        </nav>
    );
}

function CustomLink({to, children, ...props}){
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({path : resolvedPath.pathname, end: true})
    return(
        <li className = {isActive ? "active" : ""}>
            <Link to = {to} {...props}> {children} </Link>
        </li>
    )
}

