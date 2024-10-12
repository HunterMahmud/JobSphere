import React from 'react';

const AddReview = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
      });
    
      const [isSubmitting, setIsSubmitting] = useState(false);
    
      // Handle form input changes
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };
    
      // Handle form submission
      const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
    
        // Simulate form submission process
        setTimeout(() => {
          alert("Form submitted successfully!");
          setIsSubmitting(false);
          // Clear the form fields after submission
          setFormData({
            name: '',
            email: '',
            message: ''
          });
        }, 1000);
      };

    return (
        <div>
            <h1>Post a Review</h1>
        </div>
    );
};

export default AddReview;