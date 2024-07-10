import { Children } from "react"
import Home from "./Home"
import ErrorPage from "./ErrorPage"
import Favorites from "./Favorites.jsx"
import Submit from "./Submit.jsx"
import Index from './Index.jsx'
import Details from "./Details.jsx"

const routes = [

    {
        path: '/',
        element: <Home />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Index />
            },
            {
                path: 'favorites',
                element: <Favorites />
            },
            {
                path: 'new-dish',
                element: <Submit />
            },
            {
                path: 'recipes/:id',
                element: <Details />
            }

        ]
    }






]


export default routes