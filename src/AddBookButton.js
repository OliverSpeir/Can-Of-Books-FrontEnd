import React from 'react';
import Button from 'react-bootstrap/Button';
import BookModal from './BookModal';


class BookButton extends React.Component{


  render() {
    return(
      <>
      <Button onClick={this.props.handleOpenModal}>Add Book</Button>
      <BookModal show={this.props.show} onHide={this.props.handleCloseModal} handleSubmit={this.props.handleSubmit}/>
      </>
    )

  }



}


export default BookButton;
