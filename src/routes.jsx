import { Children } from "react"
import Home from "./Home"
import ErrorPage from "./ErrorPage"
import Favorites from "./Favorites.jsx"
import Submit from "./submit"
import Index from './Index.jsx'

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
            }

        ]
    }






]


export default routes