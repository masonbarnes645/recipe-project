import { useRouteError } from "react-router-dom"
import { Link } from "react-router-dom"

function ErrorPage() {

    const error = useRouteError()

    return (
        <>
            <h1>{error.data || error.message}</h1>
            <Link to={'/'}> Take me Home! </Link>
    </>

    )

}

export default ErrorPage