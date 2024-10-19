import React from 'react';

const Terms = () => {
    return (
        <div className='mx-2 md:my-6 my-8 space-y-3 md:w-[80%] md:mx-auto'>
            <div className='mb-6'>
                <h1 className='text-center font-bold text-2xl'>Job Sphere - Terms and Conditions</h1>
                <p className='text-center my-2 text-xl'>Last Update: 10 October 2024</p>

                <p className='text-center mx-4 mb-4 md:w-2/3 md:mx-auto text-lg'>
                    Welcome to Job Sphere. These Terms and Conditions (Terms) govern your use of the Job Sphere website and services (the Platform). By accessing or using Job Sphere, you agree to these Terms. If you do not agree to the Terms, please do not use the Platform.
                </p>
            </div>

            {/* 1. Definitions */}
            <div className='border-t border-sky-500 rounded-xl hover:border-2 hover:shadow-md p-2 hover:bg-sky-50'>
                <h4 className='font-bold text-xl'>1. Definitions</h4>
                <p><span className='font-semibold text-lg'>Platform</span> refers to the Job Sphere website and its services.</p>
                <p><span className='font-semibold text-lg'>User</span> refers to any person using the Platform, including Job Seekers and Recruiters.</p>
                <p><span className='font-semibold text-lg'>Job Seeker</span> refers to a person looking for employment using the Platform.</p>
                <p><span className='font-semibold text-lg'>Recruiter</span> refers to a person or entity looking to hire employees through the Platform.</p>
                <p><span className='font-semibold text-lg'>Content</span> refers to any text, images, job postings, resumes, or other materials submitted by Users.</p>
            </div>

            {/* 2. Acceptance of Terms */}
            <div className='border-t border-sky-500 rounded-xl hover:border-2 hover:shadow-md p-2 hover:bg-sky-50'>
                <h4 className='font-bold text-xl'>2. Acceptance of Terms</h4>
                <p>By creating an account or using the Job Sphere, you agree to be bound by these Terms and any applicable laws and regulations. Job Sphere reserves the right to modify these Terms at any time. Any changes will be posted on the Platform, and continued use after such changes implies your consent.</p>
            </div>

            {/* 3. Eligibility */}
            <div className='border-t border-sky-500 rounded-xl hover:border-2 hover:shadow-md p-2 hover:bg-sky-50'>
                <h4 className='font-bold text-xl'>3. Eligibility</h4>
                <p>You must be at least 16 years of age to use the Platform. By using Job Sphere, you represent and warrant that you meet the eligibility requirements.</p>
            </div>

            {/* 4. Account Responsibilities */}
            <div className='border-t border-sky-500 rounded-xl hover:border-2 hover:shadow-md p-2 hover:bg-sky-50'>
                <h4 className='font-bold text-xl'>4. Account Responsibilities</h4>
                <p>Users must create an account to access certain features. You are responsible for maintaining the confidentiality of your login information and are liable for any activities that occur under your account. Users agree to provide accurate, current, and complete information during registration and to update such information as necessary.</p>
            </div>

            {/* 5. User Responsibilities */}
            <div className='border-t border-sky-500 rounded-xl hover:border-2 hover:shadow-md p-2 hover:bg-sky-50'>
                <h4 className='font-bold text-xl'>5. User Responsibilities</h4>
                <p>Job Seekers must ensure that their resumes and profiles are accurate and up-to-date. Misrepresentation of qualifications or experience is strictly prohibited.</p>
                <p>Recruiters must ensure that job postings are truthful and comply with all applicable employment laws, including non-discriminatory hiring practices.</p>
                <p>Users must not post any inappropriate, offensive, or illegal content, and must not use the Platform for any unlawful purposes.</p>
            </div>

            {/* 6. Prohibited Activities */}
            <div className='border-t border-sky-500 rounded-xl hover:border-2 hover:shadow-md p-2 hover:bg-sky-50'>
                <p className='font-bold text-xl'>6. You agree not to:</p>
                <p>* Use the Platform for any fraudulent activities or purposes.</p>
                <p>* Post any content that is false, misleading, or harmful.</p>
                <p>* Engage in spamming, phishing, or scraping of data from the Platform.</p>
                <p>* Attempt to access unauthorized parts of the Platform or breach its security measures.</p>
            </div>
            
            {/* 7. Job Sphere’s Role */}
            <div className='border-t border-sky-500 rounded-xl hover:border-2 hover:shadow-md p-2 hover:bg-sky-50'>
                <h4 className='font-bold text-xl'>7. Job Sphere&apos;s Role</h4>
                <p>Job Sphere is a platform for connecting Job Seekers with Employers. We are not an employment agency, and we do not guarantee that Job Seekers will be hired or that Employers will find suitable candidates.</p>
            </div>
            
            {/* 8. Privacy Policy */}
            <div className='border-t border-sky-500 rounded-xl hover:border-2 hover:shadow-md p-2 hover:bg-sky-50'>
                <h4 className='font-bold text-xl'>8. Privacy Policy</h4>
                <p>By using Job Sphere, you agree to our Privacy Policy, which describes how we collect, use, and store your personal data. We comply with applicable data protection regulations, including the General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA).</p>
            </div>
            
            {/* 9. User-Generated Content */}
            <div className='border-t border-sky-500 rounded-xl hover:border-2 hover:shadow-md p-2 hover:bg-sky-50'>
                <h4 className='font-bold text-xl'>9. User-Generated Content</h4>
                <p>Users retain ownership of any content they submit to the Platform, including resumes, job postings, and other materials. By submitting content, you grant Job Sphere a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and distribute the content on the Platform.</p>
            </div>
            
            {/* 10. Intellectual Property */}
            <div className='border-t border-sky-500 rounded-xl hover:border-2 hover:shadow-md p-2 hover:bg-sky-50'>
                <h4 className='font-bold text-xl'>10. Intellectual Property</h4>
                <p>All materials on the Platform, including text, graphics, logos, and software, are the property of Job Sphere and protected by copyright, trademark, and other intellectual property laws. Users are not permitted to copy, distribute, or modify any part of the Platform without written permission.</p>
            </div>
            
        </div>
    );
};

export default Terms;
