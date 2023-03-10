import Board from "../../../models/Boards";

export default async (req, res) => {
    let bno = req.query.bno;
    try {
        const rowData = new Board().selectOne(bno)
            .then((result) => result);
        res.status(200).json(await rowData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}







