import { useEffect, useState } from 'react';
import axios from 'axios';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
const korea_key = process.env.REACT_APP_KOREA_KEY;
const countryInfo: any = {
  AED: '아랍에미리트',
  AUD: '호주',
  BGN: '불가리아',
  BRL: '브라질',
  CAD: '캐나다',
  CHF: '스위스',
  CLP: '칠레',
  CNY: '중국(국내용)',
  COP: '콜롬비아',
  CZK: '체코',
  DKK: '덴마크',
  EGP: '이집트',
  EUR: '유럽연합',
  GBP: '영국',
  HKD: '홍콩',
  HRK: '크로아티아',
  HUF: '헝가리',
  'IDR(100)': '인도네시아',
  ILS: '이스라엘',
  INR: '인도',
  'JPY(100)': '일본',
  KRW: '대한민국',
  KZT: '카자흐스탄',
  MXN: '멕시코',
  MYR: '말레이시아',
  NGN: '나이지리아',
  NOK: '노르웨이',
  NZD: '뉴질랜드',
  PEN: '페루',
  PKR: '파키스탄',
  PHP: '필리핀',
  PLN: '폴란드',
  QAR: '카타르',
  RON: '루마니아',
  RUB: '러시아',
  SAR: '사우디아라비아',
  SEK: '스웨덴',
  SGD: '싱가포르',
  THB: '태국',
  TRY: '튀르키예',
  TWD: '대만',
  TZS: '탄자니아',
  USD: '미국',
  VND: '베트남',
  ZAR: '남아프리카',
  BND: '브루나이',
  BHD: '바레인',
  KWD: '쿠웨이트',
  CNH: '중국(국외용)',
};
const tdRColor = {
  color: 'red',
};
const tdBColor = {
  color: 'blue',
};
export const CompareData = () => {
  const [preOptionData, setPreOptionData] = useState<any>([]);
  const [yesOptionData, setYesOptionData] = useState<any>([]);
  const compare: number[] = [];
  const rateData: any[] = [];
  const today = new Date();
  let yesterday = {
    year: today.getFullYear(),
    month: today.getMonth() + 1,
  };
  let yesDate = today.getDate() - 1;
  let preDate = today.getDate();

  if (today.getDay() == 0) {
    preDate -= 2;
    yesDate -= 3;
  } else if (today.getDay() == 6) {
    preDate -= 1;
    yesDate -= 2;
  } else if (today.getDay() == 1) {
    yesDate -= 4;
  }
  let preApi = ` https://www.koreaexim.go.kr/site/program/financial/exchangeJSON?authkey=${korea_key}&searchdate=${today.getFullYear()}${
    today.getMonth() + 1
  }${preDate}&data=AP01`;
  let yesApi = ` https://www.koreaexim.go.kr/site/program/financial/exchangeJSON?authkey=${korea_key}&searchdate=${yesterday.year}${yesterday.month}${yesDate}&data=AP01`;
  useEffect(() => {
    const dataInfo = async () => {
      const preResult = await axios.get(preApi);
      const yesResult = await axios.get(yesApi);
      const preRes = await preResult.data;
      const yesRes = await yesResult.data;
      setPreOptionData(preRes);
      setYesOptionData(yesRes);
    };
    dataInfo();
  }, []);
  for (let i = 0; i < preOptionData.length; i++) {
    let preR = preOptionData[i].tts.replace(',', '');
    let yesR = yesOptionData[i].tts.replace(',', '');
    let resR: number = +yesR - +preR;
    let resU: number = (resR / +preR) * 100;
    compare.push(+resR.toFixed(3));
    rateData.push(+resU.toFixed(3));
  }

  return (
    <div className="compare">
      <div>
        <table>
          <thead>
            <tr>
              <th>통화명</th>
              <th>매매기준율</th>
              <th>전일대비</th>
              <th>등락률</th>
            </tr>
          </thead>
          <tbody>
            {preOptionData.map((value: any, idx: number) => {
              return (
                <tr>
                  <th>
                    {value.cur_unit} {countryInfo[value.cur_unit]}
                  </th>
                  <td>{value.tts}</td>
                  {compare[idx] > 0 && (
                    <td style={tdRColor}>
                      <AiFillCaretUp />
                      {compare[idx]}
                    </td>
                  )}
                  {compare[idx] < 0 && (
                    <td style={tdBColor}>
                      <AiFillCaretDown></AiFillCaretDown>
                      {compare[idx]}
                    </td>
                  )}
                  {compare[idx] === 0 && <td>{compare[idx]}</td>}
                  {rateData[idx] > 0 && (
                    <td style={tdRColor}>
                      <AiFillCaretUp />
                      {rateData[idx]}%
                    </td>
                  )}
                  {rateData[idx] < 0 && (
                    <td style={tdBColor}>
                      <AiFillCaretDown />
                      {rateData[idx]}%
                    </td>
                  )}
                  {!rateData[idx] && <td>0</td>}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
