'use client';
import { useState, useMemo, use } from 'react';
import ProductCard from '@/components/ui/ProductCard';
import { useProducts } from '@/context/ProductContext';

export default function CategoryDetailsPage({ params }) {
  // Unwrap the Next.js 15 Promise-based params using React.use()
  const unwrappedParams = use(params);
  const slug = unwrappedParams?.slug || 'Category';
  const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1);

  const [sortOrder, setSortOrder] = useState('popular');
  const [filterPrice, setFilterPrice] = useState('all');
  const { products, isMounted } = useProducts();

  // Derive products specifically for this category constraint
  const filteredProducts = useMemo(() => {
    let pool = products.filter(p => {
      if (!slug || slug === 'shop') return true;
      const cat = p?.category?.toLowerCase() || '';
      const target = slug.toLowerCase();
      
      // Alias common synonyms seamlessly handling user drops
      if (target === 'bedsheets' && (cat === 'bedding' || cat === 'bedsheets')) return true;
      if (target === 'decor' && (cat === 'decor' || cat === 'home decor' || cat === 'accessories')) return true;
      
      return cat === target;
    });
    
    // Fallback if none match (local mock expansion)
    if (pool.length === 0) {
      pool = products;
    }

    if (filterPrice === 'under1000') pool = pool.filter(p => p.price < 1000);
    if (filterPrice === '1000to3000') pool = pool.filter(p => p.price >= 1000 && p.price <= 3000);
    if (filterPrice === 'above3000') pool = pool.filter(p => p.price > 3000);

    if (sortOrder === 'lowToHigh') pool.sort((a,b) => a.price - b.price);
    if (sortOrder === 'highToLow') pool.sort((a,b) => b.price - a.price);

    return pool;
  }, [slug, sortOrder, filterPrice, products]);

  if (!isMounted) return null;

  return (
    <div className="container animate-fade-in" style={{ padding: '4rem 1rem', minHeight: '80vh' }}>
      
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '4rem' }}>
        <h1 style={{ fontSize: '3rem', fontFamily: 'Playfair Display, serif', fontWeight: 600, color: '#0f172a', margin: '0 0 1rem 0' }}>{categoryName}</h1>
        <p style={{ color: '#64748b', fontSize: '1.1rem' }}>Displaying {filteredProducts.length} Premium Items</p>
      </div>

      <div className="filter-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', padding: '1.5rem', background: '#fff', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
        <div className="filter-group" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ fontWeight: 600, color: '#333' }}>Filter By:</span>
          <select value={filterPrice} onChange={(e) => setFilterPrice(e.target.value)} style={{ padding: '10px 16px', borderRadius: '8px', border: '1px solid #e2e8f0', background: '#f8fafc', color: '#333', fontSize: '0.9rem', cursor: 'pointer', outline: 'none' }}>
            <option value="all">All Prices</option>
            <option value="under1000">Under ₹1,000</option>
            <option value="1000to3000">₹1,000 - ₹3,000</option>
            <option value="above3000">Above ₹3,000</option>
          </select>
        </div>

        <div className="filter-group" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ fontWeight: 600, color: '#333' }}>Sort By:</span>
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} style={{ padding: '10px 16px', borderRadius: '8px', border: '1px solid #e2e8f0', background: '#f8fafc', color: '#333', fontSize: '0.9rem', cursor: 'pointer', outline: 'none' }}>
            <option value="popular">Most Popular</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
            <option value="newest">Newest Arrivals</option>
          </select>
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2.5rem' }}>
           {filteredProducts.map((p, idx) => (
             <ProductCard key={p._id || p.id || `prod_${idx}`} product={p} />
           ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '5rem 0', color: '#64748b' }}>
          <h3>No products match your current filters.</h3>
          <button onClick={() => { setFilterPrice('all'); setSortOrder('popular'); }} style={{ marginTop: '1rem', background: 'transparent', color: '#2563eb', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Clear Filters</button>
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 600px) {
          .filter-bar {
            flex-direction: column;
            align-items: stretch !important;
            gap: 16px;
            padding: 1rem !important;
          }
          .filter-group {
            justify-content: space-between;
          }
        }
      `}} />
    </div>
  );
}
