import Board from "../../../models/Boards";

export default async (req, res) => {
    const {bno} = req.query;

    try {
        const cnt = new Board().delete(bno).then(result => result);

        console.log(cnt);

        //res.status(200).json({'cnt': await cnt});
        res.redirect(301, '/board/list');
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}