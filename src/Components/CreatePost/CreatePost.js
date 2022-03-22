import React, { useContext, useState } from 'react';
import '../AllPost/Allpost.css'
import { set, ref, getDatabase } from "firebase/database";
import { LoginContext } from '../../App';
import UploadImg from '../Upload/UploadImg';
import TopMenu from '../TopMenu/TopMenu';

const CreatePost = () => {
    const [login, setLogin, newPost, setNewPost] = useContext(LoginContext);
    const hendleChange = (e) => {
        const post = { ...newPost }
        post[e.target.name] = e.target.value;
        setNewPost(post)
    };
//  upload data in firebase storage
    const hendlePost = (event) => {
        event.preventDefault();
        if (newPost.title == '' && newPost.driscripton == '') {
            return alert("Please Fillup form")
        } else if (!newPost.title == '' && !newPost.driscripton == '') {
            const db = getDatabase();
            set(ref(db, 'post/' + Math.round(Math.random(1999) * 100)), newPost);
            setNewPost(() => {
                return {
                    title: '',
                    driscripton: '',
                    hashTage: '',
                    imgUrl: ''
                }
            })
            localStorage.setItem('Hash', '');
            alert('Post Upload Successfull!')
        }

    }
    let allTag = [];
    return (
        <div>
            <TopMenu />
            <div className='all_post create_post_content'>
                <p>Hash Tag:-  {localStorage.getItem('Hash')}</p>
                <input name='title' onChange={hendleChange} type="text" placeholder='Post Title' /><br />
                <input name='author' onChange={hendleChange} type="text" placeholder='Your Name' /><br />
                <textarea name="driscripton" onChange={hendleChange} cols="30" placeholder='Driscription' rows="10"></textarea> <br />
                <UploadImg />
                <p>Write Hash Tage and prase enter</p>
                <input type="text" name='hash' onKeyDown={(e) => {

                    if (e.key == "Enter") {

                        allTag.push(e.target.value);
                        console.log(allTag);
                        localStorage.setItem('Hash', allTag)
                        e.target.value = ''
                    }

                }} placeholder='Hashtags ' /> <br />
                <input className='btn_post' onClick={hendlePost} type="button" value="POST" />
            </div>
        </div>
    );
};

export default CreatePost;