import React from 'react';
import {Modal, Form} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';


class BookModal extends React.Component {
  render() {
    return (
      <>
        <Modal
          show={this.props.show}
          onHide={this.props.onHide}
        >
          <Form onSubmit={this.props.handleBookSubmit}>
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Form.Group controlId="status">
                <Form.Check type="checkbox" label="status" />
              </Form.Group>
              <Button type="submit">Add Book</Button>
            </Form>
          <Button onClick={this.props.onHide} >Close</Button>
        </Modal>
      </>
    )

  }



}


export default BookModal;
