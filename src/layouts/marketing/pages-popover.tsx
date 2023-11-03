import type { FC } from 'react';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import {HomeSmile, LayoutAlt02, LogOut01, XSquare} from "@untitled-ui/icons-react";
import {paths} from "@/paths";
import CreditCard01Icon from "@untitled-ui/icons-react/build/esm/CreditCard01";
import Mail04Icon from "@untitled-ui/icons-react/build/esm/Mail04";
import {RouterLink} from "@/components/router-link";

interface Item {
  caption?: string;
  children?: {
    external?: boolean;
    path: string;
    title: string;
  }[];
  external?: boolean;
  icon: JSX.Element;
  path?: string;
  title: string;
}

interface Section {
  items: Item[];
}

const sections: Section[] = [
  {
    items: [
      {
        title: 'Dashboard',
        path: '/(dashboard)',
        icon: (
          <SvgIcon fontSize="small">
            <HomeSmile />
          </SvgIcon>
        ),
        caption: '40+ screens',
        children: [
          {
            title: 'Overview',
            path: paths.index,
          },
          {
            title: 'Customers',
            path: paths.index,
          },
          {
            title: 'Logistics',
            path: paths.index,
          },
          {
            title: 'File Manager',
            path: paths.index,
          },
          {
            title: 'Academy',
            path: paths.index,
          },
        ],
      },
    ],
  },
  {
    items: [
      {
        title: 'Blog',
        path: paths.index,
        icon: (
          <SvgIcon fontSize="small">
            <LayoutAlt02 />
          </SvgIcon>
        ),
      },
      {
        title: 'Pricing',
        path: paths.pricing,
        icon: (
          <SvgIcon fontSize="small">
            <CreditCard01Icon />
          </SvgIcon>
        ),
      },
      {
        title: 'Contact',
        path: paths.contact,
        icon: (
          <SvgIcon fontSize="small">
            <Mail04Icon />
          </SvgIcon>
        ),
      },
      {
        title: 'Checkout',
        path: paths.checkout,
        icon: (
          <SvgIcon fontSize="small">
            <LogOut01 />
          </SvgIcon>
        ),
      },
      {
        title: 'Error',
        path: paths.notFound,
        icon: (
          <SvgIcon fontSize="small">
            <XSquare />
          </SvgIcon>
        ),
      },
    ],
  },
];

export const PagesPopover: FC = () => (
  <Box
    sx={{
      display: 'grid',
      gap: 3,
      gridTemplateColumns: 'repeat(2, 1fr)',
      p: 3,
    }}
  >
    {sections.map((section, index) => {
      return (
        <Stack
          component="ul"
          key={index}
          spacing={0.5}
          sx={{
            listStyle: 'none',
            m: 0,
            p: 0,
          }}
        >
          {section.items.map((item) => {
            const linkProps = item.path
              ? item.external
                ? {
                    component: 'a',
                    href: item.path,
                    target: '_blank',
                  }
                : {
                    component: RouterLink,
                    href: item.path,
                  }
              : {};

            return (
              <li key={item.title}>
                <ButtonBase
                  sx={{
                    alignItems: 'center',
                    borderRadius: 1,
                    display: 'flex',
                    justifyContent: 'flex-start',
                    px: '12px',
                    py: '6px',
                    textAlign: 'left',
                    width: '100%',
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    },
                  }}
                  {...linkProps}
                >
                  <Box
                    component="span"
                    sx={{
                      alignItems: 'center',
                      color: 'action.active',
                      display: 'inline-flex',
                      justifyContent: 'center',
                      mr: 2,
                      width: 20,
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Box
                    component="span"
                    sx={{ flexGrow: 1 }}
                  >
                    <Box
                      component="span"
                      sx={{
                        display: 'block',
                        fontFamily: (theme) => theme.typography.fontFamily,
                        fontSize: 14,
                        fontWeight: 500,
                        lineHeight: '24px',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {item.title}
                    </Box>
                    {item.caption && (
                      <Box
                        component="span"
                        sx={{
                          color: 'text.secondary',
                          display: 'block',
                          fontFamily: (theme) => theme.typography.fontFamily,
                          fontSize: 12,
                          fontWeight: 400,
                          lineHeight: '18px',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {item.caption}
                      </Box>
                    )}
                  </Box>
                </ButtonBase>
                {item.children && (
                  <Stack
                    component="ul"
                    spacing={0.5}
                    sx={{
                      listStyle: 'none',
                      m: 0,
                      p: 0,
                      pl: 20 + 16 + 'px', // icon size + icon margin
                    }}
                  >
                    {item.children.map((child) => {
                      const linkProps = child.path
                        ? child.external
                          ? {
                              component: 'a',
                              href: child.path,
                              target: '_blank',
                            }
                          : {
                              component: RouterLink,
                              href: child.path,
                            }
                        : {};

                      return (
                        <li key={child.title}>
                          <ButtonBase
                            sx={{
                              alignItems: 'center',
                              borderRadius: 1,
                              display: 'flex',
                              justifyContent: 'flex-start',
                              px: '12px',
                              py: '6px',
                              textAlign: 'left',
                              width: '100%',
                              '&:hover': {
                                backgroundColor: 'action.hover',
                              },
                            }}
                            {...linkProps}
                          >
                            <Box
                              component="span"
                              sx={{
                                color: 'text.secondary',
                                display: 'block',
                                fontFamily: (theme) => theme.typography.fontFamily,
                                fontSize: 14,
                                fontWeight: 500,
                                lineHeight: '24px',
                                whiteSpace: 'nowrap',
                              }}
                            >
                              {child.title}
                            </Box>
                          </ButtonBase>
                        </li>
                      );
                    })}
                  </Stack>
                )}
              </li>
            );
          })}
        </Stack>
      );
    })}
  </Box>
);
