import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { ThemeProviderWrapper } from './contexts/theme/theme.context.tsx'
import App from './App.tsx'
import './index.css'
import { AuthProviderWrapper } from './contexts/auth/auth.context.tsx'

createRoot(document.getElementById('root')!).render(
    <ThemeProviderWrapper>
        <AuthProviderWrapper>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </AuthProviderWrapper>
    </ThemeProviderWrapper>
)
