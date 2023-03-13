import Board from "../../../models/Boards";

export default async (req, res) => {
    const {title, contents, bno} = req.body;

    try {
        const cnt = Board.newOne(bno, title, null, contents).update()
            .then((result) => result);
        res.status(200).json({cnt: await cnt});
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }

}