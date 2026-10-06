import React, { useEffect, useRef, useState } from 'react';
import { Mail, Send, CheckCircle } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons';
import { SectionHeader } from '../ui/SectionHeader';
import { Button } from '../ui/Button';

type FormStatus = 'idle' | 'success' | 'error';

interface FormState {
  name: string;
  email: string;
  message: string;
}

type IconComponent = React.FC<{ size?: number; className?: string }>;

export const Contact: React.FC = () => {
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<FormStatus>('idle');
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const validate = (): boolean => {
    const newErrors: Partial<FormState> = {};
    if (!form.name.trim()) newErrors.name = 'Name is required.';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Enter a valid email address.';
    }
    if (!form.message.trim()) newErrors.message = 'Message is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    // Simulate success state — replace with a backend call (e.g. Formspree, EmailJS) when ready
    setStatus('success');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const contactLinks: { icon: IconComponent; label: string; value: string; href: string }[] = [
    {
      icon: Mail as IconComponent,
      label: 'Email',
      value: 'isaad@example.com', // Replace with your actual email
      href: 'mailto:isaad@example.com',
    },
    {
      icon: LinkedinIcon,
      label: 'LinkedIn',
      value: 'issaka-sa-ad-timbilla',
      href: 'https://linkedin.com/in/issaka-sa-ad-timbilla',
    },
    {
      icon: GithubIcon,
      label: 'GitHub',
      value: 'isaad-ui',
      href: 'https://github.com/isaad-ui',
    },
  ];

  return (
    <section id="contact" className="py-24 border-t border-[#111111]">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto px-6 transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <SectionHeader
          label="Contact"
          title="Let's build something useful."
          subtitle="Available for internships, freelance work, and collaboration. Get in touch."
        />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact info */}
          <div className="space-y-4">
            {contactLinks.map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                target={label !== 'Email' ? '_blank' : undefined}
                rel={label !== 'Email' ? 'noopener noreferrer' : undefined}
                className="flex items-center gap-4 bg-[#111111] border border-[#1e1e1e] rounded-xl p-4 hover:border-[#2a2a2a] transition-all group"
                aria-label={`Contact via ${label}: ${value}`}
              >
                <div className="w-10 h-10 rounded-lg bg-[#1a1a1a] flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-indigo-400" />
                </div>
                <div>
                  <div className="text-xs text-gray-600 mb-0.5">{label}</div>
                  <div className="text-gray-300 text-sm group-hover:text-indigo-400 transition-colors">
                    {value}
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Contact form */}
          <div className="bg-[#111111] border border-[#1e1e1e] rounded-xl p-6">
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center gap-4 py-8 text-center">
                <CheckCircle size={36} className="text-emerald-400" />
                <div>
                  <h3 className="text-gray-200 font-medium mb-1">Message sent!</h3>
                  <p className="text-gray-500 text-sm">
                    Thanks for reaching out. I'll get back to you soon.
                  </p>
                </div>
                <button
                  onClick={() => { setStatus('idle'); setForm({ name: '', email: '', message: '' }); }}
                  className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-xs text-gray-500 mb-1.5">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className={`w-full bg-[#0f0f0f] border ${
                      errors.name ? 'border-red-500/50' : 'border-[#2a2a2a]'
                    } rounded-lg px-4 py-3 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-indigo-500/60 transition-colors`}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {errors.name && (
                    <p id="name-error" className="text-red-400 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs text-gray-500 mb-1.5">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className={`w-full bg-[#0f0f0f] border ${
                      errors.email ? 'border-red-500/50' : 'border-[#2a2a2a]'
                    } rounded-lg px-4 py-3 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-indigo-500/60 transition-colors`}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="text-red-400 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs text-gray-500 mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="What would you like to discuss?"
                    className={`w-full bg-[#0f0f0f] border ${
                      errors.message ? 'border-red-500/50' : 'border-[#2a2a2a]'
                    } rounded-lg px-4 py-3 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-indigo-500/60 transition-colors resize-none`}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                  />
                  {errors.message && (
                    <p id="message-error" className="text-red-400 text-xs mt-1">{errors.message}</p>
                  )}
                </div>

                <Button type="submit" className="w-full justify-center" size="lg">
                  <Send size={14} />
                  Send Message
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
