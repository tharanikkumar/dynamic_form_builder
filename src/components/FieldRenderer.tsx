import React from 'react';
import { FormField } from '../types/formTypes';
import { UseFormRegister, FieldErrors } from 'react-hook-form';

interface FieldRendererProps {
  field: FormField;
  register: UseFormRegister<any>;
  errors: FieldErrors;
}

export const FieldRenderer: React.FC<FieldRendererProps> = ({ field, register, errors }) => {
  const validationRules: Record<string, any> = {};
  if (field.required) {
    validationRules.required = field.validation?.message || 'This field is required';
  }
  if (field.minLength) {
    validationRules.minLength = {
      value: field.minLength,
      message: field.validation?.message || `Minimum ${field.minLength} characters required`,
    };
  }
  if (field.maxLength) {
    validationRules.maxLength = {
      value: field.maxLength,
      message: field.validation?.message || `Maximum ${field.maxLength} characters allowed`,
    };
  }

  return (
    <div>
      <label htmlFor={field.fieldId}>{field.label}</label>
      {(() => {
        switch (field.type) {
          case 'text':
          case 'email':
          case 'tel':
          case 'date':
            return (
              <input
                id={field.fieldId}
                type={field.type}
                placeholder={field.placeholder}
                {...register(field.fieldId, validationRules)}
              />
            );
          case 'textarea':
            return (
              <textarea
                id={field.fieldId}
                placeholder={field.placeholder}
                {...register(field.fieldId, validationRules)}
              />
            );
          case 'dropdown':
            return (
              <select id={field.fieldId} {...register(field.fieldId, validationRules)}>
                <option value="">Select an option</option>
                {field.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            );
          case 'radio':
            return (
              <>
                {field.options?.map((option) => (
                  <label key={option.value}>
                    <input
                      type="radio"
                      value={option.value}
                      {...register(field.fieldId, validationRules)}
                    />
                    {option.label}
                  </label>
                ))}
              </>
            );
          case 'checkbox':
            return (
              <>
                {field.options?.map((option) => (
                  <label key={option.value}>
                    <input
                      type="checkbox"
                      value={option.value}
                      {...register(field.fieldId)}
                    />
                    {option.label}
                  </label>
                ))}
              </>
            );
          default:
            return <p>Unsupported field type: {field.type}</p>;
        }
      })()}
      {errors[field.fieldId] && (
        <p style={{ color: 'red' }}>{(errors[field.fieldId] as any).message}</p>
      )}
    </div>
  );
};
