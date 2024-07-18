import React from 'react';
import { Link } from 'react-router-dom';

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white p-8">
      <div className="bg-white text-gray-900 p-8 rounded-lg shadow-lg max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Terms and Conditions</h1>
        <p className="mb-4">
          Welcome to EdgeScripts. These terms and conditions outline the rules and regulations for the use of our website.
        </p>
        <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
        <p className="mb-4">
          By accessing this website, we assume you accept these terms and conditions. Do not continue to use EdgeScripts if you do not agree to take all of the terms and conditions stated on this page.
        </p>
        <h2 className="text-2xl font-bold mb-4">2. Intellectual Property Rights</h2>
        <p className="mb-4">
          Other than the content you own, under these Terms, EdgeScripts and/or its licensors own all the intellectual property rights and materials contained in this Website. You are granted a limited license only for purposes of viewing the material contained on this Website.
        </p>
        <h2 className="text-2xl font-bold mb-4">3. Restrictions</h2>
        <ul className="list-disc list-inside mb-4">
          <li>Publishing any Website material in any other media.</li>
          <li>Selling, sublicensing, and/or otherwise commercializing any Website material.</li>
          <li>Publicly performing and/or showing any Website material.</li>
          <li>Using this Website in any way that is or may be damaging to this Website.</li>
          <li>Using this Website in any way that impacts user access to this Website.</li>
          <li>Using this Website contrary to applicable laws and regulations, or in any way may cause harm to the Website, or to any person or business entity.</li>
          <li>Engaging in any data mining, data harvesting, data extracting or any other similar activity in relation to this Website.</li>
          <li>Using this Website to engage in any advertising or marketing.</li>
        </ul>
        <h2 className="text-2xl font-bold mb-4">4. Your Content</h2>
        <p className="mb-4">
          In these Website Standard Terms and Conditions, "Your Content" shall mean any audio, video text, images, or other material you choose to display on this Website. By displaying Your Content, you grant EdgeScripts a non-exclusive, worldwide irrevocable, sub-licensable license to use, reproduce, adapt, publish, translate, and distribute it in any and all media.
        </p>
        <h2 className="text-2xl font-bold mb-4">5. No warranties</h2>
        <p className="mb-4">
          This Website is provided "as is," with all faults, and EdgeScripts express no representations or warranties, of any kind related to this Website or the materials contained on this Website.
        </p>
        <h2 className="text-2xl font-bold mb-4">6. Limitation of liability</h2>
        <p className="mb-4">
          In no event shall EdgeScripts, nor any of its officers, directors, and employees, be held liable for anything arising out of or in any way connected with your use of this Website whether such liability is under contract. EdgeScripts, including its officers, directors, and employees shall not be held liable for any indirect, consequential, or special liability arising out of or in any way related to your use of this Website.
        </p>
        <h2 className="text-2xl font-bold mb-4">7. Indemnification</h2>
        <p className="mb-4">
          You hereby indemnify to the fullest extent EdgeScripts from and against any and/or all liabilities, costs, demands, causes of action, damages, and expenses arising in any way related to your breach of any of the provisions of these Terms.
        </p>
        <h2 className="text-2xl font-bold mb-4">8. Severability</h2>
        <p className="mb-4">
          If any provision of these Terms is found to be invalid under any applicable law, such provisions shall be deleted without affecting the remaining provisions herein.
        </p>
        <h2 className="text-2xl font-bold mb-4">9. Variation of Terms</h2>
        <p className="mb-4">
          EdgeScripts is permitted to revise these Terms at any time as it sees fit, and by using this Website you are expected to review these Terms on a regular basis.
        </p>
        <h2 className="text-2xl font-bold mb-4">10. Assignment</h2>
        <p className="mb-4">
          The EdgeScripts is allowed to assign, transfer, and subcontract its rights and/or obligations under these Terms without any notification. However, you are not allowed to assign, transfer, or subcontract any of your rights and/or obligations under these Terms.
        </p>
        <h2 className="text-2xl font-bold mb-4">11. Entire Agreement</h2>
        <p className="mb-4">
          These Terms constitute the entire agreement between EdgeScripts and you in relation to your use of this Website, and supersede all prior agreements and understandings.
        </p>
        <h2 className="text-2xl font-bold mb-4">12. Governing Law & Jurisdiction</h2>
        <p className="mb-4">
          These Terms will be governed by and interpreted in accordance with the laws of the State of [State], and you submit to the non-exclusive jurisdiction of the state and federal courts located in [State] for the resolution of any disputes.
        </p>
        <Link to="/" className="text-blue-600 font-semibold">Go back to Home</Link>
      </div>
    </div>
  );
};

export default TermsAndConditions;
