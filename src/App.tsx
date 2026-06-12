import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Events from './pages/Events'
import BirthdayParties from './pages/BirthdayParties'
import KidsParties from './pages/KidsParties'
import Corporate from './pages/Corporate'
import Pool from './pages/Pool'
import Sports from './pages/Sports'
import Specials from './pages/Specials'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Contact from './pages/Contact'
import Location from './pages/Location'
import Admin from './pages/Admin'
import DigitalMenu from './pages/DigitalMenu'
import StaffPortal from './pages/StaffPortal'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin — no layout wrapper */}
        <Route path="/admin" element={<Admin />} />

        {/* Digital menu — standalone, no navbar/footer */}
        <Route path="/digital-menu" element={<DigitalMenu />} />

        {/* Staff portal — standalone, own auth */}
        <Route path="/staff" element={<StaffPortal />} />

        {/* Public routes with Navbar + Footer */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/birthdays" element={<BirthdayParties />} />
          <Route path="/events/kids" element={<KidsParties />} />
          <Route path="/events/corporate" element={<Corporate />} />
          <Route path="/pool" element={<Pool />} />
          <Route path="/sports" element={<Sports />} />
          <Route path="/specials" element={<Specials />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/location" element={<Location />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
