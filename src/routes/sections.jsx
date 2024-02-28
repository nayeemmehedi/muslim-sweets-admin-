// import { lazy, Suspense, useState } from "react";
// import { Outlet, Navigate, useRoutes } from "react-router-dom";

// import DashboardLayout from "src/layouts/dashboard";

// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import ProtectedRoute from "./PrivateRoute";

// export const IndexPage = lazy(() => import("src/pages/app"));
// export const BlogPage = lazy(() => import("src/pages/blog"));
// export const UserPage = lazy(() => import("src/pages/user"));
// export const LoginPage = lazy(() => import("src/pages/login"));
// export const ProductsPage = lazy(() => import("src/pages/products"));
// export const Page404 = lazy(() => import("src/pages/page-not-found"));

// // ----------------------------------------------------------------------

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: (
//       <ProtectedRoute>
//         <DashboardLayout>
//           <Outlet />
//         </DashboardLayout>
//       </ProtectedRoute>
//     ),
//     children: [
//       {
//         element: <IndexPage />,
//         index: true,
//       },
//       {
//         path: "user",
//         element: <UserPage />,
//       },
//       {
//         path: "products",
//         element: <ProductsPage />,
//       },
//       {
//         path: "blog",
//         element: <BlogPage />,
//       },
//     ],
//   },
//   {
//     path: "/login",
//     element: <LoginPage />,
//   },
//   {
//     path: "404",
//     element: <Page404 />,
//   },
//   {
//     path: "*",
//     element: <Navigate to="/404" replace />,
//   },
// ]);

// export default router;

import { lazy, Suspense, useState } from "react";
import { Outlet, Navigate, useRoutes } from "react-router-dom";

import DashboardLayout from "src/layouts/dashboard";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./PrivateRoute";

export const IndexPage = lazy(() => import("src/pages/app"));
export const BlogPage = lazy(() => import("src/pages/blog"));
export const UserPage = lazy(() => import("src/pages/user"));
export const LoginPage = lazy(() => import("src/pages/login"));
export const ProductsPage = lazy(() => import("src/pages/products"));
export const Page404 = lazy(() => import("src/pages/page-not-found"));

// ----------------------------------------------------------------------

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <DashboardLayout>
          <Outlet />
        </DashboardLayout>
      </ProtectedRoute>
    ),
    children: [
      {
        element: <IndexPage />,
        index: true,
      },
      {
        path: "user",
        element: <UserPage />,
      },
      {
        path: "products",
        element: <ProductsPage />,
      },
      {
        path: "blog",
        element: <BlogPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "404",
    element: <Page404 />,
  },
  {
    path: "*",
    element: <Navigate to="/404" replace />,
  },
]);

export default router;

