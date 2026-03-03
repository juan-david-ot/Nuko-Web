import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ThemeProviderWrapper } from './contexts/theme.context.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
    <ThemeProviderWrapper>
        <App />
    </ThemeProviderWrapper>
)
