import React from 'react'
import fred from '../../assets/fred.jpg'
import { Card, Button, Badge, ListGroup, ListGroupItem } from 'react-bootstrap'

export default class AuthorComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            isAvailable: true,
            skills: ["Engines", "Tuning", "Bodywork"],
        };
    }

    componentDidMount() {
        this.timer = setInterval(() => this.thick, 1000);
    }

    thick() {
        this.setState({ date: new Date() });
    }

    handleClick() {
        this.setState(state => ({ isAvailable: !state.isAvailable }));
    }

    render() {
        return (
            <Card style={{ width: '13rem' }}>
                <Card.Img variant="top" src={fred} />
                <Card.Body>
                    <Card.Title>{this.props.name}</Card.Title>
                    <Card.Subtitle>{this.props.info.work}</Card.Subtitle>
                    <Card.Text>
                        {this.state.date.toLocaleTimeString()}
                        <br />
                        {this.props.info.description}
                    </Card.Text>
                    <Button variant="primary" onClick={e => this.handleClick()}>
                        Mudar disponibilidade
                    </Button>
                    {this.state.isAvailable
                        ? <Badge variant="success">Available</Badge>
                        : <Badge variant="danger">Unavailable</Badge>
                    }
                    <ListGroup>
                        <ListGroupItem>
                            {this.state.skills.map((skill, index) => (
                                <ListGroup.Item key={'skill' + index.toString ()}>{skill}</ListGroup.Item>
                            ))}
                        </ListGroupItem>
                    </ListGroup>
                </Card.Body>
            </Card>
        );
    }
}

//export const Author = AuthorComponent;