import React from "react";

export const metadata = {
  title: "Security",
  description: "Learn about Job Sphere's security and privacy policies, including data encryption, authentication, and user privacy controls. We prioritize your safety with robust measures.",
  keywords: [
    "Job Sphere",
    "security",
    "privacy",
    "data protection",
    "encryption",
    "authentication",
    "user privacy",
    "data retention",
    "anonymization",
    "OAuth",
    "JWT"
  ],
  openGraph: {
    title: {
      absolute: "Security & Privacy - Job Sphere"
    },
    description: "Understand Job Sphere's commitment to security and privacy with industry-standard encryption, role-based access control, and data retention policies.",
    url: `${process.env.NEXT_PUBLIC_SITE_ADDRESS}/security`,
    type: "website"
  }
};

const Security = () => {
  return (
    <div className="mx-2 md:my-6 my-8 space-y-3 md:w-[80%] md:mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-center font-bold text-2xl">
          JobSphere - Security & Privacy
        </h1>
        <p className="text-center my-2 text-xl">Last Update: 14 October 2024</p>
        <p className="text-center mx-4 mb-4 md:w-2/3 md:mx-auto text-lg">
          At JobSphere, we prioritize both security and privacy. We implement
          industry-standard encryption, secure authentication, and access
          control to safeguard your data. We only collect necessary information
          and give you control over your personal details.
        </p>
      </div>

      {/* Security Overview */}
      <h2 className="text-2xl font-semibold mb-4">Security Overview</h2>
      <p className="text-lg">
        Our platform is built with robust security measures to protect your data
        and ensure privacy. Below is an overview of key features we use to
        maintain the highest levels of security.
      </p>

      {/* Security Features */}
      <h2 className="text-2xl font-semibold underline pt-6">
        Security Features:
      </h2>

      {/* Authentication */}
      <section className="space-y-2">
        <h3 className="text-xl font-bold">1. Authentication</h3>
        <p>
          We use OAuth 2.0 or JWT (JSON Web Token) to validate user identities.
          Strong password policies provide additional layers of security.
          Passwords are securely hashed using bcrypt before storage.
        </p>
      </section>

      {/* Authorization */}
      <section className="space-y-2">
        <h3 className="text-xl font-bold">2. Authorization</h3>
        <p>
          Role-based access control (RBAC) is implemented to ensure that only
          authorized users, such as recruiters, job seekers, and admins, have
          access to certain features. Sensitive actions are verified with user
          roles to ensure security.
        </p>
      </section>

      {/* Data Encryption */}
      {/* <section className='space-y-2'>
                    <h3 className='text-xl font-bold'>3. Data Encryption</h3>
                    <p>
                        All data is transmitted securely using SSL/TLS encryption. Sensitive information, such as passwords and payment details, is encrypted with AES encryption for maximum protection.
                    </p>
                </section> */}

      {/* Cross-Site Scripting */}
      {/* <section className='space-y-2'>
                    <h3 className='text-xl font-bold'>4. Cross-Site Scripting (XSS) Protection</h3>
                    <p>
                        We sanitize user inputs and use libraries like DOMPurify to prevent malicious code injection and safeguard our users against XSS attacks.
                    </p>
                </section> */}

      {/* Rate Limiting */}
      {/* <section className='space-y-2'>
                    <h3 className='text-xl font-bold'>5. Rate Limiting</h3>
                    <p>
                        To protect against brute-force attacks, rate limiting is applied to login, sign-up, and key API actions such as job applications and posts.
                    </p>
                </section> */}

      {/* Privacy Policy */}
      <h2 className="text-2xl font-semibold underline pt-10">
        Privacy Policy:
      </h2>

      {/* Data Retention Policy */}
      <section className="space-y-2">
        <h3 className="text-xl font-bold">1. Data Retention Policy</h3>
        <p>
          We retain user data only for as long as necessary. Inactive accounts
          are periodically reviewed, and unnecessary data is deleted in
          compliance with our data retention policies.
        </p>
      </section>

      {/* Anonymization */}
      <section className="space-y-2">
        <h3 className="text-xl font-bold">2. Anonymization</h3>
        <p>
          Where possible, we anonymize personal information, such as showing
          partial names or contact details in public profiles, to protect your
          privacy.
        </p>
      </section>

      {/* Consent for Email Notifications */}
      {/* <section className='space-y-2'>
                    <h3 className='text-xl font-bold'>3. Consent for Email Notifications</h3>
                    <p>
                        Users must provide consent before receiving email notifications. Options to opt-out or customize email preferences are provided to ensure control over communications.
                    </p>
                </section> */}

      {/* Secure File Storage */}
      {/* <section className='space-y-2'>
                    <h3 className='text-xl font-bold'>4. Secure File Storage</h3>
                    <p>
                        Resumes and other files are stored securely using encrypted cloud storage, and access is limited to authorized users such as recruiters with premium access.
                    </p>
                </section> */}
    </div>
  );
};

export default Security;
