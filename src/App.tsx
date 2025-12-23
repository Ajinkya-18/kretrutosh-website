import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { Refine, Authenticated } from '@refinedev/core';
import { ThemedLayoutV2, ThemedSiderV2, AuthPage, ErrorComponent } from '@refinedev/antd';
import { dataProvider, liveProvider } from '@refinedev/supabase';
import routerBindings, { NavigateToResource, CatchAllNavigate, UnsavedChangesNotifier } from "@refinedev/react-router-v6";
import { supabase } from './lib/supabaseClient';
import { ConfigProvider, theme } from 'antd';
import '@refinedev/antd/dist/reset.css';
import { authProvider } from "./authProvider";

// Admin Pages
import { PageList } from './pages/admin/pages/list';
import { PageEdit } from './pages/admin/pages/edit';
import { PageCreate } from './pages/admin/pages/create';

// Public Pages
import DynamicPage from './pages/DynamicPage';

function App() {
  return (
    <ConfigProvider theme={{ algorithm: theme.defaultAlgorithm }}>
      <BrowserRouter>
        <Refine
          dataProvider={dataProvider(supabase)}
          liveProvider={liveProvider(supabase)}
          authProvider={authProvider}
          routerProvider={routerBindings}
          resources={[
            {
              name: "pages",
              list: "/admin/pages",
              create: "/admin/pages/create",
              edit: "/admin/pages/edit/:id",
              meta: { label: "Website Pages" }
            }
          ]}
        >
          <Routes>
            {/* --- PUBLIC WEBSITE ROUTES --- */}
            <Route index element={<DynamicPage />} />
            <Route path="/:slug" element={<DynamicPage />} />

            {/* --- ADMIN PANEL ROUTES --- */}
            <Route path="/login" element={
              <AuthPage 
              type="login" 
              providers={[
                {
                  name: "google",
                  label: "Sign in with Google",
                }, 
                {
                  name: "github",
                  label: "Sign in with GitHub",
                },
              ]}
            />
          } 
        />
            
            <Route path="/admin" element={
                <Authenticated key="protected" fallback={<CatchAllNavigate to="/login" />}>
                  <ThemedLayoutV2 Sider={(props) => <ThemedSiderV2 {...props} fixed />}>
                    <Outlet />
                  </ThemedLayoutV2>
                </Authenticated>
            }>
                <Route index element={<NavigateToResource resource="pages" />} />
                <Route path="pages">
                    <Route index element={<PageList />} />
                    <Route path="create" element={<PageCreate />} />
                    <Route path="edit/:id" element={<PageEdit />} />
                </Route>
            </Route>
          </Routes>
          
          <UnsavedChangesNotifier />
        </Refine>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;