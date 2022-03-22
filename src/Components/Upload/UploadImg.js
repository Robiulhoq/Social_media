import React, { useContext, useState } from 'react';
import { getDownloadURL, ref, getStorage, uploadBytesResumable } from "firebase/storage";
import { LoginContext } from '../../App';
const UploadImg = () => {
    const [login, setLogin, newPost, setNewPost] = useContext(LoginContext);
    const [file, setFile] = useState([]);
    const [prograse, setPrograse] = useState([0])

    // hendle file upload in firebase
    const hendleUploadFile =  (file) => {
      
        if (!file) return;
        const storage = getStorage();
        const storageRef = ref(storage, `files/${file.name}`);
        uploadBytesResumable(storageRef, file).then((snapshot) => {
            const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setPrograse(prog)
            if(snapshot.state === 'success'){
                getDownloadURL(storageRef)
                .then(url =>
                    setNewPost((privious) =>{
                        return{
                            ...privious, imgUrl: url
                        }
                    })
                    
                )
                .catch((err) => console.log(err))
            }
        },
            

        );
       
    }
    return (
        <div style={{padding: '20px'}}>
            <p>Uploaded {prograse} %</p>
            <input type="file" onChange={(e) => {
                setFile(e.target.files[0]);
            }} /><br />
             <input type='submit' className='btn_upload' onClick={() => hendleUploadFile(file)} value="upload Image" />
        </div>
    );
};

export default UploadImg;