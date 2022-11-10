import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import {
  Route, Router, Routes, BrowserRouter,
} from 'react-router-dom';
import { ErrorPage } from './ErrorPage';

test('First errorPage test', () => {
  const { getAllByRole } = render(<BrowserRouter>
    <ErrorPage />
  </BrowserRouter>);
  const button = getAllByRole('button');
  console.log(button);
});
