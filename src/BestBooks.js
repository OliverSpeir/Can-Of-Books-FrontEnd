import React from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
let SERVER = process.env.REACT_APP_SERVER;



class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  getBooks = async () => {
    try {
      let results = await axios.get(`${SERVER}/books`);
      this.setState({
        books: results.data
      });
    } catch (error) {
      console.log('we have an error: ', error.response.data);
    }
  }


  // method that will get called when the components loads (has all it needs)
  // net effect is that cats will display on the page on page load
  componentDidMount() {
    this.getBooks();
  }

  render() {
    let carouselItems = this.state.books.map ((x,idx)=> (
      <Carousel.Item key ={idx}>
          <h3> Title : {x.title} Description: {x.description} </h3>
      </Carousel.Item>
    ))
    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        {this.state.books.length ?( 
          <Carousel> 
            {carouselItems}
          </Carousel>
        ) : (<h3>No Books Found :(</h3>)
  }
  </>
    )
  }
}

export default BestBooks;



// {this.state.books.map ((x,idx) => (
//   <>
//   {console.log(x) }
//   <Carousel.Item key= {idx}>
//     <h1> as;dkfjaskldfj</h1>
//   </Carousel.Item>