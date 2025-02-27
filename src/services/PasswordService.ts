import crypto from "crypto";

class PasswordService {
  validatePassword(
    password: string,
    hashed_pass: string,
    salt: string
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      crypto.pbkdf2(password, salt, 310000, 32, "sha256", (err, derivedKey) => {
        if (err) return reject(err);
        resolve(
          crypto.timingSafeEqual(Buffer.from(hashed_pass, "hex"), derivedKey)
        );
      });
    });
  }

  async hashPassword(password: string) {
    return new Promise<{ hashed_pass: string; salt: string }>(
      (resolve, reject) => {
        const salt = crypto.randomBytes(16).toString("hex");
        crypto.pbkdf2(
          password,
          salt,
          310000,
          32,
          "sha256",
          (err, derivedKey) => {
            if (err) return reject(err);
            resolve({ hashed_pass: derivedKey.toString("hex"), salt });
          }
        );
      }
    );
  }
}

export default PasswordService;
