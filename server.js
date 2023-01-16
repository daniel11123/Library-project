if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const flash = require('express-flash')
const session = require('express-session')
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override')
// require('./db/connect')
var bodyParser = require("body-parser");
const mongoose = require('mongoose');
const User = require('./models/Users')
const AdminUser = require('./models/Admins')
const Book = require('./models/Books')
const BookingBook = require('./models/Booking')
mongoose.connect('mongodb://localhost:27017/WebApplication', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
var db = mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function (callback) {
    console.log("connection succeeded");
})

const e = require('express')
let books = [];
let user = [];
let admin = [];
let booking = [];
app.use(express.json()) // Trả về dạng json
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(methodOverride('_method'))



//////USERS//////////
app.get('/register', async (request, response) => {
    const users = await User.find({});
    console.log(users)
    try {
        response.send(users);
    } catch (error) {
        response.status(500).send(error);
    }
});
app.post('/register', async (req, res) => {
    try {
        const user = new User({
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, 10),
            userid: uuidv4(),
        });
        res.json(user)
        User.findOne({
            email: req.body.email
        })
            .then(data => {
                if (data) {
                    console.log("Email da co nguoi dung")
                }
                else {
                    user.save(function (err) {
                        console.log(`email vua nhap la ${req.body.email} va mat khau :${req.body.password}`)
                    });
                }
            })
    } catch (error) {
        console.log(error)

    }

})
app.get('/register/:id', async (req, res) => {
    try {
        const users = await User.findOne({
            id: req.params.userid
        })
        res.json(users);
    } catch (error) {
        console.log(error)
    }
})
app.delete('/register/:id', async (req, res) => {
    const { id } = req.params;
    console.log(id)
    user = user.filter((iduser) => iduser.isbn13 !== req.params.id);
    const result = await User.deleteOne(req.params);
    console.log(result)
    res.send(`User with id ${id} has been deleted`)
});
app.patch('/register/:id', async (req, res) => {
    const { id } = req.params;
    const { email } = req.body;
    User.updateOne(req.body)
        .then(data => {
            console.log(data)
        }).catch(err => {
            console.log(err)
        })
    console.log(req.body)
});
app.post('/login', async (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    console.log(email)
    console.log(password)
    /////////////////////////////////////////////////
    const foundUser = await User.findOne({ "email": req.body.email }).exec();
    let cmp = false;
    // console.log(foundUser)
    if (foundUser) {
        cmp = await bcrypt.compare(req.body.password, foundUser.password);
        console.log(req.body.password)
        console.log(foundUser.password)
        if (cmp) {
            res.status(200).json({ foundUser })
        }
        else {
            res.status(401).json({})
        }
    }
    console.log('cmp', cmp)
    return cmp;
})
///////BOOKLIST/////////
app.get('/Booklist', async (request, response) => {
    const users = await Book.find({});
    console.log(users)
    try {
        response.send(users);
    } catch (error) {
        response.status(500).send(error);
    }
});
app.post('/Booklist', async (req, res) => {
    try {
        // title: String,
        // subtitle: String,
        // isbn13: String,
        // price: String,
        // image: String,
        // url: String,
        const book = new Book({
            title: req.body.title,
            subtitle: req.body.subtitle,
            isbn13: req.body.isbn13,
            price: req.body.price,
            image: req.body.image,
            id: uuidv4()
        });
        console.log(book.id)
        res.json(book)
        Book.findOne({
            title: req.body.title
        })
            .then(data => {
                if (data) {
                    console.log("Da dang ki cuon sach nay roi")
                }
                else {
                    book.save(function (err) {
                        console.log("da cap nhat sach thanh cong")
                    });
                }
            })

    } catch (error) {
        console.log(error)

    }

})
app.get('/Booklist/:_id', async (req, res) => {

    try {

        const books = await Book.findOne({
            id: req.params._id
        })
        res.json(books);
    } catch (error) {
        console.log(error)
    }
});
app.delete('/Booklist/:isbn13', async (req, res) => {
    const { isbn13 } = req.params;
    console.log(isbn13)
    books = books.filter((idbookdelete) => idbookdelete.isbn13 !== req.params.isbn13);
    const result = await Book.deleteOne(req.params);
    console.log(result)
    res.send(`book with isbn13 ${isbn13} has been deleted`)
});
app.patch('/Booklist/:isbn13', async (req, res) => {
    const { isbn13 } = req.params;
    const { title, subtitle, price, image } = req.body;
    Book.updateOne(req.body)
        .then(data => {
            console.log(data)
        }).catch(err => {
            console.log(err)
        })
    console.log(req.body)
});
app.listen(3000)
//////ADMIN///////////////
app.post('/admin', async (req, res) => {
    try {
        const admin = new AdminUser({
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, 10),
            adminid: uuidv4(),
        });
        res.json(admin)
        AdminUser.findOne({
            email: req.body.email
        })
            .then(data => {
                if (data) {
                    console.log("Email da co nguoi dung")
                }
                else {
                    admin.save(function (err) {
                        console.log(`email vua nhap la ${req.body.email} va mat khau :${req.body.password}`)
                    });
                }
            })
    } catch (error) {
        console.log(error)

    }

})
app.get('/admin/:id', async (req, res) => {
    try {
        const users = await AdminUser.findOne({
            id: req.params.adminid
        })
        res.json(users);
    } catch (error) {
        console.log(error)
    }
})
app.get('/admin', async (request, response) => {
    const admins = await AdminUser.find({});
    console.log(admins)
    try {
        response.send(admins);
    } catch (error) {
        response.status(500).send(error);
    }
});
////////////////BOOKINGBOOK////////////////////////
app.post('Booklist/Booking', async (req, res) => {

    try {
        const booking = new BookingBook({
            title: req.body.title,
            bookingdate: req.body.bookingdate,
            returndate: req.body.returndate,
        });
        // booking.save(function (err) {
        //     console.log("da dang ky muon sach thanh cong")
        // });


        console.log(booking)
        res.json(booking)
        BookingBook.findOne({
            title: req.body.title,
        })
            .then(data => {
                if ((req.body.bookingdate > req.body.returndate)) {
                    console.log("Sach da co nguoi đặt hoặc ngày mượn và trả không phù hợp")
                }

                else {
                    booking.save(function (err) {
                        console.log("da muon  sach thanh cong")

                    });
                }
            })

    } catch (error) {
        console.log(error)

    }

})
// app.get('/Booking/:id', async (req, res) => {
//     try {
//         const books = await BookingBook.findOne({
//             id: req.params.adminid
//         })
//         res.json(books);
//     } catch (error) {
//         console.log(error)
//     }
// })