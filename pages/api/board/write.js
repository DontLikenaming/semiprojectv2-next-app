import Board from "../../../models/Boards";

export default async (req, res) => {
    const {title, userid, contents} = req.body;

    try {
        //const rowData = new Board(null, title, userid, null, contents, null).insert()
        const cnt = Board.newOne(null, title, userid, contents).insert()
            .then((result) => result);

        res.status(200).json({cnt: await cnt});
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }

}