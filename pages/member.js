import fetch from "isomorphic-unfetch";

export async function getServerSideProps(ctx) {
    const res = await fetch('http://localhost:3000/api/member');
    //console.log(res);
    const members = await res.json();
    console.log(members);

    return { props: {members} };
}

export default function  Member ({members}) {
    return (
        <div>
            <h2>회원정보</h2>

                {members.map(mb =>
                    <ul>
                        <li key={mb.MNO}>{mb.MNO}</li>
                        <li>{mb.USERID}</li>
                        <li>{mb.NAME}</li>
                        <li>{mb.EMAIL}</li>
                        <li>{mb.REGDATA}</li>
                    </ul>
                )}
        </div>
    );
}