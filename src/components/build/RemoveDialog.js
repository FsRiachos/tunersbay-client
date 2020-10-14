import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import buildService from '../../services/build'

export default class RemoveDialogComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { sure: false }
    }

    handleRemove() {
        buildService.remove(this.props.buildId)
            .then(() => {
                this.props.removed();
            })
    }

    render() {
        const { show, handleClose } = this.props
        const { sure } = this.state
        return (
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Remove Build</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Se continuar vai apagar permanentemente a build do sistema! Tem a certeza?
                       

                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="outline-primary"
                        disabled={!sure}
                        onClick={() => this.handleRemove()}
                    >
                        Confirm
                        </Button>
                        <Button
                        variant="danger"
                        onClick={() => this.setState({ sure: !sure })}
                    >
                        Sure
                        </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}