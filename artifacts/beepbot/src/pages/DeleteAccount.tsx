import { Link } from 'wouter';
import { LegalLayout } from '@/components/LegalLayout';

export default function DeleteAccount() {
  return (
    <LegalLayout title="Delete your BeePod AI account" eyebrow="Account">
      <p>
        This page explains how to delete your <em>BeePod AI</em> account and your family&apos;s data. BeePod AI is made
        by BeePod AI Inc.
      </p>

      <h2>In the app (fastest)</h2>
      <ol>
        <li>
          Open the <em>BeePod AI</em> app and sign in.
        </li>
        <li>
          Go to <em>Family → Account</em>.
        </li>
        <li>
          Tap <em>Delete my account</em>.
        </li>
        <li>
          Choose whether to get an email copy of your data first (on by default), then confirm.
        </li>
      </ol>
      <p>
        Your account and your family&apos;s data are deleted straight away, or as soon as the copy has been emailed to
        you. Until then, you can cancel.
      </p>

      <h2>Without the app</h2>
      <p>
        Email <a href="mailto:info@beepodai.com?subject=Delete%20my%20account">info@beepodai.com</a> from the email
        address you sign in with, with the subject <em>&quot;Delete my account&quot;</em>. We may ask you to confirm
        it&apos;s you, then delete your account within 30 days and email you when it&apos;s done.
      </p>

      <h2>What is deleted</h2>
      <ul>
        <li>Your account: name, email address and sign-in sessions.</li>
        <li>
          Each child&apos;s profile: name, age, interests, goals and &quot;Tell us more&quot; notes.
        </li>
        <li>Conversation transcripts, chat summaries, learning progress and pathways.</li>
        <li>BeePod&apos;s memory of your child.</li>
        <li>Messages and voice notes you sent, and your chats with Beepo.</li>
        <li>Safety alerts and their excerpts.</li>
        <li>Push notification tokens. Your BeePod is unlinked, so it can be set up again.</li>
      </ul>
      <p>We also ask our service providers to delete any copies they hold.</p>

      <h2>What is kept, and for how long</h2>
      <ul>
        <li>
          <em>Backups:</em> deleted data is removed from our backups within <em>7 days</em>.
        </li>
        <li>
          <em>Consent and deletion records:</em> a record that consent was given and that the account was deleted
          (dates only, no child data), kept as long as the law requires so we can show we followed it.
        </li>
        <li>
          <em>Emails already sent</em> (for example sign-in codes) may stay with our email provider for up to{' '}
          <em>30 days</em>.
        </li>
      </ul>

      <h2>Deleting only some data</h2>
      <p>You don&apos;t have to delete your whole account. In the app you can:</p>
      <ul>
        <li>
          delete a child&apos;s profile and history: <em>Family → Privacy → Delete a child</em>;
        </li>
        <li>
          delete conversations, one or all for a child: <em>Family → Privacy → Delete conversations</em>;
        </li>
        <li>
          see, edit or clear BeePod&apos;s memory of your child: <em>Family → Privacy → What BeePod remembers</em>;
        </li>
        <li>
          choose how long conversations are kept: <em>Family → Privacy → Keep conversations</em>.
        </li>
      </ul>
      <p>
        Questions: <a href="mailto:info@beepodai.com">info@beepodai.com</a>
      </p>
      <p>
        See also our <Link href="/privacy">Privacy Policy</Link> and <Link href="/terms">Terms of Service</Link>.
      </p>
    </LegalLayout>
  );
}
