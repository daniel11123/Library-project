
import React from 'react';
import axios from 'axios';

export default class Bookdetailfunc extends React.Component {
    state = {
        bookdetail: [],
        id: ''
    }
    async componentDidMount() {
        var pathname = window.location.pathname;
        var splitUrl = pathname.split('/');
        console.log(splitUrl[2])
        console.log(pathname)
        localStorage.setItem("idbook", splitUrl[2]);
        await axios.get(`/Booklist/${splitUrl[2]}`)
            .then(res => {
                console.log(this.state.id)
                const bookdetail = [res.data];
                this.setState({ bookdetail });
                console.log(bookdetail)
            })
    }
    render() {
        return (
            <ul>
                {
                    this.state.bookdetail
                        .map(book =>

                            <li key={book._id}>
                                {book.title}{book.isbn13}{book.price}{book.subtitle}{book.image}{book.url}
                            </li>
                        )
                }

            </ul>
        )
    }
}