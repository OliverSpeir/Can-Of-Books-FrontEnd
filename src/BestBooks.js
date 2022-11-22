import React from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import BookButton from './AddBookButton';
let SERVER = process.env.REACT_APP_SERVER;



class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      isModalShown: false
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

  handleOpenModal = () => {
    this.setState({
      isModalShown: true
    });
  }

  handleCloseModal = () => {
    this.setState({
      isModalShown: false
    })
  }

  handleBookSubmit = (e) => {
    e.preventDefault();
    let newBook = {
      title: e.target.title.value,
      description: e.target.description.value,
      status: e.target.status.checked
    }
    this.postBook(newBook);
  }

  postBook = async (aBook) => {
    try {
      // make the request to add a cat to my server
      // axios.post will return the cat that was added to the database with the ID and version number
      // axios.post takes in 2 parameters: the URL endpoint, and the thing we want added:
      let bookThatWasAdded = await axios.post(`${SERVER}/books`, aBook);
      console.log(bookThatWasAdded);
      this.setState({
        books: [...this.state.books, bookThatWasAdded.data]
      });
    } catch (err) {
      console.log('We have an error: ', err.response.data);
    }
  }

  render() {
    let carouselItems = this.state.books.map((x, idx) => (
      <Carousel.Item key={idx}>
        <h3> Title : {x.title} Description: {x.description} </h3>
      </Carousel.Item>
    ))
    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        {this.state.books.length ? (
          <Carousel>
            {carouselItems}
          </Carousel>
        ) : (<h3>No Books Found :(</h3>)
        }
        <BookButton handleOpenModal={this.handleOpenModal} handleCloseModal={this.handleCloseModal} show={this.state.isModalShown} handleBookSubmit={this.handleBookSubmit}/>
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
