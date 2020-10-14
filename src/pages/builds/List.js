import React from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import buildService from '../../services/build';
import SubmitDialogComponent from '../../components/build/SubmitDialog';

export default class BuildListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            builds: [],
            error: undefined,
            toCreate: false,
        }
    }

    componentDidMount() {
        this.getList();

    }

    getList() {
        buildService
            .getAll()
            .then(value => this.setState({ builds: value }))
            .catch(err => this.setState({ error: err }));
    }

    resetList() {
        buildService
            .reset()
            .then(() => this.getList());
    }

    render() {
        const { builds, toCreate } = this.state;

        return <Container>
            <Button
                variant="outline-primary"
                onClick={() => this.setState({ toCreate: true })}
            >

                Create Build
            </Button>
            <Button
                variant="outline-primary"
                onClick={() => this.resetList()}
            >
                Reset
            </Button>

            <SubmitDialogComponent
                show={toCreate}
                handleClose={() => this.setState({ toCreate: false })}
                submited={createdBuild => this.setState({ builds: [...builds, createdBuild], toCreate: false })}
            />
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th></th>
                        <th>Car</th>
                        <th>Author</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {builds.map((build, index) => (
                        <tr key={`build${index}`}>
                            <td>{build.image}</td>
                            <td>{build.car}</td>
                            <td>{build.author}</td>
                            <td>
                                <Button
                                    variant="warning"
                                    onClick={() => this.props.history.push(
                                        `/build/details/${build._id}`
                                    )}>
                                    Check
                                </Button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </Table>
        </Container>;
    }
}