import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import UserDao from '../db/dao/users.dao';
import UserDTO from '../dto/user.dto';

const init = () => {
    passport.use("register", new LocalStrategy({ usernameField: "email", passReqToCallback: true }, async (req, email, password, done) => {
        try {
            const {
                body: { user_name, age, profile_image }
            } = req;

            const user = await UserDao.getUserByEmail(email);
            if (user) {
                return done(null, false, { message: `El correo ${email} ya está registrado.` });
            }


            const newUser: any = await UserDao.createUser({ user_name, email, age, profile_image, password });
            return done(null, newUser);
        } catch (err) {
            return done(err);
        }
    }));

    passport.use(
        "login",
        new LocalStrategy(
            { usernameField: "email" },
            async (email, password, done) => {

                try {

                    const user: any = await UserDao.getUserByEmail(email);

                    if (!user) {
                        return done(null, false, { message: "Correo o contraseña inválidos." });
                    }

                    const isValidPassword: boolean = await UserDao.comparePassword(email, password);

                    if (isValidPassword === false) {
                        return done(null, false, { message: "Correo o contraseña inválidos." });
                    }

                    const userDTO = new UserDTO(user.email, user.user_name, user.age, user.role);
                    return done(null, userDTO);
                } catch (error) {
                    return done(error);


                }
            }
        )
    );

    passport.serializeUser((user: any, done) => {
        console.log("este es el usuario en serialized user", user);

        done(null, user);
    });

    passport.deserializeUser(async (user: any, done) => {

        const userID: string = user.email
        try {
            const user: any = await UserDao.getUserByEmail(userID);
            const userDTO = new UserDTO(user.email, user.user_name, user.age, user.role);
            done(null, userDTO);
        } catch (err) {
            done(err);
        }
    });

}
export default init;
