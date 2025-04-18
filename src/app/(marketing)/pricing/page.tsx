'use client';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';

import { Seo } from '@/components/seo';
import { PricingPlan } from '@/sections/marketing/pricing/pricing-plan';
import { PricingPlanIcon } from '@/sections/marketing/pricing/pricing-plan-icon';
import {PricingFaqs} from "@/sections/marketing/pricing/pricing-faqs";
import {HomeFaqs} from "@/sections/marketing/home/home-faqs";

const Page = () => {

  return (
    <>
      <Seo title="Pricing" />
      <Box
        component="main"
        sx={{ flexGrow: 1 }}
      >
        <Box
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark' ? 'neutral.800' : 'neutral.50',
            pb: '120px',
            pt: '184px',
          }}
        >
          <Container maxWidth="lg">
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                mb: 4,
              }}
            >
              <Typography variant="h3">Coming soon!</Typography>
              <Typography
                color="text.secondary"
                textAlign={'center'}
                maxWidth={'md'}
                sx={{ my: 2 }}
                variant="body1"
              >
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  {/*Whether you're an individual professional, a small team, or a large organization, DocuAnswer AI offers flexible pricing plans to suit your specific needs. Try our free version or upgrade for advanced features and support.*/}
                    <br />
                    <br />
                  <br />
                    DocuAnswer AI is currently in beta. We will be releasing our pricing plans soon.
              </Typography>
              {/*<Stack*/}
              {/*  alignItems="center"*/}
              {/*  direction="row"*/}
              {/*  spacing={1}*/}
              {/*>*/}
              {/*  <Switch checked />*/}
              {/*  <Typography variant="body1">Yearly Payment</Typography>*/}
              {/*  <Chip*/}
              {/*    color="primary"*/}
              {/*    label="25% OFF"*/}
              {/*    size="small"*/}
              {/*  />*/}
              {/*</Stack>*/}
            </Box>
            {/*<Grid*/}
            {/*  container*/}
            {/*  spacing={4}*/}
            {/*>*/}
            {/*  <Grid*/}
            {/*    xs={12}*/}
            {/*    md={4}*/}
            {/*  >*/}
            {/*    <PricingPlan*/}
            {/*      cta="Start Free Trial"*/}
            {/*      currency="$"*/}
            {/*      description="To familiarize yourself with our tools."*/}
            {/*      features={['Create contracts', 'Chat support', 'Email alerts']}*/}
            {/*      icon={<PricingPlanIcon name="startup" />}*/}
            {/*      name="Startup"*/}
            {/*      price="0"*/}
            {/*      sx={{*/}
            {/*        height: '100%',*/}
            {/*        maxWidth: 460,*/}
            {/*        mx: 'auto',*/}
            {/*      }}*/}
            {/*    />*/}
            {/*  </Grid>*/}
            {/*  <Grid*/}
            {/*    xs={12}*/}
            {/*    md={4}*/}
            {/*  >*/}
            {/*    <PricingPlan*/}
            {/*      cta="Start Free Trial"*/}
            {/*      currency="$"*/}
            {/*      description="To familiarize yourself with our tools."*/}
            {/*      features={[*/}
            {/*        'All previous',*/}
            {/*        'Highlights reporting',*/}
            {/*        'Data history',*/}
            {/*        'Unlimited users',*/}
            {/*      ]}*/}
            {/*      icon={<PricingPlanIcon name="standard" />}*/}
            {/*      name="Standard"*/}
            {/*      popular*/}
            {/*      price="4.99"*/}
            {/*      sx={{*/}
            {/*        height: '100%',*/}
            {/*        maxWidth: 460,*/}
            {/*        mx: 'auto',*/}
            {/*      }}*/}
            {/*    />*/}
            {/*  </Grid>*/}
            {/*  <Grid*/}
            {/*    xs={12}*/}
            {/*    md={4}*/}
            {/*  >*/}
            {/*    <PricingPlan*/}
            {/*      cta="Contact Us"*/}
            {/*      currency="$"*/}
            {/*      description="To familiarize yourself with our tools."*/}
            {/*      features={[*/}
            {/*        'All previous',*/}
            {/*        'Unlimited contacts',*/}
            {/*        'Analytics platform',*/}
            {/*        'Public API access',*/}
            {/*        'Send and sign unlimited contracts',*/}
            {/*      ]}*/}
            {/*      icon={<PricingPlanIcon name="business" />}*/}
            {/*      name="Business"*/}
            {/*      price="29.99"*/}
            {/*      sx={{*/}
            {/*        height: '100%',*/}
            {/*        maxWidth: 460,*/}
            {/*        mx: 'auto',*/}
            {/*      }}*/}
            {/*    />*/}
            {/*  </Grid>*/}
            {/*</Grid>*/}
            {/*<Box sx={{ mt: 4 }}>*/}
            {/*  <Typography*/}
            {/*    align="center"*/}
            {/*    color="text.secondary"*/}
            {/*    component="p"*/}
            {/*    variant="caption"*/}
            {/*  >*/}
            {/*    30% of our income goes into Whale Charity*/}
            {/*  </Typography>*/}
            {/*</Box>*/}
          </Container>
        </Box>
        <Divider />
        <HomeFaqs />
      </Box>
    </>
  );
};

export default Page;
