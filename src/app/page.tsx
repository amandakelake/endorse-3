import SignProtocol from '@/components/signProtocol';
import AttestationList from '@/components/attestationList';
import Tag from '@/components/tag';
import Image from 'next/image';
import MainLayout from '@/components/mainLayout';

export default function Home() {
	return (
		<MainLayout>
			<div style={{ textAlign: 'center' }}>
				<Image src={'/images/textLogo.png'} width={425} height={72} alt={'endorse'} />
			</div>
			<SignProtocol />
			<AttestationList />
		</MainLayout>
	);
}
