import React from 'react';

// Legal text is kept in English only. `boldLabels` bolds the "Label:" before the
// first colon of each list item.
const INTRO = [
  'This Privacy Policy and Personal Data Protection Notice ("Notice") is issued by Stanton Academy SDN. BHD. (hereinafter referred to as "the Language School") to all our students, prospective students, parents, guardians, website visitors, and users of our services.',
  'The Language School explains how we collect, use, disclose, and protect your personal data in accordance with the Malaysian Personal Data Protection Act 2010 (PDPA).',
];

const SECTIONS = [
  {
    title: '1. Consent',
    paragraphs: [
      'By providing your personal data to us, enrolling in our language courses, or using our website, you consent to the collection, processing, and storage of your personal data as described in this Notice by the Language School. If you are under the age of 18, your parent or legal guardian must consent to the processing of your personal data on your behalf.',
    ],
  },
  {
    title: '2. Description of Personal Data Collected',
    paragraphs: ['The Language School may collect and process various types of personal data, including but not limited to:'],
    boldLabels: true,
    list: [
      'Contact Information: Name, email address, phone number, residential address.',
      'Identification Details: NRIC (Identification Card) number, passport details, nationality, visa status, date of birth, gender.',
      'Academic & Enrollment Data: Language proficiency levels, attendance records, test results, course preferences.',
      'Financial Details: Bank account numbers, credit/debit card information, payment histories for tuition fees.',
      'Media & Digital Data: Images, photos, or video recordings taken during school activities/classes (for promotional purposes), IP address, and website cookies.',
    ],
  },
  {
    title: '3. Purpose of Collection and Processing',
    paragraphs: ['Your personal data is collected and processed by the Language School for the following purposes:'],
    list: [
      'To process your registration, enrollment, and course applications.',
      'To manage and administer your language classes, schedules, examinations, and certificates.',
      'To communicate school announcements, schedule changes, and academic updates.',
      'To process payments, issue invoices, and manage financial accounts.',
      'To facilitate student visa applications, renewals, and legal stay processing for international students.',
      'To comply with statutory, legal, or regulatory requirements imposed by Malaysian authorities.',
      "To market and promote the Language School's events, courses, and activities (subject to your right to opt-out).",
    ],
  },
  {
    title: '4. Special Provisions for International Students',
    paragraphs: [
      'As the Language School registers international students, we are legally required to process and share your personal data (including passport details, academic transcripts, medical reports, and financial statements) with relevant Malaysian authorities for immigration compliance. This includes, but is not limited to, the Ministry of Higher Education (MOHE), Education Malaysia Global Services (EMGS), and the Immigration Department of Malaysia.',
    ],
  },
  {
    title: '5. Disclosure of Personal Data',
    paragraphs: [
      'The Language School keeps your personal data confidential. However, to provide our services and meet legal obligations, we may disclose your data to the following third parties:',
    ],
    list: [
      'Regulatory bodies, government ministries, or law enforcement agencies in Malaysia (such as MOHE, EMGS, and Immigration).',
      'External service providers who assist us with IT support, website hosting, payment processing, or accounting.',
      'Parents or legal guardians (for students under 18 years of age).',
      'Authorized agents or educational partners directly involved in your learning program.',
    ],
  },
  {
    title: '6. Data Security and Retention',
    paragraphs: [
      'The Language School implements strict technical and organizational security measures to protect your personal data against loss, misuse, unauthorized access, alteration, or disclosure. Your data will only be retained for as long as necessary to fulfill the purposes outlined in this Notice or to meet legal and accounting requirements.',
    ],
  },
  {
    title: '7. Rights of Access and Correction',
    paragraphs: [
      'Under the PDPA 2010, you have the right to request access to and correction of your personal data held by the Language School. You may also withdraw your consent to our processing of your data at any time (though this may affect our ability to continue providing educational services to you).',
      "If you wish to access, correct your data, or opt-out of marketing communications, please contact the Language School's Data Protection representative:",
    ],
    boldLabels: true,
    list: [
      'Contact Title: School Administration / Data Protection Officer',
      'Email Address: info@stanton-academy.com',
      'Phone Number: +60 1118648860',
      'Postal Address: No 112 & 114, 5th Floor, Wisma Hainan, Jln Pudu, Bukit Bintang, 55100 Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur, Malaysia.',
    ],
  },
  {
    title: '8. Changes to this Notice',
    paragraphs: [
      'The Language School reserves the right to modify or update this Privacy Notice at any time. Any changes will be published directly on our website, and your continued relationship with the Language School implies acceptance of the updated Notice.',
    ],
  },
];

function ListItem({ text, boldLabel }) {
  const i = text.indexOf(':');
  if (!boldLabel || i === -1) return <li>{text}</li>;
  return (
    <li>
      <strong>{text.slice(0, i + 1)}</strong>
      {text.slice(i + 1)}
    </li>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <main className="privacy-page">
      <style>{`
        .privacy-page { background: #f9fafb; padding: 140px 20px 80px; }
        .privacy-card { max-width: 860px; margin: 0 auto; background: #ffffff; padding: 50px 48px; border-radius: 24px; box-shadow: 0 20px 40px rgba(0,0,0,0.06); border: 1px solid #f3f4f6; }
        .privacy-card h1 { font-size: clamp(1.8rem, 4vw, 2.6rem); font-weight: 800; line-height: 1.2; color: #006B3F; margin: 0 0 8px; text-transform: uppercase; }
        .privacy-card .privacy-subtitle { font-size: 1.05rem; font-weight: 700; color: #FFC72C; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 28px; }
        .privacy-card h2 { font-size: 1.25rem; font-weight: 800; color: #111; margin: 32px 0 12px; }
        .privacy-card p { line-height: 1.75; color: #4b5563; margin: 0 0 14px; }
        .privacy-card ul { margin: 0 0 14px; padding-left: 22px; color: #4b5563; line-height: 1.75; }
        .privacy-card li { margin-bottom: 6px; }
        .privacy-card li strong { color: #111; }
        @media (max-width: 600px) { .privacy-page { padding: 120px 16px 60px; } .privacy-card { padding: 30px 22px; border-radius: 16px; } }
      `}</style>

      <div className="privacy-card">
        <h1>Privacy Policy</h1>
        <p className="privacy-subtitle">(Personal Data Protection Notice)</p>

        {INTRO.map((text, i) => (
          <p key={i}>{text}</p>
        ))}

        {SECTIONS.map((section) => (
          <section key={section.title}>
            <h2>{section.title}</h2>
            {section.paragraphs.map((text, i) => (
              <p key={i}>{text}</p>
            ))}
            {section.list && (
              <ul>
                {section.list.map((text, i) => (
                  <ListItem key={i} text={text} boldLabel={section.boldLabels} />
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
    </main>
  );
}
