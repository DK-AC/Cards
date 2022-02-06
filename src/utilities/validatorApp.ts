export const emailValidator = (email: string) => {
    let error = false
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) error = true
    if (email === '') error = false
    return error
}
