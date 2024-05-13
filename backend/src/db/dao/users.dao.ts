import { RowDataPacket, FieldPacket } from "mysql2";
import connectToDatabase from "../../configs/configDB";

const db = connectToDatabase("bookrental");
export default class UserDao {
  /* este se tiene que borrar */
  static comparePassword(email: string, password: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        function (err, res, fields) {
          if (err) {
            console.log(
              "Error al obtener usuario por correo electrónico: ",
              err
            );
            reject(err);
          } else {
            if (res.length === 0) {
              console.log(
                "Usuario no encontrado con el correo electrónico proporcionado"
              );
              resolve(false);
            } else {
              console.log("Usuario obtenido: ", res[0]);
              const isPasswordCorrect: boolean = res[0].password === password;
              resolve(isPasswordCorrect);
            }
          }
        }
      );
    });
  }

  static logout(id: string) {
    return new Promise((resolve, reject) => {
      db.query(
        "DELETE FROM sessions WHERE session_id = ?",
        [id],
        (err, res) => {
          if (err) {
            console.log("Error al obtener la session: ", err);
            reject(err);
          } else {
            resolve(res);
          }
        }
      );
    });
  }

  //crud users
  static getUsers() {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM users",
        function (err: any, res: RowDataPacket[], fields: FieldPacket[]) {
          if (err) {
            console.log("Error al obtener usuarios: ", err);
            reject(err);
          } else {
            console.log("Usuarios obtenidos: ", res);
            resolve(res);
          }
        }
      );
    });
  }

  static getUserByEmail(email: string) {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM users WHERE email = ?", [email], (err, res) => {
        if (err) {
          console.log("Error al obtener usuario por correo electrónico: ", err);
          reject(err);
        } else {
          resolve(res[0]);
        }
      });
    });
  }

  static createUser(user: {
    user_name: string;
    email: string;
    password: string;
    age: number;
    profile_image: string;
  }) {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO users (user_name, email, password, age, profile_image) VALUES (?, ?, ?, ?, ?)",
        [
          user.user_name,
          user.email,
          user.password,
          user.age,
          user.profile_image,
        ],
        function (err: any, res: any) {
          if (err) {
            console.log("Error al crear usuario: ", err);
            reject(err);
          } else {
            console.log("Usuario creado: ", res);
            resolve(res);
          }
        }
      );
    });
  }

  static deleteUser(email: string) {
    return new Promise((resolve, reject) => {
      db.query(
        "DELETE FROM users WHERE email = ? LIMIT 1",
        [email],
        function (err: any, res: any) {
          if (err) {
            console.log("Error al eliminar usuario: ", err);
            reject(err);
          } else {
            console.log("Usuario eliminado: ", res);
            resolve(res);
          }
        }
      );
    });
  }
}
