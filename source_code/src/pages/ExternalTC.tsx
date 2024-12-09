import "./External.css";
import acecamLogoImg from "../assets/images/Logohtmlpage.png";
import AceCam_Logo_Noshadow from "../assets/images/AceCam_Logo_Noshadow.png";

const ExternalTC = () => {
  return (
    <body className="content-container text-white">
      <div className="container mx-auto p-6" style={{ width: "976px" }}>
        {/* <!-- Header Section --> */}
        <div className="text-center">
          <div className="mb-4 flex items-center justify-center">
            {/* <!-- Logo --> */}
            <div className="flex h-[168px] w-[220px] items-center justify-center rounded-full">
              <img src={acecamLogoImg} alt="AceCam Logo" className="w-full" />
            </div>
          </div>
          <h1 className="mb-2 text-xl font-bold" style={{ color: "#ffde59" }}>
            AceCam™ Golf Terms and Conditions
          </h1>
          <p className="font-semibold">Last updated: 10/29/2024</p>
        </div>

        {/* <!-- Content Section --> */}
        <div className="mt-8">
          <p className="font-nunito text-sm font-normal">
            These terms and conditions (“<strong>Agreement</strong>”) set forth
            the general terms and conditions of your use of the “AceCam™ Golf”
            mobile application (“Mobile Application” or “Service”) and any of
            its related products and services (collectively, “Services”). This
            Agreement is legally binding between you (“User”, “you” or “your”)
            and AceCam™ Golf LLC (doing business as “AceCam”, “we”, “us” or
            “our”).
          </p>
          <p className="font-nunito text-sm font-normal">
            If you are entering into this Agreement on behalf of a business or
            other legal entity, you represent that you have the authority to
            bind such entity to this Agreement, in which case the terms “User”,
            “you” or “your” shall refer to such entity. If you do not have such
            authority, or if you do not agree with the terms of this Agreement,
            you must not accept this Agreement and may not access and use the
            Mobile Application and Services.
          </p>
          <p className="font-nunito text-sm font-normal">
            By accessing and using the Mobile Application and Services, you
            acknowledge that you have read, understood, and agree to be bound by
            the terms of this Agreement. You acknowledge that this Agreement is
            a contract between you and AceCam, even though it is electronic and
            is not physically signed by you, and it governs your use of the
            Mobile Application and Services.
          </p>

          {/* <!-- Accounts and Membership Section --> */}
          <h2 className="mt-8 text-2xl font-bold">Accounts and Membership</h2>

          {/* <!-- Eligibility --> */}
          <h3 className="mt-4 text-xl font-semibold">1. Eligibility</h3>
          <p className="font-nunito mt-2 text-sm font-normal">
            To use the AceCam Mobile Application and Services, you must be at
            least 13 years of age. If you are under 18, you may create an
            account and use all social media features but are not permitted to
            participate in contests or any skill-based competition. By creating
            an account, you represent and warrant that you meet these age
            requirements. If you are accessing the Services on behalf of a
            business or other legal entity, you affirm that you have the
            authority to bind such entity to these Terms.
          </p>

          {/* <!-- Account Creation --> */}
          <h3 className="mt-4 text-xl font-semibold">2. Account Creation</h3>
          <p className="font-nunito mt-2 text-sm font-normal">
            To access certain features of our Services, you may be required to
            create an account. When creating an account, you agree to provide
            accurate, current, and complete information about yourself as
            prompted by the registration form and to update such information as
            necessary to keep it accurate, current, and complete. You are solely
            responsible for maintaining the confidentiality of your account
            credentials and for all activities that occur under your account.
          </p>

          {/* <!-- Account Security --> */}
          <h3 className="mt-4 text-xl font-semibold">3. Account Security</h3>
          <p className="font-nunito mt-2 text-sm font-normal">
            You agree to notify AceCam immediately of any unauthorized use of
            your account or any other breach of security. AceCam will not be
            liable for any loss or damage arising from your failure to comply
            with this security obligation. We reserve the right to suspend or
            terminate your account if we suspect any unauthorized activity or
            violation of these Terms.
          </p>

          {/* <!-- Account Verification --> */}
          <h3 className="mt-4 text-xl font-semibold">
            4. Account Verification
          </h3>
          <p className="font-nunito mt-2 text-sm font-normal">
            AceCam reserves the right, but not the obligation, to verify any
            information provided during the account creation process. We may
            monitor and review new accounts before granting access to our
            Services. This includes, but is not limited to, confirming your age
            and identity.
          </p>

          {/* <!-- Account Suspension and Termination --> */}
          <h3 className="mt-4 text-xl font-semibold">
            5. Account Suspension and Termination
          </h3>
          <p className="font-nunito mt-2 text-sm font-normal">
            We reserve the right to suspend or terminate your account at any
            time, with or without cause or notice, including but not limited to
            instances where you violate these Terms, engage in conduct harmful
            to our reputation, or misuse our Services. If your account is
            terminated for any reason, you may not re-register for the Services.
          </p>

          {/* <!-- User Responsibilities --> */}
          <h3 className="mt-4 text-xl font-semibold">
            6. User Responsibilities
          </h3>
          <p className="font-nunito mt-2 text-sm font-normal">
            You agree to use your account only for lawful purposes and in
            accordance with these Terms. You are responsible for all actions
            taken under your account and for ensuring that your account is not
            used by any unauthorized persons.
          </p>

          {/* <!-- Membership Benefits --> */}
          <h3 className="mt-4 text-xl font-semibold">7. Membership Benefits</h3>
          <p className="font-nunito mt-2 text-sm font-normal">
            Upon creating an account, you may receive access to certain features
            and benefits of the AceCam Services, including personalized content,
            notifications, and the ability to participate in contests and events
            (if you are 18 years or older). Membership benefits may vary and are
            subject to change at our discretion.
          </p>

          {/* <!-- Changes to Membership Terms --> */}
          <h3 className="mt-4 text-xl font-semibold">
            8. Changes to Membership Terms
          </h3>
          <p className="font-nunito mt-2 text-sm font-normal">
            AceCam reserves the right to modify these membership terms at any
            time. We will notify you of any material changes by posting a notice
            in the Mobile Application or via email. Your continued use of the
            Services after any changes constitutes your acceptance of the
            modified terms.
          </p>
        </div>
        <div>
          {/* <!-- Accounts and Membership Section --> */}
          <h2 className="mt-8 text-2xl font-bold">User Content </h2>

          {/* <!-- Eligibility --> */}
          <h3 className="mt-4 text-xl font-semibold">
            1. Ownership of User Content
          </h3>
          <p className="font-nunito mt-2 text-sm font-normal">
            You retain ownership of any content you submit, post, or display
            (collectively, “User Content”) through the Mobile Application and
            Services. By submitting User Content, you grant AceCam a worldwide,
            non-exclusive, royalty-free, perpetual, and irrevocable license to
            use, reproduce, modify, publish, and distribute such User Content
            for the purpose of providing and promoting our Services.
          </p>

          {/* <!-- Account Creation --> */}
          <h3 className="mt-4 text-xl font-semibold">
            2. User Responsibilities
          </h3>
          <p className="font-nunito mt-2 text-sm font-normal">
            You are solely responsible for the User Content you create and share
            through our Services. This includes ensuring that your User Content
            does not violate any third-party rights, including copyright,
            trademark, privacy, or publicity rights. You warrant that you have
            the necessary rights to grant AceCam the license granted in this
            Agreement.
          </p>

          {/* <!-- Account Security --> */}
          <h3 className="mt-4 text-xl font-semibold">
            3. Monitoring and Review
          </h3>
          <p className="font-nunito mt-2 text-sm font-normal">
            While AceCam does not routinely monitor User Content, we reserve the
            right to review, monitor, and remove any User Content that, in our
            sole discretion, violates these Terms or is otherwise objectionable.
            We may take such actions without prior notice and will not be liable
            for any loss or damage resulting from our decision to remove User
            Content.
          </p>

          {/* <!-- Account Verification --> */}
          <h3 className="mt-4 text-xl font-semibold">4. Prohibited Content</h3>
          <p className="font-nunito mt-2 text-sm font-normal">
            You agree not to submit User Content that:
            <ul className="list-inside list-disc">
              <li className="font-nunito mt-2 text-sm font-normal">
                Is unlawful, harmful, threatening, abusive, harassing,
                defamatory, vulgar, obscene, or otherwise objectionable;
              </li>
              <li className="font-nunito mt-2 text-sm font-normal">
                {" "}
                Infringes upon the intellectual property rights of any third
                party;
              </li>
              <li className="font-nunito mt-2 text-sm font-normal">
                Contains software viruses or any other computer code, files, or
                programs designed to interrupt, destroy, or limit the
                functionality of any computer software or hardware;
              </li>
              <li className="font-nunito mt-2 text-sm font-normal">
                Promotes or encourages illegal activity or conduct that is
                harmful to others.
              </li>
            </ul>
          </p>

          {/* <!-- Account Suspension and Termination --> */}
          <h3 className="mt-4 text-xl font-semibold">
            5. Reporting Violations
          </h3>
          <p className="font-nunito mt-2 text-sm font-normal">
            If you become aware of any User Content that violates these Terms,
            please report it to us at support@acecamgolf.com. We will
            investigate any such reports and take appropriate action.
          </p>

          {/* <!-- User Responsibilities --> */}
        </div>
        <div>
          {/* <!-- Accounts and Membership Section --> */}
          <h2 className="mt-8 text-2xl font-bold">User Responsibilities</h2>
          <p className="font-nunito text-sm font-normal">
            As a user of the AceCam Mobile Application and Services, you agree
            to the following responsibilities:
          </p>
          {/* <!-- Eligibility --> */}
          <h3 className="mt-4 text-xl font-semibold">1. Account Security</h3>
          <p className="font-nunito mt-2 text-sm font-normal">
            You are responsible for maintaining the confidentiality of your
            account credentials and for all activities that occur under your
            account. You must notify AceCam immediately of any unauthorized use
            of your account or any other breach of security.
          </p>

          {/* <!-- Account Creation --> */}
          <h3 className="mt-4 text-xl font-semibold">
            2. Accurate Information
          </h3>
          <p className="font-nunito mt-2 text-sm font-normal">
            You agree to provide accurate, current, and complete information
            during the registration process and to update such information to
            keep it accurate, current, and complete.
          </p>

          {/* <!-- Account Security --> */}
          <h3 className="mt-4 text-xl font-semibold">3.Compliance with Laws</h3>
          <p className="font-nunito mt-2 text-sm font-normal">
            You agree to use the Services in compliance with all applicable
            laws, regulations, and ordinances. You are responsible for ensuring
            that your participation in contests or other activities facilitated
            by AceCam does not violate any local laws or regulations.
          </p>

          {/* <!-- Account Verification --> */}
          <h3 className="mt-4 text-xl font-semibold">
            4. Respect for Other Users
          </h3>
          <p className="font-nunito mt-2 text-sm font-normal">
            You agree to treat other users with respect and to refrain from any
            behavior that could be considered abusive, harassing, or otherwise
            harmful to other users.
          </p>

          {/* <!-- Account Suspension and Termination --> */}
          <h3 className="mt-4 text-xl font-semibold">
            5. Content Responsibility
          </h3>
          <p className="font-nunito mt-2 text-sm font-normal">
            You are solely responsible for any User Content you submit, post, or
            display while using the Services. AceCam is not responsible for the
            accuracy, legality, or appropriateness of any User Content, and you
            agree to indemnify AceCam for any claims arising from your User
            Content
          </p>

          {/* <!-- Account Suspension and Termination --> */}
          <h3 className="mt-4 text-xl font-semibold">
            6. Notification of Issues
          </h3>
          <p className="font-nunito mt-2 text-sm font-normal">
            If you encounter any issues while using the Services, including
            technical difficulties or content-related concerns, you agree to
            notify AceCam promptly at support@acecamgolf.com.
          </p>
          <h3 className="mt-4 text-xl font-semibold">
            7. Participation in Contests
          </h3>
          <p className="font-nunito mt-2 text-sm font-normal">
            If you participate in any contests facilitated by AceCam, you agree
            to abide by the rules and regulations set forth for those contests.
            You acknowledge that your performance may be recorded and shared as
            part of the contest experience.
          </p>

          {/* <!-- User Responsibilities --> */}
        </div>


        <div>
          {/* <!-- Accounts and Membership Section --> */}
          <h2 className="mt-8 text-2xl font-bold">Prohibited Activities</h2>
          <p className="font-nunito text-sm font-normal">
            In addition to other terms set forth in these Terms and Conditions, you are prohibited from using
            the AceCam Mobile Application and Services or any Content in any of the following ways:

          </p>
          {/* <!-- Eligibility --> */}
          <h3 className="mt-4 text-xl font-semibold">1. Illegal Activities</h3>
          <p className="font-nunito mt-2 text-sm font-normal">
            For any unlawful purpose or to solicit others to participate in unlawful
            acts.
          </p>

          {/* <!-- Account Creation --> */}
          <h3 className="mt-4 text-xl font-semibold">
            2. Regulatory Violations
          </h3>
          <p className="font-nunito mt-2 text-sm font-normal">
            To violate any international, federal, provincial, state regulations,
            rules, laws, or local ordinances.
          </p>

          {/* <!-- Account Security --> */}
          <h3 className="mt-4 text-xl font-semibold">3. Intellectual Property Infringement</h3>
          <p className="font-nunito mt-2 text-sm font-normal">
            To infringe upon or violate AceCam’s intellectual
            property rights or the intellectual property rights of others.
          </p>

          {/* <!-- Account Verification --> */}
          <h3 className="mt-4 text-xl font-semibold">
            4. Harassment and Discrimination
          </h3>
          <p className="font-nunito mt-2 text-sm font-normal">
            To harass, abuse, insult, harm, defame, slander,
            disparage, intimidate, or discriminate against any individual based on gender, sexual
            orientation, religion, ethnicity, race, age, national origin, or disability.
          </p>

          {/* <!-- Account Suspension and Termination --> */}
          <h3 className="mt-4 text-xl font-semibold">
            5. False Information
          </h3>
          <p className="font-nunito mt-2 text-sm font-normal">
            To submit false or misleading information
          </p>

          {/* <!-- Account Suspension and Termination --> */}
          <h3 className="mt-4 text-xl font-semibold">
            6. Malicious Software
          </h3>
          <p className="font-nunito mt-2 text-sm font-normal">
            To upload or transmit viruses or any other type of malicious code
            that may affect the functionality or operation of the Mobile Application and Services,
            third-party products and services, or the Internet
          </p>
          <h3 className="mt-4 text-xl font-semibold">
            7. Spam and Data Mining
          </h3>
          <p className="font-nunito mt-2 text-sm font-normal">
            To spam, phish, pharm, pretext, spider, crawl, or scrape the
            Services or any associated content.

          </p>
          <h3 className="mt-4 text-xl font-semibold">
            8. Obscene or Immoral Purposes
          </h3>
          <p className="font-nunito mt-2 text-sm font-normal">
            For any obscene, immoral, or unethical purposes
          </p>
          <h3 className="mt-4 text-xl font-semibold">
            9. Interference with Security
          </h3>
          <p className="font-nunito mt-2 text-sm font-normal">
            To interfere with or circumvent the security features of the
            Mobile Application and Services, third-party products and services, or the Internet.
          </p>
          <h3 className="mt-4 text-xl font-semibold">
            10. Unauthorized Access
          </h3>
          <p className="font-nunito mt-2 text-sm font-normal">
            Attempting to gain unauthorized access to other users’ accounts
            or AceCam’s computer networks, systems, or infrastructure, by any means.
          </p>
          <h3 className="mt-4 text-xl font-semibold">
            11. Reverse Engineering
          </h3>
          <p className="font-nunito mt-2 text-sm font-normal">
            Attempting in any way to reverse engineer, decompile, disrupt, or
            disassemble any part of the Services or its security features.
          </p>

          <h3 className="mt-4 text-xl font-semibold">
            Reverse EngineeringReporting Violations
          </h3>
          <p className="font-nunito mt-2 text-sm font-normal">
            If you observe any violations of these prohibitions, please report them to
            us at support@acecamgolf.com. We reserve the right to investigate any reported violations and
            to terminate your use of the Mobile Application and Services for violating any of the prohibited
            uses.
          </p>
          {/* <!-- User Responsibilities --> */}
        </div>

        <div>
          {/* <!-- Accounts and Membership Section --> */}
          <h2 className="mt-8 text-2xl font-bold">Third-Party Links</h2>
          <p className="font-nunito text-sm font-normal">
            The AceCam Mobile Application and Services may contain links to third-party websites,
            applications, or services that are not owned or controlled by AceCam. We do not control these
            third-party services and assume no responsibility for their content, privacy policies, or practices
          </p>
          {/* <!-- Eligibility --> */}
          <h3 className="mt-4 text-xl font-semibold">1. No Endorsement</h3>
          <p className="font-nunito mt-2 text-sm font-normal">
            The inclusion of any link or embedded content does not imply endorsement by AceCam
            of the activities or content of these sites, nor any association with their operators.
          </p>

          {/* <!-- Account Creation --> */}
          <h3 className="mt-4 text-xl font-semibold">
            2. User Responsibility
          </h3>
          <p className="font-nunito mt-2 text-sm font-normal">
            You acknowledge that by accessing third-party links, you assume all risks associated
            with known or unknown outcomes. AceCam is not responsible for any damage or loss
            resulting from your interactions with such third-party sites or services.
          </p>

          {/* <!-- Account Security --> */}
          <h3 className="mt-4 text-xl font-semibold">3. Examples of Third-Party Links
          </h3>
          <p className="font-nunito mt-2 text-sm font-normal">
            Examples of third-party sites or services that may be linked to include, but are not limited
            to, social media platforms (e.g., Facebook, Instagram, Twitter), video sharing services
            (e.g., YouTube), and other websites that may offer content sharing capabilities
          </p>

          {/* <!-- Account Verification --> */}
          <h3 className="mt-4 text-xl font-semibold">
            4. Consent for Use of Content
          </h3>
          <p className="font-nunito mt-2 text-sm font-normal">
            If you participate in contests or events organized by AceCam, you may consent to the
            use of photos or videos taken during those events for p
          </p>

          {/* <!-- Account Suspension and Termination --> */}
          <h3 className="mt-4 text-xl font-semibold">
            5. Embedded Content
          </h3>
          <p className="font-nunito mt-2 text-sm font-normal">
            Any content that is embedded or linked to from third-party sites is provided for your
            convenience. Your use of such content is at your own risk, and we encourage you to
            review the terms and conditions of any third-party services you interact with.
          </p>


        </div>

        <div>
          {/* <!-- Accounts and Membership Section --> */}
          <h2 className="mt-8 text-2xl font-bold">Intellectual Property Rights
          </h2>
          {/* <!-- Eligibility --> */}
          <h3 className="mt-4 text-xl font-semibold">1. Ownership</h3>
          <p className="font-nunito mt-2 text-sm font-normal">
            All content, features, and functionality of the AceCam Mobile Application and Services, including
            but not limited to text, graphics, logos, icons, images, audio clips, video clips, software, and data
            compilations (collectively, “Content”), are the exclusive property of AceCam Golf LLC and its
            licensors. This Content is protected by United States and international copyright, trademark,
            patent, trade secret, and other intellectual property or proprietary rights laws.

          </p>

          {/* <!-- Account Creation --> */}
          <h3 className="mt-4 text-xl font-semibold">
            2. License to Users
          </h3>
          <p className="font-nunito mt-2 text-sm font-normal">
            Subject to your compliance with these Terms, AceCam grants you a limited, non-exclusive,
            non-transferable, and revocable license to access and use the Mobile Application and Services
            for personal, non-commercial purposes. This license does not permit you to:
          </p>
          <ul className="list-inside list-disc">
            <li className="font-nunito mt-2 text-sm font-normal">
              Copy, modify, create derivative works of, publicly display, publicly perform, republish, or
              distribute any Content from the Mobile Application or Services.

            </li>
            <li className="font-nunito mt-2 text-sm font-normal">
              Use any data mining, robots, or similar data gathering and extraction tools on the Mobile
              Application or Services.
            </li>
            <li className="font-nunito mt-2 text-sm font-normal">
              Remove, alter, or obscure any copyright, trademark, or other proprietary rights notices
              from copies of materials from the Mobile Application or Services.
            </li>
            <li className="font-nunito mt-2 text-sm font-normal">
              Promotes or encourages illegal activity or conduct that is
              harmful to others.
            </li>
          </ul>

          {/* <!-- Account Security --> */}
          <h3 className="mt-4 text-xl font-semibold">3. User Restrictions</h3>
          <p className="font-nunito mt-2 text-sm font-normal">You agree not to:</p>
          <ul className="list-inside list-disc">
            <li className="font-nunito mt-2 text-sm font-normal">
              Use the Mobile Application or Services in any manner that could disable, overburden,
              damage, or impair the Services or interfere with any other party's use of the Services.
            </li>
            <li className="font-nunito mt-2 text-sm font-normal">
              Use the Mobile Application or Services for any illegal or unauthorized purpose, or in
              violation of any applicable law or regulation.

            </li>
            <li className="font-nunito mt-2 text-sm font-normal">
              Use any Content for commercial purposes without obtaining a license to do so from
              AceCam or our licensors.
            </li>
          </ul>

          {/* <!-- Account Verification --> */}
          <h3 className="mt-4 text-xl font-semibold">
            4. Third-Party Trademarks
          </h3>
          <p className="font-nunito mt-2 text-sm font-normal">
            All trademarks, service marks, and trade names (collectively, "Marks") that appear on the Mobile
            Application and Services are the property of AceCam or other respective owners. You may not
            use any Marks without the prior written permission of AceCam or the respective trademark
            owner
          </p>

          {/* <!-- Account Suspension and Termination --> */}
          <h3 className="mt-4 text-xl font-semibold">
            5. Reporting Infringement
          </h3>
          <p className="font-nunito mt-2 text-sm font-normal">
            If you believe that your intellectual property rights have been violated by any User Content or
            other materials on the Mobile Application or Services, please contact us at
            support@acecamgolf.com. We will investigate any claims of infringement and take appropriate
            action in accordance with applicable laws.
          </p>

          {/* <!-- User Responsibilities --> */}
        </div>
        <div>
          {/* <!-- Accounts and Membership Section --> */}
          <h2 className="mt-8 text-2xl font-bold">Indemnification
          </h2>
          {/* <!-- Eligibility --> */}
          <h3 className="mt-4 text-xl font-semibold">1. User Agreement to Indemnify</h3>
          <p className="font-nunito mt-2 text-sm font-normal">
            You agree to indemnify, defend, and hold harmless AceCam Golf LLC, its affiliates, licensors,
            and service providers, and its and their respective officers, directors, employees, contractors,
            agents, suppliers, licensors, and successors (collectively, the "Indemnified Parties") from and
            against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees
            (including reasonable attorneys' fees) arising out of or relating to your violation of these Terms
            or your use of the Mobile Application and Services, including, but not limited to:
          </p>
          <ul className="list-inside list-disc">
            <li className="font-nunito mt-2 text-sm font-normal">
              Your User Content.
            </li>
            <li className="font-nunito mt-2 text-sm font-normal">
              Your violation of any applicable law or regulation
            </li>
            <li className="font-nunito mt-2 text-sm font-normal">
              Your infringement of any third-party rights, including intellectual property rights or rights
              of privacy.

            </li>
            <li className="font-nunito mt-2 text-sm font-normal">
              Any breach of your representations and warranties set forth in these Terms.
            </li>
          </ul>

          {/* <!-- Account Creation --> */}
          <h3 className="mt-4 text-xl font-semibold">
            2. Scope of Indemnification
          </h3>
          <p className="font-nunito mt-2 text-sm font-normal">
            The indemnification obligations outlined herein apply to any claims made by third parties arising from your conduct while using the Services, including but not limited to any unauthorized use of
            the Services, any content you post, or any other actions taken in connection with your account.
          </p>


          {/* <!-- Account Security --> */}
          <h3 className="mt-4 text-xl font-semibold">3. Legal Fees</h3>
          <p className="font-nunito mt-2 text-sm font-normal">In the event of any claim or legal action arising from your use of the Services, you agree to
            reimburse AceCam for all reasonable legal fees and expenses incurred in connection with the
            investigation and defense of such claims, including any settlement costs.</p>
          {/* <!-- Account Verification --> */}
          <h3 className="mt-4 text-xl font-semibold">
            4. Notification of Claims
          </h3>
          <p className="font-nunito mt-2 text-sm font-normal">
            In the event that any claim is brought against any of the Indemnified Parties, we will provide you
            with written notice of such claim. You will have the right to assume the defense of the claim with
            counsel reasonably acceptable to AceCam; however, you shall not settle any claim without the
            prior written consent of AceCam, which consent shall not be unreasonably withheld.

          </p>

          {/* <!-- Account Suspension and Termination --> */}
          <h3 className="mt-4 text-xl font-semibold">
            5. Course-Related Indemnification
          </h3>
          <p className="font-nunito mt-2 text-sm font-normal">
            You agree to indemnify and hold harmless the Indemnified Parties from any claims, liabilities,
            damages, judgments, losses, costs, expenses, or fees (including reasonable attorneys' fees)
            arising from your interactions with golf courses using the AceCam Services, including but not
            limited to:
          </p>
          <ul className="list-inside list-disc">
            <li className="font-nunito mt-2 text-sm font-normal">
              Any disputes arising from reservations, participation in events, or any other activities
              conducted at or related to such courses.
            </li>
            <li className="font-nunito mt-2 text-sm font-normal">
              Your violation of any applicable law or regulation
            </li>
            <li className="font-nunito mt-2 text-sm font-normal">
              Your infringement of any third-party rights, including intellectual property rights or rights
              of privacy.

            </li>
            <li className="font-nunito mt-2 text-sm font-normal">
              Your compliance with the rules, policies, and procedures of the golf courses you interact
              with while using our Services.
            </li>
          </ul>

        </div>
        <div>
          {/* <!-- Accounts and Membership Section --> */}
          <h2 className="mt-8 text-2xl font-bold">Limitation of Liability
          </h2>
          {/* <!-- Eligibility --> */}
          <h3 className="mt-4 text-xl font-semibold">1. Disclaimer of Warranties</h3>
          <p className="font-nunito mt-2 text-sm font-normal">
            The Services provided by AceCam, including but not limited to the Mobile Application, the
            capture of video and photographic content, and the facilitation of contests and events, are
            offered on an "as-is" and "as-available" basis. AceCam makes no representations or warranties
            of any kind, either express or implied, regarding the reliability, availability, accuracy, or
            completeness of the Services. Specifically, AceCam disclaims all warranties, express or implied,
            including but not limited to implied warranties of merchantability, fitness for a particular purpose,
            and non-infringement. We do not guarantee that the Services will be uninterrupted, secure, or
            free from errors or harmful components.
          </p>

          {/* <!-- Account Creation --> */}
          <h3 className="mt-4 text-xl font-semibold">
            2. Limitation of Liability
          </h3>
          <p className="font-nunito mt-2 text-sm font-normal">
            To the maximum extent permitted by applicable law, in no event shall AceCam or its affiliates,
            licensors, or service providers be liable for any indirect, incidental, consequential, special, or
            punitive damages, including but not limited to loss of profits, loss of data, loss of use, or any
            other damages arising out of or in connection with your access to or use of, or inability to access
            or use, the Services, including the capturing and sharing of video or photographic content, or
            any linked websites.

          </p>
          {/* <!-- Account Security --> */}
          <h3 className="mt-4 text-xl font-semibold">3. Exclusions </h3>
          <p className="font-nunito mt-2 text-sm font-normal">Some jurisdictions do not allow the exclusion or limitation of liability for consequential or
            incidental damages, so the limitations above may not apply to you. In such jurisdictions,
            AceCam's liability is limited to the fullest extent permitted by law.
          </p>
          {/* <!-- Account Verification --> */}
          <h3 className="mt-4 text-xl font-semibold">
            4.  Maximum Liability
          </h3>
          <p className="font-nunito mt-2 text-sm font-normal">
            In any event, AceCam's total liability to you for all claims arising out of or relating to these Terms
            or your use of the Services shall not exceed the amounts paid by you, if any, for accessing the
            Services in the twelve (12) months preceding the claim. This limitation applies specifically to any
            claims related to the content captured by the AceCam platform and any contests facilitated
            through our Services
          </p>
        </div>
        <div>
          {/* <!-- Accounts and Membership Section --> */}
          <h2 className="mt-8 text-2xl font-bold">Dispute Resolution

          </h2>
          {/* <!-- Eligibility --> */}
          <h3 className="mt-4 text-xl font-semibold">1. Governing Law</h3>
          <p className="font-nunito mt-2 text-sm font-normal">
            This Agreement shall be governed by and construed in accordance with the laws of the State of
            Michigan, without regard to its conflict of law principles. By using the AceCam Mobile
            Application and Services, you consent to the jurisdiction of the courts located in Michigan for
            any disputes arising out of this Agreement.
          </p>

          {/* <!-- Account Creation --> */}
          <h3 className="mt-4 text-xl font-semibold">
            2. Arbitration Agreement
          </h3>
          <p className="font-nunito mt-2 text-sm font-normal">
            You agree that any disputes, claims, or controversies arising out of or relating to this Agreement
            or your use of the Services shall be resolved through binding arbitration rather than in court. The
            arbitration will be conducted by the American Arbitration Association (AAA) in accordance with
            its Consumer Arbitration Rules. The arbitration shall take place in Michigan, and you and
            AceCam agree to submit to the personal jurisdiction of the state and federal courts located in
            Michigan for the purposes of enforcement of this arbitration agreement.
          </p>
          {/* <!-- Account Security --> */}
          <h3 className="mt-4 text-xl font-semibold">3. Waiver of Jury Trial</h3>
          <p className="font-nunito mt-2 text-sm font-normal">You acknowledge and agree that by entering into this Agreement, you are waiving your right to a
            jury trial. This means that any dispute will be decided by a neutral arbitrator instead of a judge or
            jury.

          </p>
          {/* <!-- Account Verification --> */}
          <h3 className="mt-4 text-xl font-semibold">
            4. Class Action Waiver
          </h3>
          <p className="font-nunito mt-2 text-sm font-normal">
            You further agree that any disputes will be conducted on an individual basis, and not as a class
            action or representative action. This means that you may not bring a claim as a class member or
            representative in any lawsuit against AceCam.
          </p>
          <h3 className="mt-4 text-xl font-semibold">
            5. Contest Disputes
          </h3>
          <p className="font-nunito mt-2 text-sm font-normal">
            Any disputes arising from or related to contests facilitated by AceCam, including but not limited
            to eligibility, scoring, verification of shots, and prizes, shall also be subject to the arbitration
            requirements outlined in this section. Participants acknowledge that while AceCam strives for
            accuracy in shot verification, unforeseen events or technical malfunctions may result in
            inaccuracies. Therefore, you agree that AceCam shall not be held liable for any discrepancies in
            scoring or verification that may arise during contests. All contest-related disputes must be resolved through binding arbitration, and participants waive any right to pursue claims in court or
            on a class basis.
          </p>
          <h3 className="mt-4 text-xl font-semibold">
            6. Notice of Dispute
          </h3>
          <p className="font-nunito mt-2 text-sm font-normal">
            If you have a dispute with AceCam, you must first notify us in writing at
            support@acecamgolf.com, providing us with a description of the dispute and the relief you seek.
            We will make every effort to resolve the dispute amicably. If we are unable to resolve the dispute
            within thirty (30) days after we receive your notice, you may then initiate arbitration as described
            above.
          </p>
        </div>
        <div>
          {/* <!-- Accounts and Membership Section --> */}
          <h2 className="mt-8 text-2xl font-bold">Changes to the Terms
          </h2>
          {/* <!-- Eligibility --> */}
          <h3 className="mt-4 text-xl font-semibold">1. Right to Modify</h3>
          <p className="font-nunito mt-2 text-sm font-normal">
            AceCam Golf LLC reserves the right to modify these Terms at any time in its sole discretion. Any
            changes will be made to improve user experience, comply with legal requirements, or reflect
            changes in our services.
          </p>

          {/* <!-- Account Creation --> */}
          <h3 className="mt-4 text-xl font-semibold">
            2. Notification of Changes
          </h3>
          <p className="font-nunito mt-2 text-sm font-normal">
            When changes are made to these Terms, we will notify you by posting the revised Terms in the
            Mobile Application and/or sending you an email to the address associated with your account. It
            is your responsibility to review the Terms periodically to stay informed about any updates.
          </p>
          {/* <!-- Account Security --> */}
          <h3 className="mt-4 text-xl font-semibold">3. Effective Date of Changes</h3>
          <p className="font-nunito mt-2 text-sm font-normal">Changes to these Terms will take effect immediately upon posting in the Mobile Application or
            as otherwise indicated in the notification. The "Last Updated" date at the beginning of these
            Terms will be revised to reflect the date of the most recent changes.
          </p>
          {/* <!-- Account Verification --> */}
          <h3 className="mt-4 text-xl font-semibold">
            4. Continued Use
          </h3>
          <p className="font-nunito mt-2 text-sm font-normal">
            You further agree that any disputes will be conducted on an individual basis, and not as a class
            action or representative action. This means that you may not bring a claim as a class member or
            representative in any lawsuit against AceCam.
          </p>
          <h3 className="mt-4 text-xl font-semibold">
            5. Contest Disputes
          </h3>
          <p className="font-nunito mt-2 text-sm font-normal">
            Your continued use of the Mobile Application and Services after the effective date of the revised
            Terms constitutes your acceptance of the modified Terms. If you do not agree to the changes,
            you must stop using the Services immediately.
          </p>
        </div>
        <div>
          {/* <!-- Accounts and Membership Section --> */}
          <h2 className="mt-8 text-2xl font-bold">Termination
          </h2>
          {/* <!-- Eligibility --> */}
          <h3 className="mt-4 text-xl font-semibold">1. Termination by AceCam</h3>
          <p className="font-nunito mt-2 text-sm font-normal">
            AceCam Golf LLC reserves the right to terminate or suspend your access to the Mobile
            Application and Services, without prior notice or liability, for any reason, including but not limited
            to:
          </p>
          <ul className="list-inside list-disc">
            <li className="font-nunito mt-2 text-sm font-normal">
              Violation of these Terms.
            </li>
            <li className="font-nunito mt-2 text-sm font-normal">
              Engaging in conduct that AceCam, in its sole discretion, deems harmful to the Services
              or other users
            </li>
            <li className="font-nunito mt-2 text-sm font-normal">
              Failure to provide accurate information during account registration.
            </li>
            <li className="font-nunito mt-2 text-sm font-normal">
              Any behavior that negatively impacts AceCam's reputation or goodwill.
            </li>
          </ul>

          {/* <!-- Account Creation --> */}
          <h3 className="mt-4 text-xl font-semibold">
            2. User Termination
          </h3>
          <p className="font-nunito mt-2 text-sm font-normal">
            You may terminate your account at any time by contacting AceCam at
            support@acecamgolf.com. Upon termination, you will no longer have access to your account
            and any associated content
          </p>
          {/* <!-- Account Security --> */}
          <h3 className="mt-4 text-xl font-semibold">3. Effects of Termination</h3>
          <p className="font-nunito mt-2 text-sm font-normal">Changes to these Terms will take effect immediately upon posting in the Mobile Application or
            Upon termination of your account:
          </p>

          <ul className="list-inside list-disc">
            <li className="font-nunito mt-2 text-sm font-normal">
              All of your User Content may be deleted from our systems, and you may lose access to
              any personalized content or features associated with your account.
            </li>
            <li className="font-nunito mt-2 text-sm font-normal">
              Any outstanding obligations or liabilities incurred prior to the termination shall remain in
              effect.
            </li>
          </ul>

          {/* <!-- Account Verification --> */}
          <h3 className="mt-4 text-xl font-semibold">
            4. Survival of Terms
          </h3>
          <p className="font-nunito mt-2 text-sm font-normal">
            The provisions of these Terms that by their nature should survive termination shall survive,
            including but not limited to ownership provisions, indemnification, limitations of liability, and
            dispute resolution.
          </p>
        </div>

        <div>
          {/* <!-- Accounts and Membership Section --> */}
          <h2 className="mt-8 text-2xl font-bold">Miscellaneous
          </h2>
          {/* <!-- Eligibility --> */}
          <h3 className="mt-4 text-xl font-semibold">1. Severability</h3>
          <p className="font-nunito mt-2 text-sm font-normal">
            If any provision of these Terms is found to be unenforceable or invalid by a court of competent
            jurisdiction, the remaining provisions of these Terms will remain in full force and effect. The
            unenforceable provision will be deemed modified to the extent necessary to make it
            enforceable.
          </p>

          {/* <!-- Account Creation --> */}
          <h3 className="mt-4 text-xl font-semibold">
            2. Waiver
          </h3>
          <p className="font-nunito mt-2 text-sm font-normal">
            The failure of AceCam to enforce any right or provision of these Terms shall not be deemed a
            waiver of such right or provision or any other right or provision. Any waiver of any provision of
            these Terms will be effective only if in writing and signed by an authorized representative of
            AceCam.
          </p>
          {/* <!-- Account Security --> */}
          <h3 className="mt-4 text-xl font-semibold">3. Entire Agreement</h3>
          <p className="font-nunito mt-2 text-sm font-normal">These Terms, along with the Privacy Policy and any other legal notices or agreements published
            by AceCam, constitute the entire agreement between you and AceCam regarding your use of
            the Services. They supersede all prior agreements and understandings, whether written or oral,
            regarding the subject matter
          </p>

          {/* <!-- Account Verification --> */}
          <h3 className="mt-4 text-xl font-semibold">
            4. Assignment
          </h3>
          <p className="font-nunito mt-2 text-sm font-normal">
            AceCam may assign its rights and obligations under these Terms at any time, in whole or in
            part, without notice. You may not assign or transfer any of your rights or obligations under these
            Terms without prior written consent from AceCam.

          </p>
          <h3 className="mt-4 text-xl font-semibold">
            4. Force Majeure
          </h3>
          <p className="font-nunito mt-2 text-sm font-normal">
            AceCam shall not be liable for any failure to perform its obligations under these Terms if such
            failure results from any cause beyond AceCam's reasonable control, including, but not limited
            to, mechanical, electronic, or communications failure or degradation
          </p>
        </div>
        <div>
          {/* <!-- Accounts and Membership Section --> */}
          <h2 className="mt-8 text-2xl font-bold">Contact Information

          </h2>
          <p className="font-nunito mt-2 text-sm font-normal">If you have any questions, concerns, or requests regarding these Terms or your use of the
            AceCam Mobile Application and Services, please contact us at:</p>
          <p className="font-nunito mt-3 text-sm font-normal">
            Email: support@acecamgolf.com
            Physical Address: 1012 Equestrian Dr, South Lyon, MI 48178
            Last Updated: October 22, 2024
          </p>
          <p className="font-nunito mt-3 text-sm font-normal">
            We aim to respond to all inquiries within 48 hours. Your feedback and questions are important to
            us, and we are here to help!
          </p>
          <h2 className="mt-8 text-2xl font-bold">Effective Date</h2>
          <p className="font-nunito mt-3 text-sm font-normal">
            These Terms and Conditions are effective as of October 22, 2024. By accessing or using the
            AceCam Mobile Application and Services, you acknowledge that you have read, understood,
            and agree to be bound by these Terms.
          </p>
        </div>
        <img src={AceCam_Logo_Noshadow} alt="" className="sticky-image" />
        {/* <!-- Footer Section --> */}
        <footer className="mt-12 text-center text-sm">
          <p className="text-gray-300">
            <a href="#" className="text-link hover:underline">
              Contact Us
            </a>
          </p>
          <p className="mt-2 text-gray-500">
            © 2024 AceCam Golf, LLC. All rights reserved.
          </p>
        </footer>
      </div>
    </body>
  );
};

export default ExternalTC;
