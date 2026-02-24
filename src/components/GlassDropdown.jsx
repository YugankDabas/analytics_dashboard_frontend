import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const GlassDropdown = ({ value, onChange, options, label, icon: Icon }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const selectedOption = options.find(opt => opt.value === value) || { label: 'Select...', value: '' };

    return (
        <div className="space-y-2 flex-1 min-w-[150px]" ref={dropdownRef}>
            {label && (
                <label className="text-sm font-medium text-slate-400 flex items-center gap-2 ml-1">
                    {Icon && <Icon size={14} />} {label}
                </label>
            )}
            <div className="relative">
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className={`
            w-full flex items-center justify-between gap-2 px-4 py-2.5
            bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl
            text-sm font-medium transition-all duration-300
            hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_20px_rgba(99,102,241,0.1)]
            ${isOpen ? 'ring-2 ring-brand-indigo/50 border-brand-indigo/50 shadow-[0_0_25px_rgba(99,102,241,0.2)] scale-[1.02]' : ''}
          `}
                >
                    <span className="truncate">{selectedOption.label}</span>
                    <ChevronDown
                        size={16}
                        className={`transition-transform duration-500 ${isOpen ? 'rotate-180 text-brand-indigo' : 'text-slate-400'}`}
                    />
                </button>

                {isOpen && (
                    <div className="absolute z-50 w-full mt-3 py-2 bg-slate-900/90 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-2xl animate-in fade-in zoom-in-95 duration-300 origin-top">
                        {options.map((option) => (
                            <button
                                key={option.value}
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onChange(option.value);
                                    setIsOpen(false);
                                }}
                                className={`
                  w-full text-left px-4 py-2.5 text-sm transition-all duration-200
                  hover:bg-brand-indigo/20 hover:text-white hover:pl-6
                  ${value === option.value ? 'bg-brand-indigo/10 text-brand-indigo font-semibold' : 'text-slate-300'}
                `}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default GlassDropdown;
