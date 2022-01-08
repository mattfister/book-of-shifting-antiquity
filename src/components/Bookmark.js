import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"

const Bookmark = ({title, link, summary}) => {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Body>
            <Card.Title><Link to={link}>{title}</Link></Card.Title>
                <Card.Text>
                    {summary}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Bookmark;