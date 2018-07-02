//@ts-check

const handleRegister = (bcrypt, db) => (req, res) => {

    const { uname, pass, email, std, board,
        contact, fathersName, mothersName, fathersContact,
        mothersContact, address, school } = req.body;

    const hash = bcrypt.hashSync(pass);

    db.transaction(trx => {
        // console.log('entering transaction');
        trx.insert({
            pass: hash,
            email: email
        })
            .into('userpass')
            .returning('email')
            .then(loginEmail => {
                // console.log(loginEmail[0]); 
                return trx('users')
                    .returning('uid')
                    .insert({
                        uname: uname,
                        email: loginEmail[0],
                        usertype: 'student'
                    })
                    .then(userid => {
                        // console.log(userid);
                        // console.log(school,std,board,address,fathersContact,mothersContact,contact,fathersName,mothersName);
                        return trx('userdetails')
                            .returning('*')
                            .insert({
                                uid: Number(userid),
                                university: school,
                                std: std,
                                board: board,
                                address: address,
                                fathersname: fathersName,
                                mothersname: mothersName,
                                contact: Number(contact),
                                fatherscontact: Number(fathersContact),
                                motherscontact: Number(mothersContact)
                            })
                            .then(userDetail=>{
                                // console.log(userDetail);
                                res.json([userDetail[0],uname,email,'student']);
                            })
                    })
            })
            .then(trx.commit)
            .catch(trx.rollback)
    })
    .catch(err => res.status(400).json(`Unable to register ${err}`));

}

module.exports = {
    handleRegister
}