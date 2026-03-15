import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { AuthProviderWrapper } from './contexts/auth/auth.context.tsx'
import { ThemeProviderWrapper } from './contexts/theme/theme.context.tsx'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
    <AuthProviderWrapper>
        <ThemeProviderWrapper>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ThemeProviderWrapper>
    </AuthProviderWrapper>
)
