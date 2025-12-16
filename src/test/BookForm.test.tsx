import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import BookList from '../components/BookForm';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('BookList Component', () => {
  beforeEach(() => {
    globalThis.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders loading skeleton initially', () => {
    (globalThis.fetch as any).mockResolvedValueOnce({
      json: () => Promise.resolve([]),
    });
    render(<BookList />);
    expect(screen.getByText(/loading books/i)).toBeInTheDocument();
  });

  it('renders book data after fetch', async () => {
    (globalThis.fetch as any).mockResolvedValueOnce({
      json: () =>
        Promise.resolve([
          {
            _id: '1',
            BookName: 'Test Book',
            Author: 'John Doe',
            category: 'Fiction',
            Price: 10,
            Image: '/book.png',
          },
        ]),
    });

    render(<BookList />);

    await waitFor(() => {
      expect(screen.getByText('Test Book')).toBeInTheDocument();
    });
  });

  it('shows "No books found" when list is empty', async () => {
    (globalThis.fetch as any).mockResolvedValueOnce({
      json: () => Promise.resolve([]),
    });
    render(<BookList />);

    await waitFor(() => {
      expect(screen.getByText(/no books found/i)).toBeInTheDocument();
    });
  });

  it('opens modal when clicking Create Book button', () => {
    (globalThis.fetch as any).mockResolvedValueOnce({
      json: () => Promise.resolve([]),
    });

    render(<BookList />);
    fireEvent.click(screen.getByText(/create book/i));

    // Expect dialog/modal content visible
    expect(screen.getByText(/add a new book/i)).toBeInTheDocument();
  });
});
