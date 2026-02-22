import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
    globalIgnores(['build', 'node_modules', 'vite.config.ts']),
    {
        files: ['**/*.{ts,tsx}'],
        extends: [
            js.configs.recommended,
            tseslint.configs.recommended,
            react.configs.flat.recommended,
            reactHooks.configs.flat.recommended,
            reactRefresh.configs.vite
        ],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                project: ['./tsconfig.app.json']
            },
            ecmaVersion: 'latest',
            globals: globals.browser
        },
        settings: {
            react: {
                version: 'detect'
            }
        },
        rules: {
            '@typescript-eslint/no-unused-vars': 'warn',
            'react/react-in-jsx-scope': 'off',
            'quotes': ['error', 'single'],
            'semi': ['error', 'never'],
            'indent': ['error', 4],
            'brace-style': ['error', 'stroustrup'],
            'comma-dangle': ['error', 'never'],
            'object-curly-spacing': ['error', 'always'],
            'array-bracket-spacing': ['error', 'never'],
            'keyword-spacing': ['error', { before: true, after: true }],
            'space-before-blocks': ['error', 'always'],
            'eol-last': ['error', 'always'],
            'no-trailing-spaces': 'error',
            'indent': ['error', 4, { SwitchCase: 1 }],
            'prefer-const': 'warn'
        }
    }
])
