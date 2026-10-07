import React, { useEffect, useRef, useState } from 'react';
import { Mail, Send, CheckCircle } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons';
import { SectionHeader } from '../ui/SectionHeader';
import { Button } from '../ui/Button';

type FormStatus = 'idle' | 'success';
interface FormState { name: string; email: string; message: string; }
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
    const e: Partial<FormState> = {};
    if (!form.name.trim()) e.name = 'Name is required.';
    if (!form.email.trim()) e.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address.';
    if (!form.message.trim()) e.message = 'Message is required.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) setStatus('success');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name as keyof FormState]) setErrors((p) => ({ ...p, [name]: undefined }));
  };

  const contactLinks: { icon: IconComponent; label: string; value: string; href: string }[] = [
    { icon: Mail as IconComponent, label: 'Email', value: 'isaad@example.com', href: 'mailto:isaad@example.com' },
    { icon: LinkedinIcon, label: 'LinkedIn', value: 'issaka-sa-ad-timbilla', href: 'https://linkedin.com/in/issaka-sa-ad-timbilla' },
    { icon: GithubIcon, label: 'GitHub', value: 'isaad-ui', href: 'https://github.com/isaad-ui' },
  ];

  const inputBase =
    'w-full bg-neutral-50 border rounded-lg px-4 py-3 text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all';

  return (
    <section id="contact" className="py-24 border-t border-neutral-200">
      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        <div className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <SectionHeader
            label="Contact"
            title="Let's build something useful."
            subtitle="Available for internships, freelance work, and collaboration. Get in touch."
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Contact info */}
          <div
            className={`space-y-4 transition-all duration-700 delay-100 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            {contactLinks.map(({ icon: Icon, label, value, href }, i) => (
              <a
                key={label}
                href={href}
                target={label !== 'Email' ? '_blank' : undefined}
                rel={label !== 'Email' ? 'noopener noreferrer' : undefined}
                className={`flex items-center gap-4 bg-white border border-neutral-200 rounded-xl p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all group ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${200 + i * 80}ms` }}
                aria-label={`Contact via ${label}: ${value}`}
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-indigo-600" />
                </div>
                <div>
                  <div className="text-xs text-neutral-400 font-medium mb-0.5">{label}</div>
                  <div className="text-neutral-700 text-sm font-semibold group-hover:text-indigo-600 transition-colors">{value}</div>
                </div>
              </a>
            ))}
          </div>

          {/* Form */}
          <div
            className={`bg-white border border-neutral-200 rounded-2xl p-7 shadow-sm transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center gap-4 py-10 text-center">
                <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center">
                  <CheckCircle size={28} className="text-emerald-500" />
                </div>
                <div>
                  <h3 className="text-neutral-800 font-bold mb-1">Message sent!</h3>
                  <p className="text-neutral-500 text-sm">Thanks for reaching out. I'll get back to you soon.</p>
                </div>
                <button
                  onClick={() => { setStatus('idle'); setForm({ name: '', email: '', message: '' }); }}
                  className="text-sm text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold text-neutral-600 mb-1.5">Name</label>
                  <input
                    id="name" name="name" type="text" value={form.name} onChange={handleChange}
                    placeholder="Your name"
                    className={`${inputBase} ${errors.name ? 'border-red-400' : 'border-neutral-200'}`}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {errors.name && <p id="name-error" className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-neutral-600 mb-1.5">Email</label>
                  <input
                    id="email" name="email" type="email" value={form.email} onChange={handleChange}
                    placeholder="your@email.com"
                    className={`${inputBase} ${errors.email ? 'border-red-400' : 'border-neutral-200'}`}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && <p id="email-error" className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-neutral-600 mb-1.5">Message</label>
                  <textarea
                    id="message" name="message" value={form.message} onChange={handleChange}
                    rows={5} placeholder="What would you like to discuss?"
                    className={`${inputBase} resize-none ${errors.message ? 'border-red-400' : 'border-neutral-200'}`}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                  />
                  {errors.message && <p id="message-error" className="text-red-500 text-xs mt-1">{errors.message}</p>}
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
