import React from 'react';
import LogoWhite from '../../assets/img/logos/IrisInsights_white.svg';
import checkIcon from '../../assets/img/checkIcon.svg';
import { Link } from 'react-router-dom';
export default function PostSubmissionForm(): React.JSX.Element {
    return (
        <div data-testid="post-submission-form">
            <div
                className="sticky top-0 z-50 w-full h-16 flex justify-between
            items-center bg-gradient-to-r
            from-[#47AAC9] from-50% to-transparent"
            >
                <div className="ml-4">
                    <Link
                        className=" text-sm font-semibold text-white"
                        aria-label="Brand"
                        to={''}
                    >
                        <div className="Branding w-32">
                            <img
                                src={LogoWhite}
                                alt="Branding"
                                width="150"
                                height="150"
                            />
                        </div>
                    </Link>
                </div>
            </div>
            <div className="font-['Lato'] my-24 ">
                <div className="flex justify-center">
                    <img src={checkIcon} alt="view" />
                    Form Submitted Successfully.
                </div>
                <div className="flex justify-center">
                    Your form has been submitted, You can close the browser.
                </div>
            </div>
        </div>
    );
}
