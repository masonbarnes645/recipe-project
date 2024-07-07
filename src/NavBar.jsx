import { Link, NavLink } from "react-router-dom"

function NavBar(){
return(
<>

<nav>
<Link to={'/'}> Home </Link>
<Link to={'/favorites'}> Favorite Recipes </Link>
<Link to={'/new-dish'}> Submit New Dish</Link>
</nav>
</>
)

}


export default NavBar