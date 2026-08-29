import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { AuthProvider } from './contexts/auth/auth.context.provider.tsx'
import { ThemeProvider } from './contexts/theme/theme.context.provider.tsx'
import { CoreProvider } from './contexts/core/core.context.provider.tsx'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
    <AuthProvider>
        <ThemeProvider>
            <CoreProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </CoreProvider>
        </ThemeProvider>
    </AuthProvider>
)
