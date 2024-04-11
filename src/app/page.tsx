import styles from './page.module.css';
import { Button, TextField } from '@mui/material';
import Account from '@/components/account';

export default function Home() {
	return (
		<main className={styles.main}>
			<Account />
			<div>
				<Button variant="contained">Contained</Button>
				<Button variant="outlined">Outlined</Button>
				<TextField id="outlined-basic" label="Outlined" variant="outlined" />
			</div>
		</main>
	);
}
