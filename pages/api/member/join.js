import Members from "../../../models/Members";

export default async (req, res) => {
    const {userid, passwd, name, email} = req.body;

    try {
        const cnt = new Members(userid, passwd, name, email).insert()
            .then((result) => result);

        res.status(200).json({cnt: await cnt});
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }

}