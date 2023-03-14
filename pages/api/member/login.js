import Members from "../../../models/Members";

export default async (req, res) => {
    const [userid, passwd] = [req.query.userid, req.query.passwd];

    try {
        const member = new Members().login(userid, passwd)
            .then(result => result);

        const result = (await member)[0];
        const data = {
            cnt: parseInt(await result.cnt),
            name: await result.name,
            email: await result.email
        };

        res.status(200).json(data);
    } catch (e){
        res.status(500).json(e);
    }
}