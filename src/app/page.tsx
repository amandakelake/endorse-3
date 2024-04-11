import styles from './page.module.css';
import Account from '@/components/account';
import SignProtocol from '@/components/signProtocol';

export default function Home() {
	return (
		<main className={styles.main}>
			<Account />
			<SignProtocol />
		</main>
	);
}
