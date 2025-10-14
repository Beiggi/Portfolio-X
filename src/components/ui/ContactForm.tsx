import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import ShinyBorderButton from './ShinyBorderButton';

const ContactForm = () => {
  const { t } = useTranslation();
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');

  const schema = z.object({
    name: z.string().min(2, t('contact.form.errors.name')),
    email: z.string().email(t('contact.form.errors.email')),
    message: z.string().min(10, t('contact.form.errors.message')),
  });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setStatus('loading');
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setStatus('success');
      reset();
    } catch (error) {
      console.error('Failed to send message:', error);
      setStatus('error');
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <h2 className="mb-8 text-center text-4xl font-bold">
        {t('contact.title')}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-foreground/80"
          >
            {t('contact.form.name')}
          </label>
          <input
            {...register('name')}
            id="name"
            className="block w-full rounded-md border-secondary bg-secondary p-3 text-foreground shadow-sm focus:border-primary focus:ring-primary"
          />
          {errors.name && (
            <p className="mt-2 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-foreground/80"
          >
            {t('contact.form.email')}
          </label>
          <input
            {...register('email')}
            id="email"
            type="email"
            className="block w-full rounded-md border-secondary bg-secondary p-3 text-foreground shadow-sm focus:border-primary focus:ring-primary"
          />
          {errors.email && (
            <p className="mt-2 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="message"
            className="mb-2 block text-sm font-medium text-foreground/80"
          >
            {t('contact.form.message')}
          </label>
          <textarea
            {...register('message')}
            id="message"
            rows={4}
            className="block w-full rounded-md border-secondary bg-secondary p-3 text-foreground shadow-sm focus:border-primary focus:ring-primary"
          />
          {errors.message && (
            <p className="mt-2 text-sm text-red-500">
              {errors.message.message}
            </p>
          )}
        </div>
        <div className="text-center">
          <ShinyBorderButton
            type="submit"
            disabled={status === 'loading'}
            text={
              status === 'loading'
                ? t('contact.form.sending')
                : t('contact.form.submit')
            }
          />
        </div>
      </form>
      {status === 'success' && (
        <p className="mt-4 text-center text-green-500">
          {t('contact.form.success')}
        </p>
      )}
      {status === 'error' && (
        <p className="mt-4 text-center text-red-500">
          {t('contact.form.failure')}
        </p>
      )}
    </div>
  );
};

export default ContactForm;
