import React from 'react';

const security = () => {
    return (
        <div className='mx-2 md:my-6 my-8 space-y-3 md:w-[80%] md:mx-auto'>
            <div className='mb-6'>
                <h1 className='text-center font-bold text-2xl'>Job  Sphere - Security & Privacy</h1>
                <p className='text-center my-2 text-xl'>Last Update: 14 October 2024</p>

                <p className='text-center mx-4 mb-4 md:w-2/3 md:mx-auto text-lg'>Welcome to Job Sphere. At Job Sphere, we prioritize both security and privacy. We use encryption, secure authentication, and access control to protect your data. We only collect necessary information, giving you full control over your personal details.</p>
            </div>

            <h2 className='text-2xl font-semibold underline'>Security Features:</h2>
            {/* 1. Authentication */}
            <div className='border-t border-sky-500 rounded-xl hover:border-2 hover:shadow-md p-2 hover:bg-sky-50'>
                <h4 className='font-bold text-xl'>1. Authentication</h4>
                <p>Implement secure authentication using OAuth 2.0 or JWT (JSON Web Token) to validate user identities.</p>
                <p>Require strong passwords and consider adding two-factor authentication (2FA) for additional security.</p>
                <p>Use secure libraries like bcrypt to hash passwords before storing them in the database.</p>
            </div>

            {/* 2. Authorization */}
            <div className='border-t border-sky-500 rounded-xl hover:border-2 hover:shadow-md p-2 hover:bg-sky-50'>
                <h4 className='font-bold text-xl'>2. Authorization</h4>
                <p>Implement role-based access control (RBAC) to ensure that only authorized users (recruiters, job seekers, and admins) can access specific features (e.g., only recruiters can post jobs).</p>
                <p>Protect sensitive actions like posting jobs or accessing profiles by verifying user roles before granting permissions.</p>
            </div>

            {/* 3. Data Encryption */}
            <div className='border-t border-sky-500 rounded-xl hover:border-2 hover:shadow-md p-2 hover:bg-sky-50'>
                <h4 className='font-bold text-xl'>3. Data Encryption</h4>
                <p>Use SSL/TLS encryption to secure data transmission between users and the server.
                Encrypt sensitive user information like passwords, payment details, and resumes in the database using AES encryption.</p>
            </div>

            {/* 4. Cross-Site Scripting */}
            <div className='border-t border-sky-500 rounded-xl hover:border-2 hover:shadow-md p-2 hover:bg-sky-50'>
                <h4 className='font-bold text-xl'>4. Cross-Site Scripting</h4>
                <p>Sanitize user inputs on job listings, profiles, and blog content to prevent malicious code injection.</p>
                <p>Use libraries like DOMPurify to clean HTML inputs.</p>
            </div>

            {/* 5. Rate Limiting */}
            <div className='border-t border-sky-500 rounded-xl hover:border-2 hover:shadow-md p-2 hover:bg-sky-50'>
                <h4 className='font-bold text-xl'>5. Rate Limiting</h4>
                <p>Apply rate limiting to prevent brute-force attacks on the login and signup pages.
                Set API rate limits for critical actions like job applications and recruiter posts.</p>
            </div>

            <h2 className='text-2xl font-semibold underline pt-10'>Privacy Policy:</h2>
            {/* 1. Data Retention Policy */}
            <div className='border-t border-sky-500 rounded-xl hover:border-2 hover:shadow-md p-2 hover:bg-sky-50'>
                <h4 className='font-bold text-xl'>1. Data Retention Policy</h4>
                <p>Implement a clear policy for how long user data will be stored, and delete data that is no longer necessary, especially inactive job seeker or recruiter accounts.</p>
            </div>

            {/* 2. Anonymization */}
            <div className='border-t border-sky-500 rounded-xl hover:border-2 hover:shadow-md p-2 hover:bg-sky-50'>
                <h4 className='font-bold text-xl'>2. Anonymization</h4>
                <p>Where possible, anonymize personal information in public sections of the website (e.g., only showing partial names or emails of job seekers/recruiters in public profiles).</p>
            </div>

            {/* 3. Consent for Email Notifications */}
            <div className='border-t border-sky-500 rounded-xl hover:border-2 hover:shadow-md p-2 hover:bg-sky-50'>
                <h4 className='font-bold text-xl'>3. Consent for Email Notifications</h4>
                <p>Ensure users provide consent before sending email notifications or job alerts. Provide an option to opt-out of emails.</p>
            </div>

            {/* 4.Secure File Storage */}
            <div className='border-t border-sky-500 rounded-xl hover:border-2 hover:shadow-md p-2 hover:bg-sky-50'>
                <h4 className='font-bold text-xl'>4.Secure File Storage</h4>
                <p>Use secure cloud storage for resumes and other files uploaded by users. Ensure that files are only accessible to authorized users (e.g., only recruiters with premium access can view resumes).</p>
            </div>

            {/* 
     
4.Secure File Storage

Use secure cloud storage for resumes and other files uploaded by users. Ensure that files are only accessible to authorized users (e.g., only recruiters with premium access can view resumes).

            */}

        </div>
    );
};

export default security;