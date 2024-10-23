import React from 'react';

const Terms = () => {
    return (
        <div className='mx-2 md:my-6 my-8 md:w-[80%] md:mx-auto'>
            <div className='mb-6'>
                <h1 className='text-center font-bold text-3xl'>JobSphere - Terms and Conditions</h1>
                <p className='text-center my-2 text-lg'>Last Update: 10 October 2024</p>
                <p className='text-center mx-4 mb-4 md:w-2/3 md:mx-auto text-lg'>
                    Welcome to JobSphere. These Terms and Conditions (Terms) govern your use of the JobSphere website and services (the Platform). By accessing or using JobSphere, you agree to these Terms. If you do not agree to the Terms, please do not use the Platform.
                </p>
            </div>

            <section className='space-y-6'>
                {/* 1. Definitions */}
                <div>
                    <h2 className='font-semibold text-2xl mb-2'>1. Definitions</h2>
                    <p><strong>Platform</strong> refers to the JobSphere website and its services.</p>
                    <p><strong>User</strong> refers to any person using the Platform, including Job Seekers and Recruiters.</p>
                    <p><strong>Job Seeker</strong> refers to a person looking for employment using the Platform.</p>
                    <p><strong>Recruiter</strong> refers to a person or entity looking to hire employees through the Platform.</p>
                    <p><strong>Content</strong> refers to any text, images, job postings, resumes, or other materials submitted by Users.</p>
                </div>

                {/* 2. Acceptance of Terms */}
                <div>
                    <h2 className='font-semibold text-2xl mb-2'>2. Acceptance of Terms</h2>
                    <p>By creating an account or using JobSphere, you agree to be bound by these Terms and any applicable laws and regulations. JobSphere reserves the right to modify these Terms at any time. Any changes will be posted on the Platform, and continued use after such changes implies your consent.</p>
                </div>

                {/* 3. Eligibility */}
                <div>
                    <h2 className='font-semibold text-2xl mb-2'>3. Eligibility</h2>
                    <p>You must be at least 16 years of age to use the Platform. By using JobSphere, you represent and warrant that you meet the eligibility requirements.</p>
                </div>

                {/* 4. Account Responsibilities */}
                <div>
                    <h2 className='font-semibold text-2xl mb-2'>4. Account Responsibilities</h2>
                    <p>Users must create an account to access certain features. You are responsible for maintaining the confidentiality of your login information and are liable for any activities that occur under your account. Users agree to provide accurate, current, and complete information during registration and to update such information as necessary.</p>
                </div>

                {/* 5. User Responsibilities */}
                <div>
                    <h2 className='font-semibold text-2xl mb-2'>5. User Responsibilities</h2>
                    <p>Job Seekers must ensure that their resumes and profiles are accurate and up-to-date. Misrepresentation of qualifications or experience is strictly prohibited.</p>
                    <p>Recruiters must ensure that job postings are truthful and comply with all applicable employment laws, including non-discriminatory hiring practices.</p>
                    <p>Users must not post inappropriate, offensive, or illegal content, and must not use the Platform for any unlawful purposes.</p>
                </div>

                {/* 6. Prohibited Activities */}
<div>
    <h2 className='font-semibold text-2xl mb-2'>6. Prohibited Activities</h2>
    <p>Users agree not to:</p>
    <ul className='list-disc pl-6 space-y-2'>
        <li>Use the Platform for any fraudulent activities or purposes.</li>
        <li>Post any content that is false, misleading, or harmful.</li>
        <li>Engage in spamming, phishing, or scraping of data from the Platform.</li>
        <li>Attempt to access unauthorized parts of the Platform or breach its security measures.</li>
    </ul>
</div>


                {/* 7. JobSphere's Role */}
                <div>
                    <h2 className='font-semibold text-2xl mb-2'>7. JobSphere&apos;s Role</h2>
                    <p>JobSphere is a platform for connecting Job Seekers with Employers. We are not an employment agency, and we do not guarantee that Job Seekers will be hired or that Employers will find suitable candidates.</p>
                </div>

                {/* 8. Privacy Policy */}
                <div>
                    <h2 className='font-semibold text-2xl mb-2'>8. Privacy Policy</h2>
                    <p>By using JobSphere, you agree to our Privacy Policy, which describes how we collect, use, and store your personal data. We comply with applicable data protection regulations, including the General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA).</p>
                </div>

                {/* 9. User-Generated Content */}
                <div>
                    <h2 className='font-semibold text-2xl mb-2'>9. User-Generated Content</h2>
                    <p>Users retain ownership of any content they submit to the Platform, including resumes, job postings, and other materials. By submitting content, you grant JobSphere a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and distribute the content on the Platform.</p>
                </div>

                {/* 10. Intellectual Property */}
                <div>
                    <h2 className='font-semibold text-2xl mb-2'>10. Intellectual Property</h2>
                    <p>All materials on the Platform, including text, graphics, logos, and software, are the property of JobSphere and protected by copyright, trademark, and other intellectual property laws. Users are not permitted to copy, distribute, or modify any part of the Platform without written permission.</p>
                </div>
            </section>
        </div>
    );
};

export default Terms;
