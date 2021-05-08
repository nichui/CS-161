const User = require('../models/user')

exports.createUser = async (req, res) => {
    const {picture, email} = req.user;
    const { info } = req.body;

    // const user = await User.findOneAndUpdate({email},
    //     {name: info.name, picture, businessAddress: info.workAddr, mailingAddress: info.mailAddr, role: info.role}, {new: true});
    const user = await User.findOne({email});

    if(user){
        console.log('User already exist', user)
        res.json(user)
    }
    else{
        const newUser = await new User({
            email, name: info.name, picture, businessAddress: info.workAddr, mailingAddress: info.mailAddr, role: info.role, picture
        }).save();
        console.log('USER CREATED', newUser);
        res.json(newUser);
    }
};


exports.currentUser = async (req, res) => {
    User.findOne({email: req.user.email}).exec((err, user) => {
        if(err)
            throw new Error(err);

        res.json(user);
    })
}

