import React, { useState } from 'react';
import Pagination from '../../components/Pagination.jsx';
import DeleteConfirmModal from '../../components/DeleteConfirmModal.jsx';
import SuccessOverlay from '../../components/SuccessOverlay.jsx';
import PageDetailModal from './PageDetailModal.jsx';

const initialPages = [
  {
    id: 1,
    name: 'Home',
    title: 'Homepage',
    slug: 'home',
    draft: false,
    sections: [
      { id: 's-hero', label: 'Hero Banner', type: 'hero', children: [] },
      { id: 's-featured', label: 'Featured Products', type: 'products', children: [] },
      { id: 's-testimonials', label: 'Testimonials', type: 'testimonials', children: [] },
    ],
  },
  {
    id: 2,
    name: 'About',
    title: 'About Us',
    slug: 'about',
    draft: true,
    sections: [
      { id: 's-intro', label: 'Intro', type: 'text', children: [] },
      { id: 's-team', label: 'Team', type: 'team', children: [] },
    ],
  },
  {
    id: 3,
    name: 'Contact',
    title: 'Contact',
    slug: 'contact',
    draft: false,
    sections: [
      { id: 's-form', label: 'Contact Form', type: 'form', children: [] },
      { id: 's-map', label: 'Map', type: 'map', children: [] },
    ],
  },
  {
    id: 4,
    name: 'FAQ',
    title: 'FAQ',
    slug: 'faq',
    draft: false,
    sections: [
      { id: 's-faq', label: 'FAQ List', type: 'faq', children: [] },
    ],
  },
];

const DraftBadge = ({ draft }) => (
  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${draft ? 'bg-[#FFF0EA] text-[#E95817]' : 'bg-[#E6F7F8] text-[#009CA8]'}`}>{draft ? 'Draft' : 'Published'}</span>
);

const ActionButtons = ({ onEdit, onDelete, onToggleDraft }) => (
  <div className="flex items-center gap-2">
    <button onClick={onEdit} className="p-2 rounded-md bg-[#E6F7F8] text-[#009CA8]" title="Edit" aria-label="Edit">
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>
    </button>
    <button onClick={onToggleDraft} className="p-2 rounded-md bg-orange-100 text-[#E95817]" title="Toggle Draft" aria-label="Toggle Draft">
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
    </button>
    <button onClick={onDelete} className="p-2 rounded-md bg-red-100 text-red-600" title="Delete" aria-label="Delete">
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/></svg>
    </button>
  </div>
);

const CustomizationAdmin = () => {
  const [pages, setPages] = useState(initialPages);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const showSuccess = (msg) => {
    setSuccessMsg(msg);
    setSuccessOpen(true);
    setTimeout(() => setSuccessOpen(false), 1500);
  };

  const toggleDraft = (p) => {
    setPages((prev) => prev.map((x) => x.id === p.id ? { ...x, draft: !x.draft } : x));
    showSuccess('Draft state updated');
  };

  const savePage = (updated) => {
    setPages((prev) => prev.map((x) => x.id === updated.id ? { ...x, ...updated } : x));
    showSuccess('Page updated successfully');
  };

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Customization</h2>
      </div>

      <div className="overflow-x-auto rounded-xl border border-[#00000080]">
        <table className="min-w-full divide-y divide-gray-200 text-left">
          <thead className="bg-[#E95817] text-white">
            <tr>
              <th className="px-4 sm:px-6 py-3 text-xs font-semibold">Name</th>
              <th className="px-4 sm:px-6 py-3 text-xs font-semibold">Title</th>
              <th className="px-4 sm:px-6 py-3 text-xs font-semibold">Slug</th>
              <th className="px-4 sm:px-6 py-3 text-xs font-semibold">Published</th>
              <th className="px-4 sm:px-6 py-3 text-xs font-semibold">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {pages.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="px-4 sm:px-6 py-3">
                  <div className="text-sm font-medium text-gray-900">{p.name}</div>
                </td>
                <td className="px-4 sm:px-6 py-3 text-sm text-gray-700">{p.title}</td>
                <td className="px-4 sm:px-6 py-3 text-sm text-gray-700">/{p.slug}</td>
                <td className="px-4 sm:px-6 py-3"><DraftBadge draft={p.draft} /></td>
                <td className="px-4 sm:px-6 py-3">
                  <ActionButtons
                    onEdit={() => { setSelected(p); setShowDetail(true); }}
                    onToggleDraft={() => toggleDraft(p)}
                    onDelete={() => { setSelected(p); setShowDelete(true); }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination currentPage={page} totalPages={2} onPageChange={setPage} />

      <PageDetailModal
        open={showDetail}
        onClose={() => setShowDetail(false)}
        page={selected}
        onSave={(updated) => { setShowDetail(false); savePage(updated); }}
      />

      <DeleteConfirmModal
        open={showDelete}
        entity="page"
        onCancel={() => setShowDelete(false)}
        onDelete={() => { setShowDelete(false); showSuccess('Page Deleted Successfully'); }}
      />

      <SuccessOverlay open={successOpen} message={successMsg} onClose={() => setSuccessOpen(false)} />
    </div>
  );
};

export default CustomizationAdmin;


