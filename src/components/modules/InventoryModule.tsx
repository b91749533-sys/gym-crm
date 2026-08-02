'use client';

import React, { useState } from 'react';
import { Package, AlertTriangle, Plus, ShoppingCart, Search, CheckCircle2, TrendingUp } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';
import { Modal } from '../ui/Modal';
import { ProductItem } from '@/lib/types';
import { MOCK_PRODUCTS } from '@/lib/mock-data';

export const InventoryModule: React.FC = () => {
  const [products, setProducts] = useState<ProductItem[]>(MOCK_PRODUCTS);
  const [search, setSearch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Product Form
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [price, setPrice] = useState('29.99');
  const [stock, setStock] = useState('20');
  const [category, setCategory] = useState<'SUPPLEMENT' | 'DRINK' | 'MERCHANDISE' | 'EQUIPMENT'>('SUPPLEMENT');

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return;

    const newProd: ProductItem = {
      id: `prod-${Date.now()}`,
      name,
      category,
      sku: sku || `SKU-${Math.floor(1000 + Math.random() * 9000)}`,
      price: parseFloat(price) || 29.99,
      costPrice: (parseFloat(price) || 29.99) * 0.6,
      stockQuantity: parseInt(stock, 10) || 10,
      minStockLevel: 5,
      supplier: 'NutriFit Global',
    };

    setProducts([newProd, ...products]);
    setIsAddModalOpen(false);
    setName('');
  };

  const handlePOSCheckout = (product: ProductItem) => {
    if (product.stockQuantity <= 0) return alert('Item out of stock!');
    setProducts(
      products.map((p) => (p.id === product.id ? { ...p, stockQuantity: p.stockQuantity - 1 } : p))
    );
    alert(`Sold 1 unit of ${product.name}! Stock updated to ${product.stockQuantity - 1}.`);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">Pro Shop Inventory & POS</h2>
          <p className="text-xs text-zinc-400 mt-1">Manage supplement stock, beverage inventory, merchandise, and retail sales counter.</p>
        </div>
        <Button variant="glow" size="sm" icon={<Plus className="w-4 h-4" />} onClick={() => setIsAddModalOpen(true)}>
          + Add Product to Stock
        </Button>
      </div>

      {/* Low Stock Warning Banner */}
      {products.some((p) => p.stockQuantity <= p.minStockLevel) && (
        <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center justify-between text-xs text-amber-400 font-semibold">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>Low Stock Warning: 2 products are below minimum reorder thresholds!</span>
          </div>
          <Button variant="outline" size="sm" className="border-amber-500/40 text-amber-400 hover:bg-amber-950">
            Trigger Reorder
          </Button>
        </div>
      )}

      {/* Toolbar & Grid */}
      <Card className="p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="w-full md:w-80 relative">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products by SKU, name, or category..."
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map((prod) => (
          <Card key={prod.id} glow className="flex flex-col justify-between p-5">
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <Badge variant="cyan">{prod.category}</Badge>
                  <h4 className="text-sm font-bold text-white mt-1.5">{prod.name}</h4>
                  <p className="text-[10px] font-mono text-zinc-500">{prod.sku}</p>
                </div>
                <span className="text-lg font-black text-white">${prod.price.toFixed(2)}</span>
              </div>

              <div className="mt-4 p-3 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between text-xs">
                <span className="text-zinc-400">Stock Quantity:</span>
                <span
                  className={`font-bold font-mono ${
                    prod.stockQuantity <= prod.minStockLevel ? 'text-rose-400 animate-pulse' : 'text-emerald-400'
                  }`}
                >
                  {prod.stockQuantity} units left
                </span>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-zinc-800 flex items-center justify-between">
              <span className="text-[10px] text-zinc-500">Cost: ${prod.costPrice.toFixed(2)}</span>
              <Button
                variant="glow"
                size="sm"
                icon={<ShoppingCart className="w-3.5 h-3.5" />}
                onClick={() => handlePOSCheckout(prod)}
              >
                POS Sell 1x
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Product Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add Product to Inventory Catalog">
        <form onSubmit={handleCreateProduct} className="space-y-4">
          <Input label="Product Name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Creatine Monohydrate 500g" required />
          <Input label="SKU Code" value={sku} onChange={(e) => setSku(e.target.value)} placeholder="SUP-CRE-500" />
          
          <div className="grid grid-cols-2 gap-4">
            <Input label="Retail Price ($ USD)" type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
            <Input label="Initial Stock Quantity" type="number" value={stock} onChange={(e) => setStock(e.target.value)} required />
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-1">Product Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2 text-sm text-zinc-100 focus:outline-none focus:border-cyan-500"
            >
              <option value="SUPPLEMENT">SUPPLEMENT</option>
              <option value="DRINK">DRINK</option>
              <option value="MERCHANDISE">MERCHANDISE</option>
              <option value="EQUIPMENT">EQUIPMENT</option>
            </select>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-zinc-800">
            <Button variant="ghost" type="button" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button variant="glow" type="submit">Publish to POS</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
