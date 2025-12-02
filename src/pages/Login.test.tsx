import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from './Login';
import * as api from '../lib/api';

vi.mock('../lib/api');

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Login Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('skal vise login-skjema med alle felt', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    expect(screen.getByText('Workfinder')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Logg inn' })).toBeInTheDocument();
    expect(screen.getByLabelText(/e-post/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/passord/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /logg inn/i })).toBeInTheDocument();
  });

  it('skal vise feilmelding ved feil innlogging', async () => {
    vi.mocked(api.login).mockRejectedValue(
      new Error('Feil brukernavn og/eller passord.')
    );

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const emailInput = screen.getByLabelText(/e-post/i);
    const passwordInput = screen.getByLabelText(/passord/i);
    const submitButton = screen.getByRole('button', { name: /logg inn/i });

    fireEvent.change(emailInput, { target: { value: 'feil@test.no' } });
    fireEvent.change(passwordInput, { target: { value: 'feilpassord' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/feil brukernavn/i)).toBeInTheDocument();
    });

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('skal logge inn og redirecte til workfinder ved vellykket login', async () => {
    const mockUser = { 
      id: 1, 
      email: 'test@test.no', 
      role: 'applicant' 
    };

    vi.mocked(api.login).mockResolvedValue({ 
      user: mockUser 
    });

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const emailInput = screen.getByLabelText(/e-post/i);
    const passwordInput = screen.getByLabelText(/passord/i);
    const submitButton = screen.getByRole('button', { name: /logg inn/i });

    fireEvent.change(emailInput, { target: { value: 'test@test.no' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(api.login).toHaveBeenCalledWith('test@test.no', 'password123');
    });

    await waitFor(() => {
      const storedUser = localStorage.getItem('workf_bruker');
      expect(storedUser).toBeTruthy();
      expect(JSON.parse(storedUser!)).toEqual(mockUser);
    });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/workfinder', { replace: true });
    });
  });

  it('skal ikke sende request hvis felt er tomme', async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const submitButton = screen.getByRole('button', { name: /logg inn/i });
    fireEvent.click(submitButton);

    expect(api.login).not.toHaveBeenCalled();
  });
});