import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Use | CapaCloud',
  description:
    'Terms of Use governing access to the CapaCloud decentralized GPU rental marketplace.',
};

const LAST_UPDATED = 'May 18, 2026';
const LEGAL_EMAIL = 'legal@capa.cloud';

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
      <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">{children}</div>
    </section>
  );
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
      <div className="space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed">{children}</div>
    </div>
  );
}

const toc = [
  { id: 'introduction', label: '1. Introduction and Acceptance' },
  { id: 'eligibility', label: '2. Eligibility and Registration' },
  { id: 'platform', label: '3. Platform Description' },
  { id: 'obligations', label: '4. User Obligations' },
  { id: 'payments', label: '5. Payments and Fees' },
  { id: 'ip', label: '6. Intellectual Property' },
  { id: 'disclaimers', label: '7. Disclaimers' },
  { id: 'liability', label: '8. Limitation of Liability' },
  { id: 'indemnification', label: '9. Indemnification' },
  { id: 'disputes', label: '10. Dispute Resolution' },
  { id: 'termination', label: '11. Termination' },
  { id: 'general', label: '12. General Provisions' },
];

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Terms of Use</h1>
        <p className="mt-3 text-gray-600 dark:text-gray-400">
          Last updated: {LAST_UPDATED}
        </p>
      </div>

      <nav
        aria-label="Table of contents"
        className="mb-10 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6"
      >
        <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">
          Contents
        </h2>
        <ol className="space-y-2 text-sm">
          {toc.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="space-y-12">
        <Section id="introduction" title="1. Introduction and Acceptance of Terms">
          <SubSection title="Overview">
            <p>
              These Terms of Use (the &ldquo;Terms&rdquo;) constitute a legally binding agreement
              between you (&ldquo;User,&rdquo; &ldquo;you,&rdquo; or &ldquo;your&rdquo;) and
              CapaCloud Inc., a Wyoming company (&ldquo;CapaCloud,&rdquo; &ldquo;Company,&rdquo;
              &ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;), governing your access to
              and use of the CapaCloud platform, including the website, applications, APIs, smart
              contracts, decentralized network infrastructure, and all associated services
              (collectively, the &ldquo;Platform&rdquo;).
            </p>
            <p>
              CapaCloud operates a decentralized GPU rental marketplace that connects users who
              require compute power (&ldquo;Renters&rdquo;) with GPU owners (&ldquo;Providers&rdquo;)
              through a peer-to-peer neocloud network. The Platform enables pay-per-use GPU rentals
              with USDT (Tether) and Solana-based wallet payments, offering a sustainable,
              carbon-neutral cloud alternative for artificial intelligence, rendering, and
              high-performance computing workloads.
            </p>
          </SubSection>
          <SubSection title="Acceptance">
            <p className="font-semibold text-gray-900 dark:text-white uppercase text-sm tracking-wide">
              By accessing, browsing, or using the Platform in any manner, you acknowledge that you
              have read, understood, and agree to be bound by these Terms and all applicable laws
              and regulations. If you do not agree with any provision of these Terms, you must
              immediately cease all use of the Platform.
            </p>
            <p>
              Your continued use of the Platform following the posting of any changes to these Terms
              shall constitute acceptance of such changes. We reserve the right to modify these
              Terms at any time, with or without prior notice, effective upon posting the updated
              Terms on the Platform.
            </p>
          </SubSection>
        </Section>

        <Section id="eligibility" title="2. Eligibility and Account Registration">
          <SubSection title="2.1 Eligibility Requirements">
            <p>To use the Platform, you must:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Be at least eighteen (18) years of age or the age of majority in your jurisdiction,
                whichever is greater;
              </li>
              <li>Have the legal capacity to enter into a binding contract under applicable law;</li>
              <li>
                Not be a resident of, or located in, any jurisdiction where the use of the Platform
                or cryptocurrency transactions is prohibited by law;
              </li>
              <li>Not have been previously suspended or removed from the Platform.</li>
            </ul>
          </SubSection>
          <SubSection title="2.2 Account Registration">
            <p>
              You may be required to register an account and connect a compatible Solana-based
              cryptocurrency wallet to access certain features of the Platform. You agree to provide
              accurate, current, and complete information during registration and to update such
              information as necessary. You are solely responsible for maintaining the
              confidentiality of your account credentials, private keys, and wallet access, and you
              accept full responsibility for all activities conducted through your account.
            </p>
          </SubSection>
        </Section>

        <Section id="platform" title="3. Platform Description and Services">
          <SubSection title="3.1 Nature of the Platform">
            <p>
              CapaCloud operates as a decentralized marketplace that facilitates peer-to-peer
              connections between Renters and Providers. The Platform provides the technology
              infrastructure, matching algorithms, and payment facilitation to enable GPU rental
              transactions. CapaCloud does not own, operate, or control the GPU hardware listed on
              the Platform and does not directly provide compute services.
            </p>
          </SubSection>
          <SubSection title="3.2 Role of CapaCloud">
            <p>
              CapaCloud acts solely as an intermediary platform facilitating transactions between
              Renters and Providers. CapaCloud is NOT a party to the rental agreements between
              Renters and Providers, is NOT responsible for the quality, availability, or
              performance of any GPU resources listed on the Platform, does NOT guarantee any
              specific level of uptime, throughput, or computational performance, and does NOT
              provide any warranties regarding the hardware, software, or services offered by
              Providers.
            </p>
          </SubSection>
          <SubSection title="3.3 Supported Payment Methods">
            <p>
              The Platform supports payments in USDT (Tether, ERC-20 and SPL variants as
              applicable) and native SOL tokens via Solana-compatible wallets. All payment processing
              occurs on-chain and is subject to the inherent characteristics of the respective
              blockchain networks, including transaction finality, network fees (gas), and
              processing times. CapaCloud does not hold, custody, or control User funds except as
              necessary to facilitate escrow services as described herein.
            </p>
          </SubSection>
        </Section>

        <Section id="obligations" title="4. User Obligations and Acceptable Use">
          <SubSection title="4.1 General Obligations">
            <p>
              All Users agree to use the Platform in compliance with all applicable federal, state,
              local, and international laws, regulations, and ordinances, including those of the
              State of Wyoming and the United States.
            </p>
          </SubSection>
          <SubSection title="4.2 Prohibited Conduct">
            <p>You shall not, and shall not permit any third party to, use the Platform to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Engage in any illegal, fraudulent, deceptive, or harmful activity, including money
                laundering, terrorist financing, sanctions evasion, or tax evasion;
              </li>
              <li>
                Process, store, or transmit any material that infringes upon intellectual property
                rights, trade secrets, or proprietary rights of any third party;
              </li>
              <li>
                Distribute malware, ransomware, viruses, or any other harmful code or conduct
                cyberattacks, penetration testing of third-party systems (without authorization),
                or denial-of-service attacks;
              </li>
              <li>
                Mine cryptocurrency using rented GPU resources unless expressly permitted by the
                applicable Provider listing and disclosed at the time of rental;
              </li>
              <li>
                Generate, store, or process child sexual abuse material (CSAM) or any other content
                exploiting minors;
              </li>
              <li>
                Attempt to reverse engineer, decompile, or disassemble any portion of the
                Platform&apos;s proprietary software or infrastructure;
              </li>
              <li>
                Circumvent, disable, or otherwise interfere with any security, rate-limiting, or
                access-control features of the Platform;
              </li>
              <li>
                Use automated means (bots, scrapers, crawlers) to access the Platform except through
                officially sanctioned APIs;
              </li>
              <li>
                Engage in market manipulation, including artificial inflation of Provider ratings
                or sham transactions;
              </li>
              <li>
                Sublicense, resell, or redistribute access to rented GPU resources to third parties
                without prior written consent of CapaCloud;
              </li>
              <li>
                Use the Platform in connection with high-risk activities where failure of GPU
                resources could lead to death, personal injury, or severe environmental damage (e.g.,
                real-time medical device control, nuclear facility operations) without prior written
                authorization from CapaCloud.
              </li>
            </ul>
          </SubSection>
          <SubSection title="4.3 Provider-Specific Obligations">
            <p>Providers who list GPU resources on the Platform additionally agree to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Provide accurate and complete descriptions of the GPU hardware, including make,
                model, VRAM, and expected performance specifications;
              </li>
              <li>
                Maintain hardware in proper working condition and ensure reasonable uptime consistent
                with the terms of their listings;
              </li>
              <li>
                Not list any hardware that has been stolen, obtained through fraud, or that is subject
                to any lien, encumbrance, or third-party claim;
              </li>
              <li>
                Comply with all applicable electrical, safety, and environmental regulations
                governing the operation of computing equipment in their jurisdiction;
              </li>
              <li>
                Promptly notify CapaCloud of any security breaches, hardware failures, or other events
                that may affect service availability or data integrity.
              </li>
            </ul>
          </SubSection>
          <SubSection title="4.4 Renter-Specific Obligations">
            <p>Renters who utilize GPU resources on the Platform additionally agree to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Ensure that all workloads comply with these Terms, Sections 4.1 and 4.2, and
                applicable law;
              </li>
              <li>
                Not attempt to access, modify, or exfiltrate data from the Provider&apos;s underlying
                system beyond the scope of the rented resources;
              </li>
              <li>
                Promptly remove all data from rented resources upon expiration or termination of the
                rental period;
              </li>
              <li>
                Bear sole responsibility for the security and backup of their own data, models, and
                workloads.
              </li>
            </ul>
          </SubSection>
        </Section>

        <Section id="payments" title="5. Payments, Fees, and Financial Terms">
          <SubSection title="5.1 Pricing and Payment">
            <p>
              Providers set their own pricing for GPU rentals. All transactions are denominated and
              settled in USDT or SOL as selected by the parties. Users acknowledge that the value of
              cryptocurrency assets may fluctuate significantly and that CapaCloud bears no
              responsibility for any losses arising from such fluctuations.
            </p>
          </SubSection>
          <SubSection title="5.2 Platform Fees">
            <p>
              CapaCloud charges a service fee (the &ldquo;Platform Fee&rdquo;) on each completed
              transaction. CapaCloud reserves the right to modify the Platform Fee at any time upon
              reasonable notice. The Platform Fee is non-refundable and is deducted automatically
              from the transaction amount prior to disbursement to the Provider.
            </p>
          </SubSection>
          <SubSection title="5.3 Escrow Mechanism">
            <p>
              Payments from Renters may be held in an on-chain or hybrid escrow mechanism managed by
              CapaCloud or its designated smart contracts until the rental period is completed or a
              dispute is resolved. The escrow is designed to protect both parties but is provided on
              an &ldquo;AS-IS&rdquo; basis, and CapaCloud disclaims all liability for losses arising
              from smart contract vulnerabilities, blockchain network failures, or oracle
              malfunctions.
            </p>
          </SubSection>
          <SubSection title="5.4 Refunds">
            <p>
              Due to the decentralized and on-chain nature of transactions, all payments are
              generally final and non-refundable. Refunds may be issued at CapaCloud&apos;s sole
              discretion through the Platform&apos;s dispute resolution process. CapaCloud shall not
              be liable for any transaction fees, gas fees, or network costs incurred in connection
              with any refund.
            </p>
          </SubSection>
          <SubSection title="5.5 Blockchain Risks">
            <p>
              Users acknowledge and accept the inherent risks associated with blockchain-based
              transactions, including but not limited to: irreversibility of confirmed transactions,
              smart contract bugs or exploits, network congestion and delayed transaction
              confirmations, hard forks or protocol changes affecting the Solana or Ethereum/Tether
              networks, and regulatory actions that may affect the legality or availability of USDT
              or SOL in certain jurisdictions.
            </p>
          </SubSection>
        </Section>

        <Section id="ip" title="6. Intellectual Property Rights">
          <SubSection title="6.1 Platform IP">
            <p>
              All intellectual property rights in and to the Platform, including but not limited to
              the software, algorithms, matching engines, user interfaces, designs, trademarks, trade
              names, logos, and documentation, are and shall remain the exclusive property of
              CapaCloud or its licensors. Nothing in these Terms grants you any right, title, or
              interest in the Platform&apos;s intellectual property except for the limited license to
              use the Platform as expressly set forth herein.
            </p>
          </SubSection>
          <SubSection title="6.2 User Content">
            <p>
              You retain all ownership rights in any data, models, code, or other content you upload,
              process, or store through the Platform (&ldquo;User Content&rdquo;). By using the
              Platform, you grant CapaCloud a non-exclusive, worldwide, royalty-free license to host,
              store, transmit, and process your User Content solely as necessary to provide the
              Platform services. This license terminates upon deletion of your User Content or
              account, subject to reasonable backup retention periods.
            </p>
          </SubSection>
          <SubSection title="6.3 Feedback">
            <p>
              If you provide CapaCloud with any feedback, suggestions, or recommendations regarding
              the Platform (&ldquo;Feedback&rdquo;), you hereby assign to CapaCloud all rights in
              such Feedback and agree that CapaCloud may use, reproduce, modify, and commercialize the
              Feedback without restriction or compensation to you.
            </p>
          </SubSection>
        </Section>

        <Section id="disclaimers" title="7. Disclaimers and Limitation of Warranties">
          <SubSection title="7.1 AS-IS Disclaimer">
            <p className="uppercase text-sm font-medium text-gray-800 dark:text-gray-200">
              The Platform and all services are provided on an &ldquo;AS IS&rdquo; and &ldquo;AS
              AVAILABLE&rdquo; basis without warranties of any kind, whether express, implied,
              statutory, or otherwise. To the fullest extent permitted by applicable law, CapaCloud
              expressly disclaims all warranties, including but not limited to implied warranties of
              merchantability, fitness for a particular purpose, title, non-infringement, and any
              warranties arising from course of dealing or usage of trade.
            </p>
          </SubSection>
          <SubSection title="7.2 No Guarantee of Availability">
            <p className="uppercase text-sm font-medium text-gray-800 dark:text-gray-200">
              CapaCloud does not warrant that the Platform will be uninterrupted, error-free, secure,
              or free of viruses or other harmful components. CapaCloud does not guarantee the
              availability, performance, or reliability of any GPU resources listed on the Platform,
              nor does it guarantee that any specific hardware configuration will be available at any
              given time.
            </p>
          </SubSection>
          <SubSection title="7.3 Third-Party Services">
            <p>
              The Platform may integrate with or rely upon third-party services, wallet providers,
              and oracle services. CapaCloud disclaims all liability arising from the acts, omissions,
              failures, or unavailability of such third-party services.
            </p>
          </SubSection>
          <SubSection title="7.4 Regulatory Uncertainty">
            <p>
              The regulatory landscape for cryptocurrency, decentralized computing, and related
              technologies is evolving and uncertain. CapaCloud makes no representation that the
              Platform&apos;s services comply with all laws in all jurisdictions. Changes in law or
              regulation may materially affect the availability, legality, or terms of the
              Platform&apos;s services. Users assume all regulatory risk associated with their use of
              the Platform.
            </p>
          </SubSection>
        </Section>

        <Section id="liability" title="8. Limitation of Liability">
          <SubSection title="8.1 Exclusion of Damages">
            <p className="uppercase text-sm font-medium text-gray-800 dark:text-gray-200">
              To the maximum extent permitted by applicable law, in no event shall CapaCloud, its
              officers, directors, employees, agents, affiliates, successors, or assigns be liable for
              any indirect, incidental, special, consequential, punitive, or exemplary damages,
              including but not limited to damages for loss of profits, revenue, data, goodwill,
              business opportunities, or cryptocurrency assets, regardless of whether such damages
              were foreseeable and whether or not CapaCloud has been advised of the possibility of
              such damages.
            </p>
          </SubSection>
          <SubSection title="8.2 Liability Cap">
            <p className="uppercase text-sm font-medium text-gray-800 dark:text-gray-200">
              To the maximum extent permitted by law, CapaCloud&apos;s total aggregate liability
              arising out of or relating to these Terms or your use of the Platform shall not exceed
              the greater of: (A) the total amount of Platform Fees paid by you to CapaCloud during
              the twelve (12) months immediately preceding the event giving rise to the claim.
            </p>
          </SubSection>
        </Section>

        <Section id="indemnification" title="9. Indemnification">
          <p>
            You agree to indemnify, defend, and hold harmless CapaCloud, its officers, directors,
            employees, agents, affiliates, successors, and assigns from and against any and all
            claims, damages, losses, liabilities, costs, and expenses (including reasonable
            attorneys&apos; fees and costs) arising out of or relating to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Your use of or inability to use the Platform;</li>
            <li>Your violation of these Terms or any applicable law or regulation;</li>
            <li>Your User Content or any workloads you process on the Platform;</li>
            <li>Your violation of any third-party rights, including intellectual property rights;</li>
            <li>Any dispute between you and another User (whether Renter or Provider);</li>
            <li>Any tax liability arising from your transactions on the Platform;</li>
            <li>
              Your failure to comply with applicable sanctions, export control, or anti-money
              laundering laws.
            </li>
          </ul>
          <p>
            CapaCloud reserves the right, at its own expense, to assume the exclusive defense and
            control of any matter subject to indemnification by you. You agree to cooperate with
            CapaCloud&apos;s defense of such claims.
          </p>
        </Section>

        <Section id="disputes" title="10. Dispute Resolution">
          <SubSection title="Governing Law">
            <p>
              Any disputes or claims arising out of or in connection with these Terms, its subject
              matter, or its formation (including non-contractual disputes or claims) shall be
              governed by and construed in accordance with the laws of the State of Wyoming, United
              States of America, without regard to its conflict of law principles. Any dispute,
              controversy, or claim arising out of or relating to these Terms, including its
              interpretation, validity, performance, breach, or termination, shall be subject to the
              exclusive jurisdiction of the state and federal courts located in the State of Wyoming.
              By accessing or using our website or services, you irrevocably consent and submit to
              the personal jurisdiction and venue of such courts and waive any objection based on
              inconvenient forum or lack of jurisdiction.
            </p>
          </SubSection>
        </Section>

        <Section id="termination" title="11. Termination and Suspension">
          <SubSection title="11.1 Termination by User">
            <p>
              You may terminate your account at any time by following the account closure procedures
              on the Platform. Termination does not relieve you of any obligations accrued prior to
              termination, including outstanding payments and indemnification obligations.
            </p>
          </SubSection>
          <SubSection title="11.2 Termination by CapaCloud">
            <p>
              CapaCloud may, in its sole and absolute discretion, suspend or terminate your account
              and access to the Platform, with or without cause and with or without prior notice, for
              any reason, including but not limited to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Violation of these Terms or any applicable Policy;</li>
              <li>Suspected fraudulent, abusive, or illegal activity;</li>
              <li>Failure to comply with applicable sanctions or anti-money laundering requirements;</li>
              <li>Extended inactivity;</li>
              <li>Requests by law enforcement or government agencies;</li>
              <li>Discontinuation or material modification of the Platform.</li>
            </ul>
          </SubSection>
          <SubSection title="11.3 Effect of Termination">
            <p>
              Upon termination, your right to access the Platform immediately ceases. CapaCloud may,
              but is not obligated to, provide a grace period for you to retrieve User Content. Any
              funds held in escrow at the time of termination shall be handled in accordance with the
              applicable escrow procedures and these Terms. Sections that by their nature should
              survive termination shall survive, including Sections 6 (Intellectual Property), 7
              (Disclaimers), 8 (Limitation of Liability), 9 (Indemnification), 10 (Dispute
              Resolution), and 12 (General Provisions).
            </p>
          </SubSection>
        </Section>

        <Section id="general" title="12. General Provisions">
          <SubSection title="12.1 Entire Agreement">
            <p>
              These Terms constitute the entire agreement between you and CapaCloud regarding the
              Platform and supersede all prior or contemporaneous agreements, communications, and
              proposals, whether oral or written.
            </p>
          </SubSection>
          <SubSection title="12.2 Severability">
            <p>
              If any provision of these Terms is held to be invalid, illegal, or unenforceable by a
              court or arbitrator of competent jurisdiction, such provision shall be modified to the
              minimum extent necessary to make it enforceable, or if modification is not possible,
              severed from these Terms. The remaining provisions shall continue in full force and
              effect.
            </p>
          </SubSection>
          <SubSection title="12.3 Waiver">
            <p>
              The failure of CapaCloud to enforce any right or provision of these Terms shall not
              constitute a waiver of such right or provision. Any waiver of any provision of these
              Terms shall be effective only if in writing and signed by an authorized representative
              of CapaCloud.
            </p>
          </SubSection>
          <SubSection title="12.4 Assignment">
            <p>
              You may not assign or transfer these Terms or any rights or obligations hereunder
              without the prior written consent of CapaCloud. CapaCloud may assign these Terms
              freely, including in connection with a merger, acquisition, corporate reorganization,
              or sale of all or substantially all of its assets.
            </p>
          </SubSection>
          <SubSection title="12.5 Force Majeure">
            <p>
              CapaCloud shall not be liable for any failure or delay in performance resulting from
              causes beyond its reasonable control, including but not limited to acts of God, natural
              disasters, pandemics, war, terrorism, cyberattacks, government actions, blockchain
              network outages, sanctions, embargoes, power failures, internet service provider
              failures, or labor disputes.
            </p>
          </SubSection>
          <SubSection title="12.6 Notices">
            <p>
              CapaCloud may give notice by means of a general notice on the account or Website, or by
              electronic mail to User&apos;s email address or contact number, or by written
              communication sent by regular mail to User&apos;s address on record in the account. The
              User may contact Company by electronic mail or by written communication sent by regular
              mail to the address provided below.
            </p>
            <address className="not-italic text-gray-700 dark:text-gray-300">
              <p className="font-semibold text-gray-900 dark:text-white mt-2">CapaCloud Inc.</p>
              <p>1309 Coffeen Avenue</p>
              <p>STE 1200, Sheridan</p>
              <p>Wyoming 82801</p>
              <p className="mt-2">
                Email:{' '}
                <a
                  href={`mailto:${LEGAL_EMAIL}`}
                  className="text-purple-600 hover:text-purple-700 dark:text-purple-400"
                >
                  {LEGAL_EMAIL}
                </a>
              </p>
            </address>
          </SubSection>
          <SubSection title="12.7 No Third-Party Beneficiaries">
            <p>
              These Terms do not create any third-party beneficiary rights in any individual or
              entity that is not a party to these Terms.
            </p>
          </SubSection>
          <SubSection title="12.8 Headings">
            <p>
              The headings in these Terms are for convenience only and shall not affect the
              interpretation of these Terms.
            </p>
          </SubSection>
        </Section>
      </div>

      <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-500 dark:text-gray-400 space-y-2">
        <p>
          Questions? Contact us at{' '}
          <a
            href={`mailto:${LEGAL_EMAIL}`}
            className="text-purple-600 hover:text-purple-700 dark:text-purple-400"
          >
            {LEGAL_EMAIL}
          </a>{' '}
          or visit our{' '}
          <Link href="/help" className="text-purple-600 hover:text-purple-700 dark:text-purple-400">
            Help &amp; Support
          </Link>{' '}
          page.
        </p>
        <p>
          See also our{' '}
          <Link href="/privacy" className="text-purple-600 hover:text-purple-700 dark:text-purple-400">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
