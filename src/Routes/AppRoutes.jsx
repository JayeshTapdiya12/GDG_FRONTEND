import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '../pages/Login';
import Sign from '../pages/Sign';
import Home from '../pages/Home';
import { AuthRoute } from './AuthRoute';
import { ProtectedRoute } from './ProtectedRoute';
import About from '../pages/About'
import Contact from '../pages/Contact'
import Form from '../copoments/Form'
import Profile from '../pages/Profile';
import Scholarship from '../pages/Scholarship';
import LawAlert from '../pages/LawAlert';
import ScholarshipStatusChecker from '../pages/ScholarshipStatusChecker';
const AppRouter = () => {
    return (
        <>

            <BrowserRouter>
                <Routes>

                    <Route path='/' exact element={<AuthRoute><Login /></AuthRoute>} />

                    <Route path='/sign' element={<AuthRoute><Sign /></AuthRoute>} />
                    <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>} />
                    <Route path='/about' element={<ProtectedRoute><About /></ProtectedRoute>} />
                    <Route path='/contact' element={<ProtectedRoute><Contact /></ProtectedRoute>} />
                    <Route path='/form' element={<ProtectedRoute><Form /></ProtectedRoute>} />
                    <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                    <Route path='/scholarship' element={<ProtectedRoute><Scholarship /></ProtectedRoute>} />
                    <Route path='/visa' element={<ProtectedRoute><LawAlert /></ProtectedRoute>} />
                    <Route path='/status' element={<ProtectedRoute><ScholarshipStatusChecker />  </ProtectedRoute>} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default AppRouter;