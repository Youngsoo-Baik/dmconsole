// src/components/App.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18n';

test('renders welcome message', () => {
    render(
        <I18nextProvider i18n={i18n}>
            <App />
        </I18nextProvider>
    );
    const linkElement = screen.getByText(/welcome to react and react-i18next/i);
    expect(linkElement).toBeInTheDocument();
});

test('renders language buttons', () => {
    render(
        <I18nextProvider i18n={i18n}>
            <App />
        </I18nextProvider>
    );
    const englishButton = screen.getByText(/english/i);
    const koreanButton = screen.getByText(/한국어/i);
    expect(englishButton).toBeInTheDocument();
    expect(koreanButton).toBeInTheDocument();
});