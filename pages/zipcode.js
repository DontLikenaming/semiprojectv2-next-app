
const Zipcode = () => {
    return (
        <div>
            <h1>주소 찾기</h1>
            <div>
                <select name="sido" id="sido">
                    <option>-- 시도 --</option>
                    <option></option>
                    </select>
                    <select name="gugun" id="gugun">
                    <option>-- 시군구 --</option>
                <option></option>
                    </select>
                    <select name="dong" id="dong">
                    <option>-- 읍면동 --</option>
                <option></option>
                    </select>
                    </div>
                    <div>

                    </div>
        </div>
    );
}

export default Zipcode;