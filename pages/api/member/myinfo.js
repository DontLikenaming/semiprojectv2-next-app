import Members from "../../../models/Members";

export default async (req, res) => {
    const {userid} = req.query;

    try {
        const myinfo = new Members().selectOne(userid)
            .then((result) => result);
        res.status(200).json(await myinfo)
    } catch (e){
        res.status(500).json(e)
    }
}