import React, { useState } from 'react';
import { PlusIcon, XMarkIcon, ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline';

interface FooterLink {
  id: string;
  label: string;
  url: string;
  openInNewTab: boolean;
}

interface FooterSection {
  id: string;
  title: string;
  links: FooterLink[];
}

interface FooterSettings {
  companyName: string;
  description: string;
  copyright: string;
  sections: FooterSection[];
  socialLinks: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
  showPoweredBy: boolean;
}

interface FooterEditorProps {
  settings: FooterSettings;
  onSave: (settings: FooterSettings) => void;
}

const FooterEditor: React.FC<FooterEditorProps> = ({ settings, onSave }) => {
  const [footerSettings, setFooterSettings] = useState<FooterSettings>(settings);

  const addSection = () => {
    const newSection: FooterSection = {
      id: Date.now().toString(),
      title: 'New Section',
      links: [],
    };
    setFooterSettings(prev => ({
      ...prev,
      sections: [...prev.sections, newSection],
    }));
  };

  const updateSection = (sectionId: string, updates: Partial<FooterSection>) => {
    setFooterSettings(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId ? { ...section, ...updates } : section
      ),
    }));
  };

  const deleteSection = (sectionId: string) => {
    setFooterSettings(prev => ({
      ...prev,
      sections: prev.sections.filter(section => section.id !== sectionId),
    }));
  };

  const addLink = (sectionId: string) => {
    const newLink: FooterLink = {
      id: Date.now().toString(),
      label: 'New Link',
      url: '#',
      openInNewTab: false,
    };
    
    setFooterSettings(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId
          ? { ...section, links: [...section.links, newLink] }
          : section
      ),
    }));
  };

  const updateLink = (sectionId: string, linkId: string, updates: Partial<FooterLink>) => {
    setFooterSettings(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId
          ? {
              ...section,
              links: section.links.map(link =>
                link.id === linkId ? { ...link, ...updates } : link
              ),
            }
          : section
      ),
    }));
  };

  const deleteLink = (sectionId: string, linkId: string) => {
    setFooterSettings(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId
          ? { ...section, links: section.links.filter(link => link.id !== linkId) }
          : section
      ),
    }));
  };

  const moveSectionUp = (index: number) => {
    if (index === 0) return;
    setFooterSettings(prev => {
      const newSections = [...prev.sections];
      [newSections[index - 1], newSections[index]] = [newSections[index], newSections[index - 1]];
      return { ...prev, sections: newSections };
    });
  };

  const moveSectionDown = (index: number) => {
    if (index === footerSettings.sections.length - 1) return;
    setFooterSettings(prev => {
      const newSections = [...prev.sections];
      [newSections[index], newSections[index + 1]] = [newSections[index + 1], newSections[index]];
      return { ...prev, sections: newSections };
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Footer Editor</h3>
          <p className="text-text-secondary">Customize your website footer content and links</p>
        </div>
        <button
          onClick={() => onSave(footerSettings)}
          className="btn-primary"
        >
          Save Footer
        </button>
      </div>

      {/* Company Information */}
      <div className="card p-6">
        <h4 className="font-semibold text-text-primary mb-4">Company Information</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Company Name
            </label>
            <input
              type="text"
              value={footerSettings.companyName}
              onChange={(e) => setFooterSettings(prev => ({ ...prev, companyName: e.target.value }))}
              className="input-field"
              placeholder="Your Company Name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Description
            </label>
            <textarea
              value={footerSettings.description}
              onChange={(e) => setFooterSettings(prev => ({ ...prev, description: e.target.value }))}
              className="input-field h-20 resize-none"
              placeholder="Brief description of your company"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Copyright Text
            </label>
            <input
              type="text"
              value={footerSettings.copyright}
              onChange={(e) => setFooterSettings(prev => ({ ...prev, copyright: e.target.value }))}
              className="input-field"
              placeholder="© 2024 Your Company. All rights reserved."
            />
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="card p-6">
        <h4 className="font-semibold text-text-primary mb-4">Social Media Links</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(footerSettings.socialLinks).map(([platform, url]) => (
            <div key={platform}>
              <label className="block text-sm font-medium text-text-primary mb-1 capitalize">
                {platform}
              </label>
              <input
                type="url"
                value={url || ''}
                onChange={(e) => setFooterSettings(prev => ({
                  ...prev,
                  socialLinks: { ...prev.socialLinks, [platform]: e.target.value }
                }))}
                className="input-field"
                placeholder={`https://${platform}.com/yourprofile`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Footer Sections */}
      <div className="card p-6">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-semibold text-text-primary">Footer Sections</h4>
          <button
            onClick={addSection}
            className="btn-secondary text-sm flex items-center gap-2"
          >
            <PlusIcon className="w-4 h-4" />
            Add Section
          </button>
        </div>

        <div className="space-y-6">
          {footerSettings.sections.map((section, sectionIndex) => (
            <div key={section.id} className="border border-border-light rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <input
                  type="text"
                  value={section.title}
                  onChange={(e) => updateSection(section.id, { title: e.target.value })}
                  className="input-field flex-1 mr-4"
                  placeholder="Section Title"
                />
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => moveSectionUp(sectionIndex)}
                    disabled={sectionIndex === 0}
                    className="p-1 hover:bg-gray-100 rounded disabled:opacity-50"
                  >
                    <ArrowUpIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => moveSectionDown(sectionIndex)}
                    disabled={sectionIndex === footerSettings.sections.length - 1}
                    className="p-1 hover:bg-gray-100 rounded disabled:opacity-50"
                  >
                    <ArrowDownIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteSection(section.id)}
                    className="p-1 hover:bg-red-100 rounded text-error"
                  >
                    <XMarkIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {section.links.map((link) => (
                  <div key={link.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={link.label}
                        onChange={(e) => updateLink(section.id, link.id, { label: e.target.value })}
                        className="input-field"
                        placeholder="Link Label"
                      />
                      <input
                        type="url"
                        value={link.url}
                        onChange={(e) => updateLink(section.id, link.id, { url: e.target.value })}
                        className="input-field"
                        placeholder="https://example.com"
                      />
                    </div>
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={link.openInNewTab}
                        onChange={(e) => updateLink(section.id, link.id, { openInNewTab: e.target.checked })}
                        className="rounded"
                      />
                      New tab
                    </label>
                    <button
                      onClick={() => deleteLink(section.id, link.id)}
                      className="p-1 hover:bg-red-100 rounded text-error"
                    >
                      <XMarkIcon className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                
                <button
                  onClick={() => addLink(section.id)}
                  className="w-full p-3 border-2 border-dashed border-border-light rounded-lg text-text-secondary hover:border-primary-300 hover:text-primary-500 transition-colors flex items-center justify-center gap-2"
                >
                  <PlusIcon className="w-4 h-4" />
                  Add Link
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Settings */}
      <div className="card p-6">
        <h4 className="font-semibold text-text-primary mb-4">Additional Settings</h4>
        <div className="space-y-4">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={footerSettings.showPoweredBy}
              onChange={(e) => setFooterSettings(prev => ({ ...prev, showPoweredBy: e.target.checked }))}
              className="rounded"
            />
            <span className="text-text-primary">Show "Powered by SocialHub" link</span>
          </label>
        </div>
      </div>

      {/* Preview */}
      <div className="card p-6">
        <h4 className="font-semibold text-text-primary mb-4">Footer Preview</h4>
        <div className="bg-gray-900 text-white p-8 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <h5 className="font-bold text-lg mb-2">{footerSettings.companyName}</h5>
              <p className="text-gray-300 text-sm mb-4">{footerSettings.description}</p>
              <div className="flex gap-3">
                {Object.entries(footerSettings.socialLinks).map(([platform, url]) => 
                  url && (
                    <div key={platform} className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center">
                      <span className="text-xs">{platform.charAt(0).toUpperCase()}</span>
                    </div>
                  )
                )}
              </div>
            </div>
            
            {footerSettings.sections.map((section) => (
              <div key={section.id}>
                <h6 className="font-semibold mb-3">{section.title}</h6>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.id}>
                      <a href={link.url} className="text-gray-300 hover:text-white text-sm">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-6 flex justify-between items-center">
            <p className="text-gray-400 text-sm">{footerSettings.copyright}</p>
            {footerSettings.showPoweredBy && (
              <p className="text-gray-400 text-sm">Powered by SocialHub</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterEditor;