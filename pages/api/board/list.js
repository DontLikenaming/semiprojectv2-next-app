import Boards from "../../../models/Boards"

export default async (req, res) => {
    let [cpg, ftype, fkey] = [req.query.cpg, req.query.ftype, req.query.fkey];

    try {
        const rowdata = new Boards().select(cpg, ftype, fkey).then((result) =>  result);
        res.status(200).json(await rowdata);

    } catch (err) {
        console.log(err);
        // 처리 실패 시 응답 : 상태코드 500, 오류내용 반환, 종료
        res.status(500).json(err);
    }
}