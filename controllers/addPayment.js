//@ts-check

const handleNewPayment = (db) => (req, res) => {
    const { email, userType, uid, forMonth, payValue } = req.body;
    const date = new Date();

    if (userType === 'faculty') {
        db.select('uid', 'usertype').from('users').where('email', '=', email)
            .then(data => {
                if (data[0].usertype === 'faculty') {

                    return db.insert({
                        uid: uid,
                        date: date,
                        for_month: forMonth,
                        pay_value: payValue
                    })
                        .into('userpayments')
                        .returning('*')
                        .then(data => {
                            res.json(data[0]);
                        })
                        .catch(err => {
                            res.status(400).json('Invalid user');
                        })
                }
            })
            .catch(err => {
                res.status(400).json('Invalid user');
            })

    } else {
        res.status(400).json('Invalid user');
    }
}

module.exports = {
    handleNewPayment
}