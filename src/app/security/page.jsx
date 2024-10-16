import React from 'react';

const security = () => {
    return (
        <div className='mx-2 md:my-6 my-8 space-y-3 md:w-[80%] md:mx-auto'>
            <div className='mb-6'>
                <h1 className='text-center font-bold text-2xl'>Job  Sphere - Security & Privacy</h1>
                <p className='text-center my-2 text-xl'>Last Update: 10 October 2024</p>

                <p className='text-center mx-4 mb-4 md:w-2/3 md:mx-auto text-lg'>Welcome to Job Sphere. These Terms of Service (Terms) govern your use of the Job Sphere website and services (the Platform). By accessing or using Job Sphere, you agree to these Terms. If you do not agree to the Terms, please do not use the Platform.</p>
            </div>

            <h2 className='text-2xl font-semibold underline'>Security Features:</h2>
            {/* 1. Definitions */}
            <div className='border-t border-sky-500 rounded-xl hover:border-2 hover:shadow-md p-2 hover:bg-sky-50'>
                <h4 className='font-bold text-xl'>1. Definitions</h4>
                <p><span className='font-semibold text-lg'>Platform</span> refers to the Job Sphere website and its services.</p>
                <p><span className='font-semibold text-lg'>User</span> refers to any person using the Platform, including Job Seekers and Recruiter.</p>
                <p><span className='font-semibold text-lg'>Job Seeker</span> refers to a person looking for employment using the Platform.</p>
                <p><span className='font-semibold text-lg'>Recruiter</span> refers to a person or entity looking to hire employees through the Platform.</p>
                <p><span className='font-semibold text-lg'>Content</span> refers to any text, images, job postings, resumes, or other materials submitted by Users.</p>
            </div>

            {/* 
            
Security Features:
1. Authentication:

Implement secure authentication using OAuth 2.0 or JWT (JSON Web Token) to validate user identities.
Require strong passwords and consider adding two-factor authentication (2FA) for additional security.
Use secure libraries like bcrypt to hash passwords before storing them in the database.

2. Authorization:

Implement role-based access control (RBAC) to ensure that only authorized users (recruiters, job seekers, and admins) can access specific features (e.g., only recruiters can post jobs).
Protect sensitive actions like posting jobs or accessing profiles by verifying user roles before granting permissions.

3. Data Encryption:

Use SSL/TLS encryption to secure data transmission between users and the server.
Encrypt sensitive user information like passwords, payment details, and resumes in the database using AES encryption.

4. Cross-Site Scripting (XSS) Prevention:

Sanitize user inputs on job listings, profiles, and blog content to prevent malicious code injection.
Use libraries like DOMPurify to clean HTML inputs.

5. Cross-Site Request Forgery (CSRF) Protection:

Implement CSRF tokens for all forms and critical actions (like applying to a job, posting jobs) to prevent unauthorized requests.

6. Rate Limiting:

Apply rate limiting to prevent brute-force attacks on the login and signup pages.
Set API rate limits for critical actions like job applications and recruiter posts.

7. Input Validation:

Validate and sanitize all inputs to prevent SQL injection attacks and data corruption.
Use libraries like Validator.js to validate email, name, and job-related inputs.

8. Secure Payment Gateway:

Use a trusted payment gateway provider (like Stripe or PayPal) for premium recruiter subscriptions.
Ensure that payment information is never stored on your servers, and all payments are processed securely.

9. Session Management:

Implement secure session cookies with attributes like HttpOnly, SameSite, and Secure.
Set appropriate session timeouts to prevent unauthorized access after inactivity.

10. Audit Logging:

Implement logging for critical actions like job postings, status changes, and user logins to detect and respond to suspicious activity.
Privacy Features:

11. Data Minimization:

Collect only the necessary data required for the job posting, job application, and user interactions. Avoid collecting unnecessary personal data.

12. User Data Control:

Allow users (job seekers and recruiters) to update or delete their profiles.
Ensure job seekers can control the visibility of their profiles and resumes (public, private, or visible to recruiters only).


Privacy Policy:



1. Data Retention Policy:

Implement a clear policy for how long user data will be stored, and delete data that is no longer necessary, especially inactive job seeker or recruiter accounts.

2. Anonymization:

Where possible, anonymize personal information in public sections of the website (e.g., only showing partial names or emails of job seekers/recruiters in public profiles).

3. Consent for Email Notifications:

Ensure users provide consent before sending email notifications or job alerts. Provide an option to opt-out of emails.

4.Secure File Storage:

Use secure cloud storage for resumes and other files uploaded by users. Ensure that files are only accessible to authorized users (e.g., only recruiters with premium access can view resumes).

            */}

        </div>
    );
};

export default security;