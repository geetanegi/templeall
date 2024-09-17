import * as React from 'react';
import Carousal from '../components/Carousal';
import CopyRightFooter from '../components/Log-in/copyRightFooter';
import loginBackground from '../assets/img/loginBackground.svg';
import LogoColoured from '../assets/img/logos/IrisInsights_coloured.svg';

const withLayout = (WrappedComponent: React.FC) => {
    return function LoginLayoutContainer(props: any) {
        return (
            <div
                className=" flex flex-col h-full"
                style={{
                    backgroundImage: `url(${loginBackground})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right',
                    backgroundSize: '',
                }}
            >
                <header className="text-4xl mt-3 ml-5  md:ml-20">
                    <img
                        src={LogoColoured}
                        alt="Branding"
                        width="320"
                        height="320"
                        data-testid="branding-logo"
                    />
                </header>
                <div className="mid flex flex-col md:flex-row h-[51rem]">
                    <Carousal />
                    <WrappedComponent {...props} className="flex-1" />
                </div>
                <footer className="fixed w-full bottom-0">
                    <CopyRightFooter />
                </footer>
            </div>
        );
    };
};

export default withLayout;
