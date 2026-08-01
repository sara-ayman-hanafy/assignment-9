import CryptoJS from "crypto-js";

export const encrypt = (
    value
) => {
    return CryptoJS.AES.encrypt(
        value,
        process.env.SECRET_KEY
    ).toString();
};