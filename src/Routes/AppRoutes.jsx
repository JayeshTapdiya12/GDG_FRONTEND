import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '../pages/Login';
import Sign from '../pages/Sign';
import Home from '../pages/Home';
import { AuthRoute } from './AuthRoute';
import { ProtectedRoute } from './ProtectedRoute';
import About from '../pages/About'
import Contact from '../pages/Contact'
import Form from '../copoments/Form'
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
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default AppRouter;