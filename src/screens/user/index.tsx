import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const mockUser = {
  name: 'Jane Doe',
  email: 'jane.doe@example.com',
  password: 'password123',
  bio: '',
};

type UserProfile = typeof mockUser;

const passwordRequirements = [
  {
    label: 'At least 8 characters',
    test: (pw: string) => pw.length >= 8,
    key: 'min',
  },
  {
    label: 'At least 1 uppercase letter',
    test: (pw: string) => /[A-Z]/.test(pw),
    key: 'uppercase',
  },
  {
    label: 'At least 1 lowercase letter',
    test: (pw: string) => /[a-z]/.test(pw),
    key: 'lowercase',
  },
  {
    label: 'At least 1 number',
    test: (pw: string) => /[0-9]/.test(pw),
    key: 'number',
  },
  {
    label: 'At least 1 special character',
    test: (pw: string) => /[^A-Za-z0-9]/.test(pw),
    key: 'special',
  },
];

const passwordSchema = yup
  .string()
  .required('Password is required')
  .min(8, 'Password must be at least 8 characters')
  .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
  .matches(/[0-9]/, 'Password must contain at least one number')
  .matches(/[^A-Za-z0-9]/, 'Password must contain at least one special character');

const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email address'),
  password: passwordSchema,
  bio: yup.string().required('Bio is required'),
});

const UserScreen: React.FC = () => {
  const [user, setUser] = useState<UserProfile>(mockUser);
  const [editing, setEditing] = useState(false);
  const { register, handleSubmit, reset, formState: { errors }, watch } = useForm<UserProfile>({
    defaultValues: user,
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const passwordValue = watch('password', '');

  const onSubmit = (data: UserProfile) => {
    setUser(data);
    setEditing(false);
    reset(data);
  };

  const handleEdit = () => {
    setEditing(true);
    reset(user);
  };

  const handleCancel = () => {
    setEditing(false);
    reset(user);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      {!editing ? (
        <div className="text-gray-900">
          <div className="mb-2"><span className="font-semibold">Name:</span> {user.name}</div>
          <div className="mb-2"><span className="font-semibold">Email:</span> {user.email}</div>
          <div className="mb-2"><span className="font-semibold">Password:</span> {'*'.repeat(user.password.length)}</div>
          <div className="mb-4"><span className="font-semibold">Bio:</span> {user.bio}</div>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={handleEdit}
          >
            Edit Profile
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Name</label>
            <input
              type="text"
              {...register('name')}
              className="w-full border rounded px-3 py-2"
            />
            {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
          </div>
          <div>
            <label className="block font-semibold mb-1">Email</label>
            <input
              type="email"
              {...register('email')}
              className="w-full border rounded px-3 py-2"
            />
            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
          </div>
          <div>
            <label className="block font-semibold mb-1">Password</label>
            <input
              type="password"
              {...register('password')}
              className="w-full border rounded px-3 py-2"
            />
            {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
            <ul className="mt-2 space-y-1">
              {passwordRequirements.map((req) => {
                const passed = req.test(passwordValue || '');
                return (
                  <li
                    key={req.label}
                    className={
                      'text-sm flex items-center ' +
                      (passed ? 'text-green-600' : 'text-gray-400')
                    }
                  >
                    <span
                      className={
                        'inline-block w-2 h-2 rounded-full mr-2 ' +
                        (passed ? 'bg-green-600' : 'bg-gray-400')
                      }
                    ></span>
                    {req.label}
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <label className="block font-semibold mb-1">Bio</label>
            <textarea
              {...register('bio')}
              className="w-full border rounded px-3 py-2"
              rows={3}
            />
            {errors.bio && <span className="text-red-500 text-sm">{errors.bio.message}</span>}
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Save
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UserScreen; 