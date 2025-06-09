import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom"
import leftArrow from '../assets/images/left-arrow.png'


type RouteError = {
    status?: number
    statusText?: string
    message?: string
}


export default function ErrorPage() {

    return (
        <section>        
            <Link to="/">
                <img src={leftArrow} alt="Icon of a left arrow" />
                Go back to the homepage
            </Link>
        </section>
    )
}
