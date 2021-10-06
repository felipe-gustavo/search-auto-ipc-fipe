import type { NextPage } from 'next';
import Container from '../src/components/Container';
import AlertMessage from '../src/components/AlertMessage';

const Home: NextPage = () => (
  <>
    <AlertMessage />
    <Container />
  </>
);

export default Home;
