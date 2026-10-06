import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, Award } from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';
import { certifications } from '../../data/certifications';

export const Certifications: React.FC = () => {
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

  return (
    <section className="py-24 border-t border-[#111111]">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto px-6 transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <SectionHeader
          label="Certifications"
          title="Credentials"
          subtitle="Certifications and credentials earned along the way."
        />

        {certifications.length === 0 ? (
          <div className="border border-dashed border-[#2a2a2a] rounded-xl p-12 text-center">
            <Award size={28} className="text-gray-700 mx-auto mb-4" />
            <p className="text-gray-600 text-sm">Certifications coming soon.</p>
            <p className="text-gray-700 text-xs mt-1">
              Add entries to <code className="font-mono">src/data/certifications.ts</code> to populate this section.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {certifications.map((cert) => (
              <article
                key={cert.id}
                className="bg-[#111111] border border-[#1e1e1e] rounded-xl p-5 hover:border-[#2a2a2a] transition-colors"
              >
                {cert.imageUrl && (
                  <img
                    src={cert.imageUrl}
                    alt={`${cert.name} certificate`}
                    className="w-full h-28 object-cover rounded-md mb-4"
                    loading="lazy"
                  />
                )}
                <h3 className="text-gray-200 font-medium text-sm mb-1">{cert.name}</h3>
                <p className="text-gray-500 text-xs mb-1">{cert.issuer}</p>
                <p className="text-gray-600 text-xs mb-4">{cert.date}</p>
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                    aria-label={`View ${cert.name} credential`}
                  >
                    <ExternalLink size={12} />
                    View Credential
                  </a>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
