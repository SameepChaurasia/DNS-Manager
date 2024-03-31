import React, { useState, useEffect } from "react";
import { DELETE_RECORD, GET_RECORD, UPDATE_RECORD } from './../../constant/Constant'
import secureLocalStorage from "react-secure-storage";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import { Dialog } from "@mui/material";

const DNSRecordList = (props) => {
  const [showUpdateBox,setShowUpdateBox] = useState(false); 
  const [recordType,setRecordType] = useState('');
  const [recordValue,setRecordValue] = useState('')
  const [domain,setDomain] = useState('');
  const [updateId,setUpdateId]=useState('')
  const [wait, setWait] = useState(false);

  const getRecord = (e) => {
    const config = { method: 'get', maxBodyLength: Infinity, url: GET_RECORD, headers: { 'Content-Type': 'application/json' } };
    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response))
        const result = response?.data?.data;
        toast.success('Fetch Data Successfully!!!.')
        setWait(false)
        props.setRecordList(result)
      })
      .catch((error) => {
        toast.error(error.response.data.message)
        setWait(false);
        return;
      });
  };
  const deleteRecord = (id) => {
    console.log(id, 'id')
    const config = { method: 'delete', maxBodyLength: Infinity, url: `${DELETE_RECORD}/${id}`, headers: { 'Content-Type': 'application/json' } };
    axios.request(config)
      .then((response) => {
        const result = response?.data?.data;
        toast.success('Deleted Record Successfully!!!.')
        props.setRecordList(result)
      })
      .catch((error) => {
        toast.error(error.response.data.message)
        setWait(false);
        return;
      });
  }
  const updateRecord = () => {
    const data = { domain:domain, type: recordType, value: recordValue };
    console.log(data,'update data')
    const config = { method: 'patch', maxBodyLength: Infinity, url: `${UPDATE_RECORD}/${updateId}`, headers: { 'Content-Type': 'application/json'}, data:data };
    axios.request(config)
      .then((response) => {
        const result = response?.data?.data;
        console.log(response,'rjkishfjs')
        toast.success('Record Updated Successfully!!!.')
        props.setRecordList(result)
        setShowUpdateBox(false);
      })
      .catch((error) => {
        toast.error(error.response.data.message)
        return;
      });
  }
  useEffect(() => {
    getRecord();
  }, [])
  return (
    <>
     <ToastContainer/>
      <div className="text-center font-semibold text-2xl bg-gray-400 m-5">List of Record</div>
      <div className="flex flex-col gap-4 m-5 text-center">
        <div className="grid grid-cols-5 bg-red-500 text-white">
          <div className="">Domain</div>
          <div className="">Record Type</div>
          <div className="">Record Value</div>
          <div className="">Delete</div>
          <div className="">Update</div>
        </div>
        {props.recordList.map((record, key) => (
          <div key={record._id} className="grid grid-cols-5 p-1" style={{ backgroundColor: key % 2 != 0 ? "lightgray" : "lightgray" }}>
            <div className="">{record.domain}</div>
            <div className="">{record.type}</div>
            <div className="">{record.value}</div>
            <div className="flex justify-center "><button className="text-white bg-red-500 w-36 rounded " onClick={() => deleteRecord(record._id)}>Delete</button></div>
            <div className="flex justify-center"><button className="text-white bg-green-500 w-36 rounded" onClick={() => {setShowUpdateBox(true);setRecordType(record.type);setRecordValue(record.value);setUpdateId(record._id);setDomain(record.domain)}}>Update</button></div>
          </div>
        ))}
      </div>
      <Dialog open={showUpdateBox} maxWidth="xl" onClose={(event, reason) => {
        if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
          setShowUpdateBox(false)
        }
      }} sx={{ borderRadius: "10px",width:"100%" }}>
        <div className="bg-blue-600 h-8 w-full text-xl pl-5 text-white">Update</div>
        <div className="m-5">
        <div className=''>Domain:</div>
        <input type="text" value={domain} onChange={(e) => setDomain(e.target.value)} className='bg-gray-200 outline-0 border-0 w-full' />
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
        <input type="text" value={recordValue} onChange={(e) => setRecordValue(e.target.value)} className='bg-gray-200 outline-0 border-0 w-full' />
        </div>
        <div className="flex justify-end gap-2 p-1">
          <button className="p-1 w-32 bg-[#2D5BFF] rounded-lg justify-center text-center text-white cursor-pointer" onClick={() => { updateRecord(); }}>Update</button>
          <button className="p-1 w-32 bg-white border-2 border-[#2D5BFF] rounded-lg justify-center text-center text-[#2D5BFF] cursor-pointer" onClick={() => { setShowUpdateBox(false); }}>Cancel</button>
        </div>
      </Dialog>
    </>
  );
};

export default DNSRecordList