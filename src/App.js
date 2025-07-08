
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Search, ShoppingCart, User, Menu, X, Filter, Heart, Star, ChevronDown, ChevronRight } from 'lucide-react';

// Mock Product Data - In a real app, this would come from an API
const mockProducts = [
    { id: 1, name: 'Urban Explorer Jacket', category: 'Jackets', price: 149.99, rating: 4.5, reviewCount: 88, imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600', sizes: ['S', 'M', 'L'], colors: ['Black', 'Olive'] },
    { id: 2, name: 'Classic Denim Jeans', category: 'Pants', price: 89.99, rating: 4.7, reviewCount: 121, imageUrl: 'https://images.unsplash.com/photo-1602293589914-9e29544ddd5f?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600', sizes: ['S', 'M', 'L', 'XL'], colors: ['Blue'] },
    { id: 3, name: 'Silk Blend Blouse', category: 'Tops', price: 79.50, rating: 4.8, reviewCount: 94, imageUrl: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600', sizes: ['XS', 'S', 'M'], colors: ['White', 'Pink'] },
    { id: 4, name: 'Essential Crewneck Tee', category: 'T-Shirts', price: 29.99, rating: 4.9, reviewCount: 256, imageUrl: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600', sizes: ['S', 'M', 'L', 'XL'], colors: ['White', 'Black', 'Gray'] },
    { id: 5, name: 'Tailored Wool Trousers', category: 'Pants', price: 189.00, rating: 4.6, reviewCount: 65, imageUrl: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600', sizes: ['M', 'L'], colors: ['Charcoal'] },
    { id: 6, name: 'Leather Biker Jacket', category: 'Jackets', price: 349.99, rating: 4.9, reviewCount: 150, imageUrl: 'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600', sizes: ['S', 'M', 'L'], colors: ['Black'] },
    { id: 7, name: 'Cashmere V-Neck Sweater', category: 'Tops', price: 220.00, rating: 4.8, reviewCount: 78, imageUrl: 'https://images.unsplash.com/photo-1616258417201-3755455d3799?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600', sizes: ['S', 'M', 'L'], colors: ['Beige', 'Gray'] },
    { id: 8, name: 'Performance Chinos', category: 'Pants', price: 98.00, rating: 4.5, reviewCount: 112, imageUrl: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600', sizes: ['M', 'L', 'XL'], colors: ['Khaki', 'Navy'] },
    { id: 9, name: 'Graphic Print Hoodie', category: 'Jackets', price: 75.00, rating: 4.4, reviewCount: 99, imageUrl: 'https://images.unsplash.com/photo-1556821840-3a6d751b9558?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600', sizes: ['S', 'M', 'L'], colors: ['Gray', 'Black'] },
    { id: 10, name: 'Striped Linen Shirt', category: 'Tops', price: 65.00, rating: 4.6, reviewCount: 82, imageUrl: 'https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600', sizes: ['S', 'M', 'L', 'XL'], colors: ['Blue/White'] },
    { id: 11, name: 'Minimalist White Sneakers', category: 'Shoes', price: 129.99, rating: 4.9, reviewCount: 301, imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600', sizes: ['8', '9', '10', '11'], colors: ['White'] },
    { id: 12, name: 'Utility Cargo Shorts', category: 'Pants', price: 59.99, rating: 4.3, reviewCount: 54, imageUrl: 'https://images.unsplash.com/photo-1624316213299-b1d5a7a7b822?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600', sizes: ['S', 'M', 'L'], colors: ['Olive', 'Beige'] },
];

const FilterAccordion = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <div className="border-b border-slate-200 dark:border-slate-700 py-4">
            <button
                className="w-full flex justify-between items-center text-left"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
            >
                <h3 className="font-semibold text-slate-700 dark:text-slate-200">{title}</h3>
                {isOpen ? <ChevronDown className="h-5 w-5 text-slate-500" /> : <ChevronRight className="h-5 w-5 text-slate-500" />}
            </button>
            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-96 pt-4' : 'max-h-0'}`}>
                {children}
            </div>
        </div>
    );
};

const FilterSidebar = ({ filters, onFilterChange, uniqueValues, clearFilters, closeSidebar }) => (
    <div className="bg-white dark:bg-slate-900 h-full w-full p-6 flex flex-col">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">Filters</h2>
            <button onClick={closeSidebar} className="lg:hidden p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="Close filters">
                <X className="w-6 h-6 text-slate-500" />
            </button>
        </div>
        <div className="flex-grow overflow-y-auto -mr-6 pr-6">
            <FilterAccordion title="Category">
                <div className="space-y-2">
                    {uniqueValues.categories.map(category => (
                        <div key={category} className="flex items-center">
                            <input
                                id={`cat-${category}`}
                                type="radio"
                                name="category"
                                value={category}
                                checked={filters.category === category}
                                onChange={(e) => onFilterChange('category', e.target.value)}
                                className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label htmlFor={`cat-${category}`} className="ml-3 text-sm text-slate-600 dark:text-slate-300">{category}</label>
                        </div>
                    ))}
                </div>
            </FilterAccordion>

            <FilterAccordion title="Price">
                <div className="space-y-4">
                    <input
                        type="range"
                        min="0"
                        max="500"
                        value={filters.price}
                        onChange={(e) => onFilterChange('price', Number(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700"
                    />
                    <div className="text-sm text-slate-500 dark:text-slate-400">Up to ${filters.price}</div>
                </div>
            </FilterAccordion>

            <FilterAccordion title="Size">
                <div className="flex flex-wrap gap-2">
                    {uniqueValues.sizes.map(size => (
                        <button
                            key={size}
                            onClick={() => onFilterChange('size', filters.size === size ? 'All' : size)}
                            className={`px-3 py-1 text-sm border rounded-full transition-colors ${filters.size === size ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </FilterAccordion>

            <FilterAccordion title="Color">
                <div className="flex flex-wrap gap-3">
                    {uniqueValues.colors.map(color => (
                        <button
                            key={color}
                            onClick={() => onFilterChange('color', filters.color === color ? 'All' : color)}
                            className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${filters.color === color ? 'border-indigo-500 scale-110' : 'border-transparent'}`}
                            style={{ backgroundColor: color.toLowerCase() === 'blue/white' ? '#aaccff' : color.toLowerCase() }}
                            aria-label={`Filter by color ${color}`}
                        >
                          {color.toLowerCase() === 'white' && <div className="w-full h-full rounded-full border border-slate-300"></div>}
                        </button>
                    ))}
                </div>
            </FilterAccordion>
        </div>
        <div className="pt-6 mt-auto border-t border-slate-200 dark:border-slate-700">
            <button onClick={clearFilters} className="w-full text-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Clear All Filters
            </button>
        </div>
    </div>
);

const ProductCard = ({ product }) => (
    <div className="group relative bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl">
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden">
            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105" />
        </div>
        <div className="p-4">
            <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <a href="#" aria-label={product.name}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.name}
                </a>
            </h3>
            <p className="mt-1 text-xs text-slate-500">{product.category}</p>
            <div className="flex items-center mt-2">
                <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < Math.round(product.rating) ? 'text-amber-400' : 'text-slate-300'}`} fill="currentColor" />
                    ))}
                </div>
                <p className="ml-2 text-xs text-slate-500">{product.reviewCount} reviews</p>
            </div>
            <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">${product.price}</p>
        </div>
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="p-2 bg-white/70 dark:bg-slate-900/70 rounded-full backdrop-blur-sm hover:bg-white dark:hover:bg-slate-900" aria-label="Add to wishlist">
                <Heart className="w-5 h-5 text-rose-500" />
            </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
            <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md text-sm font-semibold hover:bg-indigo-700 transition-colors">
                Add to Cart
            </button>
        </div>
    </div>
);

const ProductSkeleton = () => (
    <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden animate-pulse">
        <div className="bg-slate-200 dark:bg-slate-700 aspect-w-1 aspect-h-1 w-full"></div>
        <div className="p-4">
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/2 mb-3"></div>
            <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-1/4"></div>
        </div>
    </div>
);


export default function FashionHomepage() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
    const initialFilters = {
        searchTerm: '',
        category: 'All',
        price: 500,
        size: 'All',
        color: 'All'
    };
    const [filters, setFilters] = useState(initialFilters);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            setProducts(mockProducts);
            setIsLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    const uniqueValues = useMemo(() => {
        const categories = ['All', ...new Set(mockProducts.map(p => p.category))];
        const sizes = ['All', ...new Set(mockProducts.flatMap(p => p.sizes))];
        const colors = ['All', ...new Set(mockProducts.flatMap(p => p.colors))];
        return { categories, sizes, colors };
    }, []);

    const handleFilterChange = useCallback((key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    }, []);
    
    const clearFilters = useCallback(() => {
        setFilters(initialFilters);
    }, []);

    const filteredProducts = useMemo(() => {
        return products
            .filter(p => p.name.toLowerCase().includes(filters.searchTerm.toLowerCase()))
            .filter(p => filters.category === 'All' || p.category === filters.category)
            .filter(p => p.price <= filters.price)
            .filter(p => filters.size === 'All' || p.sizes.includes(filters.size))
            .filter(p => filters.color === 'All' || p.colors.includes(filters.color));
    }, [products, filters]);

    return (
        <div className="bg-slate-50 dark:bg-slate-900 min-h-screen font-sans">
            <header className={`sticky top-0 z-40 w-full transition-all duration-300 ${isScrolled ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm shadow-md' : 'bg-transparent'}`}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <a href="#" className="flex-shrink-0 text-2xl font-bold text-slate-800 dark:text-white">AURA</a>
                            <nav className="hidden lg:flex lg:ml-10 lg:space-x-8">
                                <a href="#" className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400">New Arrivals</a>
                                <a href="#" className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400">Men</a>
                                <a href="#" className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400">Women</a>
                                <a href="#" className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400">Sale</a>
                            </nav>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="hidden md:block relative">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={filters.searchTerm}
                                    onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
                                    className="w-48 lg:w-64 pl-10 pr-4 py-2 text-sm bg-slate-100 dark:bg-slate-800 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            </div>
                            <button className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="Account">
                                <User className="w-6 h-6" />
                            </button>
                            <button className="relative p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="Shopping Cart">
                                <ShoppingCart className="w-6 h-6" />
                                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-indigo-600 ring-2 ring-white dark:ring-slate-900"></span>
                            </button>
                            <button className="lg:hidden p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="Open menu">
                                <Menu className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                <section className="relative bg-cover bg-center rounded-lg overflow-hidden h-96 mb-12" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1600')" }}>
                    <div className="absolute inset-0 bg-black/50"></div>
                    <div className="relative h-full flex flex-col justify-center items-center text-center text-white p-4">
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">Style Redefined</h1>
                        <p className="mt-4 max-w-xl text-lg text-slate-200">Discover our new collection. Uncompromising quality, timeless design.</p>
                        <a href="#" className="mt-8 inline-block bg-white text-slate-900 font-semibold px-8 py-3 rounded-md hover:bg-slate-200 transition-colors">Shop New Arrivals</a>
                    </div>
                </section>

                <div className="flex">
                    <aside className={`fixed lg:relative lg:block top-0 left-0 h-full lg:h-auto z-50 lg:z-auto transition-transform duration-300 ease-in-out ${isFilterSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 w-80 lg:w-72 lg:flex-shrink-0 lg:mr-8`}>
                       <FilterSidebar filters={filters} onFilterChange={handleFilterChange} uniqueValues={uniqueValues} clearFilters={clearFilters} closeSidebar={() => setIsFilterSidebarOpen(false)} />
                    </aside>
                     {isFilterSidebarOpen && <div onClick={() => setIsFilterSidebarOpen(false)} className="fixed inset-0 bg-black/50 z-40 lg:hidden"></div>}

                    <div className="flex-1">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">All Products</h2>
                            <button onClick={() => setIsFilterSidebarOpen(true)} className="lg:hidden flex items-center px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700">
                                <Filter className="w-5 h-5 mr-2"/>
                                Filter
                            </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                            {isLoading ? (
                                Array.from({ length: 9 }).map((_, index) => <ProductSkeleton key={index} />)
                            ) : filteredProducts.length > 0 ? (
                                filteredProducts.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))
                            ) : (
                                <div className="col-span-full text-center py-20 bg-white dark:bg-slate-800/50 rounded-lg">
                                    <p className="text-slate-500 dark:text-slate-400">No products match your criteria.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
