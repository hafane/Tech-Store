import { Link, useParams } from "react-router-dom"

type props = {
    linkTo: string
} 

const DynamicCrumbName = ({linkTo}: props) => {
    const name = useParams()

    return (
        <Link to={linkTo + name.id}>
            {name.id}
        </Link>
    );
}

export default DynamicCrumbName;
