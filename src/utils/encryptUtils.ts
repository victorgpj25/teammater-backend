import bcrypt from "bcrypt"

export async function encryptUserPassword(password: string) {
    return bcrypt.hash(password, 10)
}