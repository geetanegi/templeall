import "./External.css";
import acecamLogoImg from "../assets/images/Logohtmlpage.png";
import AceCam_Logo_Noshadow from "../assets/images/AceCam_Logo_Noshadow.png";

const ExternalPrivacyPolicy = () => {
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
                        AceCam™ Golf Privacy Policy
                    </h1>
                    <p className="font-semibold">Last updated: 10/29/2024</p>
                </div>

                {/* <!-- Content Section --> */}
                <div className="mt-8">
                    <p className="font-nunito text-sm font-normal">
                        At AceCam™ Golf LLC ("AceCam," "we," "us," or "our"), we prioritize the privacy and security of
                        your personal information. As the provider of the AceCam mobile application ("AceCam App")
                        and associated services (collectively referred to as the "Services"), this Privacy Policy is designed to inform you about how we gather, utilize, share, and safeguard your information.

                    </p>
                    <p className="font-nunito text-sm font-normal mt-2">
                        This Privacy Policy outlines the types of personal data we collect, the purposes for which we
                        utilize that data, the methods of handling your information, and your rights related to your
                        personal data. We are committed to compliance with applicable privacy laws and regulations,
                        including the General Data Protection Regulation (GDPR) and the California Consumer Privacy
                        Act (CCPA).
                    </p>
                    <p className="font-nunito text-sm font-normal mt-2">
                        "Personal Data" refers to information that can identify you, either directly or indirectly, and may
                        include personally identifiable information ("PII"), financial information, and any other details you
                        voluntarily provide while using our Services.

                    </p>
                    <p className="font-nunito text-sm font-normal mt-2">
                        We collect your information when you engage with our Services and through various
                        interactions, including communications with us. The term "Services" encompasses our
                        application, website, and other platforms through which you may access this Privacy Policy.
                    </p>
                    <p className="font-nunito text-sm font-normal mt-2">
                        We may update this Privacy Policy periodically. If we make significant changes, we will notify
                        you by posting the revised policy on the AceCam App and our website. Changes will take effect
                        as of the "Last Updated" date indicated at the end of this Privacy Policy. Continued use of our
                        Services signifies your acceptance of the updated Privacy Policy. We encourage you to review
                        this document periodically for the latest information regarding our privacy practices.
                    </p>
                    <p className="font-nunito text-sm font-normal mt-2">
                        <strong> BY USING OUR SERVICES, YOU ACKNOWLEDGE AND CONSENT TO THE COLLECTION,
                            TRANSFER, STORAGE, DISCLOSURE, AND OTHER USES OF YOUR INFORMATION AS
                            DESCRIBED IN THIS PRIVACY POLICY. IF YOU DO NOT AGREE WITH THIS PRIVACY
                            POLICY, PLEASE DO NOT USE OUR SERVICES.</strong>
                    </p>

                    {/* <!-- Accounts and Membership Section --> */}
                    <h2 className="mt-8 text-2xl font-bold">Information We Collect
                    </h2>
                    <p className="font-nunito mt-2 text-sm font-normal">At AceCam, we gather different types of information to provide and enhance our Services. This
                        section details the categories of information we collect and how we obtain it.</p>
                    {/* <!-- Eligibility --> */}
                    <h3 className="mt-4 text-sm font-semibold">Personal Data
                    </h3>
                    <p className="font-nunito mt-2 text-sm font-normal">
                        When you register for an account or engage with our Services, you may be asked to provide
                        certain personal information, including but not limited to:
                    </p>
                    <ul className="list-inside list-disc">
                        <li className="font-nunito mt-2 text-sm font-medium">Name: <span className="font-normal"> To personalize your account and interactions.</span></li>
                        <li className="font-nunito mt-2 text-sm font-medium">Email Address: <span className="font-normal"> For communication, account verification, and updates.</span></li>
                        <li className="font-nunito mt-2 text-sm font-medium">Phone Number: <span className="font-normal">To facilitate account management and support services.</span></li>
                        <li className="font-nunito mt-2 text-sm font-medium">Physical Address: <span className="font-normal"> For billing purposes or where applicable.</span></li>
                        <li className="font-nunito mt-2 text-sm font-medium">Payment Information: <span className="font-normal">Such as credit card details, processed through third-party
                            payment processors</span></li>
                    </ul>

                    {/* <!-- Account Creation --> */}
                    <h3 className="mt-4 text-sm font-semibold">Usage Data</h3>
                    <p className="font-nunito mt-2 text-sm font-normal">
                        We automatically collect certain information about how you interact with our Services. This
                        information may include:
                    </p>
                    <ul className="list-inside list-disc">
                        <li className="font-nunito mt-2 text-sm font-medium">IP Address <span className="font-normal">To identify your device and provide location-based services</span></li>
                        <li className="font-nunito mt-2 text-sm font-medium">Device Type: <span className="font-normal">Such as mobile or desktop, including unique device identifiers.</span></li>
                        <li className="font-nunito mt-2 text-sm font-medium">Browser Type and Version:  <span className="font-normal">To optimize your experience with our Services.</span></li>
                        <li className="font-nunito mt-2 text-sm font-medium">Pages Visited: <span className="font-normal"> Information about the specific pages and features you access.</span></li>
                        <li className="font-nunito mt-2 text-sm font-medium">Time and Date of Visits: <span className="font-normal">To analyze usage patterns and improve our Services</span></li>
                        <li className="font-nunito mt-2 text-sm font-medium">Clickstream Data:<span className="font-normal"> A record of your activity within our Services.</span></li>

                    </ul>

                    {/* <!-- Account Security --> */}
                    <h3 className="mt-4 text-sm font-semibold">Cookies and Tracking Technologies
                    </h3>
                    <p className="font-nunito mt-2 text-sm font-normal">
                        We use cookies, web beacons, and similar tracking technologies to enhance your experience
                        and collect information about your usage of our Services. Cookies are small text files placed on
                        your device that help us recognize you and gather information about your preferences. You can
                        control cookie settings through your browser, but disabling cookies may limit your ability to use
                        certain features of our Services.
                    </p>

                    {/* <!-- Account Verification --> */}
                    <h3 className="mt-4 text-sm font-semibold">
                        Information Collected from Third Parties
                    </h3>
                    <p className="font-nunito mt-2 text-sm font-normal">
                        We may also obtain information about you from third parties, including social media platforms,
                        business partners, and analytics providers. This information may include:
                    </p>
                    <ul className="list-inside list-disc">
                        <li className="font-nunito mt-2 text-sm font-normal">Profile information (e.g., username, profile picture)</li>
                        <li className="font-nunito mt-2 text-sm font-normal">Interaction data from social media integrations</li>
                        <li className="font-nunito mt-2 text-sm font-normal">Demographic data to enhance our understanding of our users</li>

                    </ul>
                    <h3 className="mt-4 text-sm font-semibold">
                        Location Data
                    </h3>
                    <p className="font-nunito mt-2 text-sm font-normal">If you enable location services on your device, we may collect precise location data to provide
                        location-based features and enhance your user experience. You can control location settings
                        through your device’s privacy settings.
                    </p>
                    <h3 className="mt-4 text-sm font-semibold">
                        Key Points:
                    </h3>
                    <ul className="list-inside list-disc">
                        <li className="font-nunito mt-2 text-sm font-normal">The information we collect is vital for the functionality of our Services, enhancing user
                            experience, and ensuring compliance with legal obligations.</li>
                        <li className="font-nunito mt-2 text-sm font-normal">We strive to limit the collection of personal data to what is necessary for the effective
                            delivery of our Services.</li>
                    </ul>
                    <h2 className="mt-4 text-xl font-semibold">Accuracy and Responsibility
                    </h2>
                    <p className="font-nunito mt-2 text-sm font-normal">It is your responsibility to provide and maintain accurate, current, and complete personal
                        information when using AceCam’s Services. You agree to promptly update any information you
                        provide to ensure it remains accurate, complete, and up to date.
                    </p>
                    <p className="font-nunito mt-2 text-sm font-normal">AceCam is not responsible for any issues, problems, or liabilities that may arise due to
                        inaccurate, incomplete, or outdated information. We reserve the right to reject or delete any
                        account or entry that we believe in good faith to be false, fraudulent, or inconsistent with this
                        Privacy Policy.
                    </p>
                    <h2 className="mt-4 text-xl font-semibold">How We Use Your Information
                    </h2>
                    <p className="font-nunito mt-2 text-sm font-normal">At AceCam, we utilize the information we collect to provide, maintain, and enhance our
                        Services, as well as to communicate effectively with you. The primary purposes for which we
                        use your personal information include the following.
                    </p>
                    <ul className="list-inside list-disc">
                        <li className="font-nunito mt-2 text-sm font-normal">We use your information to facilitate the creation of accounts, enable access to our
                            Services, and manage your participation in contests and events. Personal data is
                            essential for processing transactions, managing user accounts, and ensuring a smooth
                            user experience.
                        </li>
                        <li className="font-nunito mt-2 text-sm font-normal">Your contact information is utilized to send notifications, updates, and promotional
                            content related to our Services. We may respond to inquiries, provide customer support,
                            and manage your account, which includes sending confirmations, invoices, and technical
                            notices.
                        </li>
                        <li className="font-nunito mt-2 text-sm font-normal">To improve our Services, we analyze user behavior and preferences, allowing us to
                            enhance functionality and develop new features. Your information helps us understand
                            how you interact with our Services, enabling us to tailor content and marketing efforts to
                            better meet your interests.
                        </li>
                        <li className="font-nunito mt-2 text-sm font-normal">We may also use your information to comply with applicable laws and regulations,
                            protect our rights and the rights of others, and prevent fraud or misuse of our Services.
                            In addition, we may send you promotional materials and information about upcoming
                            contests and special offers, provided you have given your consent to receive such
                            communications.
                        </li>
                    </ul>

                    <p className="font-nunito mt-2 text-sm font-normal">Lastly, your personal information may be used as necessary to resolve disputes, enforce our
                        agreements, and fulfill legal obligations.</p>
                    <p className="font-nunito mt-2 text-sm font-normal">We are committed to ensuring transparency in how your information is utilized, and we take
                        great care to respect your privacy rights in all our operations.</p>

                    <h2 className="mt-4 text-xl font-semibold">Cookies and Tracking Technologies
                    </h2>
                    <p className="font-nunito mt-2 text-sm font-normal">At AceCam, we utilize cookies and similar tracking technologies to enhance your experience
                        while using our Services. Cookies are small text files that are placed on your device by websites you visit. They allow the website to recognize your device and store certain information about
                        your preferences or past actions.
                    </p>
                    <h3 className="mt-4 text-sm font-semibold">Types of Cookies We Use:</h3>
                    <ol className="list-decimal list-inside">
                        <li className="font-nunito mt-2 text-sm font-bold">Session Cookies:<span className="font-normal">These are temporary cookies that remain on your device until you
                            leave our website or close the app. They help us remember your preferences during a
                            single browsing session.</span></li>
                        <li className="font-nunito mt-2 text-sm font-bold">Persistent Cookies:<span className="font-normal">These cookies remain on your device for a specified period or until
                            you manually delete them. They help us remember your preferences for future visits,
                            improving your overall experience.
                        </span></li>
                        <li className="font-nunito mt-2 text-sm font-bold">Third-Party Cookies:<span className="font-normal">We may also use third-party cookies from our partners to help us
                            analyze website traffic, deliver targeted advertisements, and enhance our marketing
                            efforts.
                        </span></li>
                    </ol >
                    <h3 className="mt-4 text-sm font-semibold">Purpose of Cookies:
                    </h3>
                    <p className="font-nunito mt-2 text-sm font-normal">Cookies help us understand how users interact with our Services. We use cookies for various
                        purposes, including:
                    </p>
                    <ul className="list-inside list-disc">
                        <li className="font-nunito mt-2 text-sm font-normal">To improve user experience by remembering your preferences and settings</li>
                        <li className="font-nunito mt-2 text-sm font-normal">To analyze website traffic and usage patterns, allowing us to enhance our Services and
                            develop new features.</li>
                        <li className="font-nunito mt-2 text-sm font-normal">To deliver targeted advertisements and promotional content based on your interests.
                        </li>
                    </ul>
                    <h3 className="mt-4 text-sm font-semibold">Managing Cookies:
                    </h3>
                    <p className="font-nunito mt-2 text-sm font-normal">You have the option to manage cookies through your browser settings. Most web browsers
                        allow you to control cookies through their settings, including blocking or deleting cookies.
                        However, please note that disabling cookies may impact the functionality and performance of
                        our Services
                    </p>
                    <p className="font-nunito mt-2 text-sm font-normal">For more information on how to manage cookies, please refer to your browser's help
                        documentation.
                    </p>
                    <p className="font-nunito mt-2 text-sm font-normal">By using our Services, you consent to the use of cookies and tracking technologies as
                        described in this Privacy Policy. If you do not agree with our cookie practices, please adjust your
                        browser settings accordingly or refrain from using our Services.
                    </p>
                    <h2 className="mt-4 text-xl font-bold">SMS Messaging Program
                    </h2>
                    <p className="font-nunito mt-2 text-sm font-bold">Program Name:<span className="font-normal">AceCam SMS Alerts
                    </span></p>
                    <p className="font-nunito mt-2 text-sm font-normal"> By providing your phone number, you consent to receive text messages from AceCam
                        regarding contests, promotions, and updates related to our Services. These messages may
                        include confirmations, notifications, and marketing content.</p>

                    <p className="font-nunito mt-2 text-sm font-bold">Cancellation:<span className="font-normal">You can cancel the SMS service at any time by texting "STOP" to the short code.
                        Upon sending the SMS message "STOP," you will receive a confirmation message indicating
                        that you have been unsubscribed. After this, you will no longer receive SMS messages from us.
                        If you wish to rejoin, simply sign up again as you did initially.
                    </span></p>
                    <p className="font-nunito mt-2 text-sm font-bold">Support:<span className="font-normal"> If you experience any issues with the messaging program, you can reply with the
                        keyword "HELP" for assistance or contact us directly at support@acecamgolf.com.
                    </span></p>
                    <p className="font-nunito mt-2 text-sm font-bold">Carrier Liability:<span className="font-normal">Please note that carriers are not liable for delayed or undelivered messages.
                    </span></p>
                    <p className="font-nunito mt-2 text-sm font-bold">Message and Data Rates:<span className="font-normal"> Standard message and data rates may apply for any messages sent
                        to you from us and to us from you.
                    </span></p>
                    <h2 className="mt-4 text-xl font-bold">Sharing Your Information
                    </h2>
                    <p className="font-nunito mt-2 text-sm font-normal">At AceCam, we are committed to protecting your personal information. However, there are
                        certain circumstances where we may share your information with third parties. This section
                        outlines the situations in which we may disclose your personal information:
                    </p>
                    <h3 className="mt-4 text-sm font-semibold">With Third-Party Service Providers
                    </h3>
                    <p className="font-nunito mt-2 text-sm font-normal">We may share your information with trusted third-party service providers who assist us in
                        operating our Services, conducting our business, or servicing you. These service providers are
                        required to keep your information confidential and are prohibited from using it for any other
                        purpose. Examples of such service providers include payment processors for handling financial
                        transactions, analytics providers to help us understand user behavior and improve our Services,
                        and email service providers for sending newsletters and promotional communications.
                    </p>
                    <h3 className="mt-4 text-sm font-semibold">For Legal Compliance</h3>
                    <p className="font-nunito mt-2 text-sm font-normal">We may disclose your information if required to do so by law or in response to valid requests by
                        public authorities (e.g., a court or government agency). This includes sharing information when
                        we believe that disclosure is necessary to comply with legal obligations, protect our rights, or
                        prevent fraud or abuse.
                    </p>
                    <h3 className="mt-4 text-sm font-semibold">In Business Transfers</h3>
                    <p className="font-nunito mt-2 text-sm font-normal">In the event of a merger, acquisition, or sale of all or a portion of our business or assets, your
                        personal information may be transferred as part of that transaction. We will provide notice
                        before your personal information is transferred and becomes subject to a different Privacy
                        Policy</p>
                    <h3 className="mt-4 text-sm font-semibold">With Your Consent</h3>
                    <p className="font-nunito mt-2 text-sm font-normal">We may share your information with third parties if you have provided your consent to do so.
                        This includes sharing information with social media platforms or other services you choose to
                        connect with AceCam.
                    </p>
                    <h3 className="mt-4 text-sm font-semibold">Aggregate and De-Identified Information
                    </h3>
                    <p className="font-nunito mt-2 text-sm font-normal">We may share aggregated or de-identified information that does not directly identify you. This
                        information can be used for various purposes, including research, marketing, or analysis
                    </p>
                    <h3 className="mt-4 text-sm font-semibold">For Contests and Promotions</h3>
                    <p className="font-nunito mt-2 text-sm font-normal">If you participate in contests or promotional events, we may share your information with
                        sponsors or partners involved in the contest or promotion. Your participation may require
                        sharing your name and other identifying information to fulfill prizes or recognition.
                    </p>
                    <p className="font-nunito mt-2 text-sm font-normal">We ensure that any third parties with whom we share your information maintain confidentiality
                        and comply with applicable privacy laws. Transparency is essential, and we will not sell or rent
                        your personal information to third parties for their own marketing purposes without your explicit
                        consent.
                    </p>

                    <h2 className="mt-4 text-xl font-bold">Third-Party Services
                    </h2>
                    <p className="font-nunito mt-2 text-sm font-normal">AceCam may integrate with various third-party services to enhance the functionality of our
                        platform. These services may include payment processors, analytics providers, social media
                        platforms, and other tools that assist in delivering our Services to you.
                    </p>
                    <h3 className="mt-4 text-sm font-semibold">Integration with Third-Party Services:</h3>
                    <p className="font-nunito mt-2 text-sm font-normal">may collect your personal information. The data collected by these services is governed by their
                        respective privacy policies, and we encourage you to review those policies to understand how
                        they handle your information.
                    </p>
                    <h3 className="mt-4 text-sm font-semibold">User Consent:</h3>
                    <p className="font-nunito mt-2 text-sm font-normal"> By using our Services, you consent to the sharing of your information with these
                        third-party services as necessary to provide you with the features and functionality of AceCam.
                        Please be aware that your interactions with these third-party services are subject to their terms
                        of service and privacy policies.
                    </p>
                    <h3 className="mt-4 text-sm font-semibold">Limitations of Responsibility:</h3>
                    <p className="font-nunito mt-2 text-sm font-normal">While we strive to work with reputable third parties, AceCam is
                        not responsible for the privacy practices, content, or actions of these third-party services. We
                        recommend that you exercise caution and review the privacy practices of any third-party
                        services before providing them with your personal information.</p>

                    <p className="font-nunito mt-3 text-sm font-normal">If you have any questions about how we work with third-party services or their impact on your
                        personal information, please contact us using the information provided in the "Contact Us"
                        section.
                    </p>
                    <h2 className="mt-4 text-xl font-bold">Data Security</h2>
                    <p className="font-nunito mt-3 text-sm font-normal">At AceCam, we prioritize the security of your personal information and implement a variety of
                        measures to protect it from unauthorized access, disclosure, alteration, and destruction. We
                        employ industry-standard security practices to ensure the safety of your data.
                    </p>
                    <p className="font-nunito mt-3 text-sm font-normal">We utilize encryption technologies to safeguard sensitive information transmitted over the
                        internet. This means that data exchanged between your device and our servers is encrypted,
                        making it difficult for unauthorized parties to intercept and read your personal information.
                    </p>
                    <p className="font-nunito mt-3 text-sm font-normal">Access to personal information is restricted to authorized personnel only. We have established
                        strict access controls and authentication procedures to ensure that only those who need access
                        to your data for legitimate business purposes can do so.</p>
                    <p className="font-nunito mt-3 text-sm font-normal">Additionally, we regularly conduct security assessments and audits to evaluate our data
                        protection measures and identify potential vulnerabilities. Our commitment to security includes
                        ongoing training for our staff on best practices for data handling and privacy protection.</p>
                    <p className="font-nunito mt-3 text-sm font-normal">While we take extensive precautions to protect your information, please be aware that no
                        method of transmission over the internet or electronic storage is 100% secure. Therefore, while
                        we strive to use commercially acceptable means to protect your personal data, we cannot
                        guarantee its absolute security</p>
                    <p className="font-nunito mt-3 text-sm font-normal">In the event of a data breach that affects your personal information, we will promptly notify you
                        in accordance with applicable laws and regulations. We are dedicated to maintaining your trust
                        by being transparent about how we manage and protect your data.</p>
                    <h2 className="mt-4 text-xl font-bold">Security of Your Information
                    </h2>
                    <p className="font-nunito mt-2 text-sm font-normal">At AceCam, we take the security of your personal information seriously and implement a variety
                        of measures to protect it from unauthorized access, disclosure, alteration, or destruction.
                    </p>
                    <h3 className="mt-4 text-sm font-semibold">Measures Implemented:<span className="font-nunito mt-2 text-sm font-normal">We utilize industry-standard security technologies and procedures to
                        safeguard your data. This includes, but is not limited to:</span></h3>
                    <ul className="list-inside list-disc">
                        <li className="font-nunito mt-2 text-sm font-medium">Encryption: <span className="font-normal">Sensitive information transmitted between your device and our servers is
                            encrypted using Secure Socket Layer (SSL) technology to ensure that your data remains
                            confidential during transmission.
                        </span></li>
                        <li className="font-nunito mt-2 text-sm font-medium">Secure Servers:
                            <span className="font-normal"> We host our Services on secure servers with limited access, designed
                                to protect against unauthorized access.
                            </span></li>
                        <li className="font-nunito mt-2 text-sm font-medium">Access Controls:
                            <span className="font-normal"> We implement strict access controls to limit access to personal
                                information to only those employees and service providers who need to know that
                                information for the purposes described in this Privacy Policy
                            </span></li>
                    </ul>

                    <h3 className="mt-4 text-sm font-semibold">User Responsibility:
                        <span className="font-nunito mt-2 text-sm font-normal">While we strive to protect your personal information, it is also important
                            for you to take precautions to protect your data. We recommend that you:
                        </span></h3>
                    <ul className="list-inside list-disc">
                        <li className="font-nunito mt-2 text-sm font-medium">Use strong, unique passwords for your accounts and change them regularly.</li>
                        <li className="font-nunito mt-2 text-sm font-medium"> Do not share your account details or personal information with others.</li>
                        <li className="font-nunito mt-2 text-sm font-medium">Log out of your account when using shared or public devices.</li>
                    </ul>
                    <h3 className="mt-4 text-sm font-semibold">Limitations:</h3>
                    <p className="font-nunito mt-2 text-sm font-normal"> Please be aware that, despite our efforts, no method of transmission over the
                        Internet or method of electronic storage is 100% secure. While we take reasonable steps to
                        protect your personal information, we cannot guarantee its absolute security. In the event of a
                        data breach, we will notify you as required by law.
                    </p>
                    <h2 className="mt-4 text-xl font-bold">International Data Transfers
                    </h2>
                    <p className="font-nunito mt-2 text-sm font-normal">At AceCam, we may transfer your personal information to countries outside of your home
                        country, including the United States, where data protection laws may differ from those in your
                        home country.
                    </p>
                    <h3 className="mt-4 text-sm font-semibold">Data Transfer Information:
                        <span className="font-nunito mt-2 text-sm font-normal">By using our Services, you acknowledge and agree that your
                            personal information may be transferred to and processed in a country outside of your home
                            jurisdiction.
                        </span>
                    </h3>
                    <h3 className="mt-4 text-sm font-semibold">Legal Basis for Transfer:
                        <span className="font-nunito mt-2 text-sm font-normal">We take steps to ensure that any international transfers of personal
                            data comply with applicable data protection laws. This may include entering into contractual
                            agreements with third parties or relying on other lawful mechanisms to ensure that your data is
                            adequately protected.
                        </span>
                    </h3>
                    <h3 className="mt-4 text-sm font-semibold">User Rights:
                        <span className="font-nunito mt-2 text-sm font-normal">Regardless of where your data is processed, you retain all rights regarding your
                            personal information as described in this Privacy Policy. We are committed to ensuring that your
                            personal data remains protected and that you can exercise your rights in relation to your data,
                            irrespective of the country in which it is processed.

                        </span>
                    </h3>
                    <p className="font-nunito mt-2 text-sm font-normal">
                        If you have any questions regarding our international data transfer practices or wish to exercise
                        your rights, please contact us using the information provided in the "Contact Us" section.
                    </p>

                    <h2 className="mt-4 text-xl font-bold">Your Rights Regarding Your Personal Information
                    </h2>
                    <p className="font-nunito mt-2 text-sm font-normal">As a user of AceCam, you have certain rights concerning your personal information. We are
                        committed to ensuring that you can exercise these rights in accordance with applicable data
                        protection laws. The rights you may have include the following:
                    </p>
                    <ol className="list-decimal list-inside">
                        <li className="font-nunito mt-2 text-sm font-bold">Right to Access:
                            <span className="font-normal">You have the right to request copies of your personal information held
                                by us. This allows you to know what data we have about you and how it is being used.
                            </span>
                        </li>
                        <li className="font-nunito mt-2 text-sm font-bold">Right to Correction:
                            <span className="font-normal">If you believe that any information we hold about you is inaccurate
                                or incomplete, you have the right to request that we correct or update it.
                            </span>
                        </li>
                        <li className="font-nunito mt-2 text-sm font-bold">Right to Deletion:
                            <span className="font-normal">You have the right to request the deletion of your personal
                                information when it is no longer necessary for the purposes for which it was collected, or
                                if you withdraw your consent.
                            </span>
                        </li>
                        <li className="font-nunito mt-2 text-sm font-bold">Right to Object:
                            <span className="font-normal">You have the right to object to the processing of your personal
                                information in certain circumstances, including when we are processing your data for
                                direct marketing purposes.

                            </span>
                        </li>
                        <li className="font-nunito mt-2 text-sm font-bold">Right to Restrict Processing:
                            <span className="font-normal">You can request that we restrict the processing of your
                                personal information if you contest the accuracy of the data, if our processing is unlawful,
                                or if you need us to retain your personal information for legal purposes.

                            </span>
                        </li>
                        <li className="font-nunito mt-2 text-sm font-bold">Right to Data Portability:
                            <span className="font-normal">You have the right to request that we transfer your personal
                                information to you or to a third party in a structured, commonly used, and
                                machine-readable format.
                            </span>
                        </li>
                        <li className="font-nunito mt-2 text-sm font-bold">Right to Withdraw Consent:
                            <span className="font-normal"> If you have provided consent for us to process your
                                personal information, you have the right to withdraw that consent at any time.

                            </span>
                        </li>
                    </ol>
                    <p className="font-nunito mt-2 text-sm font-normal">To exercise any of these rights, please contact us using the contact details provided in the
                        Contact section of this Privacy Policy. We may need to verify your identity before responding to
                        your request, and we will aim to respond to your requests within a reasonable timeframe,
                        typically within 30 days.
                    </p>
                    <p className="font-nunito mt-2 text-sm font-normal">We may refuse to comply with requests that are unreasonably repetitive, require excessive
                        technical effort, or jeopardize the privacy of others.
                    </p>
                    <h2 className="mt-4 text-xl font-bold">Data Retention
                    </h2>
                    <p className="font-nunito mt-2 text-sm font-normal">At AceCam, we are committed to retaining your personal information only for as long as
                        necessary to fulfill the purposes for which it was collected, in accordance with applicable laws
                        and regulations</p>
                    <p className="font-nunito mt-2 text-sm font-normal">
                        We retain your personal data for the following purposes:
                    </p>

                    <ol className="list-decimal list-inside">
                        <li className="font-nunito mt-2 text-sm font-bold">Service Provision:
                            <span className="font-normal">We keep your information as long as your account is active or as
                                needed to provide you with our Services. This includes maintaining your account,
                                processing transactions, and enabling participation in contests and events.
                            </span>
                        </li>
                        <li className="font-nunito mt-2 text-sm font-bold">Legal Obligations:
                            <span className="font-normal">Certain data may be retained for a longer period if required to
                                comply with legal obligations, resolve disputes, or enforce our agreements. This may
                                include information necessary for tax, accounting, or other legal requirements.
                            </span>
                        </li>
                        <li className="font-nunito mt-2 text-sm font-bold">Account Management:
                            <span className="font-normal">If you choose to close your account, we will retain your
                                information for a reasonable period to ensure compliance with any applicable laws and
                                to respond to any legal inquiries or obligations..
                            </span>
                        </li>
                        <li className="font-nunito mt-2 text-sm font-bold">Aggregated Data:
                            <span className="font-normal">We may retain and use aggregated or de-identified information that
                                does not directly identify you for analytical purposes, research, and service
                                improvement.
                            </span>
                        </li>
                    </ol>
                    <p className="font-nunito mt-2 text-sm font-normal">When your personal information is no longer necessary for the purposes for which it was
                        collected, or if you request its deletion and it is no longer required for legal or legitimate
                        business purposes, we will take reasonable steps to securely delete or anonymize your data.
                    </p>
                    <p className="font-nunito mt-2 text-sm font-normal">We will ensure that any retained personal information is protected according to our data security
                        practices.
                    </p>

                    <h2 className="mt-4 text-xl font-bold">User Rights Regarding Data
                    </h2>
                    <p className="font-nunito mt-2 text-sm font-normal">At AceCam, we recognize that you have certain rights regarding your personal information. This
                        section outlines your rights and how you can exercise them:
                    </p>
                    <p className="font-nunito mt-2 text-sm font-bold">At AceCam, we recognize that you have certain rights regarding your personal information. This
                        section outlines your rights and how you can exercise them:
                    </p>
                    <p className="font-nunito mt-2 text-sm font-bold">Access to Personal Data:<span className="font-normal">You have the right to request access to the personal information we
                        hold about you. Upon request, we will provide you with a copy of your personal data, subject to
                        applicable laws</span>
                    </p>
                    <p className="font-nunito mt-2 text-sm font-bold">Correction of Information:<span className="font-normal"> If you believe that any information we hold about you is inaccurate
                        or incomplete, you have the right to request that we correct it. You can submit a request for
                        correction, and we will make the necessary updates as required by law.
                    </span>
                    </p>
                    <p className="font-nunito mt-2 text-sm font-bold">Deletion of Data:<span className="font-normal">You have the right to request the deletion of your personal information when it
                        is no longer necessary for the purposes for which it was collected, or if you withdraw your
                        consent (where applicable). We will respond to your deletion request in accordance with
                        applicable laws.
                    </span>
                    </p>
                    <p className="font-nunito mt-2 text-sm font-bold">Data Portability:<span className="font-normal">You have the right to obtain your personal information in a structured,
                        commonly used, and machine-readable format. You may request a copy of your data to transfer
                        it to another service provider.
                    </span>
                    </p>
                    <p className="font-nunito mt-2 text-sm font-bold">Withdrawal of Consent:<span className="font-normal">
                        If we are processing your personal information based on your consent,
                        you have the right to withdraw that consent at any time. Withdrawing your consent will not affect
                        the lawfulness of processing based on consent before its withdrawal.
                    </span>
                    </p>

                    <p className="font-nunito mt-2 text-sm font-normal">
                        If you would like to exercise any of these rights, please contact us using the information
                        provided in the "Contact Us" section.
                    </p>
                    <h2 className="mt-4 text-xl font-bold">Compliance with Laws</h2>
                    <p className="font-nunito mt-2 text-sm font-normal">At AceCam, we are committed to ensuring that our practices regarding the collection, use, and
                        protection of personal information comply with applicable laws and regulations. This
                        commitment is integral to maintaining user trust and protecting your privacy</p>
                    <p className="font-nunito mt-2 text-sm font-bold">Applicable Regulations: <span className="font-normal"> Our data protection practices adhere to various laws and regulations,
                        including, but not limited to:</span>
                    </p>
                    <ul className="list-inside list-disc">
                        <li className="font-nunito mt-2 text-sm font-normal">The General Data Protection Regulation (GDPR) for users located in the European
                            Union.</li>
                        <li className="font-nunito mt-2 text-sm font-normal">The California Consumer Privacy Act (CCPA) for residents of California, USA.</li>
                        <li className="font-nunito mt-2 text-sm font-normal">Any other applicable local, state, national, or international laws governing data protection
                            and privacy.
                        </li>
                    </ul>
                    <p className="font-nunito mt-2 text-sm font-bold">Commitment to Compliance: <span className="font-normal">  We regularly review and update our practices to ensure
                        compliance with these regulations. This includes implementing necessary security measures, providing users with clear information about their rights, and responding to user requests
                        regarding their personal information in accordance with the law</span>
                    </p>
                    <p className="font-nunito mt-2 text-sm font-bold">User Rights Under Specific Laws:<span className="font-normal"> : Under these regulations, users may have specific rights
                        regarding their personal information, including the right to access, correct, delete, and obtain
                        their data, as well as the right to withdraw consent for processing. We are dedicated to honoring
                        these rights and providing users with the necessary tools to manage their personal data
                        effectively.
                    </span>
                    </p>
                    <h2 className="mt-4 text-xl font-bold">Children's Privacy
                    </h2>
                    <p className="font-nunito mt-3 text-sm font-normal">At AceCam, we are committed to protecting the privacy of children. Our Services are not
                        designed for children under the age of 13, and we do not knowingly collect personal information
                        from children in this age group. If we become aware that we have inadvertently collected
                        personal information from a child under 13, we will take steps to delete that information
                        promptly.
                    </p>
                    <p className="font-nunito mt-3 text-sm font-normal">Parents or guardians of children under 13 are encouraged to monitor their children's online
                        activities and instruct them not to provide personal information without parental consent. If you
                        believe that we have collected personal information from a child under 13, please contact us
                        using the contact information provided in the Contact section of this Privacy Policy.
                    </p>
                    <p className="font-nunito mt-3 text-sm font-normal">For users who are between the ages of 13 and 17, we encourage parents or guardians to
                        discuss the importance of online privacy and safety. While individuals in this age group may use
                        our Services, they must do so with the consent of their parent or guardian.
                    </p>
                    <p className="font-nunito mt-3 text-sm font-normal">In compliance with the Children's Online Privacy Protection Act (COPPA), we take the following
                        measures to protect children's privacy:</p>

                    <ul className="list-inside list-disc">
                        <li className="font-nunito mt-2 text-sm font-normal">We limit the collection of personal information to what is necessary to provide our
                            Services.
                        </li>
                        <li className="font-nunito mt-2 text-sm font-normal">We provide clear information about our practices regarding the collection and use of
                            personal information.
                        </li>
                        <li className="font-nunito mt-2 text-sm font-normal">We will not sell or share personal information collected from children with third parties
                        </li>
                    </ul>
                    <p className="font-nunito mt-3 text-sm font-normal">If we decide to change our policies regarding children's data in the future, we will update this
                        section to reflect those changes and ensure compliance with applicable laws.
                    </p>

                    <h2 className="mt-4 text-xl font-bold">Contact Us</h2>
                    <p className="font-nunito mt-3 text-sm font-normal"> If you have any questions, concerns, or complaints regarding this Privacy Policy or our data
                        practices, we encourage you to reach out to us. You can contact us using the following details:
                    </p>
                    <p className="font-nunito mt-3 text-sm font-normal">Email: support@acecamgolf.com</p>
                    <p className="font-nunito mt-3 text-sm font-normal"> Mailing Address: 1012 Equestrian Dr, South Lyon, MI 48178</p>
                    <p className="font-nunito mt-3 text-sm font-normal">We aim to respond to all inquiries within 48 hours. Your feedback is important to us, and we are
                        committed to addressing any issues or concerns you may have regarding your privacy and our
                        use of your personal information.</p>


                    <h2 className="mt-4 text-xl font-bold">Changes to This Privacy Policy
                    </h2>
                    <p className="font-nunito mt-3 text-sm font-normal">We reserve the right to update or modify this Privacy Policy at any time. When we make
                        changes, we will revise the "Last Updated" date at the top of this Privacy Policy. We may also
                        notify you through other means, such as by sending an email or providing a notice within our
                        Services.
                    </p>
                    <p className="font-nunito mt-3 text-sm font-normal">It is important that you review this Privacy Policy periodically to stay informed about how we are
                        protecting your information. Your continued use of our Services after any modifications to this
                        Privacy Policy will constitute your acknowledgment of the modifications and your consent to
                        abide by and be bound by the modified policy.
                    </p>
                    <p className="font-nunito mt-3 text-sm font-normal">If we make significant changes to this Privacy Policy that affect your rights, we will provide you
                        with clear and prominent notice, such as via email or a notification within the Services.
                    </p>
                    <h2 className="mt-5 text-xl font-bold">Conclusion</h2>
                    <p className="font-nunito mt-3 text-sm font-normal">This Privacy Policy outlines our commitment to protecting your personal information and your
                        rights regarding that information. By using AceCam's Services, you acknowledge that you have
                        read and understood this Privacy Policy, and you agree to the collection, use, and sharing of
                        your information as described herein.
                    </p>
                    <p className="font-nunito mt-3 text-sm font-normal">We are dedicated to transparency, security, and compliance with applicable data protection
                        laws. If you have any questions or concerns regarding this Privacy Policy, please do not hesitate
                        to contact us using the information provided in the "Contact Us" section.
                    </p>
                    <p className="font-nunito mt-3 text-sm font-normal">Thank you for choosing Ac</p>
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
        </body >
    );
};

export default ExternalPrivacyPolicy;
