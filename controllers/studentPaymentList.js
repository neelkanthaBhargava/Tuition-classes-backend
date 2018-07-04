//@ts-check

const handlePaymentList = (db) => (req, res) => {
    const { uid, userType } = req.body;
    if (userType === 'student') {
        db.select('*').from('userpayments').where('uid', '=', uid)
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.status(400).json('Data Unavailable');
            });
    } else {
        res.status(400).json('Invalid user');
    }
}

module.exports = {
    handlePaymentList
}