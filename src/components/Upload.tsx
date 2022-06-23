import './Upload.css';


const Upload = ({ setVideo }) => {

    const updateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = URL.createObjectURL(e.target.files[0]);
        setVideo(file);
        console.log(file);
    }


    return (
        <div className='upload-card'>

            <input
                className='file-input'
                type="file"
                id="video"
                accept='video/*'
                onChange={updateInput}
            />
            <button
                className='upload-btn'>Upload</button>
            <div className='upload-info'>
                <p className="main">Supported files</p>
                <p className="info">mp4, avi, mov </p>

            </div>

        </div>
    );
}

export default Upload;