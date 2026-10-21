import { Link } from 'wouter';
import { LegalLayout } from '@/components/LegalLayout';

export default function Privacy() {
  return (
    <LegalLayout title="BeePod AI Privacy Policy" effectiveDate="21 October 2026">
      <p>
        BeePod AI Inc. (&quot;BeePod AI&quot;, &quot;we&quot;, &quot;us&quot;) makes BeePod, a voice companion for children and
        teenagers aged 5 to 17, and the BeePod AI app that parents use with it. This policy explains what we
        collect, why, who helps us process it, how long we keep it, and the choices you have.
      </p>
      <p>
        We wrote it to be read. If anything is unclear, email{' '}
        <a href="mailto:info@beepodai.com">info@beepodai.com</a>.
      </p>

      <h2>The short version</h2>
      <ul>
        <li>A parent creates the account and gives consent before BeePod collects anything about a child.</li>
        <li>
          We use your family&apos;s information only to run BeePod and the app. We never sell it, never use it for
          advertising, and never use it to train AI models.
        </li>
        <li>
          We don&apos;t keep recordings of your child&apos;s voice. Conversations are turned into text, and you choose
          whether transcripts are saved and for how long.
        </li>
        <li>You can see, download and delete your family&apos;s information at any time in the app.</li>
      </ul>

      <h2>Who this policy covers</h2>
      <ul>
        <li>
          <strong>Parents and guardians</strong> who use the BeePod AI app.
        </li>
        <li>
          <strong>Children</strong> who talk to BeePod. Children don&apos;t create accounts or use the app; a parent
          sets up their profile and controls their data.
        </li>
      </ul>

      <h2>What we collect</h2>

      <h3>From you (the parent)</h3>
      <table>
        <thead>
          <tr>
            <th>What</th>
            <th>Why</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td data-label="What">Email address</td>
            <td data-label="Why">
              Signing in with a one-time code, and emails you ask for (invitations, data downloads)
            </td>
          </tr>
          <tr>
            <td data-label="What">Your name</td>
            <td data-label="Why">
              Shown to other guardians in your family and used by BeePod when it passes on your messages
            </td>
          </tr>
          <tr>
            <td data-label="What">Your consent record (date, notice version, method)</td>
            <td data-label="Why">Proof that a parent agreed before we collected anything about a child</td>
          </tr>
          <tr>
            <td data-label="What">Messages you send your child (text, or voice notes)</td>
            <td data-label="Why">
              Delivering them to BeePod, which reads them aloud. Voice notes are turned into text; we don&apos;t keep
              the audio
            </td>
          </tr>
          <tr>
            <td data-label="What">Your conversations with Beepo, the parents&apos; assistant</td>
            <td data-label="Why">Answering your questions and making the changes you ask for</td>
          </tr>
          <tr>
            <td data-label="What">Settings you choose</td>
            <td data-label="Why">
              Running BeePod the way you set it up (quiet hours, time limits, alerts, transcript retention)
            </td>
          </tr>
        </tbody>
      </table>

      <h3>About your child (entered by you)</h3>
      <table>
        <thead>
          <tr>
            <th>What</th>
            <th>Why</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td data-label="What">Name or nickname, age, country, languages</td>
            <td data-label="Why">So BeePod talks to them by name, at the right level, in the right language</td>
          </tr>
          <tr>
            <td data-label="What">Interests and learning goals</td>
            <td data-label="Why">So BeePod&apos;s chats and learning pathways fit them</td>
          </tr>
          <tr>
            <td data-label="What">&quot;Tell us more&quot; notes</td>
            <td data-label="Why">Anything you choose to share to help BeePod talk to them the right way</td>
          </tr>
        </tbody>
      </table>

      <h3>When your child talks to BeePod</h3>
      <table>
        <thead>
          <tr>
            <th>What</th>
            <th>Why</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td data-label="What">The conversation, as text</td>
            <td data-label="Why">To reply. If you choose to save transcripts, you can read them in the app</td>
          </tr>
          <tr>
            <td data-label="What">Summaries of each chat (topics, what they learned, ideas for you)</td>
            <td data-label="Why">Showing you what your child explored, and tailoring future chats</td>
          </tr>
          <tr>
            <td data-label="What">A short memory of things your child shared (for example, a favourite animal)</td>
            <td data-label="Why">So BeePod remembers them from one chat to the next. You can view and delete it</td>
          </tr>
          <tr>
            <td data-label="What">Safety alerts</td>
            <td data-label="Why">
              If a chat suggests your child may be at risk, we tell you, with a short excerpt so you can understand
              what happened
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        Your child&apos;s voice is processed live to understand them and to reply.{' '}
        <strong>We don&apos;t store audio recordings of your child.</strong>
      </p>

      <h3>From your devices</h3>
      <table>
        <thead>
          <tr>
            <th>What</th>
            <th>Why</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td data-label="What">Push notification token</td>
            <td data-label="Why">Sending you alerts and messages</td>
          </tr>
          <tr>
            <td data-label="What">App version and error reports</td>
            <td data-label="Why">Keeping the app working and fixing crashes</td>
          </tr>
          <tr>
            <td data-label="What">BeePod device information (serial number, battery, Wi-Fi status, software version)</td>
            <td data-label="Why">Showing you whether BeePod is online and keeping it updated</td>
          </tr>
        </tbody>
      </table>
      <p>
        The app asks for <strong>Bluetooth, location and local network</strong> access only while you set BeePod up, to
        find it and send it your Wi-Fi details. We don&apos;t collect or store your location. It asks for the{' '}
        <strong>camera</strong> only to scan a code on BeePod, and the <strong>microphone</strong> only when you record
        a voice note or talk to Beepo.
      </p>

      <h2>How we use it</h2>
      <p>Only to:</p>
      <ul>
        <li>provide BeePod and the app, and the features you turn on;</li>
        <li>keep your child safe and tell you when something needs your attention;</li>
        <li>send you sign-in codes, alerts and emails you ask for;</li>
        <li>keep the service secure and fix problems.</li>
      </ul>
      <p>
        We don&apos;t use your family&apos;s information for advertising, we don&apos;t sell it, and we don&apos;t use
        it to train AI models.
      </p>

      <h2>Who helps us run BeePod</h2>
      <p>
        We use a small number of service providers. They process information only on our instructions and only to
        provide their service to us.
      </p>
      <table>
        <thead>
          <tr>
            <th>Provider</th>
            <th>What they do</th>
            <th>What they receive</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td data-label="Provider">DigitalOcean</td>
            <td data-label="What they do">Hosts our servers, database and the AI models that write summaries</td>
            <td data-label="What they receive">All service data, stored encrypted</td>
          </tr>
          <tr>
            <td data-label="Provider">ElevenLabs</td>
            <td data-label="What they do">Speech recognition and BeePod&apos;s voice</td>
            <td data-label="What they receive">Your child&apos;s speech while they talk, and text to be spoken</td>
          </tr>
          <tr>
            <td data-label="Provider">Resend</td>
            <td data-label="What they do">Sends emails</td>
            <td data-label="What they receive">Your email address and the email content</td>
          </tr>
          <tr>
            <td data-label="Provider">Expo, Apple and Google</td>
            <td data-label="What they do">Deliver push notifications</td>
            <td data-label="What they receive">
              Your push token and a short notification. Notifications never contain your child&apos;s words
            </td>
          </tr>
          <tr>
            <td data-label="Provider">Exa</td>
            <td data-label="What they do">Web search when your child asks a question BeePod needs to look up</td>
            <td data-label="What they receive">The search question only, with no names or account details</td>
          </tr>
        </tbody>
      </table>
      <p>
        We require our AI providers not to use your family&apos;s information to train their models, and we use
        zero-retention settings where a provider offers them.
      </p>
      <p>
        We may also disclose information if the law requires it, to protect a child&apos;s safety, or as part of a
        merger or sale of the company (in which case this policy continues to apply).
      </p>

      <h2>Children&apos;s privacy</h2>
      <p>
        BeePod is designed for children, so we follow the U.S. Children&apos;s Online Privacy Protection Act (COPPA) and
        similar laws.
      </p>
      <p>
        These protections apply to every child on BeePod, including teenagers aged 13 to 17, not only to children under
        13 as COPPA requires.
      </p>
      <ul>
        <li>We collect information about a child only after a parent has given consent.</li>
        <li>A parent can review the child&apos;s information, ask us to delete it, and stop further collection at any time.</li>
        <li>
          Withdrawing consent stops BeePod from chatting, stops all new collection, and starts deleting the child&apos;s
          information.
        </li>
        <li>We collect only what BeePod needs to work.</li>
        <li>BeePod never tells a child that their conversations are secret from their parents.</li>
      </ul>

      <h2>How long we keep it</h2>
      <table>
        <thead>
          <tr>
            <th>What</th>
            <th>How long</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td data-label="What">Transcripts of your child&apos;s chats</td>
            <td data-label="How long">
              Your choice: not saved, 30 days, 90 days, 1 year, or until you delete them. A nightly job removes older ones
            </td>
          </tr>
          <tr>
            <td data-label="What">Summaries, learning progress and BeePod&apos;s memory</td>
            <td data-label="How long">While your account exists, unless you delete them</td>
          </tr>
          <tr>
            <td data-label="What">Your child&apos;s voice</td>
            <td data-label="How long">Not stored</td>
          </tr>
          <tr>
            <td data-label="What">Voice notes you send</td>
            <td data-label="How long">The audio is turned into text and not kept</td>
          </tr>
          <tr>
            <td data-label="What">Safety alert excerpts</td>
            <td data-label="How long">A limited period, then deleted</td>
          </tr>
          <tr>
            <td data-label="What">Backups</td>
            <td data-label="How long">Deleted data leaves our backups within 7 days</td>
          </tr>
        </tbody>
      </table>
      <p>
        When you delete a child or your account, we delete the related information and ask our providers to delete
        theirs.
      </p>

      <h2>Your choices and rights</h2>
      <p>In the app you can:</p>
      <ul>
        <li>view and edit your child&apos;s profile and BeePod&apos;s memory;</li>
        <li>read, or turn off, saved transcripts and change how long they&apos;re kept;</li>
        <li>
          <strong>download</strong> your family&apos;s data;
        </li>
        <li>
          <strong>delete</strong> a child&apos;s information or your whole account;
        </li>
        <li>withdraw consent.</li>
      </ul>
      <p>
        You can also email <a href="mailto:info@beepodai.com">info@beepodai.com</a>. We respond within 30 days and may
        ask you to confirm your identity first. Depending on where you live, you may have further rights (such as
        correction or objection), and you can complain to your local data protection authority.
      </p>

      <h2>Security</h2>
      <p>
        All connections are encrypted (TLS). Your child&apos;s words and personal details (transcripts, memory,
        summaries and &quot;Tell us more&quot; notes) are encrypted again in our database with a key held separately
        from the data. Sign-in uses one-time codes, so there&apos;s no password to steal. No system is perfectly secure,
        but we work to protect your information and will tell you if a breach affects it.
      </p>

      <h2>Where your data is processed</h2>
      <p>
        We and our providers may process information in the United States and other countries. Where the law requires
        it, we use appropriate safeguards for international transfers.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        If we make a significant change, we&apos;ll tell you in the app or by email before it takes effect. The date at
        the top shows when it last changed.
      </p>

      <h2>Contact</h2>
      <p>
        BeePod AI Inc.
        <br />
        Delaware, USA
        <br />
        <a href="mailto:info@beepodai.com">info@beepodai.com</a>
      </p>
      <p>
        See also our <Link href="/terms">Terms of Service</Link>.
      </p>
    </LegalLayout>
  );
}
