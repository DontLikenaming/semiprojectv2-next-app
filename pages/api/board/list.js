import Board from "../../../models/Boards";

export default async (req, res) => {
    let [ cpg, ftype, fkey ] = [ req.query.cpg, req.query.ftype, req.query.fkey ];
    let stnum = (cpg - 1) * 25;  // 지정한 페이지 범위 시작값 계산
                                 // (mariaDB는 시작 숫자가 달라서
                                 // oracle 때 쓰던 식에서 +1 을 빼야 함

    try {
        const rowData = new Board().select(stnum, ftype, fkey)
            .then((result) => result);
        res.status(200).json(await rowData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }

}







