import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | CapaCloud',
  description:
    'Privacy Policy for CapaCloud, the decentralized GPU computing platform operated by CAPACLOUD CORP.',
};

const LAST_UPDATED = 'May 18, 2026';
const LEGAL_EMAIL = 'ceo@capa.cloud';

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

const toc = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'collect', label: 'Information We Collect' },
  { id: 'use', label: 'How We Use Your Information' },
  { id: 'disclosure', label: 'Disclosure of Information' },
  { id: 'cookies', label: 'Cookies and Tracking' },
  { id: 'security', label: 'Security Measures' },
  { id: 'rights', label: 'Your Rights' },
  { id: 'changes', label: 'Changes to This Policy' },
  { id: 'wallet-suspension', label: 'Right to Suspend Wallet Accounts' },
  { id: 'governing-law', label: 'Governing Law and Disputes' },
  { id: 'contact', label: 'Contact Us' },
];

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Privacy Policy</h1>
        <p className="mt-3 text-gray-600 dark:text-gray-400">Last updated: {LAST_UPDATED}</p>
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
        <Section id="introduction" title="Introduction">
          <p>
            Welcome to CapaCloud, operated by CAPACLOUD CORP, located at 1309 Coffeen Avenue STE
            1200, Sheridan, Wyoming 82801 (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;).
            CapaCloud provides a decentralized GPU computing platform where users can browse and rent
            GPUs, and providers can register their hardware to earn rewards. We are committed to
            protecting your privacy while providing a &ldquo;by the people, for the people&rdquo;
            service, in accordance with this Privacy Policy.
          </p>
        </Section>

        <Section id="collect" title="Information We Collect">
          <p>
            We collect information necessary to facilitate decentralized GPU rentals and provider
            services. This includes:
          </p>
          <ul className="list-disc pl-6 space-y-3">
            <li>
              <strong className="text-gray-900 dark:text-white">Wallet Information:</strong> When you
              use the &ldquo;Select Wallet&rdquo; feature, we interact with your blockchain wallet
              address to facilitate transactions and identity.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Provider Data:</strong> If you
              &ldquo;Register GPU,&rdquo; we collect technical specifications and information
              necessary to track &ldquo;Earnings&rdquo;.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Transaction History:</strong> Data
              tracking how much of the GPU&apos;s power was actually utilized during the rental
              period.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Contact Information:</strong>{' '}
              Information you provide when seeking &ldquo;Help &amp; Support,&rdquo; such as your
              email address when contacting our executive team.
            </li>
          </ul>
        </Section>

        <Section id="use" title="How We Use Your Information">
          <p>Your information is used to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Facilitate the GPU rental process and determine platform pricing.</li>
            <li>
              Manage the escrow system for secure payments between users and providers.
            </li>
            <li>Provide technical support and answer questions.</li>
            <li>Maintain the security and integrity of the decentralized network.</li>
          </ul>
        </Section>

        <Section id="disclosure" title="Disclosure of Information">
          <p>We may disclose information in the following circumstances:</p>
          <ul className="list-disc pl-6 space-y-3">
            <li>
              <strong className="text-gray-900 dark:text-white">Between Users and Providers:</strong>{' '}
              Necessary data is shared to facilitate the connection for GPU rentals.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Legal Requirements:</strong> If
              required by law or to protect the safety and security of the CapaCloud community.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Service Providers:</strong> To
              third-party tools that assist in platform operations, such as Discord for community
              engagement.
            </li>
          </ul>
        </Section>

        <Section id="cookies" title="Cookies and Tracking Technology">
          <p>
            We may use cookies and similar tracking technologies to collect and store information
            when you use our website. These technologies help us understand your preferences,
            customize your experience, and analyze how our website and services are used.
          </p>
        </Section>

        <Section id="security" title="Security Measures">
          <p>
            All communication is secured with TLS. Root access uses secure key-based authentication.
            Each rental gets an isolated user account. Payments are handled by on-chain smart
            contracts, ensuring trustless transactions. GPU workers are authenticated and monitored.
          </p>
        </Section>

        <Section id="rights" title="Your Rights">
          <p>You have the following rights regarding your personal information:</p>
          <ul className="list-disc pl-6 space-y-3">
            <li>
              <strong className="text-gray-900 dark:text-white">Access and Correction:</strong> You
              can request access to your personal information and ask us to correct or update it.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Opt-Out:</strong> You can opt out of
              receiving marketing communications from us by following the unsubscribe instructions
              provided in those communications.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Children&apos;s Privacy:</strong>{' '}
              CapaCloud does not knowingly collect personal information from children under the age
              of 13. Our decentralized GPU services are intended for users who can legally enter into
              rental and escrow agreements.
            </li>
          </ul>
        </Section>

        <Section id="changes" title="Changes to This Privacy Policy">
          <p>
            We may update this Privacy Policy from time to time. Any changes will be posted on this
            page. We encourage you to review this Privacy Policy periodically to stay informed about
            how we collect, use, and protect your information.
          </p>
        </Section>

        <Section id="wallet-suspension" title="Right to Suspend Cryptocurrency Wallet Accounts">
          <p>
            The Company reserves the unconditional and absolute right, exercisable at its sole and
            unfettered discretion and without prior notice, to suspend, restrict, freeze, or
            permanently terminate any user&apos;s wallet account, access to services, or pending
            transactions based on any information received, obtained, discovered, or inferred from
            any source whatsoever.
          </p>
        </Section>

        <Section id="governing-law" title="Governing Law and Dispute Resolution">
          <p>
            Any disputes or claims arising out of or in connection with this Privacy Policy, its
            subject matter, or its formation (including non-contractual disputes or claims) shall be
            governed by and construed in accordance with the laws of the State of Wyoming, United
            States of America, without regard to its conflict of law principles. Any dispute,
            controversy, or claim arising out of or relating to this Privacy Policy, including its
            interpretation, validity, performance, breach, or termination, shall be subject to the
            exclusive jurisdiction of the state and federal courts located in the State of Wyoming.
            By accessing or using our website or services, you irrevocably consent and submit to the
            personal jurisdiction and venue of such courts and waive any objection based on
            inconvenient forum or lack of jurisdiction.
          </p>
        </Section>

        <Section id="contact" title="Contact Us">
          <p>
            If you have questions regarding this Privacy Policy or need more help, you may contact
            the CAPACLOUD CORP team:
          </p>
          <address className="not-italic mt-4 text-gray-700 dark:text-gray-300">
            <p className="font-semibold text-gray-900 dark:text-white">CAPACLOUD CORP</p>
            <p>1309 Coffeen Avenue</p>
            <p>STE 1200, Sheridan</p>
            <p>Wyoming 82801</p>
            <p className="mt-3">
              Email:{' '}
              <a
                href={`mailto:${LEGAL_EMAIL}`}
                className="text-purple-600 hover:text-purple-700 dark:text-purple-400"
              >
                {LEGAL_EMAIL}
              </a>
            </p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              For general support, see our{' '}
              <Link href="/help" className="text-purple-600 hover:text-purple-700 dark:text-purple-400">
                Help &amp; Support
              </Link>{' '}
              page.
            </p>
          </address>
        </Section>
      </div>

      <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>
          See also our{' '}
          <Link href="/terms" className="text-purple-600 hover:text-purple-700 dark:text-purple-400">
            Terms of Use
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
