import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FormResponse, FormSection } from '../types/formTypes';
import Section from './Section';

interface DynamicFormProps {
  rollNumber: string;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ rollNumber }) => {
  const [formSections, setFormSections] = useState<FormSection[]>([]);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>({});

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await axios.get<FormResponse>(
          `https://dynamic-form-generator-9rl7.onrender.com/get-form?rollNumber=${rollNumber}`
        );
        setFormSections(response.data.form.sections);
      } catch (err) {
        console.error('Error fetching form:', err);
      }
    };

    fetchForm();
  }, [rollNumber]);

  const handleNext = (data: Record<string, any>) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setCurrentSectionIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    setCurrentSectionIndex((prev) => prev - 1);
  };

  const handleSubmit = (data: Record<string, any>) => {
    const finalData = { ...formData, ...data };
    console.log('Form Submission:', finalData);
  };

  if (formSections.length === 0) return <p>Loading form...</p>;

  return (
    <div>
      <h2>{formSections[currentSectionIndex].title}</h2>
      <p>{formSections[currentSectionIndex].description}</p>
      <Section
        section={formSections[currentSectionIndex]}
        onNext={handleNext}
        onPrev={handlePrev}
        onSubmit={handleSubmit}
        isFirst={currentSectionIndex === 0}
        isLast={currentSectionIndex === formSections.length - 1}
      />
    </div>
  );
};

export default DynamicForm;
