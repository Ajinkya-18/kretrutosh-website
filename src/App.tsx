import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { Refine, Authenticated } from '@refinedev/core';
import { ThemedLayoutV2, ThemedSiderV2, AuthPage, ErrorComponent } from '@refinedev/antd';
import { dataProvider, liveProvider } from '@refinedev/supabase';
import routerBindings, { NavigateToResource, CatchAllNavigate, UnsavedChangesNotifier } from "@refinedev/react-router-v6";
import { supabase } from './lib/supabaseClient';
import { ConfigProvider, theme } from 'antd';
import '@refinedev/antd/dist/reset.css';
import { HelmetProvider } from 'react-helmet-async';

import { Header } from './components/Header';
import { Footer } from './components/Footer';

import { ContactList } from './pages/admin/contact/list';
import { ContactEdit } from './pages/admin/contact/edit';
import { ContactPage } from './pages/admin/contact/index';

import { ProgramList } from './pages/admin/programs/list';
import { ProgramCreate } from './pages/admin/programs/create';
import { ProgramEdit } from './pages/admin/programs/edit';
import { ProgramDetail } from './pages/admin/programs/detail';

import { VideoList } from './pages/admin/videos/list';
import { VideoCreate } from './pages/admin/videos/create';
import { VideoEdit } from './pages/admin/videos/edit';

import { ArticleList } from './pages/admin/articles/list';
import { ArticleCreate } from './pages/admin/articles/create';
import { ArticleEdit } from './pages/admin/articles/edit';

import { AssessmentList } from './pages/admin/assessments/list';
import { AssessmentCreate } from './pages/admin/assessments/create';
import { AssessmentEdit } from './pages/admin/assessments/edit';

import { WhitepaperList } from './pages/admin/whitepapers/list';
import { WhitepaperCreate } from './pages/admin/whitepapers/create';
import { WhitepaperEdit } from './pages/admin/whitepapers/edit';

import { BookList } from './pages/admin/book/list';
import { BookCreate } from './pages/admin/book/create';
import { BookEdit } from './pages/admin/book/edit';

import { PodcastPage } from './pages/resources/podcast';
import { WhitepapersPage } from './pages/resources/whitepapers';
import { AssessmentsPage } from './pages/resources/assessments';
import { ArticlesPage } from './pages/resources/articles';
import { BookPage } from './pages/resources/book';
// --- AUTH PROVIDER ---
import { authProvider } from "./authProvider";

// --- ADMIN PAGES ---
import { PageList } from './pages/admin/pages/list';
import { PageEdit } from './pages/admin/pages/edit';
import { PageCreate } from './pages/admin/pages/create';

import { FrameworkList } from './pages/admin/frameworks/list';
import { FrameworkCreate } from './pages/admin/frameworks/create';
import { FrameworkEdit } from './pages/admin/frameworks/edit';

// --- PUBLIC PAGES ---
import DynamicPage from './pages/DynamicPage';
// NEW: Import the clean Framework pages we just made
import FrameworksIndex from './pages/frameworks/index';
import FrameworkDetail from './pages/frameworks/detail';

import { IndustryList } from './pages/admin/industries/list';
import { IndustryCreate } from './pages/admin/industries/create';
import { IndustryEdit } from './pages/admin/industries/edit';
import { IndustryDetail } from './pages/admin/industries/detail';

import { CaseStudyList } from './pages/admin/case_studies/list';
import { CaseStudyCreate } from './pages/admin/case_studies/create';
import { CaseStudyEdit } from './pages/admin/case_studies/edit';
import { ImpactPage } from './pages/impact/index';
import { ScrollToTop } from './components/ScrollToTop';

const PublicLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow">
      <Outlet /> 
      </div>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <HelmetProvider>
      <ConfigProvider theme={{ algorithm: theme.defaultAlgorithm }}>
        <BrowserRouter>
        <ScrollToTop />
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
              },
              {
                name: "industries",
                list: "/admin/industries",
                create: "/admin/industries/create",
                edit: "/admin/industries/edit/:id",
                meta: { label: "Industries" }
              },
              {
                name: "frameworks",
                list: "/admin/frameworks",
                create: "/admin/frameworks/create",
                edit: "/admin/frameworks/edit/:id",
                meta: { label: "Frameworks" }
              },
              {
                name: "programs",
                list: "/admin/programs",
                create: "/admin/programs/create",
                edit: "/admin/programs/edit/:id",
                meta: { label: "Transformation Programs" }
              },
              {
                  name: "book",
                  list: "/admin/book",
                  create: "/admin/book/create",
                  edit: "/admin/book/edit/:id",
                  meta: { label: "The Book" }
              },
              {
                  name: "articles",
                  list: "/admin/articles",
                  create: "/admin/articles/create",
                  edit: "/admin/articles/edit/:id",
                  meta: { label: "Articles" }
              },
              {
                  name: "assessments",
                  list: "/admin/assessments",
                  create: "/admin/assessments/create",
                  edit: "/admin/assessments/edit/:id",
                  meta: { label: "Assessments" }
              },
              {
                  name: "whitepapers",
                  list: "/admin/whitepapers",
                  create: "/admin/whitepapers/create",
                  edit: "/admin/whitepapers/edit/:id",
                  meta: { label: "Whitepapers" }
              },
              {
                  name: "videos",
                  list: "/admin/videos",
                  create: "/admin/videos/create",
                  edit: "/admin/videos/edit/:id",
                  meta: { label: "Videos" }
              },
              {
                  name: "page_contact",
                  list: "/admin/contact",
                  edit: "/admin/contact/edit/:id",
                  meta: { label: "Contact Page Info" }
              },
              {
                name: "case_studies",
                list: "/admin/case_studies",
                create: "/admin/case_studies/create",
                edit: "/admin/case_studies/edit/:id",
                meta: { label: "Impact & Case Studies" }
            }
            ]}
          >
            <Routes>
              {/* --- PUBLIC WEBSITE ROUTES --- */}
              
              {/* 1. Static/Specific Routes must come BEFORE dynamic routes */}
              
              {/* 2. Dynamic Route (Catches /about, /contact, /home) */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<DynamicPage />} />
                <Route path="/impact" element={<ImpactPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/industries/:slug" element={<IndustryDetail />} />
                <Route path="/resources/podcast" element={<PodcastPage />} />
                <Route path="/resources/whitepapers" element={<WhitepapersPage />} />
                <Route path="/resources/assessments" element={<AssessmentsPage />} />
                <Route path="/resources/articles" element={<ArticlesPage />} />
                <Route path="/book" element={<BookPage />} />

                <Route path="/frameworks/:slug" element={<FrameworkDetail />} />
                <Route path="/programs/:slug" element={<ProgramDetail />} />
                <Route path="/frameworks" element={<FrameworksIndex />} />
                <Route path="/:slug" element={<DynamicPage />} />

              </Route>

              {/* --- ADMIN PANEL ROUTES --- */}
              <Route path="/login" element={
                <AuthPage 
                  type="login" 
                  providers={[
                    { name: "google", label: "Sign in with Google" },
                    { name: "github", label: "Sign in with GitHub" }
                  ]}
                />
              } />
              
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

                  <Route path="frameworks">
                      <Route index element={<FrameworkList />} />
                      <Route path="create" element={<FrameworkCreate />} />
                      <Route path="edit/:id" element={<FrameworkEdit />} />
                  </Route>

                  <Route path="industries">
                      <Route index element={<IndustryList />} />
                      <Route path="create" element={<IndustryCreate />} />
                      <Route path="edit/:id" element={<IndustryEdit />} />
                  </Route>

                  <Route path="programs">
                      <Route index element={<ProgramList />} />
                      <Route path="create" element={<ProgramCreate />} />
                      <Route path="edit/:id" element={<ProgramEdit />} />
                  </Route>

                  <Route path="videos">
                      <Route index element={<VideoList />} />
                      <Route path="create" element={<VideoCreate />} />
                      <Route path="edit/:id" element={<VideoEdit />} />
                  </Route>

                  <Route path="book">
                      <Route index element={<BookList />} />
                      <Route path="create" element={<BookCreate />} />
                      <Route path="edit/:id" element={<BookEdit />} />
                  </Route>

                  <Route path="articles">
                      <Route index element={<ArticleList />} />
                      <Route path="create" element={<ArticleCreate />} />
                      <Route path="edit/:id" element={<ArticleEdit />} />
                  </Route>
                  
                  <Route path="assessments">
                      <Route index element={<AssessmentList />} />
                      <Route path="create" element={<AssessmentCreate />} />
                      <Route path="edit/:id" element={<AssessmentEdit />} />
                  </Route>

                  <Route path="whitepapers">
                      <Route index element={<WhitepaperList />} />
                      <Route path="create" element={<WhitepaperCreate />} />
                      <Route path="edit/:id" element={<WhitepaperEdit />} />
                  </Route>

                  <Route path="contact">
                      <Route index element={<ContactList />} />
                      <Route path="edit/:id" element={<ContactEdit />} />
                  </Route>

                  <Route path="case_studies">
                      <Route index element={<CaseStudyList />} />
                      <Route path="create" element={<CaseStudyCreate />} />
                      <Route path="edit/:id" element={<CaseStudyEdit />} />
                  </Route>

              </Route>
            </Routes>
            
            <UnsavedChangesNotifier />
          </Refine>
        </BrowserRouter>
      </ConfigProvider>
    </HelmetProvider>
  );
}

export default App;