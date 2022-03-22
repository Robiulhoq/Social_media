import React, { useContext, useEffect, useState } from 'react';
import './Allpost.css';
import profile from '../../Img/profile.png';
import dummy from '../../Img/dummy1.jpg';
import { LoginContext } from '../../App';
import { Link } from 'react-router-dom';
import { getDatabase, ref, onValue } from 'firebase/database';
import CreatePost from '../CreatePost/CreatePost';
import TopMenu from '../TopMenu/TopMenu';


const AllPost = () => {
    const [login, setLogin, newPost, setNewPost] = useContext(LoginContext);
    const [post, setPost] = useState([]);
    
//   fetch data form firebase storage
    useEffect(() => {
        const db = getDatabase();
        const starCountRef = ref(db, '/post');
        onValue(starCountRef, (snapshot) => {
            let post = [];
            snapshot.forEach(function (element) {
                const data = element.val()
                post.push(data)
            })
            setPost(post
            )
        });

    }, [])
    //   
    return (
        <div className='container'>
            <TopMenu/>
            <div className="all_post">
                <h4>Post Something</h4>
                <Link to='/newPost'>
                    <div className="create_post">
                        <img className='icon_profile' src={profile} alt="" />
                        <p>What's On Your Mind?</p>
                    </div>
                </Link>
                {
                    post.map(data => {
                        return (
                            <div className="post">
                                <div className="post_top_container">
                                   <div className="profile">
                                   <img className='icon_profile' src={profile} alt="" />
                                    <p>{data.author}</p>
                                   </div>
                                    <h3 id='title'>{data.title}</h3>
                                </div>
                                <p>{data.time}</p>
                                <p>{data.driscripton}</p>
                                <p>#{data.hashTage}</p>

                                <img className='post_image' src={data.imgUrl} alt="" />
                            </div>
                        )
                    })
                }




            </div>

        </div>
    );
};

export default AllPost;