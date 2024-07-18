import React from 'react';
import { Link } from 'react-router-dom';

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white pt-16 p-8 flex items-center justify-center">
      <div className="bg-white text-gray-900 p-8 rounded-2xl shadow-2xl max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-6 border-b-4 border-gray-800 pb-2">Terms and Conditions</h1>
        <p className="mb-6 text-lg leading-relaxed">
          Welcome to EdgeScripts. These terms and conditions outline the rules and regulations for the use of our website.
        </p>
        
        <h2 className="text-2xl font-bold mb-4">I. General Provisions</h2>
        <p className="mb-6 text-lg leading-relaxed">
          These Terms and Conditions (hereinafter referred to as "T&C") set forth the general terms, conditions, and rules for the sale of products by EdgeScripts through its online store: https://edgescripts.com/, and specify the terms and conditions for the provision of free electronic services by EdgeScripts.
        </p>
        
        <h2 className="text-2xl font-bold mb-4">II. Definitions</h2>
        <p className="mb-6 text-lg leading-relaxed">
          <strong>EdgeScripts</strong> – company conducting commercial activities under the name of EdgeScripts.<br />
          <strong>Website</strong> – the EdgeScripts website https://edgescripts.com/ where the Customer can purchase products sold by EdgeScripts.<br />
          <strong>Business Days</strong> – weekdays from Monday to Friday, excluding official public holidays.<br />
          <strong>Delivery</strong> – the act of delivering the product specified in the order to the Customer by EdgeScripts.<br />
          <strong>Customer</strong> – any person who can receive electronic services or with whom a legally binding contract can be concluded in accordance with the T&C and other relevant legal provisions.<br />
          <strong>Customer Account</strong> – an individual panel for each Customer, created by EdgeScripts after the Customer registers and accepts the T&C.<br />
          <strong>Order</strong> – a purchase request for products made by a Customer through the Website.<br />
          <strong>Sales Contract</strong> – a distance sales contract concluded between the Customer and EdgeScripts under the terms specified in the T&C and relevant legal provisions.
        </p>
        
        <h2 className="text-2xl font-bold mb-4">III. Customer Account Registration</h2>
        <p className="mb-6 text-lg leading-relaxed">
          To create a Customer Account, free registration is mandatory.<br />
          The account can be registered by providing an email address, a password, being of legal age, and accepting the T&C.<br />
          Users can request the deletion of their account through customer service.
        </p>
        
        <h2 className="text-2xl font-bold mb-4">IV. Orders</h2>
        <p className="mb-6 text-lg leading-relaxed">
          The information contained on the Website does not constitute an offer by EdgeScripts but an invitation for Customers to make purchase offers.<br />
          Orders can be placed through the Website 24 hours a day, 7 days a week.<br />
          When placing an order, the Customer provides the necessary data for the purchase and sends the order form to EdgeScripts.<br />
          EdgeScripts will send the order receipt confirmation to the email provided by the Customer.
        </p>
        
        <h2 className="text-2xl font-bold mb-4">V. Payments</h2>
        <p className="mb-6 text-lg leading-relaxed">
          Product prices on the Website include taxes.<br />
          Payments are made through the Stripe payment gateway.<br />
          Returns are not accepted due to the digital and personalized nature of the products.
        </p>
        
        <h2 className="text-2xl font-bold mb-4">VI. Product Delivery</h2>
        <p className="mb-6 text-lg leading-relaxed">
          Digital products are delivered immediately and internationally via email.<br />
          EdgeScripts guarantees the delivery of products without technical or legal defects.
        </p>
        
        <h2 className="text-2xl font-bold mb-4">VII. Warranty and Liability</h2>
        <p className="mb-6 text-lg leading-relaxed">
          EdgeScripts guarantees an 80% improvement in the provided software.<br />
          Users can post reviews that will be reviewed before being published on the Website.
        </p>
        
        <h2 className="text-2xl font-bold mb-4">VIII. Complaints and Dispute Resolution</h2>
        <p className="mb-6 text-lg leading-relaxed">
          Complaints and disputes will be handled through customer service.<br />
          EdgeScripts will inform users about any changes to the T&C 15 days in advance via email.
        </p>
        
        <h2 className="text-2xl font-bold mb-4">IX. Personal Data Protection</h2>
        <p className="mb-6 text-lg leading-relaxed">
          EdgeScripts only collects users' email addresses and age.<br />
          Data is stored in a database and not shared with third parties.
        </p>
        
        <h2 className="text-2xl font-bold mb-4">X. Modifications to the Terms and Conditions</h2>
        <p className="mb-6 text-lg leading-relaxed">
          EdgeScripts reserves the right to modify the T&C. Users will be informed about changes 15 days in advance via email.
        </p>
        
        <h2 className="text-2xl font-bold mb-4">XI. Anti-Piracy</h2>
        <p className="mb-6 text-lg leading-relaxed">
          EdgeScripts adopts a zero-tolerance policy towards piracy and unauthorized use of its products.<br />
          The products and software provided by EdgeScripts are exclusively for personal and non-commercial use.<br />
          Any attempt to copy, distribute, or use the software in an unauthorized manner will be legally pursued.<br />
          Users who violate these terms will be responsible for all damages and losses caused to EdgeScripts.
        </p>
        
        <h2 className="text-2xl font-bold mb-4">XII. Website Use</h2>
        <p className="mb-6 text-lg leading-relaxed">
          The use of the Website is subject to these T&C and all applicable laws and regulations.<br />
          Users are prohibited from posting illegal, offensive, or infringing content.<br />
          EdgeScripts reserves the right to remove any content that violates these terms or is deemed inappropriate.
        </p>
        
        <h2 className="text-2xl font-bold mb-4">XIII. Final Provisions</h2>
        <p className="mb-6 text-lg leading-relaxed">
          EdgeScripts is responsible for the non-performance or improper performance of the Contract in accordance with the relevant legal provisions, but in the case of Sales Contracts concluded with Customers who are Entrepreneurs, EdgeScripts is only liable in case of intentional damage and within the limits of actual losses suffered by Customers who are Entrepreneurs.<br />
          The content of these T&C can be saved, printed, or downloaded at any time from the Website.<br />
          In case of a dispute arising from the concluded Sales Contract, the parties will try to resolve the matter amicably. The law applicable for the resolution of any dispute arising from the Sales Contract and the T&C is the law of the country where EdgeScripts is registered.
        </p>

        <h2 className="text-2xl font-bold mb-4">Introduction</h2>
        <p className="mb-6 text-lg leading-relaxed">
          By accessing this website, we assume you accept these terms and conditions. Do not continue to use EdgeScripts if you do not agree to take all of the terms and conditions stated on this page.
        </p>

        <h2 className="text-2xl font-bold mb-4">Restrictions</h2>
        <ul className="list-disc list-inside mb-6 text-lg leading-relaxed">
          <li>Publishing any Website material in any other media.</li>
          <li>Selling, sublicensing, and/or otherwise commercializing any Website material.</li>
          <li>Publicly performing and/or showing any Website material.</li>
          <li>Using this Website in any way that is or may be damaging to this Website.</li>
          <li>Using this Website in any way that impacts user access to this Website.</li>
          <li>Using this Website contrary to applicable laws and regulations, or in any way may cause harm to the Website, or to any person or business entity.</li>
          <li>Engaging in any data mining, data harvesting, data extracting or any other similar activity in relation to this Website.</li>
          <li>Using this Website to engage in any advertising or marketing.</li>
        </ul>

        <h2 className="text-2xl font-bold mb-4">No Warranties</h2>
        <p className="mb-6 text-lg leading-relaxed">
          This Website is provided "as is," with all faults, and EdgeScripts express no representations or warranties, of any kind related to this Website or the materials contained on this Website.
        </p>

        <Link to="/" className="text-blue-600 font-semibold underline hover:text-blue-800">Go back to Home</Link>
      </div>
    </div>
  );
};

export default TermsAndConditions;
