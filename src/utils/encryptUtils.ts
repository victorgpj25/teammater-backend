import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

const jwtKey = String(process.env.JWT_SECRET) || 'superSecretKey'

export async function encryptUserPassword(password: string) {
    return bcrypt.hash(password, 10)
}

export async function generateUserToken(userId: number) {
    return jwt.sign({ userId }, jwtKey, { expiresIn: "21d" }); // token expires in 3 weeks
}


export async function verifyPasswordMatch(password: string, encryptedPassword: string) {
    return bcrypt.compareSync(password, encryptedPassword)
}

export async function validateToken(token: string) {
    try {
        const tokenData = jwt.verify(token, jwtKey)
        return (<any>tokenData).userId
    } catch {
        throw {code: 'invalid_token', message: 'Validação do token falhou'}
    }
}