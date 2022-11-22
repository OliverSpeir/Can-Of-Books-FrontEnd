import React from 'react';
import Button from 'react-bootstrap/Button';


class BookButton extends React.Component{


  render() {
    return(
      <>
      <Button onClick = {this.props.handleOpenModal} >Add Book</Button>
      </>
    )

  }



}


export default BookButton;
