import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from '@/context/LanguageContext';
import PortfolioApp from '@/PortfolioApp';
import AdminApp from '@/admin/AdminApp';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={<AdminApp />} />
        <Route path="/*" element={
          <LanguageProvider>
            <PortfolioApp />
          </LanguageProvider>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
