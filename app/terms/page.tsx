import type { Metadata } from "next";
import { LegalPage } from "../legal-page";

export const metadata: Metadata = { title: "Terms of Service | CommentHarbor" };

export default function TermsPage() {
  return <LegalPage eyebrow="LEGAL" title="Terms of Service">
    <p>These terms govern your use of CommentHarbor, a service operated by WickedAdmin LLC. By using or purchasing the service, you agree to these terms.</p>
    <h2>The service</h2>
    <p>CommentHarbor helps users retrieve and work with public video comments, create exports, and conduct random giveaway drawings. Features and usage limits may change as the service develops.</p>
    <h2>Acceptable use</h2>
    <p>You may not use the service to violate law, platform rules, privacy rights, intellectual-property rights, or the rights of others; attempt unauthorized access; interfere with the service; evade limits; or use automated traffic that creates unreasonable load.</p>
    <h2>Third-party services</h2>
    <p>The service depends on third-party platforms including YouTube, Google, Stripe, and Resend. Their terms apply to their services. Availability may be affected by third-party changes, outages, quotas, or restrictions. CommentHarbor is not affiliated with or endorsed by YouTube or Google.</p>
    <h2>Lifetime access</h2>
    <p>“Lifetime” means access for as long as CommentHarbor continues to offer the purchased product, not the lifetime of the purchaser or any guaranteed minimum number of years. Access is for one purchaser and may not be resold or shared commercially unless we agree in writing.</p>
    <h2>Payments and refunds</h2>
    <p>Prices are shown before checkout and payments are processed by Stripe. Except where required by law, payments are final. Contact <a href="mailto:commentharbor@tenantiq365.com">commentharbor@tenantiq365.com</a> about duplicate charges or a service that materially fails to provide the purchased access.</p>
    <h2>Ownership</h2>
    <p>We retain rights in the service, branding, design, and software. You retain rights in content you lawfully export. Public comments remain subject to the rights of their authors and the applicable platform terms.</p>
    <h2>Disclaimers and liability</h2>
    <p>The service is provided “as is” and “as available.” To the fullest extent permitted by law, WickedAdmin LLC disclaims implied warranties and is not liable for indirect, incidental, special, consequential, or lost-profit damages. Our aggregate liability will not exceed the amount you paid for the service during the twelve months before the claim.</p>
    <h2>Termination and governing law</h2>
    <p>We may suspend access for material violations of these terms. These terms are governed by Texas law, without regard to conflict-of-law principles. Disputes will be brought in the state or federal courts serving Bexar County, Texas, unless applicable law requires otherwise.</p>
    <h2>Contact</h2>
    <p>Questions about these terms may be sent to <a href="mailto:commentharbor@tenantiq365.com">commentharbor@tenantiq365.com</a>.</p>
  </LegalPage>;
}
