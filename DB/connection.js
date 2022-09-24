import pkg from 'mongoose';
const { connect } = pkg;

function connectDB() {
    return connect(process.env.DBLink).then((result) => {
        console.log(`DB connected on ....... ${process.env.DBLink}`);
    }).catch(err => console.log('fail to connect DB', err));
}

export default connectDB
