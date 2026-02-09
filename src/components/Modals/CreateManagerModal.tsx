import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { User } from '../../types';

interface CreateManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (managerData: Partial<User>) => void;
  type: 'manager' | 'sub_manager';
}

const CreateManagerModal: React.FC<CreateManagerModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  type
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    credits: type === 'manager' ? 500 : 150,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (formData.credits < 0) newErrors.credits = 'Credits must be positive';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const managerData: Partial<User> = {
      ...formData,
      role: type === 'manager' ? 'social_media_manager' : 'sub_social_media_manager',
      id: Date.now().toString(),
    };

    onSubmit(managerData);
    setFormData({ name: '', email: '', credits: type === 'manager' ? 500 : 150 });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-background-card rounded-xl shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-border-light">
          <h2 className="text-xl font-semibold text-text-primary">
            Create {type === 'manager' ? 'Social Media Manager' : 'Sub Manager'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <XMarkIcon className="w-5 h-5 text-text-secondary" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`input-field ${errors.name ? 'border-error' : ''}`}
              placeholder="Enter full name"
            />
            {errors.name && (
              <p className="text-error text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`input-field ${errors.email ? 'border-error' : ''}`}
              placeholder="Enter email address"
            />
            {errors.email && (
              <p className="text-error text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Initial Credits
            </label>
            <input
              type="number"
              value={formData.credits}
              onChange={(e) => setFormData({ ...formData, credits: parseInt(e.target.value) || 0 })}
              className={`input-field ${errors.credits ? 'border-error' : ''}`}
              min="0"
            />
            {errors.credits && (
              <p className="text-error text-sm mt-1">{errors.credits}</p>
            )}
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-border-light">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              Create {type === 'manager' ? 'Manager' : 'Sub Manager'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateManagerModal;