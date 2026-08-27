import type { Metadata } from "next";
import { LegalPage } from "../legal-page";

export const metadata: Metadata = { title: "Privacy Policy | CommentHarbor" };

export default function PrivacyPage() {
  return <LegalPage eyebrow="LEGAL" title="Privacy Policy">
    <p>CommentHarbor is operated by WickedAdmin LLC. This policy explains what information we process when you use the service and the choices available to you.</p>
    <h2>Information you provide</h2>
    <p>You may provide a public video URL and, when purchasing or restoring access, an email address. Payment information is collected and processed by Stripe; CommentHarbor does not receive or store full card numbers.</p>
    <h2>Public video and comment data</h2>
    <p>CommentHarbor uses the YouTube Data API to retrieve public video metadata and public comments at your request. Comments are processed to display, filter, export, and select giveaway winners. We do not intentionally persist comment text, commenter names, profile images, or the video URLs you submit in our database.</p>
    <p>Your use of YouTube is also governed by the <a href="https://www.youtube.com/t/terms">YouTube Terms of Service</a> and the <a href="https://policies.google.com/privacy">Google Privacy Policy</a>. CommentHarbor is not affiliated with or endorsed by YouTube or Google.</p>
    <h2>Purchases and account recovery</h2>
    <p>We store the purchaser email, Stripe customer and checkout identifiers, entitlement status, and purchase timestamps so lifetime access can be recognized and recovered. Recovery links are single-use, expire after 15 minutes, and are stored only as cryptographic hashes.</p>
    <h2>Product analytics</h2>
    <p>We record limited product events such as imports, checkout attempts, completed purchases, exports, and giveaway draws. These records may include counts, paid/free status, and timestamps. They do not include comment text, commenter identities, payment-card details, submitted video URLs, or a persistent analytics identifier.</p>
    <h2>Cookies</h2>
    <p>We use essential cookies to remember paid access and protect purchase recovery. We do not use advertising cookies or a persistent analytics cookie.</p>
    <h2>Service providers and retention</h2>
    <p>We use Stripe for payments, Resend for transactional email, Neon for application data, Google for YouTube API data, and our hosting provider to operate the service. We retain entitlement records while lifetime access remains active and retain operational records only as reasonably needed for security, support, and business analysis.</p>
    <h2>Your choices</h2>
    <p>You may request access, correction, or deletion of personal information by emailing <a href="mailto:commentharbor@tenantiq365.com">commentharbor@tenantiq365.com</a>. Deleting an entitlement record may prevent later purchase recovery.</p>
    <h2>Children and changes</h2>
    <p>The service is not directed to children under 13. We may update this policy as the product changes and will revise the date shown above.</p>
  </LegalPage>;
}
