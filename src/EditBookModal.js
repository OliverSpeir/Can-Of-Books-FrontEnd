import React from 'react';
import { Modal, Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';


class BookModal extends React.Component {
    handleEditSubmit = (e) => {
        e.preventDefault();

        let bookToUpdate = {
            title: e.target.title.value || this.props.books.title,
            description: e.target.description.value || this.props.books.description,
            status: e.target.status.checked || this.props.books.status,
            img: e.target.cover.value || this.props.books.img,
            _id: this.props.books._id,
            __v: this.props.books.__v
        }
        console.log('updated book: ', bookToUpdate);

        this.props.updatedBook(bookToUpdate);
    }
    render() {
        return (
            <>
                <Modal
                    show={this.props.show}
                    onHide={this.props.onHide}
                >
                    <Form onSubmit={this.handleEditSubmit}>
                        <Form.Group controlId='cover'>
                            <Form.Label>Cover</Form.Label>
                            <Form.Control type="text" placeholder={this.props.books.img} />
                        </Form.Group>
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder={this.props.books.title} />
                        </Form.Group>
                        <Form.Group controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" placeholder={this.props.books.description} />
                        </Form.Group>
                        <Form.Group controlId="status">
                            <Form.Check type="checkbox" label="status" />
                        </Form.Group>
                        <Button type="submit" onClick={this.props.onHide}>Edit Book</Button>
                    </Form>
                    <Button onClick={this.props.onHide} >Close</Button>
                </Modal>
            </>
        )

    }



}


export default BookModal;
