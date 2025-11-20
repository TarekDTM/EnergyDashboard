import React, { useState } from 'react';

interface User {
  username: string;
}

const Header: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = () => {
    // Simulate login
    setUser({ username: 'JohnDoe' });
  };

  const handleRegister = () => {
    // Simulate register
    setUser({ username: 'NewUser' });
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <header className="w-full flex items-center justify-between px-6 py-4 bg-gray-800 text-white shadow">
      <div className="text-2xl font-bold">MyApp</div>
      <div>
        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-lg">Hello, {user.username}</span>
            <button
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white font-semibold"
              onClick={handleLogout}
            >
              Log Out
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <button
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white font-semibold"
              onClick={handleLogin}
            >
              Log In
            </button>
            <button
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white font-semibold"
              onClick={handleRegister}
            >
              Register
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
