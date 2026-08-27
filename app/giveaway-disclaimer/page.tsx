import type { Metadata } from "next";
import { LegalPage } from "../legal-page";

export const metadata: Metadata = { title: "Giveaway Disclaimer | CommentHarbor" };

export default function GiveawayDisclaimerPage() {
  return <LegalPage eyebrow="GIVEAWAYS" title="Giveaway Disclaimer">
    <p>CommentHarbor provides a technical tool for filtering public comments and randomly selecting potential winners. It does not sponsor, administer, certify, or distribute prizes for user-created giveaways.</p>
    <h2>Your responsibility as organizer</h2>
    <p>You are solely responsible for publishing clear official rules; confirming participant eligibility; complying with platform policies and applicable sweepstakes, contest, advertising, privacy, tax, and prize laws; obtaining any required permissions; and delivering prizes.</p>
    <h2>Selection results</h2>
    <p>Duplicate removal and eligibility filters depend on the rules you select and the public data available through the platform API. You must review a selected winner before announcing or awarding a prize. Rerolls, exclusions, unavailable comments, API limitations, and deleted or changed accounts may affect results.</p>
    <h2>No legal certification</h2>
    <p>A CommentHarbor result or export is not a legal certification, audit, guarantee of fairness, or proof that every eligible entry was available. Do not describe CommentHarbor as an independent contest administrator unless we have agreed to that role in writing.</p>
    <h2>Platform independence</h2>
    <p>CommentHarbor is not affiliated with, sponsored by, endorsed by, or administered by YouTube or Google. Your giveaway must include any platform-specific releases or disclosures required by the platform’s rules.</p>
    <h2>Contact</h2>
    <p>Questions about how the selection tool works may be sent to <a href="mailto:commentharbor@tenantiq365.com">commentharbor@tenantiq365.com</a>.</p>
  </LegalPage>;
}
