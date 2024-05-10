import React from 'react';
import UploadFile from './UploadFile';


const SideBar: React.FC = () => {

  return (
    <div className="px-4 py-10 overflow-hidden w-50">
        <p className="text-lg ">Visualization setting</p>
        <p className="mt-4">Upload your CSV or Excel file</p>
        <div className="mt-4">
        <UploadFile />
        </div>
        </div>
  );
};

export default SideBar;