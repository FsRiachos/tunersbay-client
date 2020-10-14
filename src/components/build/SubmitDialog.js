import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import buildService from '../../services/build'

export default class SubmitDialogComponent extends React.Component {
    toEdit = false;

    constructor(props) {
        super(props);
        this.toEdit = props.build !== undefined;
        this.state = this.toEdit
            ? props.build
            : {
                title: '', collection: '', author: '', publish_year: 0
            };
    }

    handleSubmit(evt) {
        evt.preventDefault();
        if (this.toEdit) {
            buildService
                .update(this.props.build._id, this.state)
                .then(() => this.props.submited(this.state));
        } else {
            buildService
                .create(this.state)
                .then(buildId => this.props.submited({ ...this.state, _id: buildId._id }));
        }

    }

    render() {
        const { show, handleClose } = this.props
        const { title, author, collection, publish_year } = this.state
        return (
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>{this.toEdit ? 'Edit build' : 'Create build'}</Modal.Title>
                </Modal.Header>
                <Form onSubmit={evt => this.handleSubmit(evt)}>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                value={title}
                                onChange={evt => this.setState({ title: evt.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Author</Form.Label>
                            <Form.Control
                                value={author}
                                onChange={evt => this.setState({ author: evt.target.value })}
                            />
                            <Form.Group>
                                <Form.Label>Collection</Form.Label>
                                <Form.Control
                                    value={collection}
                                    onChange={evt => this.setState({ collection: evt.target.value })}
                                />
                                <Form.Group>
                                    <Form.Label>Publish Year</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={publish_year}
                                        onChange={evt => this.setState({ publish_year: evt.target.value })}
                                    />
                                </Form.Group>
                            </Form.Group>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                        <Button variant="primary" type="submit">Save</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        );
    }
}