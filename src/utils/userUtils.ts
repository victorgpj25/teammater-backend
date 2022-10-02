import * as userRepository from "../repositories/userRepository"

export async function verifyEmailConflict(email: string) {
    const user = await userRepository.findByEmail(email)
    if (user) throw {code: "email_conflict", message: "Given email is already in use"}
}