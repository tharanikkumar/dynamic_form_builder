import React from 'react';
import { useForm } from 'react-hook-form';
import { FormSection } from '../types/formTypes';
import { FieldRenderer } from './FieldRenderer';

interface SectionProps {
  section: FormSection;
  onNext: (data: Record<string, any>) => void;
  onPrev: () => void;
  onSubmit: (data: Record<string, any>) => void;
  isFirst: boolean;
  isLast: boolean;
}

const Section: React.FC<SectionProps> = ({ section, onNext, onPrev, onSubmit, isFirst, isLast }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSectionSubmit = (data: Record<string, any>) => {
    if (isLast) {
      onSubmit(data);
      alert("Form submitted successfully! Check console for data.");
    } else {
      onNext(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSectionSubmit)}>
      {section.fields.map((field) => (
        <FieldRenderer key={field.fieldId} field={field} register={register} errors={errors} />
      ))}
      <div>
        {!isFirst && <button type="button" onClick={onPrev}>Previous</button>}
        <button type="submit">{isLast ? 'Submit' : 'Next'}</button>
      </div>
    </form>
  );
};

export default Section;
