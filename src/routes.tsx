import { createRoot } from 'react-dom/client'
import MainForm from './MainForm'
import "../css/index.css"
import { BrowserRouter, Route, Routes } from 'react-router'
import NotFoundForm from './NotFoundForm'
createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Routes>
            <Route path='*' element={<NotFoundForm />} />
            <Route path='/' element={<MainForm/>} />
        </Routes>
    </BrowserRouter>
)