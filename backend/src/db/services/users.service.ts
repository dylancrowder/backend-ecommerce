import UserDao from '../dao/users.dao';

export default class UserService {


    //este se tiene que modificar para ser borrado
    static comparePassword(email: string, password: string): Promise<boolean> {
        return UserDao.comparePassword(email, password)
    }

    //crud
    static getUsers() {
        return UserDao.getUsers()
    }

    static getUserByEmail(email: string) {
        return UserDao.getUserByEmail(email)
    }

    static createUser(user: { user_name: string, email: string, password: string, age: number, profile_image: string }) {
        return UserDao.createUser(user)
    }

    static deleteUser(email: string) {
        return UserDao.deleteUser(email)
    }

}
