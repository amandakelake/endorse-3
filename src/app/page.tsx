import styles from './page.module.css';
import Account from '@/components/account';
import SignProtocol from '@/components/signProtocol';
import AttestationList from '@/components/attestationList';
import Tag from '@/components/tag';

export default function Home() {
	return (
		<main className={styles.main}>
			<Account />
			<SignProtocol />
			<Tag />
			<AttestationList />
		</main>
	);
}
