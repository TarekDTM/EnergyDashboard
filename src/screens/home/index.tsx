import Header from '../../components/header';

const Home: React.FC = () => {
  return (
    <div className="flex w-full h-full flex-col items-center  min-h-screen bg-gray-900 text-white">
      <Header />
      <h1 className="text-4xl font-bold mb-4">Welcome Home!</h1>
      <p className="text-lg mb-6">This is the home screen of your app.</p>
      <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
        Get Started
      </button>
    </div>
  );
};

export default Home;
