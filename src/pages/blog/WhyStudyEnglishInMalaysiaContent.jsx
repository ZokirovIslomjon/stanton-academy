import React from 'react';

// Dedicated rich content for the "Why Study English in Malaysia" blog post.
// The images here are bundled as static imports (same pattern as the Holiday
// Camp trip photos in HolidayCamp.jsx) because the generic blog_posts.body
// column is plain text with no image support, and there's currently no way
// to upload these to Supabase Storage from this environment. Because of that,
// this post's text/images live in code rather than the admin blog editor —
// the title/excerpt/publish toggle still come from the database as usual.
import img1 from '../../assets/Why Study English in Malaysia.jpg';
import img2 from '../../assets/Why Study English in Malaysia 2.png';
import img3 from '../../assets/Why Study English in Malaysia 3.png';
import img4 from '../../assets/Why Study English in Malaysia 4.png';
import img5 from '../../assets/Why Study English in Malaysia 5.png';
import img6 from '../../assets/Why Study English in Malaysia 6.png';
import img7 from '../../assets/Why Study English in Malaysia 7.png';
import img8 from '../../assets/Why Study English in Malaysia 8.png';
import img9 from '../../assets/Why Study English in Malaysia 9.png';
import img13 from '../../assets/Why Study English in Malaysia 13.png';
import img14 from '../../assets/Why Study English in Malaysia 14.png';
import img15 from '../../assets/Why Study English in Malaysia 15.png';
import img16 from '../../assets/Why Study English in Malaysia 16.png';
import img17 from '../../assets/Why Study English in Malaysia 17.png';
import img18 from '../../assets/Why Study English in Malaysia 18.png';
import img19 from '../../assets/Why Study English in Malaysia 19.png';
import img20 from '../../assets/Why Study English in Malaysia 20.png';
import img21 from '../../assets/Why Study English in Malaysia 21.png';
import img22 from '../../assets/Why Study English in Malaysia 22.png';
import img23 from '../../assets/Why Study English in Malaysia 23.png';
import img24 from '../../assets/Why Study English in Malaysia 24.png';
import img25 from '../../assets/Why Study English in Malaysia 25.png';
import img26 from '../../assets/Why Study English in Malaysia 26.png';
import img27 from '../../assets/Why Study English in Malaysia 27.png';
import img28 from '../../assets/Why Study English in Malaysia 28.png';
import img29 from '../../assets/Why Study English in Malaysia 29.png';
import img30 from '../../assets/Why Study English in Malaysia 30.png';
import img31 from '../../assets/Why Study English in Malaysia 31.png';
import img32 from '../../assets/Why Study English in Malaysia 32.png';
import img33 from '../../assets/Why Study English in Malaysia 33.png';
import img34 from '../../assets/Why Study English in Malaysia 34.png';

const blocks = [
  { type: 'subtitle', text: 'A Guide for International Students' },
  { type: 'p', text: 'For students looking to improve their English while experiencing life in another country, choosing the right destination matters.' },
  { type: 'p', text: 'The best English-learning experience is not only about what happens inside the classroom. It is also about the environment outside it — the people you meet, the conversations you have, the places you explore and the confidence you develop along the way.' },
  { type: 'p', text: 'Malaysia offers a combination that makes it an increasingly attractive destination for international students: an English-friendly environment, a multicultural society, modern cities, a relatively accessible cost of living and a unique position in Asia.' },
  { type: 'p', text: 'For students from different parts of the world, Malaysia can offer much more than an English course. It can be an opportunity to experience another culture, make international friends and become more confident using English in real life.' },
  { type: 'images', items: [img1, img2, img3] },

  { type: 'h2', text: 'Learn English Beyond the Classroom' },
  { type: 'p', text: 'One of the greatest advantages of studying English in Malaysia is the opportunity to use English outside the classroom.' },
  { type: 'p', text: 'Students can practise English while ordering food, shopping, travelling, meeting new people, communicating with classmates or simply going about their daily lives.' },
  { type: 'p', text: 'Malaysia is a multilingual country, and English is widely used in education, business, tourism and everyday communication. For international students, this creates opportunities to encounter English naturally rather than using it only during lessons.' },
  { type: 'p', text: 'A conversation at a café, asking for directions, talking to a new friend or communicating with someone from another country can all become part of the learning experience.' },
  { type: 'p', text: 'The result is an environment where students can gradually move from studying English to actually using English.' },
  { type: 'images', items: [img4, img5, img6] },

  { type: 'h2', text: 'Experience a Multicultural International Environment' },
  { type: 'p', text: 'Malaysia is known for its multicultural society, where different languages, cultures and traditions exist side by side.' },
  { type: 'p', text: 'For international students, this provides an opportunity to meet people with backgrounds that may be very different from their own.' },
  { type: 'p', text: 'In an international classroom, English naturally becomes a common language. Students may find themselves discussing ideas, working on projects and making friends with people from different parts of Asia, the Middle East, Central Asia and other regions around the world.' },
  { type: 'p', text: 'This makes English more than a subject. It becomes a practical tool for connecting with people.' },
  { type: 'p', text: 'The friendships and cultural experiences students gain during their time in Malaysia can become an important part of their international experience.' },
  { type: 'images', items: [img7, img8, img9] },

  { type: 'h2', text: 'An International Experience at an Accessible Cost' },
  { type: 'p', text: 'Studying abroad can be a major investment. Tuition, accommodation, food, transportation and everyday expenses can make some traditional English-speaking destinations difficult for students and families.' },
  { type: 'p', text: 'Malaysia offers an alternative for students who want an international experience while keeping their overall cost of living relatively manageable.' },
  { type: 'p', text: 'Kuala Lumpur combines modern city life with a cost structure that can be more accessible than many major cities in Western countries.' },
  { type: 'p', text: 'Students can enjoy modern shopping centres, restaurants, cafés, public transportation, entertainment and international communities while experiencing life in a major Asian city.' },
  { type: 'p', text: 'For many students, this makes Malaysia an attractive balance between international experience, quality of life and affordability.' },
  { type: 'images', items: [img15, img16, img17] },

  { type: 'h2', text: 'A Comfortable Environment for Muslim Students' },
  { type: 'p', text: 'For Muslim students, Malaysia offers an additional advantage: a familiar and accessible Islamic environment combined with an international lifestyle.' },
  { type: 'p', text: 'Malaysia is a Muslim-majority country, and Halal food is widely available. Mosques and prayer facilities are also accessible in many parts of the country, including shopping centres, universities and other public places.' },
  { type: 'p', text: 'At the same time, Malaysia is highly multicultural and internationally connected. Students can experience a modern Asian city while continuing to observe their religious practices comfortably.' },
  { type: 'p', text: 'This combination can be particularly appealing to students who want to experience studying abroad without feeling that they have to leave behind important aspects of their everyday life and culture.' },
  { type: 'images', items: [img13, img14, img4] },

  { type: 'h2', text: 'A Welcoming Environment for Students from Different Backgrounds' },
  { type: 'p', text: "Malaysia's multicultural character makes it an interesting destination for students from many different regions." },
  { type: 'p', text: 'Students can experience an Asian environment that is modern and international while still being surrounded by a rich mixture of cultures, languages and traditions.' },
  { type: 'p', text: 'For students coming from East Asia, Central Asia, the Middle East or elsewhere, this can provide an opportunity to experience life abroad while remaining relatively close to the wider Asian region.' },
  { type: 'p', text: 'For some students, Malaysia can also be a comfortable first step into international education — a place where they can become more independent, practise English every day and gradually build confidence living away from home.' },
  { type: 'images', items: [img18, img17, img19] },

  { type: 'h2', text: 'Build English Communication and Confidence' },
  { type: 'p', text: 'Learning English is not only about grammar and vocabulary.' },
  { type: 'p', text: 'For many students, the real goal is to become comfortable speaking with other people.' },
  { type: 'p', text: 'An international environment gives students opportunities to practise:' },
  {
    type: 'ul',
    items: [
      'Everyday conversation',
      'Listening and speaking',
      'Group discussions',
      'Presentations',
      'Public speaking',
      'Social communication',
      'Interviews',
      'Academic communication',
      'Workplace communication',
    ],
  },
  { type: 'p', text: 'The more students use English in different situations, the more naturally they can develop their communication skills.' },
  { type: 'p', text: 'This is particularly valuable for students who understand English reasonably well but want to become more confident when speaking.' },
  { type: 'images', items: [img20, img21, img22] },

  { type: 'h2', text: 'Discover Kuala Lumpur' },
  { type: 'p', text: 'Kuala Lumpur offers an exciting setting for international students.' },
  { type: 'p', text: 'The city combines modern architecture, shopping, entertainment, restaurants, cafés and business districts with Malaysian culture and traditions.' },
  { type: 'p', text: 'Students can spend their free time exploring the city, trying different cuisines, visiting cultural attractions or simply meeting friends and enjoying everyday life in Kuala Lumpur.' },
  { type: 'p', text: 'The city also offers convenient public transportation, making it easier for students to explore different parts of the metropolitan area.' },
  { type: 'p', text: 'For someone studying English abroad, this creates an experience that extends well beyond the classroom.' },
  { type: 'images', items: [img23, img24, img25] },

  { type: 'h2', text: 'Explore Malaysia and Asia' },
  { type: 'p', text: 'Studying in Malaysia also gives students the opportunity to discover more of the region.' },
  { type: 'p', text: "Malaysia's location in Southeast Asia makes it possible to experience different destinations, cultures, food and landscapes during holidays and free time." },
  { type: 'p', text: "From Malaysia's beaches and islands to its mountains, historical sites and vibrant cities, there is plenty to explore within the country itself." },
  { type: 'p', text: 'For students who enjoy travelling, Malaysia can also provide a convenient base for discovering other parts of Southeast Asia.' },
  { type: 'p', text: 'International study therefore becomes more than simply attending classes. It becomes an opportunity to experience new places and develop greater independence along the way.' },
  { type: 'images', items: [img26, img27, img28] },

  { type: 'h2', text: 'Make Friends from Around the World' },
  { type: 'p', text: 'One of the most memorable parts of studying abroad can be the people you meet.' },
  { type: 'p', text: 'An international English course can bring together students with different languages, cultures and life experiences.' },
  { type: 'p', text: 'Students may arrive in Malaysia knowing nobody and leave with friends from several different countries.' },
  { type: 'p', text: 'Every conversation creates another opportunity to use English. Whether students are working together in class, exploring Kuala Lumpur after lessons or sharing a meal, English becomes a natural way to communicate.' },
  { type: 'p', text: 'These friendships can continue long after the course ends, creating an international network that reaches far beyond Malaysia.' },
  { type: 'images', items: [img29, img30, img31] },

  { type: 'h2', text: 'Prepare for University, Work and Global Communication' },
  { type: 'p', text: "English can play an important role in a student's future." },
  { type: 'p', text: 'For students planning to study internationally, strong English communication skills can support presentations, discussions, academic work and interaction with international classmates.' },
  { type: 'p', text: 'For future professionals, English can be useful for interviews, meetings, presentations, networking and communication with colleagues and clients.' },
  { type: 'p', text: 'For travellers, it can make everyday communication easier.' },
  { type: 'p', text: 'And for anyone who wants to participate more confidently in an increasingly international world, English provides a valuable way to connect with people beyond their own language and culture.' },
  { type: 'images', items: [img32, img33, img34] },

  { type: 'h2', text: 'More Than an English Course' },
  { type: 'p', text: 'Choosing to study English in Malaysia can be about much more than improving language skills.' },
  { type: 'p', text: 'It can mean waking up in a new country, hearing different languages around you, meeting people from different cultures and gradually becoming comfortable communicating in English every day.' },
  { type: 'p', text: 'It can mean discovering Malaysian food, exploring Kuala Lumpur, travelling around Asia, making international friends and gaining confidence in unfamiliar situations.' },
  { type: 'p', text: 'Most importantly, it can turn English from something you study into something you live.' },

  { type: 'h2', text: 'Why Malaysia?' },
  { type: 'p', text: 'For some students, the attraction is the English-speaking environment.' },
  { type: 'p', text: 'For others, it may be the multicultural lifestyle, affordability, modern cities, Muslim-friendly environment, international atmosphere or convenient location in Asia.' },
  { type: 'p', text: 'For many, it is the combination of all these things.' },
  { type: 'p', text: 'Malaysia offers international students an opportunity to learn English in a diverse and welcoming environment while experiencing a different culture and building connections with people from around the world.' },

  { type: 'h2', text: 'Learn English. Experience Malaysia. Connect with the World.' },
  { type: 'p', text: 'Your English journey does not have to end when the class finishes.' },
  { type: 'p', text: 'In Malaysia, every conversation, new friendship, city adventure and cultural experience can become part of the journey.' },
  { type: 'p', text: 'Study English in Malaysia — and make your time abroad an experience you will remember.' },
];

export default function WhyStudyEnglishInMalaysiaContent() {
  return (
    <div className="wsem-body">
      <style>{`
        .wsem-body .wsem-subtitle { font-size: 1.15rem; font-weight: 700; color: var(--primary-green, #006B3F); margin-bottom: 24px; }
        .wsem-body h2 { font-size: 1.5rem; font-weight: 800; color: var(--dark-text, #1a1a1a); margin: 44px 0 20px; line-height: 1.3; }
        .wsem-body ul { margin: 0 0 20px; padding-left: 22px; }
        .wsem-body li { margin-bottom: 8px; }
        .wsem-image-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin: 28px 0; }
        .wsem-image-row img { width: 100%; height: 220px; object-fit: cover; border-radius: var(--radius, 12px); box-shadow: var(--shadow, 0 10px 25px rgba(0,0,0,0.08)); }
        @media (max-width: 700px) {
          .wsem-image-row { grid-template-columns: 1fr; }
          .wsem-image-row img { height: 260px; }
        }
      `}</style>
      {blocks.map((block, i) => {
        if (block.type === 'subtitle') return <p key={i} className="wsem-subtitle">{block.text}</p>;
        if (block.type === 'h2') return <h2 key={i}>{block.text}</h2>;
        if (block.type === 'p') return <p key={i}>{block.text}</p>;
        if (block.type === 'ul') {
          return (
            <ul key={i}>
              {block.items.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          );
        }
        if (block.type === 'images') {
          return (
            <div key={i} className="wsem-image-row">
              {block.items.map((src, j) => (
                <img key={j} src={src} alt="" />
              ))}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}
