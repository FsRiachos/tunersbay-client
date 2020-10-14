import React from 'react';
import { Container, Button, Row, Col, Jumbotron, Badge, Spinner, Alert } from 'react-bootstrap';
import buildService from '../../services/build';
import RemoveDialogComponent from '../../components/build/RemoveDialog';
import SubmitDialogComponent from '../../components/build/SubmitDialog';

export default class BuildDetailsPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            build: undefined,
            error: undefined,
            toRemove: false,
            toUpdate: false,
        };
    }

    componentDidMount() {
        buildService.getOne(this.props.match.params.id)
            .then(value => this.setState({ build: value }))
            .catch(err => this.setState({ error: err }));
    }
    render() {
        const { build, error, toRemove, toUpdate } = this.state;

        return <Container>
            <Button variant="outline-primary" onClick={() => this.props.history.push("/build/list")}>
                Back To List
            </Button>
            {error !== undefined &&
                <Alert variant="danger">
                    {error}
                </Alert>}
            {build !== undefined
                ? <div>
                    <Jumbotron>
                        <h1>{build.title}</h1>
                        <h5>{build._id}</h5>
                        <Row>
                            <Col xs={4} md={3} lg={2}><Badge variant="secondary">Author</Badge></Col>
                            <Col xs={8} md={9} lg={10}>{build.author}</Col>
                        </Row>
                        <Row>
                            <Col xs={4} md={3} lg={2}><Badge variant="secondary">Modifications</Badge></Col>
                            <Col xs={8} md={9} lg={10}>{build.collection}</Col>
                        </Row>
                        <Row>
                            <Col xs={4} md={3} lg={2}><Badge variant="secondary">Publish Year</Badge></Col>
                            <Col xs={8} md={9} lg={10}>{build.publish_year}</Col>
                        </Row>
                        <br></br>
                        <p>
                            <Button variant="dark"
                                onClick={() => this.setState({ toUpdate: true })}
                            >
                                Update
                            </Button>&nbsp;
                            <Button
                                variant="danger"
                                onClick={() => this.setState({ toRemove: true })}
                            >
                                Remove
                            </Button>
                        </p>
                    </Jumbotron>

                    <RemoveDialogComponent
                        buildId={build._id}
                        show={toRemove}
                        handleClose={() => this.setState({ toRemove: false })}
                        removed={() => this.props.history.push('/build/list')}
                    />
                    <SubmitDialogComponent
                        build={build}
                        show={toUpdate}
                        handleClose={() => this.setState({ toUpdate: false })}
                        submited={updatedBuild => this.setState({ build: updatedBuild, toUpdate: false })}
                    />
                </div>

                : <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            }
        </Container>
    }
}