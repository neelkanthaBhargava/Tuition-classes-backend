//@ts-check

const handleSignin = (bcrypt, db) => (req, res) => {
    const { email, pass } = req.body;

    db.select('email', 'pass').from('userpass').where('email', '=', email)
        .then(data => {
            const isValid = bcrypt.compareSync(pass, data[0].pass);
            if (isValid) {
                return db.select('*').from('users')
                    .join('userdetails', 'users.uid', '=', 'userdetails.uid')
                    .where('email', '=', data[0].email)
                    .then(data => {
                        res.json(data[0]);
                    })
                    .catch(err => res.status(400).json('Data not available'));
            }else {
                res.status(400).json('invalid details');
            }
        })
        .catch(err => res.status(400).json('Illelgal login request'));
}

module.exports = {
    handleSignin
}