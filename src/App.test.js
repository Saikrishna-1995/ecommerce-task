import { render } from '@testing-library/react';
import Products from "../src/products/index";
import Header from "../src/header/index";
import Footer from "../src/footer/index";


test('renders the Products page', () => {
    render(<Products />);
});

test('renders the Header page', () => {
    render(<Header />);
});

test('renders the Footer page', () => {
    render(<Footer />);
});