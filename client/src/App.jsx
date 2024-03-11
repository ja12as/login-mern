import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import TaskPage from './pages/TaskPage';
import TaskFormPage from './pages/TaskFormPage';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoute from './ProtectedRoute';
import { TaskProvider } from './context/TaskContext';

function App() {
    return (
        <>
        <TaskProvider>
        <AuthProvider>
            <BrowserRouter>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/register' element={<RegisterPage />} />

                <Route element={<ProtectedRoute/>}>
                <Route path='/tasks' element={<TaskPage />} />
                <Route path='/add-task' element={<TaskFormPage />} />
                <Route path='/task/:id' element={<TaskFormPage />} />
                <Route path='/profile' element={<ProfilePage />} />
                </Route>

            </Routes>
            </BrowserRouter>
        </AuthProvider>
        </TaskProvider>
        </>
    )
}

export default App
