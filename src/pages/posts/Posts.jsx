import './posts.scss'
import { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom"
import { useHistory } from 'react-router';

const Posts = () => {
    const location = useLocation();
    const history = useHistory();
    const posts = location.state.posts;
    const [woMetaDesc, setWoMetaDesc] = useState({});
    const [metaDesc, setMetaDesc] = useState({});
    const [lgUrl, setLgUrl] = useState({});
    const [woFeatureImg, setWoFeatureImg] = useState({});
    const [shortPosts, setShortPosts] = useState({});
    const [longPosts, setLongPosts] = useState({});

    useEffect(() => {
        const getWoMetaDesc = () => {
            const res = posts.filter(post => post.meta_description === null);
            setWoMetaDesc(res);
        }
        getWoMetaDesc();
    }, [posts]);

    useEffect(() => {
        const getMetaDesc = () => {
            const res = posts.filter(post => post.meta_description !== null);
            setMetaDesc(res);
        }
        getMetaDesc();
    }, [posts]);

    useEffect(() => {
        const getLongUrl = () => {
            const res = [];
            posts.filter(post => {
                if (post.url.length > 100) {
                    res.push(post);
                }
            });
            setLgUrl(res);
        }
        getLongUrl();
    }, [posts]);

    useEffect(() => {
        const getWoFeatureImg = () => {
            const res = posts.filter(post => post.feature_image === null);
            setWoFeatureImg(res);
        }
        getWoFeatureImg();
    }, [posts]);

    useEffect(() => {
        const getShortLongPosts = () => {
            const short = [];
            const long = [];
            posts.filter(post => {
                if (post.html.length < 250) {
                    short.push(post);
                } else if (post.html.length > 1500) {
                    long.push(post);
                }
            });
            setShortPosts(short);
            setLongPosts(long);
        }
        getShortLongPosts();
    }, [posts]);

    const handleClick = (e) => {
        e.preventDefault();
        history.push({
            pathname: '/links',
            state: { posts: posts }
        });
    }

    return (
        <div className='posts'>
            <div className="wrapper">
                <div className="card" onClick={handleClick} style={{ cursor: 'pointer' }}>
                    <h4 className="text">List of Posts without Meta Description</h4>
                    {
                        woMetaDesc && !!woMetaDesc.length ? woMetaDesc.map(wmd => (
                            <p key={wmd.id}>{wmd.title}</p>
                        )) : (<h1 className='nodata'>No Data Found!!!</h1>)
                    }
                </div>
                <div className="card">
                    <h4 className="text">Too long Meta Description</h4>
                    {
                        metaDesc && !!metaDesc.length ? metaDesc.map(md => (
                            <p key={md.id}>{md.title}</p>
                        )) : (<h1 className='nodata'>No Data Found!!!</h1>)
                    }
                </div>
                <div className="card">
                    <h4 className="text">Too long URL, more than 100 chars</h4>
                    {
                        lgUrl && !!lgUrl.length ? lgUrl.map(md => (
                            <p key={md.id}>{md.title}</p>
                        )) : (<h1 className='nodata'>No Data Found!!!</h1>)
                    }
                </div>
            </div>
            <div className="wrapper">
                <div className="card">
                    <h4 className="text">List of Posts without Featured Image</h4>
                    {
                        woFeatureImg && !!woFeatureImg.length ? woFeatureImg.map(wfi => (
                            <p key={wfi.id}>{wfi.title}</p>
                        )) : (<h1 className='nodata'>No Data Found!!!</h1>)
                    }
                </div>
                <div className="card">
                    <h4 className="text">Too Short Posts, Below 250 words</h4>
                    {
                        shortPosts && !!shortPosts.length ? shortPosts.map(sp => (
                            <p key={sp.id}>{sp.title}</p>
                        )) : (<h1 className='nodata'>No Data Found!!!</h1>)
                    }
                </div>
                <div className="card">
                    <h4 className="text">Too Long Posts, More than 1500 words</h4>
                    {
                        longPosts && !!longPosts.length ? longPosts.map(lp => (
                            <p key={lp.id}>{lp.title}</p>
                        )) : (<h1 className='nodata'>No Data Found!!!</h1>)
                    }
                </div>
            </div>
        </div>
    )
}

export default Posts
