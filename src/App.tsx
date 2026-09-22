import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Events from './pages/Events'
import BirthdayParties from './pages/BirthdayParties'
import KidsParties from './pages/KidsParties'
import Corporate from './pages/Corporate'
import Pool from './pages/Pool'
import PoolParty from './pages/PoolParty'
import FamilyKids from './pages/FamilyKids'
import ThaiFamilyPool from './pages/ThaiFamilyPool'
import ThaiKidsCafePool from './pages/ThaiKidsCafePool'
import ThaiCompanyParty from './pages/ThaiCompanyParty'
import LakeMabprachan from './pages/LakeMabprachan'
import ThaiMabprachanGuide from './pages/ThaiMabprachanGuide'
import ThaiKidsCafeList from './pages/ThaiKidsCafeList'
import Steak from './pages/Steak'
import ThaiWesternFood from './pages/ThaiWesternFood'
import EastPattayaDarkside from './pages/EastPattayaDarkside'
import BirthdayClub from './pages/BirthdayClub'
import HalloweenPoolParty from './pages/HalloweenPoolParty'
import Sports from './pages/Sports'
import BeerGarden from './pages/BeerGarden'
import SundayRoast from './pages/SundayRoast'
import Food from './pages/Food'
import Christmas from './pages/Christmas'
import Specials from './pages/Specials'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Contact from './pages/Contact'
import Location from './pages/Location'
import Faq from './pages/Faq'
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
          <Route path="/events/halloween" element={<HalloweenPoolParty />} />
          <Route path="/birthday-club" element={<BirthdayClub />} />
          <Route path="/pool" element={<Pool />} />
          <Route path="/pool-party" element={<PoolParty />} />
          <Route path="/family-kids" element={<FamilyKids />} />
          <Route path="/th/family-pool-mabprachan" element={<ThaiFamilyPool />} />
          <Route path="/th/kids-cafe-pool-pattaya" element={<ThaiKidsCafePool />} />
          <Route path="/th/company-party-pattaya" element={<ThaiCompanyParty />} />
          <Route path="/lake-mabprachan" element={<LakeMabprachan />} />
          <Route path="/th/mabprachan-reservoir-guide" element={<ThaiMabprachanGuide />} />
          <Route path="/th/kids-cafe-pattaya-chonburi" element={<ThaiKidsCafeList />} />
          <Route path="/steak" element={<Steak />} />
          <Route path="/th/western-food-pattaya" element={<ThaiWesternFood />} />
          <Route path="/east-pattaya-darkside" element={<EastPattayaDarkside />} />
          <Route path="/sports" element={<Sports />} />
          <Route path="/beer-garden" element={<BeerGarden />} />
          <Route path="/sunday-roast" element={<SundayRoast />} />
          <Route path="/food" element={<Food />} />
          <Route path="/christmas" element={<Christmas />} />
          <Route path="/specials" element={<Specials />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/location" element={<Location />} />
          <Route path="/faq" element={<Faq />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
