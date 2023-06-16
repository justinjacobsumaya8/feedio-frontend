import { render, screen } from '@testing-library/react';
import Layout from 'src/components/layouts/frontend/Layout';

test('renders base frontend layout', () => {
    render(<Layout />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});


it("should render without crashing", () => {
    try {
        render(<Layout />);
        expect(true).toBe(true);
    } catch (err) {
        //
    } finally {
        expect(false).toBe(true);
    }
});