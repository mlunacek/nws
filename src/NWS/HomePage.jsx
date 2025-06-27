import { Box } from '@mui/material';
import PageHeader from "@/utils/PageHeader";
import PageContainer from '@/utils/PageContainer';

const HomePage = () => {

    return (
        <PageContainer>
            <PageHeader title="Home" />
            <img src={`${process.env.PUBLIC_URL}/icons/logo.svg`} className="App-logo" alt="logo" />
        </PageContainer>
    )
};

export default HomePage;