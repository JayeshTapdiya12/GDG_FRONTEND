import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '../pages/Login';
import Sign from '../pages/Sign';
import Home from '../pages/Home';
import { AuthRoute } from './AuthRoute';
import { ProtectedRoute } from './ProtectedRoute';

const AppRouter = () => {
    return (
        <>

            <BrowserRouter>
                <Routes>
                    <Route path='/' exact element={<AuthRoute><Login /></AuthRoute>} />

                    <Route path='/sign' element={<AuthRoute><Sign /></AuthRoute>} />
                    <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>} />

                </Routes>
            </BrowserRouter>
        </>
    )
}

export default AppRouter;