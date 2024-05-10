import React, { useState } from 'react';
import { Button } from 'antd';
import { useTableStore } from '../../store/csvStore';



const UploadFile: React.FC = () => {
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);
  const { setTableData } = useTableStore()

  const fileReader = new FileReader();

  const handleOnChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const handleOnSubmit = async(e: any) => {
    setLoading(true)
    e.preventDefault();
    if (file) {
      fileReader.onload = function (event: any) {
        const csvOutput = event.target.result;
        const csvData = parseCSV(csvOutput);
        setTableData(csvData)
        setLoading(false)
      };

      fileReader.readAsText(file);
    }
  };

  const parseCSV = (csvText: string) => {
    const lines = csvText.trim().split(/\r?\n|\r/);
    const headers = lines[0].trim().split(",");
    const parsedData = [];
  
    for (let i = 1; i < lines.length; i++) {
      const currentLine = lines[i].split(",");
  
      if (currentLine.length === headers.length) {
        const row: any = {};
        for (let j = 0; j < headers.length; j++) {
          row[headers[j].trim()] = currentLine[j].trim();
        }
        parsedData.push(row);
      }
    }
  
    return ({
      data: parsedData,
      header: headers
    });
  };

  return (
    <form>
      <input
        type={"file"}
        id={"csvFileInput"}
        accept={".csv"}
        onChange={handleOnChange}
      />

      <Button type="primary"
        onClick={(e) => {
          handleOnSubmit(e);
        }}
        className='mt-4 '>Review</Button>
    </form>
  )
};

export default UploadFile;