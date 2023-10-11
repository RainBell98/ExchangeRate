import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

const service_key = process.env.REACT_APP_API_KEY;
const api_Url = 'https://www.koreaexim.go.kr/site/program/financial/exchangeJSON/';

export const Mdata = () => {
  const [data, setData] = useState<any>([]);
  useEffect(() => {
    console.log(api_Url);
    const fetchData = async () => {
      const res = await axios.get(api_Url, {
        params: {
          authkey: service_key,
          searchdate: 20231011,
          data: 'AP01',
        },
      });
      return res.data;
    };
    fetchData().then((res) => setData(res));
  }, []);
  const onClick = () => {
    console.log(data[0].cur_unit);
    console.log(data);
    console.log(CArray);
  };
  let CArray: [string] = [''];
  for (let i = 0; i < data.length; i++) {
    CArray[i] = data[i].cur_unit;
  }

  return (
    <>
      <div>
        <input type="text" id="korM" placeholder="" />
        <select>
          {data.map((value: any) => {
            return (
              <option key={value.cur_nm} value={value.cur_unit}>
                {value.cur_unit}
                {value.kftc_bkpr}
              </option>
            );
          })}
        </select>
      </div>

      <br />
      <div>
        <input type="text" id="forM" placeholder="" />
        <select>
          {data.map((value: any) => {
            return (
              <option key={value.cur_nm} value={value.cur_unit}>
                {value.cur_unit}
                {value.kftc_bkpr}
              </option>
            );
          })}
        </select>
      </div>

      <button onClick={onClick}>asd</button>
    </>
  );
};
