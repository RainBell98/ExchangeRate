import { useCallback, useEffect, useState } from 'react';
import './App.css';
import { RateChart } from './rateChart';
import SpinningGear from './SPinningGear';
import { time } from 'console';
import axios from 'axios';

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
const styles = {
  container: {
    position: 'relative',
    width: '200px',
    margin: '10px',
  },
  select: {
    width: '81px',
    // minWidth: '115px',
    padding: '10px',
    borderRadius: '8px',
    border: '2px solid #ccc',
    outline: 'none',
    fontSize: '16px',
    backgroundColor: 'white',
    backgroundImage: 'linear-gradient(to bottom, #ffffff, #f6f6f6)',
    boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.1)',
  },

  input: {
    padding: '10px',
    borderRadius: '8px',
    border: '2px solid #ccc',
    outline: 'none',
    fontSize: '16px',
    backgroundColor: 'white',
    width: '200px',
  },
};

export const Mdata = () => {
  const [optionData, setOptionData] = useState<any>([]);
  const [selectData, setSelectData] = useState<any>('');
  const [country, setCountry] = useState<any>('KRW');
  const [money, setMoney] = useState<any>(0);
  const [exMoney, setExMoney] = useState<any>(0);
  const [unit, setUnit] = useState('KRW');
  const [basic, setBasic] = useState('원');
  const [updatedRenderedRateChart, setUpdatedRenderedRateChart] = useState<any>('');
  let [cnt, setCnt] = useState<number>(0);
  let ap = `https://v6.exchangerate-api.com/v6/${service_key}/latest/${country}`;

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(ap);
      const res = await result.data.conversion_rates;
      setOptionData(Object.entries(res));
    };
    const updatedRenderedRateChart = (
      <div>
        <RateChart country={country}></RateChart>
      </div>
    );
    setUpdatedRenderedRateChart(updatedRenderedRateChart);
    fetchData();
  }, [country]);
  useEffect(() => {
    if (cnt != 0) {
      setSelectData(optionData[0][0] + ',' + optionData[0][1]);
      setBasic(countryInfo[optionData[0][0]]);
    }
    setCnt(1);
  }, [optionData]);
  useEffect(() => {
    if (cnt != 0) {
      setUnit(countryInfo[selectData.split(',')[0]]);
    }
  }, [selectData]);

  const changeCountry: any = (e: string) => {
    setExMoney(Number(money).toFixed(3));
    setCountry(e.split(',')[0]);
  };
  const selectFunc = (e: any) => {
    setSelectData(e);
    setExMoney((+e.split(',')[1] * money).toFixed(3));
  };
  const exChange = (e: any) => {
    setMoney(e);
    setExMoney((e * selectData.split(',')[1]).toFixed(3));
  };

  return (
    <div>
      <div className="FirstBox">
        <div>
          <SpinningGear></SpinningGear>
        </div>
        <div className="calcBox">
          <div>
            <select className="classSelect" style={styles.select} onChange={(e) => changeCountry(e.target.value)}>
              {optionData.map((value: any) => {
                return (
                  <>
                    {countryInfo[value[0]] && (
                      <option key={value} value={value}>
                        {value[0]} {countryInfo[value[0]]}
                      </option>
                    )}
                  </>
                );
              })}
            </select>

            <input
              style={styles.input}
              type="text"
              id="korM"
              value={money}
              onChange={(e) => exChange(e.target.value)}
            />
          </div>

          <div>
            <span>
              {money} {basic}
            </span>

            <span>=</span>

            <span>
              {exMoney} {unit}
            </span>
            <br />
          </div>
          <div>
            <select className="classSelect" style={styles.select} onChange={(e) => selectFunc(e.target.value)}>
              {optionData.map((value: any) => {
                return (
                  <>
                    {countryInfo[value[0]] && (
                      <option key={value} value={value}>
                        {value[0]} {countryInfo[value[0]]}
                      </option>
                    )}
                  </>
                );
              })}
            </select>

            <input type="text" id="korM" value={exMoney} style={styles.input} />
          </div>
        </div>
      </div>

      <div>{updatedRenderedRateChart}</div>
    </div>
  );
};

// const axios = require('axios');
// async function getTotalGoals(team, year) {
//   let totalGoals = 0;
//   const res1 = await axios.get('https://jsonmock.hackerrank.com/api/football_matches', {
//     params: {
//       year: year,
//       team1: team,
//     },
//   });

//   const team1TotalPage = res1.data.total_pages;

//   const res2 = await axios.get('https://jsonmock.hackerrank.com/api/football_matches', {
//     params: {
//       year: year,
//       team2: team,
//     },
//   });
//   const team2TotalPage = res2.data.total_pages;

//   for (let i = 1; i <= team1TotalPage; i++) {
//     const result = await axios.get('https://jsonmock.hackerrank.com/api/football_matches', {
//       params: {
//         year: year,
//         team1: team,
//         page: i,
//       },
//     });
//     totalGoals += Number(result.data.data.team1goals);
//   }

//   for (let i = 1; i <= team2TotalPage; i++) {
//     const result = await axios.get('https://jsonmock.hackerrank.com/api/football_matches', {
//       params: {
//         year: year,
//         team2: team,
//         page: i,
//       },
//     });
//     totalGoals += Number(result.data.data.team2goals);
//   }
//   return totalGoals;
// }

// const axios = require('axios');
// async function getTotalGoals(team, year) {
//     try{
//         var ans=0,totalPage=1,t=1;
//         while (t<=totalPage){
//             const res1 = await axios.get('https://jsonmock.hackerrank.com/api/football_matches/',{
//                 params:{
//                     year:year,
//                     team1:team,
//                     page:t
//                 }
//             });
//             totalPage=res1.data.total_pages;
//             for (var item of res1.data.data){
//                 ans=ans+parseInt(item.team1goals);
//             };
//             t+=1;
//         }

// const axios = require('axios');
// async function bestInGenre(genre) {
//     // Write your code here
//     let api = 'https://jsonmock.hackerrank.com/api/tvseries'
//     let data_arr = []
//     try{
//         const res = await axios.get(api,{
//             params:{
//               page: 1
//             }
//         })
//         const result = res.data
//         const total_P = result.data.total_pages
//         for (let i = 1; i<=total_P;i++){
//           const res = await axios.get(api,{
//             params:{
//               page:i
//             }
//           })
//           // data_arr.push(res.data.data)
//           console.log(res.data.data)
//         }
//     }catch(err){
//         console.log(err)
//     }

// }
