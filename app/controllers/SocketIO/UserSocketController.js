const Handler = lulu.use('app/errors/Handler');
const UserService = lulu.use('app/services/UserService');
const response = lulu.use('app/responses/Response');
module.exports = {
    /* list : async function (ws) {
        try{
            const users = await UserService.list();
            ws.io.emit(ws.event, response.build('User List Loaded', {users}, 200)); // wrap data in object to avoid confusion
            ws.io.emit('some/other/event', response.build('Some Other Event Emitted', {
                lulu: true,
                userCount: users.length,
                usersAreHero: false,
            }, 200)); // wrap data in object to avoid confusion
        }
        catch(error){
            ws.io.emit(ws.event, Handler(error));
        }
    }, */
}