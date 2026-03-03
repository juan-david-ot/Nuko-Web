import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { ThemeProviderWrapper } from './contexts/theme.context.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
    <ThemeProviderWrapper>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ThemeProviderWrapper>
)
