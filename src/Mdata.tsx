import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const service_key = process.env.REACT_APP_API_KEY;
const countryInfo: any = {
  AED: '아랍에미리트 디르함',

  AUD: '호주 달러',
  BGN: '불가리아 레프',
  BRL: '브라질 레알',
  CAD: '캐나다 달러',
  CHF: '스위스 프랑',

  CLP: '칠레 페소',

  CNY: '중국 위안',

  COP: '콜롬비아 페소',

  CZK: '체코 코루나',

  DKK: '덴마크 크로네',

  EGP: '이집트 파운드',

  EUR: '유로',

  GBP: '영국 파운드',

  HKD: '홍콩 달러',

  HRK: '크로아티아 쿠나',

  HUF: '헝가리 포린트',

  IDR: '인도네시아 루피아',
  ILS: '이스라엘 신 셰켈',

  INR: '인도 루피',
  JPY: '일본 엔',
  KRW: '대한민국 원',

  KZT: '카자흐스탄 텡게',

  MXN: '멕시코 페소',

  MYR: '말레이시아 링깃',
  NGN: '나이지리아 나이라',

  NOK: '노르웨이 크로네',

  NZD: '뉴질랜드 달러',

  PEN: '페루 솔',
  PKR: '파키스탄 루피',
  PHP: '필리핀 페소',
  PLN: '폴란드 즈워티',

  QAR: '카타르 리얄',

  RON: '루마니아 레우',
  RUB: '러시아 루블',

  SAR: '사우디아라비아 리얄',
  SEK: '스웨덴 크로나',

  SGD: '싱가포르 달러',
  THB: '태국 바트',
  TRY: '튀르키예 리라',
  TWD: '신 대만 달러',
  TZS: '탄자니아 실링',
  USD: '미국 달러',

  VND: '베트남 동',

  ZAR: '남아프리카 랜드',
};

export const Mdata = () => {
  const [optionData, setOptionData] = useState<any>([]);
  const [selectData, setSelectData] = useState<any>('');
  const [country, setCountry] = useState<any>('USD');
  const [money, setMoney] = useState<any>(0);
  const [exMoney, setExMoney] = useState<any>(0);
  let [cnt, setCnt] = useState<number>(0);

  let ap = `https://v6.exchangerate-api.com/v6/${service_key}/latest/${country}`;
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(ap);

      console.log(country);

      // console.log(result);
      const res = await result.data.conversion_rates;

      setOptionData(Object.entries(res));
      console.log('0');
    };
    fetchData();
  }, [country]);
  useEffect(() => {
    if (cnt != 0) {
      setSelectData(optionData[0][0] + ',' + optionData[0][1]);
    }
    setCnt(1);
  }, [optionData]);

  const changeCountry: any = (e: string) => {
    setExMoney(money.toFixed(3));
    // console.log(e.split(',')[0]);
    setCountry(e.split(',')[0]);
    // console.log(selectData);
  };
  const selectFunc = (e: any) => {
    // console.log(+e.split(',')[1]);
    // console.log(e);
    setSelectData(e);
    setExMoney((+e.split(',')[1] * money).toFixed(3));
    // console.log(exMoney);
  };
  const exChange = (e: any) => {
    setMoney(e);
    // console.log('a', selectData.split(',')[1]);
    setExMoney(e * selectData.split(',')[1]);
  };

  return (
    <>
      <div>
        <label>
          <input type="text" id="korM" value={money} onChange={(e) => exChange(e.target.value)} />
        </label>
        <select key={Date.now()} onChange={(e) => changeCountry(e.target.value)}>
          {optionData.map((value: any) => {
            return (
              <>
                {countryInfo[value[0]] && (
                  <option key={Date.now()} value={value}>
                    {value[0]} {countryInfo[value[0]]}
                  </option>
                )}
              </>
            );
          })}
        </select>
      </div>

      <br />
      <div>
        <label>
          <input type="text" id="korM" value={exMoney} />
        </label>
        <select key={Date.now()} onChange={(e) => selectFunc(e.target.value)}>
          {optionData.map((value: any) => {
            return (
              <>
                {countryInfo[value[0]] && (
                  <option key={Date.now()} value={value}>
                    {value[0]} {countryInfo[value[0]]}
                  </option>
                )}
              </>
            );
          })}
        </select>
      </div>
    </>
  );
};
