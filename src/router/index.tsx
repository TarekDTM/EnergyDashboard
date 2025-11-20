import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import React from 'react';
import Home from '../screens/home';
import UserScreen from '../screens/user';

// 1. Create the root route (no path)
const rootRoute = createRootRoute();

// 2. Create your home route as a child of root
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

// 3. Create your user route as a child of root
const userRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/user',
  component: UserScreen,
});

// 4. Create the router with a route tree
const router = createRouter({
  routeTree: rootRoute.addChildren([homeRoute, userRoute]),
});

const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
