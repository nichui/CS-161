import React from 'react'
//import Resizer from 'react-image-file-resize';

const FileUpload = () => {
    const fileUploadAndResize = (e) => {
        //console.log(e.target.files);
        // resize
        // send back to server to upload to cloudinary
        // set url to images[] in parent component - ProductCreate
    };

    return(
    <div className="row">
        <label className="btn btn-primary btn-raised"> Choose file
        <input
            type="file"
            multiple
            hidden
            accept="images/*"
            onChange={fileUploadAndResize} />
        </label>
    </div>);
};

export default FileUpload;