import React, { useState,useEffect } from 'react';
import { ADD_RECORD,AWS_RECORD,GET_RECORD} from './../../constant/Constant'
import secureLocalStorage from "react-secure-storage";
import { ToastContainer, toast } from 'react-toastify';
import Navbar from './../Navbar'
import Footer from './../Footer'
import { Audio } from 'react-loader-spinner'
import axios from 'axios';


const DNSRecordForm = (props) => {
  const [recordType, setRecordType] = useState('');
  const [recordValue, setRecordValue] = useState('');
  const [domain,setDomain] = useState('')
  const [wait,setWait]=useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setWait(true);
    const data = { domain:domain, type: recordType, value: recordValue };
    console.log(data, 'data');
    const config = { method: 'post', maxBodyLength: Infinity, url: ADD_RECORD, headers: { 'Content-Type': 'application/json' }, data: data };
    axios.request(config)
      .then((response) => {
        const result = response?.data?.data;
        awshandleSubmit();
        toast.success('Data Insert Successfully!!!.')
        console.log("result at insert", result);
        setRecordType('');
        setRecordValue('');
        setDomain('');
        setWait(false);
        getRecord();
      }
      )
      .catch((error) => {
        console.log(error,'error')
        // toast(error.response.data.message)
        setWait(false);
        return;
      });

  };
  const awshandleSubmit = (e) => {
    const data = { domain:domain, type: recordType, value: recordValue };
    console.log(data, 'data');
    const config = { method: 'post', maxBodyLength: Infinity, url: AWS_RECORD, headers: { 'Content-Type': 'application/json' }, data: data };
    axios.request(config)
      .then((response) => {
        const result = response?.data?.data;
        toast.success('Record Added Successfully In AWS!!!.')
      }
      )
      .catch((error) => {
        console.log(error,'error')
        // toast(error.response.data.message)
        return;
      });

  };
  const getRecord = (e) => {
    const config = { method: 'get', maxBodyLength: Infinity, url: GET_RECORD, headers: { 'Content-Type': 'application/json' } };
    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response))
        const result = response?.data?.data;
        toast.success('Fetch Data Successfully!!!.')
        props.setRecordList(result)
      })
      .catch((error) => {
        toast.error(error.response.data.message)
        return;
      });
  };


  return (
    <>
  <form onSubmit={handleSubmit} className='flex flex-col m-5 gap-2'>
        <div className=''>Domain:</div>
        <input type="text" value={domain} onChange={(e) => setDomain(e.target.value)} className='bg-gray-200 outline-0 border-0' />
        <div className=''>Record Type:</div>
        <select value={recordType} onChange={(e) => setRecordType(e.target.value)} className='bg-gray-200 outline-0 border-0'>
          <option value="">Select Record Type</option>
          <option value="A">A (Address) Record</option>
          <option value="AAAA">AAAA (IPv6 Address) Record</option>
          <option value="CNAME">CNAME (Canonical Name) Record</option>
          <option value="MX">MX (Mail Exchange) Record</option>
          <option value="NS">NS (Name Server) Record</option>
          <option value="PTR">PTR (Pointer) Record</option>
          <option value="SOA">SOA (Start of Authority) Record</option>
          <option value="SRV">SRV (Service) Record</option>
          <option value="TXT">TXT (Text) Record</option>
          <option value="DNSSEC">DNSSEC</option>
        </select>
        <div className=''>Record Value:</div>
        <input type="text" value={recordValue} onChange={(e) => setRecordValue(e.target.value)} className='bg-gray-200 outline-0 border-0' />
        {!wait && <button type="submit" className='border-lg bg-red-500 text-center text-white'>Add Record</button>}
        {wait && <div className="flex text-center justify-center"><Audio height="40" width="120" color='lightblue' ariaLabel='three-dots-loading'/></div>}
    </form>
    </>
  );
};

export default DNSRecordForm