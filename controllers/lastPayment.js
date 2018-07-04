//@ts-check

const getLastPayment = (db) => (req, res) => {
    db.select('*').from('userpayments')
        .where('uid', '=', req.body.uid).orderBy('date', 'desc')
        .then(data => {
            res.json(data[0]);
        })
        .catch(err => res.status(400).json('Data Unavailable'));
}

module.exports = {
    getLastPayment
}