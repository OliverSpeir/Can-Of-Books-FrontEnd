import React from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import BookButton from './AddBookButton';
import Button from 'react-bootstrap/Button';
import EditBookModal from './EditBookModal';
import { withAuth0 } from '@auth0/auth0-react';
// const res = await this.props.auth0.getIdTokenClaims();
// const jwt = res.__raw;


class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      isModalShown: false,
      isEditModalShown: false
    }
  }

  getBooks = async () => {
    if (this.props.auth0.isAuthenticated) {
      const res = await this.props.auth0.getIdTokenClaims();
      const jwt = res.__raw;
      let config = {
        method: 'get',
        baseURL: process.env.REACT_APP_SERVER,
        url: '/books',
        headers: {
          "Authorization": `Bearer ${jwt}`
        }
      }
    try {
      let results = await axios(config);
      // let results = await axios.get(`${SERVER}/books`);
      this.setState({
        books: results.data
      });
    } catch (error) {
      console.log('we have an error: ', error.response.data);
    }
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
  handleOpenEditModal = () => {
    this.setState({
      isEditModalShown: true
    });
  }

  handleCloseEditModal = () => {
    this.setState({
      isEditModalShown: false
    })
  }

  handleBookSubmit = (e) => {
    e.preventDefault();
    let newBook = {
      title: e.target.title.value,
      description: e.target.description.value,
      status: e.target.status.checked,
      img: e.target.cover.value
    }
    this.postBook(newBook);
  }

  deleteBook = async (id) => {
    if (this.props.auth0.isAuthenticated) {
      const res = await this.props.auth0.getIdTokenClaims();
      const jwt = res.__raw;
      let config = {
        method: 'delete',
        baseURL: process.env.REACT_APP_SERVER,
        url: `/books/${id}`,
        headers: {
          "Authorization": `Bearer ${jwt}`
        },
        data:id
      }
    try {
      // let url = `${SERVER}/books/${id}`;
      // do not assume that axios.delete() will return a value
      // await axios.delete(url);
      await axios(config);
      // // this is ok for today's lab
      // this.getCats();
      let updatedBooks = this.state.books.filter(book => book._id !== id);
      this.setState({
        books: updatedBooks
      })
    } catch (err) {
      console.log('We have an error: ', err.response.data);
    }
  }
}
  updatedBook = async (bookToUpdate) => {
    if (this.props.auth0.isAuthenticated) {
      const res = await this.props.auth0.getIdTokenClaims();
      const jwt = res.__raw;
      let config = {
        method: 'put',
        baseURL: process.env.REACT_APP_SERVER,
        url: `/books/${bookToUpdate._id}`,
        headers: {
          "Authorization": `Bearer ${jwt}`
        },
        data:bookToUpdate
      }


    try {
      // console.log(bookToUpdate);
      // let url = `${SERVER}/books/${bookToUpdate._id}`;
      // let updatedBookObj = await axios.put(url, bookToUpdate);
      let updatedBookObj = await axios(config);

      let updateBooksArray = this.state.books.map(x => {
        return x._id === bookToUpdate._id
          ? updatedBookObj.data
          : x;
      });
      this.setState({
        books: updateBooksArray
      });
    } catch (err) {
      console.log('We have an error: ', err.response.data);
    }
  }
}

  postBook = async (aBook) => {
    if (this.props.auth0.isAuthenticated) {
    const res = await this.props.auth0.getIdTokenClaims();
    const jwt = res.__raw;
    let config = {
      method: 'post',
      baseURL: process.env.REACT_APP_SERVER,
      url: '/books',
      headers: {
        "Authorization": `Bearer ${jwt}`
      },
      data:aBook
    }
    try {
      let bookThatWasAdded = await axios(config);
      // let bookThatWasAdded = await axios.post(`${SERVER}/books`, aBook);
      this.setState({
        books: [...this.state.books, bookThatWasAdded.data]
      });
    } catch (err) {
      console.log('We have an error: ', err.response.data);
    }
  }
  }

  render() {
    let carouselItems = this.state.books.map((x, idx) => (
      <Carousel.Item key={idx}>
        <img src={`${x.img}`} alt={x.description} />
        <Carousel.Caption className="carouselTitle"><p>  Title : {x.title} Description: {x.description} </p> <Button className="editBook" onClick={this.handleOpenEditModal}>Edit Book</Button>  <Button className="deleteButton" onClick={() => this.deleteBook(x._id)}>Delete Book</Button></Carousel.Caption>
        <EditBookModal onHide={this.handleCloseEditModal} show={this.state.isEditModalShown} updatedBook={this.updatedBook} books={x}
        />
      </Carousel.Item>
    ))
    return (
      <>
        <h2>Virtual Bookshelf</h2>

        {this.state.books.length ? (
          <Carousel>
            {carouselItems}
          </Carousel>
        ) : (<h3>No Books Found :(</h3>)
        }
        <BookButton handleOpenModal={this.handleOpenModal} handleCloseModal={this.handleCloseModal} show={this.state.isModalShown} handleBookSubmit={this.handleBookSubmit} />
      </>
    )
  }
}

export default withAuth0(BestBooks);

