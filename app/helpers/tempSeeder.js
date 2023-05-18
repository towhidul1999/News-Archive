const User = require('../models/mongoose/User');
const {Hash} = require('../helpers');

const clg = console.log;

async function dbSeed(){
    await seedUsers();
}

async function seedUsers(){
    const users = await User.find({});
    if(users.length == 0){
        const data = [
            {
                "name": "Bhudipta Tarafder",
                "uid": "1234556",
                "email": "bhu@dipta.com",
                "password": await Hash.make('123456'),
                "social_login": {},
                "image": "https://img.atlasobscura.com/pF5PO0keleITu-ZFOmsdNreiBUKSj67Sw6KkUUcZUMo/rs:fill:580:580:1/g:ce/q:81/sm:1/scp:1/ar:1/aHR0cHM6Ly9hdGxh/cy1kZXYuczMuYW1h/em9uYXdzLmNvbS91/cGxvYWRzL3BsYWNl/X2ltYWdlcy9hOWVl/NTg0NjllNWUwNDUx/MzlfaW1hZ2UuanBn/LTIucG5n.png",
            }
        ]

        await User.insertMany(data);
    }
}

module.exports = { dbSeed }