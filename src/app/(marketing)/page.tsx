"use client";

import {Seo} from "@/components/seo";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import {Rating} from "@mui/material";
import {RouterLink} from "@/components/router-link";
import {paths} from "@/paths";
import SvgIcon from "@mui/material/SvgIcon";
import {Eye, LayoutBottom} from "@untitled-ui/icons-react";
import {HomeFaqs} from "@/sections/marketing/home/home-faqs";
import {HomeHero} from "@/sections/marketing/home/home-hero";
import {HomeFeatures} from "@/sections/marketing/home/home-features";
import {HomeReviews} from "@/sections/marketing/home/home-reviews";
// import { usePageView } from '@/hooks/use-page-view';
// import { HomeCta } from '@/sections/home/home-cta';
// import { HomeFaqs } from '@/sections/home/home-faqs';
// import { HomeFeatures } from '@/sections/home/home-features';
// import { HomeHero } from '@/sections/home/home-hero';
// import { HomeReviews } from '@/sections/home/home-reviews';

const Page = () => {

    return (
        <>
            <Seo/>
            <main>
                <HomeHero />
                <HomeFeatures />
                <HomeReviews />
                {/*<HomeCta />*/}
                <HomeFaqs />
            </main>
        </>
    );
};

export default Page;
