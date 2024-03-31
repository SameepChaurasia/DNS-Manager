import React,{useState} from 'react'
import AddRecord from './AddRecord'
import RecordList from './RecordList'
import Navbar from '../Navbar'
import Footer from '../Footer'
import IntegrateCsv from './IntegrateCsv'
import GraphChart from './GraphChart'
import Filter from './Filter'

const Dashboard = () => {
  const [recordList,setRecordList]=useState([
    { "domain": "example.com", "type": "A", "value": "192.168.1.1" },
    { "domain": "lucidgrowth.com", "type": "A", "value": "192.168.1.2" },
    { "domain": "sameep.com", "type": "CNAME", "value": "www.example.com" },
    { "domain": "lucidgrowth1.com", "type": "MX", "value": "10 mail.example.com" },
    { "domain": "example1.com", "type": "TXT", "value": "v=spf1 mx -all" },
    { "domain": "subdomain.example.com", "type": "A", "value": "192.168.1.3" },
    { "domain": "subdomain.example.com", "type": "AAAA", "value": "2001:0db8:85a3:0000:0000:8a2e:0370:7334" }
]
)
  const data=[1,2,3,4,5,5,6,6,7,7,8,9]
  const label=['A','AAAA','CNAME','NAMESERVER','MX','NS','PTR','SOA','SRV','TXT','DNSSEC']
  return (
    <div>
        <Navbar/>
        <Filter recordList={recordList} setRecordList={setRecordList}/>
        <AddRecord recordList={recordList} setRecordList={setRecordList}/>
        <div className='text-black text-xl flex text-center justify-center'>OR</div>
        <IntegrateCsv recordList={recordList} setRecordList={setRecordList}/>
        <RecordList recordList={recordList} setRecordList={setRecordList}/>
        <GraphChart recordList={recordList} setRecordList={setRecordList} data={data} label={label}/>
       <Footer/>
    </div>

  )
}

export default Dashboard

// {
//   "domain": "example.com",
//   "records": [
//     {
//       "id": 1,
//       "type": "A",
//       "name": "example.com",
//       "value": "192.0.2.1"
//     },
//     {
//       "id": 2,
//       "type": "CNAME",
//       "name": "www.example.com",
//       "value": "example.com"
//     },
//     {
//       "id": 3,
//       "type": "MX",
//       "name": "example.com",
//       "priority": 10,
//       "value": "mail.example.com"
//     },
//     {
//       "id": 4,
//       "type": "A",
//       "name": "subdomain.example.com",
//       "value": "192.0.2.2"
//     },
//     {
//       "id": 5,
//       "type": "TXT",
//       "name": "example.com",
//       "value": "v=spf1 mx -all"
//     },
//     {
//       "id": 6,
//       "type": "A",
//       "name": "mail.example.com",
//       "value": "192.0.2.3"
//     },
//     {
//       "id": 7,
//       "type": "NS",
//       "name": "example.com",
//       "value": "ns1.example.com"
//     },
//     {
//       "id": 8,
//       "type": "AAAA",
//       "name": "example.com",
//       "value": "2001:db8::1"
//     },
//     {
//       "id": 9,
//       "type": "SRV",
//       "name": "_sip._udp.example.com",
//       "priority": 10,
//       "weight": 5,
//       "port": 5060,
//       "target": "sipserver.example.com"
//     },
//     {
//       "id": 10,
//       "type": "CNAME",
//       "name": "mail.example.com",
//       "value": "ghs.google.com"
//     }
//   ]
// }
