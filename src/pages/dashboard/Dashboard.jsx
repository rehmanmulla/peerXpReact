import './dashboard.scss';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const URL = 'https://ghost-blog.ipxp.in/ghost/api/v3/content/';
const APIKey = '8196190b08906dda0ebf6e6f5d';
const months = [
    {
        name: 'Jan',
        month: '01',
        total: 0,
    },
    {
        name: 'Feb',
        month: '02',
        total: 0,
    },
    {
        name: 'Mar',
        month: '03',
        total: 0,
    },
    {
        name: 'Apr',
        month: '04',
        total: 0,
    },
    {
        name: 'May',
        month: '05',
        total: 0,
    },
    {
        name: 'Jun',
        month: '06',
        total: 0,
    },
    {
        name: 'Jul',
        month: '07',
        total: 0,
    },
    {
        name: 'Aug',
        month: '08',
        total: 0,
    },
    {
        name: 'Sep',
        month: '09',
        total: 0,
    },
    {
        name: 'Oct',
        month: '10',
        total: 0,
    },
    {
        name: 'Nov',
        month: '11',
        total: 0,
    },
    {
        name: 'Dec',
        month: '12',
        total: 0,
    },
]

const Dashboard = () => {
    const [posts, setPosts] = useState({});
    const [pages, setPages] = useState({});
    const [authors, setAuthors] = useState({});
    const [tags, setTags] = useState({});
    const [publish, setPublish] = useState({});
    const [charts, setCharts] = useState({});
    const history = useHistory();

    useEffect(() => {
        const getPosts = async () => {
            try {
                const res = await axios.get(`${URL}posts/?key=${APIKey}`);
                setPosts(res.data.posts);
            } catch (error) {
                console.log(error);
            }
        }
        getPosts();
    }, []);

    useEffect(() => {
        const getPages = async () => {
            try {
                const res = await axios.get(`${URL}pages/?key=${APIKey}`);
                setPages(res.data.pages);
            } catch (error) {
                console.log(error);
            }
        }
        getPages();
    }, []);

    useEffect(() => {
        const getAuthors = async () => {
            try {
                const res = await axios.get(`${URL}authors/?key=${APIKey}`);
                setAuthors(res.data.authors);
            } catch (error) {
                console.log(error);
            }
        }
        getAuthors();
    }, []);
    useEffect(() => {
        const getTags = async () => {
            try {
                const res = await axios.get(`${URL}tags/?key=${APIKey}`);
                setTags(res.data.tags);
            } catch (error) {
                console.log(error);
            }
        }
        getTags();
    }, []);

    useEffect(() => {
        const getPublish = async () => {
            try {
                setPosts(posts.sort((p1, p2) => {
                    return new Date(p2.published_at) - new Date(p1.published_at);
                }));
                setPublish(posts.slice(0, 5));
            } catch (error) {
                console.log(error);
            }
        }
        getPublish();
    }, [posts]);

    useEffect(() => {
        const getChartData = async () => {
            try {
                posts && posts.map(item => {
                    const month = item.created_at.substring(5, 7);
                    months.find(ele => {
                        if (ele.month === month)
                            ele.total = ele.total + 1;
                    })
                });
                setCharts(months);
            } catch (error) {
                console.log(error);
            }
        }
        getChartData();
    }, [posts]);

    const handleClick = (e) => {
        e.preventDefault();
        history.push({
            pathname: '/posts',
            state: { posts: posts }
        });
    }

    return (
        <div className='dashboard'>
            <div className="wrapper">
                <p style={{ padding: '0 30px' }}>for posts page click below card</p>
                <div className='fourPack'>
                    <div className="card" onClick={handleClick} style={{ cursor: 'pointer' }}>
                        <p className="text">Total number of Posts</p>
                        <span className="total">{posts.length}</span>
                    </div>
                    <div className="card">
                        <p className="text">Total number of Pages</p>
                        <span className="total">{pages.length}</span>
                    </div>
                    <div className="card">
                        <p className="text">Total number of Authors</p>
                        <span className="total">{authors.length}</span>
                    </div>
                    <div className="card">
                        <p className="text">Total number of Tags</p>
                        <span className="total">{tags.length}</span>
                    </div>
                </div>
                <div className='twoPack'>
                    <div className="card">
                        <ul className="publish">
                            <h3 className="publishTitle">Recent 5 Published Posts</h3>
                            {
                                publish && !!publish.length && publish.map((list, i) => (
                                    <li className='list' key={i}>
                                        <span className='number'>{i + 1}.</span>
                                        <span className='title'>{list.title}</span>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="card">
                        <div className='chart'>
                            <h3 className="chartTitle">Posts Month Chart</h3>
                            <ResponsiveContainer width="100%" aspect={2 / 1}>
                                <BarChart data={charts}>
                                    <CartesianGrid strokeDasharray="1 1" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="total" fill="#82ca9d" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
