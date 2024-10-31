import React from 'react';
import { render, screen } from '@testing-library/react';
import MainLayout from '../../components/MainLayout';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Routes와 Route를 추가로 가져옴

// Sidebar 및 Header 컴포넌트 모킹
jest.mock('../../components/Sidebar01', () => () => <div data-testid="sidebar">Sidebar</div>);
jest.mock('../../components/Header', () => () => <div data-testid="header">Header</div>);

describe('MainLayout component', () => {
  const onLogout = jest.fn();

  test('renders Sidebar and Header components', () => {
    render(
      <BrowserRouter>
        <MainLayout onLogout={onLogout} />
      </BrowserRouter>
    );

    // Sidebar와 Header 컴포넌트가 렌더링되는지 확인
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  test('renders the Outlet component for nested routes', () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout onLogout={onLogout} />}>
            <Route path="/" element={<div data-testid="outlet-content">Outlet Content</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    );

    // Outlet 자리에 콘텐츠가 올바르게 렌더링되는지 확인
    expect(screen.getByTestId('outlet-content')).toBeInTheDocument();
  });

  test('passes onLogout prop to Sidebar component', () => {
    render(
      <BrowserRouter>
        <MainLayout onLogout={onLogout} />
      </BrowserRouter>
    );

    const sidebar = screen.getByTestId('sidebar');
    expect(sidebar).toBeInTheDocument();
    expect(onLogout).not.toHaveBeenCalled();
  });
});