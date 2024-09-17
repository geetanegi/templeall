import * as React from 'react';
import withLayout from '../../containers/MasterLayoutContainer';
import EmailFormattingGrid from '../../components/MetaDataManagement/EmailFormatting/emailFormattingGrid';

function EmailFormattingGridPage(): React.JSX.Element {
    return <EmailFormattingGrid />;
}
export default withLayout(EmailFormattingGridPage);
