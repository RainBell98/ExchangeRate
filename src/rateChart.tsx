import axios from 'axios';
import { useEffect } from 'react';
import LineChart from './chart';

const chart_key = process.env.REACT_APP_CHART_KEY;
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
  IDR: '인도네시아',
  ILS: '이스라엘',
  INR: '인도',
  JPY: '일본',
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
const totalData: any = [{}];
export const RateChart = (props: any) => {
  let ap2016 = `https://api.odcloud.kr/api/15014787/v1/uddi:6d6bcc0c-c7e8-44e0-95bc-fc248a09f661?page=1&perPage=56&serviceKey=${chart_key}`;
  let ap2017 = `https://api.odcloud.kr/api/15014787/v1/uddi:6d6bcc0c-c7e8-44e0-95bc-fc248a09f661?page=248&perPage=56&serviceKey=${chart_key}`;
  let ap2018 = `https://api.odcloud.kr/api/15014787/v1/uddi:4722e088-35b3-44cf-93cd-ff5ca01e4092?page=1&perPage=56&serviceKey=${chart_key}`;
  let ap2019 = `https://api.odcloud.kr/api/15014787/v1/uddi:f6ec3062-8a05-4a1f-9389-fb60199d5d08?page=1&perPage=57&serviceKey=${chart_key}`;
  let ap2020 = `https://api.odcloud.kr/api/15014787/v1/uddi:d33759c2-689d-4d80-a0ef-827c64c0de8c?page=1&perPage=57&serviceKey=${chart_key}`;
  let ap2021 = `https://api.odcloud.kr/api/15014787/v1/uddi:7f57af11-77b2-48a0-8a08-c0b1bd1c0581?page=1&perPage=57&serviceKey=${chart_key}`;
  let ap2022 = `https://api.odcloud.kr/api/15014787/v1/uddi:604b46a4-081e-4bb6-8fc4-92e7d51a0fd5?page=1&perPage=58&serviceKey=${chart_key}`;

  useEffect(() => {
    const chart = async () => {
      let res2016 = (await axios.get(ap2016)).data.data;
      let res2017 = (await axios.get(ap2017)).data.data;
      let res2018 = (await axios.get(ap2018)).data.data;
      let res2019 = (await axios.get(ap2019)).data.data;
      let res2020 = (await axios.get(ap2020)).data.data;
      let res2021 = (await axios.get(ap2021)).data.data;
      let res2022 = (await axios.get(ap2022)).data.data;
      function filterObjectsWithoutCountryInfo(arr: any[], countryInfo: any): any[] {
        return arr.filter((item) => countryInfo[item.통화코드]);
      }
      res2016 = filterObjectsWithoutCountryInfo(res2016, countryInfo);
      function getValuesByKey(arr: any[], key: string): any[] {
        return arr.map((item) => item[key]);
      }

      const resBasic = getValuesByKey(res2016, '통화코드');
      res2019 = res2019.filter((item: any) => resBasic.includes(item.통화코드));
      res2020 = res2020.filter((item: any) => resBasic.includes(item.통화코드));
      res2021 = res2021.filter((item: any) => resBasic.includes(item.통화코드));
      res2022 = res2022.filter((item: any) => resBasic.includes(item.통화코드));
      res2017 = filterObjectsWithoutCountryInfo(res2016, countryInfo);
      res2018 = filterObjectsWithoutCountryInfo(res2016, countryInfo);
      const resData: any[] = [res2016, res2017, res2018, res2019, res2020, res2021, res2022];

      for (let index = 0; index < resData[0].length; index++) {
        totalData[resData[0][index].통화코드] = [];
      }
      for (let i = 0; i < resData.length; i++) {
        for (let j = 0; j < 39; j++) {
          totalData[resData[0][j].통화코드].push(resData[i][j].매매기준율);
        }
      }
    };
    chart();
  }, [props.country]);
  const chartData = {
    labels: [2016, 2017, 2018, 2019, 2020, 2021, 2022],
    values: totalData[props.country],
  };
  return (
    <>
      <LineChart data={chartData}></LineChart>{' '}
    </>
  );
};
