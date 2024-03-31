import React from 'react';
import axios from 'axios';
import { UPLOAD_CSV } from '../../constant/Constant';
import FileReader from 'react-file-reader';

const BulkUploadComponent = () => {
    const handleFileUpload = (files) => {
        const file = files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const csvData = e.target.result;
            // Send CSV data to backend API
            sendDataToBackend(csvData);
        };

        reader.readAsText(file);
    };

    const sendDataToBackend = (csvData) => {
        // Send CSV data to backend API
        axios.post(UPLOAD_CSV, { data: csvData })
            .then(response => {
                console.log(response.data);
                // Handle success
            })
            .catch(error => {
                console.error(error);
                // Handle error
            });
    };

    return (
        <div className='flex flex-col justify-center m-5'>
            <FileReader multipleFiles={false} fileTypes={['csv']} handleFiles={handleFileUpload}>
            <button className="flex text-center justify-center bg-red-500 text-white w-full">CSV File Upload</button>
            </FileReader>
        </div>
    );
};

export default BulkUploadComponent;


// CSV Data Format
// domain,type,value
// example.com,A,192.168.1.1
// example.com,A,192.168.1.2
// example.com,CNAME,www.example.com
// example.com,MX,10 mail.example.com
// example.com,TXT,"v=spf1 mx -all"
// subdomain.example.com,A,192.168.1.3
// subdomain.example.com,AAAA,2001:0db8:85a3:0000:0000:8a2e:0370:7334


