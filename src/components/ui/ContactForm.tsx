// /src/components/ui/ContactForm.tsx
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { postContactForm } from '@/lib/api';
import ShinyBorderButton from '@/components/ui/ShinyBorderButton';

const ContactForm = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');

  const schema = z.object({
    name: z.string().min(2, t('contact.errors.name.min')),
    email: z.string().email(t('contact.errors.email.invalid')),
    message: z.string().min(10, t('contact.errors.message.min')),
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'loading') return;
    setStatus('loading');
    setErrors({});

    const result = schema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: { [key: string]: string } = {};
      result.error.issues.forEach((issue) => {
        if (typeof issue.path[0] === 'string') {
          fieldErrors[issue.path[0]] = issue.message;
        }
      });
      setErrors(fieldErrors);
      setStatus('idle');
      return;
    }

    try {
      await postContactForm(result.data);
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="sr-only">
          {t('contact.name')}
        </label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder={t('contact.name')}
          value={formData.name}
          onChange={handleChange}
          className="w-full rounded border border-secondary bg-background p-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name}</p>
        )}
      </div>
      <div>
        <label htmlFor="email" className="sr-only">
          {t('contact.email')}
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder={t('contact.email')}
          value={formData.email}
          onChange={handleChange}
          className="w-full rounded border border-secondary bg-background p-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email}</p>
        )}
      </div>
      <div>
        <label htmlFor="message" className="sr-only">
          {t('contact.message')}
        </label>
        <textarea
          name="message"
          id="message"
          rows={4}
          placeholder={t('contact.message')}
          value={formData.message}
          onChange={handleChange}
          className="w-full rounded border border-secondary bg-background p-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        ></textarea>
        {errors.message && (
          <p className="mt-1 text-sm text-red-500">{errors.message}</p>
        )}
      </div>
      <div
        className={status === 'loading' ? 'cursor-not-allowed opacity-50' : ''}
      >
        <ShinyBorderButton
          type="submit"
          text={status === 'loading' ? t('contact.sending') : t('contact.send')}
        />
      </div>
      {status === 'success' && (
        <p className="text-green-500">{t('contact.success')}</p>
      )}
      {status === 'error' && (
        <p className="text-red-500">{t('contact.error')}</p>
      )}
    </form>
  );
};

export default ContactForm;
