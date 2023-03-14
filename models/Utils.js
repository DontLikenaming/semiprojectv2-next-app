import axios from "axios";
import bcrypt from "bcryptjs";

const check_captcha = async (response) => {
    let url = '/api/board/recaptcha?response='+response;
    const data = axios.get(url).then(data => data.data);

    return (await data).success;
};

const handleInput = (setInput, e) => {
    setInput(e.target.value);
};

const process_submit = async (url, data) => {
    const cnt = fetch(url,
        {
            method: 'POST', mode: 'cors', body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        }).then(res => res.json());
    return (await cnt).cnt;
};

const hashPassword = async (passwd) => {
    console.log(passwd);
    let saltRounds = 10;
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(passwd, salt);

        console.log(hash);

        return hash;

    } catch (err) {
        console.log(err);
    }
}

const comparePasswd = async (passwd, hashpwd) => {
    try {
        const result = await bcrypt.compare(passwd, hashpwd);

        return result;

    } catch (err) {
        console.log(err);
    }
}

module.exports = {check_captcha, handleInput, process_submit,
                  hashPassword, comparePasswd};