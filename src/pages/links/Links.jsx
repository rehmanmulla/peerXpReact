import './links.scss'
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Links = () => {
	const location = useLocation();
	const posts = location.state.posts;
	const [intLink, setIntLink] = useState({});
	const [extLink, setExtLink] = useState({});
	const [brkIntLink, setBrkIntLink] = useState([]);
	const [brknExtLink, setBrknExtLink] = useState({});
	const [totalLink, setTotalLink] = useState();

	const constUrl = 'https://ghost-blog.ipxp.in/';

	useEffect(() => {
		const getIntExtLink = () => {
			const internal = [];
			const external = [];
			let counter = 0;
			posts.map(list => {
				if (list.url !== null || list.url !== '') {
					counter += 1;
					const sliceUrl = list.url.slice(0, constUrl.length);
					if (constUrl === sliceUrl) {
						internal.push(list);
					} else {
						external.push(list);
					}
				}
			});
			setTotalLink(counter);
			setIntLink(internal);
			setExtLink(external);
		}
		getIntExtLink();
	}, [posts]);



	useEffect(() => {
		const getBrknIntLink = () => {
			intLink && !!intLink.length && intLink.map(link => {
				fetch(`${link.url}`).then(async response => {
					if (response.status > 300) {
						return setBrkIntLink(preState => [...preState, response.url]);
					}
				});
			});
		}
		getBrknIntLink();
	}, [intLink]);

	useEffect(() => {
		const getBrknExtLink = () => {
			extLink && !!extLink.length && extLink.map(link => {
				fetch(`${link.url}`).then(async response => {
					if (response.status > 300) {
						return setBrknExtLink(preState => [...preState, response.url]);
					}
				});
			});
		}
		getBrknExtLink();
	}, [extLink]);


	return (
		<div className='links'>
			<div className="wrapper">
				<div className="card">
					<h4 className="text">Number of Total Links in All Posts</h4>
					<p>{totalLink}</p>
					<hr />
					<h4 className="text">Number of Internal Links</h4>
					<p>{intLink.length}</p>
					<hr />
					<h4 className="text">Number of External Links</h4>
					<p>{extLink.length}</p>
				</div>
				<div className="card">
					<h4 className="text">List of Broken Internal Links</h4>
					{
						brkIntLink && !!brkIntLink.length ? brkIntLink.map((bil, i) => (
							<p key={i}>{i + 1} - {bil}</p>
						)) : (<h1 className='nodata'>No Broken Links Found!!!</h1>)
					}
				</div>
				<div className="card">
					<h4 className="text">List of Broken External Links</h4>
					{
						brknExtLink && !!brknExtLink.length ? brknExtLink.map((bel, i) => (
							<p key={i}>{i + 1} - {bel}</p>
						)) : (<h1 className='nodata'>No Broken Links Found!!!</h1>)
					}
				</div>
			</div>
		</div>
	)
}


export default Links
