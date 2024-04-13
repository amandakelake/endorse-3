import styles from './page.module.css';
import Account from '@/components/account';
import SignProtocol from '@/components/signProtocol';
import AttestationList from '@/components/attestationList';

export default function Home() {
	return (
		<main className={styles.main}>
			<Account />
			<SignProtocol />
			<AttestationList />
		</main>
	);
}
