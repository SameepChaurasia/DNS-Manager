import React, { useState } from 'react';
import secureLocalStorage from "react-secure-storage";
import { ToastContainer, toast } from 'react-toastify';

const FilterSearchComponent = (props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterValue,setFilterValue]=useState('');

  const handleSearch = () => {
    let result=[]
    for(let i=0;i<recordList.length;i++)
    {
       if(searchTerm==recordList[i].domain || searchTerm==recordList[i].type || searchTerm==recordList[i].value)
       {
           result.push(recordList[i])
       }
    }
    props.setRecordList(result);
  };

  return (
    <div className='m-5 gap-2 flex flex-row'>
      <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search domain name or type or value." className='bg-gray-200 outline-5 p-1 flex flex-grow' />
      <select value={filterValue} onChange={(e)=>{setFilterValue(e.target.value)}} className='bg-gray-200 outline-5 p-1'>
        <option value="">All</option>
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
      <button onClick={handleSearch} className='bg-blue-500 text-white text-center rounded-md p-1 w-36 hover:bg-green-200'>Search</button>
    </div>
  );
};

export default FilterSearchComponent;
