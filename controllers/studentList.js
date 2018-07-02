//@ts-check

const handleStudentList = (db) => (req, res) => {
    const { email, userType } = req.body;
    if (userType === 'faculty') {
        db.select('*').from('users').where('email', '=', email)
            .then(data => {
                if (data[0].usertype === 'faculty') {
                    return db.select('users.uid', 'users.email', 'users.uname', 'userdetails.std')
                        .from('users').join('userdetails', 'users.uid', '=', 'userdetails.uid')
                        .where('users.usertype', '=', 'student')
                        .then(data => {
                            res.json(data);
                        })
                        .catch(err => res.status(400).json('Data unavailable'));
                } else {
                    res.status(400).json('Invalid User');
                }
            })
    } else {
        res.status(400).json('Invalid User');
    }
}

module.exports = {
    handleStudentList
}