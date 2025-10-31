import React, { useState } from 'react';

import ProductsAdmin from './ProductsAdmin';
import DealsAdmin from './DealsAdmin';
import AddProductModal from './AddProductModal';
import AddDealModal from './AddDealModal';
import SuccessOverlay from '../../components/SuccessOverlay.jsx';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [showProductModal, setShowProductModal] = useState(false);
  const [showDealModal, setShowDealModal] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const showSuccess = (msg) => {
    setSuccessMsg(msg);
    setSuccessOpen(true);
    setTimeout(() => setSuccessOpen(false), 1500);
  };

  const isProducts = activeTab === 'products';

  return (
    <div className="w-full">
      {/* Page toolbar (title + tabs + add button in one row) */}
      <div className="w-full">
        <div className="bg-[#FFF0EA] px-18 py-2">
          <div className="flex flex-wrap items-center gap-40">
            <h1 className="font-semibold text-gray-800">Admin Panel</h1>

            {/* Tabs inline */}
            <div className="flex items-center gap-2">
              <button
                className={`${isProducts ? 'text-[#E95817] font-medium' : 'bg-transparent text-gray-700'} rounded-full px-4 py-2 text-sm`}
                onClick={() => setActiveTab('products')}
              >
                Products
              </button>
              <button
                className={`${!isProducts ? 'text-[#E95817] font-medium' : 'bg-transparent text-gray-700'} rounded-full px-4 py-2 text-sm`}
                onClick={() => setActiveTab('deals')}
              >
                Deals / Promotions
              </button>
            </div>

            {/* Contextual action button aligned to the right */}
            <div className="ml-auto">
              {isProducts ? (
                <button
                  className="inline-flex items-center gap-2 bg-[#009CA8] hover:brightness-95 text-white text-sm font-medium px-4 py-2 rounded-lg"
                  aria-label="Add New Product"
                  onClick={() => setShowProductModal(true)}
                >
                  <span className="text-lg">＋</span>
                  Add New Product
                </button>
              ) : (
                <button
                  className="inline-flex items-center gap-2 bg-[#009CA8] hover:brightness-95 text-white text-sm font-medium px-4 py-2 rounded-lg"
                  aria-label="Add New Deal"
                  onClick={() => setShowDealModal(true)}
                >
                  <span className="text-lg">＋</span>
                  Add New Deal
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Tab content */}
        <div className="mt-6 mx-18">
          {isProducts ? (
            <ProductsAdmin onAddProduct={() => setShowProductModal(true)} />
          ) : (
            <DealsAdmin onAddDeal={() => setShowDealModal(true)} />
          )}
        </div>

        {/* Modals */}
        <AddProductModal
          open={showProductModal && isProducts}
          onClose={() => setShowProductModal(false)}
          onAdded={() => { setShowProductModal(false); showSuccess('Product Added Successfully'); }}
        />
        <AddDealModal
          open={showDealModal && !isProducts}
          onClose={() => setShowDealModal(false)}
          onAdded={() => { setShowDealModal(false); showSuccess('Deal Added Successfully'); }}
        />

        <SuccessOverlay open={successOpen} message={successMsg} onClose={() => setSuccessOpen(false)} />
      </div>
    </div>
  );
};

export default Admin;