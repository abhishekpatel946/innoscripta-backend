import { useState } from "react";
import axios from "axios";

import styles from "./styles.module.css";

function Home(userDetails) {
	const [es_users, setUsers] = useState([]);

	const getAccessToken = () => {
		const cookieValue = document.cookie.match(/access_token=([^;]*)/);
		return cookieValue && cookieValue[1];
	};

	const user = userDetails.user;
	const logout = () => {
		window.open(`${process.env.REACT_APP_API_URL}/auth/logout`, "_self");
	};

	const fetchEmail = async () => {
		try {
			const accessToken = getAccessToken();
			const url = `${process.env.REACT_APP_API_URL}/email/list`;
			const { data } = await axios.get(url, {
				withCredentials: true,
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});
			console.log("fetched data");
			setUsers(data.users);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className={styles.container}>
			<h1 className={styles.heading}>Home</h1>
			<div className={styles.form_container}>
				<div className={styles.left}>
					<img className={styles.img} src="./images/profile.jpg" alt="login" />
				</div>
				<div className={styles.right}>
					<h2 className={styles.from_heading}>Profile</h2>
					<img src={user.picture} alt="profile" className={styles.profile_img} />
					<input type="text" defaultValue={user.name} className={styles.input} placeholder="UserName" />
					<input type="text" defaultValue={user.email} className={styles.input} placeholder="Email" />
					<button className={styles.btn} onClick={logout}>
						Log Out
					</button>
					<button className={styles.btn} onClick={fetchEmail}>
						Get Users
					</button>
				</div>
			</div>

			<div className={styles.container}>
				<h3 className={styles.heading}>Email's</h3>
				{!es_users ? <p>No email available </p> : <p>Name: {es_users?._source?.name}</p>}
			</div>
		</div>
	);
}

export default Home;
