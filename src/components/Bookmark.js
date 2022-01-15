import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"

const Bookmark = ({title, link, summary, icon}) => {

    return (
        <Link to={link} style={{ textDecoration: 'none' }}>
            <Card bg='dark' text='white' className="text-center" style={{ width: '18rem', borderRadius: '10%'}}>
                <Card.Header style={{padding: "0px"}}>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <div dangerouslySetInnerHTML={{ __html: icon}}/>
                    </div>
                </Card.Header>
                <br/>
                <Card.Body>
                <Card.Title>{title}</Card.Title>
                    <Card.Text>
                        {summary}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Link>
    )
}

export default Bookmark;