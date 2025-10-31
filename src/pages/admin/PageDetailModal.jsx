import React, { useEffect, useState } from 'react';

const Field = ({ label, value, onChange, type = 'text' }) => (
  <div className="grid grid-cols-3 gap-3 items-center">
    <label className="text-sm font-medium text-gray-700 col-span-1">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="col-span-2 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#009CA8]"
    />
  </div>
);

const PublishedCheckboxes = ({ published, onChange }) => (
  <div className="grid grid-cols-3 gap-3 items-center">
    <label className="text-sm font-medium text-gray-700 col-span-1">Published</label>
    <div className="col-span-2 flex items-center gap-4">
      <label className="inline-flex items-center gap-2 text-sm text-gray-700">
        <input
          type="checkbox"
          checked={!!published}
          onChange={() => onChange(true)}
        />
        Yes
      </label>
      <label className="inline-flex items-center gap-2 text-sm text-gray-700">
        <input
          type="checkbox"
          checked={!published}
          onChange={() => onChange(false)}
        />
        No
      </label>
    </div>
  </div>
);

function slugify(input) {
  return String(input || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

const PageDetailModal = ({ open, onClose, page, onSave }) => {
  const [form, setForm] = useState({ id: undefined, name: '', title: '', slug: '', draft: false });
  const [sections, setSections] = useState([]);
  const [editingSectionId, setEditingSectionId] = useState(null);
  const [sectionDraft, setSectionDraft] = useState({ label: '', type: 'text' });
  const [slugTouched, setSlugTouched] = useState(false);

  useEffect(() => {
    if (page) {
      setForm({ id: page.id, name: page.name || '', title: page.title || '', slug: page.slug || '', draft: !!page.draft });
      setSections(Array.isArray(page.sections) ? page.sections : []);
      setEditingSectionId(null);
      setSectionDraft({ label: '', type: 'text' });
      setSlugTouched(false);
    }
  }, [page]);

  if (!open) return null;

  const handleSave = () => {
    const name = form.name.trim();
    const title = form.title.trim();
    const slug = form.slug.trim();
    if (!name || !title || !slug) return; 
    if (onSave) onSave({ ...form, name, title, slug, sections });
  };

  const startEditSection = (sec) => {
    setEditingSectionId(sec.id);
    setSectionDraft({ label: sec.label, type: sec.type });
  };

  const saveSectionEdit = () => {
    if (!editingSectionId) return;
    const next = sections.map((s) => s.id === editingSectionId ? { ...s, ...sectionDraft } : s);
    setSections(next);
    setEditingSectionId(null);
    setSectionDraft({ label: '', type: 'text' });
  };

  const cancelSectionEdit = () => {
    setEditingSectionId(null);
    setSectionDraft({ label: '', type: 'text' });
  };

  const deleteSection = (id) => {
    setSections((prev) => prev.filter((s) => s.id !== id));
  };

  const addSection = () => {
    if (!sectionDraft.label.trim()) return;
    const id = `s-${Date.now().toString(36)}`;
    setSections((prev) => [...prev, { id, label: sectionDraft.label.trim(), type: sectionDraft.type, children: [] }]);
    setSectionDraft({ label: '', type: 'text' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-lg">
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h3 className="text-base font-semibold text-gray-800">Edit Page</h3>
          <button onClick={onClose} className="p-2 rounded-md hover:bg-gray-100" aria-label="Close">✕</button>
        </div>

        <div className="p-5 space-y-4">
          <Field label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
          <Field
            label="Title"
            value={form.title}
            onChange={(v) => {
              const next = { ...form, title: v };
              if (!slugTouched) {
                next.slug = slugify(v);
              }
              setForm(next);
            }}
          />
          <div className="grid grid-cols-3 gap-3 items-center">
            <label className="text-sm font-medium text-gray-700 col-span-1">Slug</label>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => { setForm({ ...form, slug: e.target.value }); setSlugTouched(true); }}
              className="col-span-2 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#009CA8]"
            />
          </div>
          <PublishedCheckboxes
            published={!form.draft}
            onChange={(isPublished) => setForm({ ...form, draft: !isPublished })}
          />
          <div className="pt-2">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Sections</h4>
            <div className="rounded-lg border border-gray-200 divide-y">
              {sections.length === 0 && (
                <div className="p-4 text-sm text-gray-500">No sections yet.</div>
              )}
              {sections.map((sec) => (
                <div key={sec.id} className="p-4 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{sec.label}</div>
                    <div className="text-xs text-gray-500">Type: {sec.type}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => startEditSection(sec)} className="px-2 py-1 rounded-md text-xs bg-[#E6F7F8] text-[#009CA8]">Edit</button>
                    <button onClick={() => deleteSection(sec.id)} className="px-2 py-1 rounded-md text-xs bg-red-100 text-red-600">Delete</button>
                  </div>
                </div>
              ))}
            </div>

            {editingSectionId ? (
              <div className="mt-3 p-4 rounded-lg border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">Label</label>
                    <input value={sectionDraft.label} onChange={(e) => setSectionDraft({ ...sectionDraft, label: e.target.value })} className="border border-gray-300 rounded-md px-3 py-2 text-sm" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">Type</label>
                    <select value={sectionDraft.type} onChange={(e) => setSectionDraft({ ...sectionDraft, type: e.target.value })} className="border border-gray-300 rounded-md px-3 py-2 text-sm">
                      <option value="text">Text</option>
                      <option value="hero">Hero</option>
                      <option value="products">Products</option>
                      <option value="testimonials">Testimonials</option>
                      <option value="team">Team</option>
                      <option value="form">Form</option>
                      <option value="map">Map</option>
                      <option value="faq">FAQ</option>
                    </select>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-end gap-2">
                  <button onClick={cancelSectionEdit} className="px-3 py-1.5 rounded-md text-sm hover:bg-gray-50 text-gray-700">Cancel</button>
                  <button onClick={saveSectionEdit} className="px-3 py-1.5 rounded-md text-sm bg-[#009CA8] hover:brightness-95 text-white">Save</button>
                </div>
              </div>
            ) : (
              <div className="mt-3 p-4 rounded-lg border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">New Section Label</label>
                    <input value={sectionDraft.label} onChange={(e) => setSectionDraft({ ...sectionDraft, label: e.target.value })} className="border border-gray-300 rounded-md px-3 py-2 text-sm" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">Type</label>
                    <select value={sectionDraft.type} onChange={(e) => setSectionDraft({ ...sectionDraft, type: e.target.value })} className="border border-gray-300 rounded-md px-3 py-2 text-sm">
                      <option value="text">Text</option>
                      <option value="hero">Hero</option>
                      <option value="products">Products</option>
                      <option value="testimonials">Testimonials</option>
                      <option value="team">Team</option>
                      <option value="form">Form</option>
                      <option value="map">Map</option>
                      <option value="faq">FAQ</option>
                    </select>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-end">
                  <button onClick={addSection} className="px-3 py-1.5 rounded-md text-sm bg-[#009CA8] hover:brightness-95 text-white">Add Section</button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 px-5 py-4 border-t">
          <button onClick={onClose} className="px-4 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50">Cancel</button>
          <button
            onClick={handleSave}
            className={`inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg ${
              form.name.trim() && form.title.trim() && form.slug.trim()
                ? 'bg-[#009CA8] hover:brightness-95 text-white'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
            disabled={!form.name.trim() || !form.title.trim() || !form.slug.trim()}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageDetailModal;


