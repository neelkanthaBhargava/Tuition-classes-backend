const getProfileById = (db) => (req, res) => {
    const { uid } = req.params;
    db.select('*').from('users').join('userdetails','users.uid', '=', 'userdetails.uid')
        .where('users.uid', '=', uid)
        .then(data => {
            if(data.length !== 0)
            res.json(data[0]);
            else res.status(400).json('Invalid user');
        })
        .catch(err => res.status(400).json('Invalid request'));
}

module.exports = {
    getProfileById
}