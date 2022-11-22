import React from 'react';
import {Modal, Form} from 'react-bootstrap';


class BookButton extends React.Component {


  render() {
    return (
      <>
        <Modal
          show={this.props.show}
          onHide={this.props.handleCloseModal}
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
          <Button onClick={this.props.handleCloseModal} >Close</Button>
        </Modal>
      </>
    )

  }



}


export default BookButton;
