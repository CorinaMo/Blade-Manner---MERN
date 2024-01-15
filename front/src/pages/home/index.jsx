import { LandingBox } from '../../components/LandingBox';
 
const Home = () => {
  return (
    <div className="Home"
        style={{ 
            width: '100%', height: '100vh', background: 'var(--conic-gradient-pattern)',
            backgroundRepeat:'repeat',
        }}>
      <LandingBox />
    </div>
  );
}

export default Home;