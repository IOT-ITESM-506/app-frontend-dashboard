import {
    Box,
    Typography,
    Card,
    CardHeader,
    Divider,
    Avatar,
    useTheme,
    styled,
} from '@mui/material';

import ShoppingBagTwoToneIcon from '@mui/icons-material/ShoppingBagTwoTone';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import StarTwoToneIcon from '@mui/icons-material/StarTwoTone';

const AvatarPrimary = styled(Avatar)(
    ({ theme }) => `
      background: ${theme.colors.primary.lighter};
      color: ${theme.colors.primary.main};
      width: ${theme.spacing(7)};
      height: ${theme.spacing(7)};
`
);

function RecentActivity() {
    const theme = useTheme();

    return (
        <Card>
            <CardHeader title="Recent Activity" />
            <Divider />
            <Box px={2} py={4} display="flex" alignItems="flex-start">
                <AvatarPrimary>
                    <ShoppingBagTwoToneIcon />
                </AvatarPrimary>
                <Box pl={2} flex={1}>
                    <Typography variant="h4">Orders</Typography>

                    <Box pt={1} display="flex">
                        <Box pr={8}>
                            <Typography
                                gutterBottom
                                variant="caption"
                                sx={{ fontSize: `${theme.typography.pxToRem(12)}` }}
                            >
                                Total
                            </Typography>
                            <Typography variant="h3">485</Typography>
                        </Box>
                        <Box>
                            <Typography
                                gutterBottom
                                variant="caption"
                                sx={{ fontSize: `${theme.typography.pxToRem(12)}` }}
                            >
                                Failed
                            </Typography>
                            <Typography variant="h3">8</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Divider />
            <Box px={2} py={3} display="flex" alignItems="flex-start">
                <AvatarPrimary>
                    <FavoriteTwoToneIcon />
                </AvatarPrimary>
                <Box pl={2} flex={1}>
                    <Typography variant="h4">Favourites</Typography>

                    <Box pt={1} display="flex">
                        <Box pr={8}>
                            <Typography
                                gutterBottom
                                variant="caption"
                                sx={{ fontSize: `${theme.typography.pxToRem(12)}` }}
                            >
                                Products
                            </Typography>
                            <Typography variant="h3">64</Typography>
                        </Box>
                        <Box>
                            <Typography
                                gutterBottom
                                variant="caption"
                                sx={{ fontSize: `${theme.typography.pxToRem(12)}` }}
                            >
                                Lists
                            </Typography>
                            <Typography variant="h3">15</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Divider />
            <Box px={2} py={3} display="flex" alignItems="flex-start">
                <AvatarPrimary>
                    <StarTwoToneIcon />
                </AvatarPrimary>
                <Box pl={2} flex={1}>
                    <Typography variant="h4">Reviews</Typography>

                    <Box pt={1} display="flex">
                        <Box pr={8}>
                            <Typography
                                gutterBottom
                                variant="caption"
                                sx={{ fontSize: `${theme.typography.pxToRem(12)}` }}
                            >
                                Total
                            </Typography>
                            <Typography variant="h3">654</Typography>
                        </Box>
                        <Box>
                            <Typography
                                gutterBottom
                                variant="caption"
                                sx={{ fontSize: `${theme.typography.pxToRem(12)}` }}
                            >
                                Useful
                            </Typography>
                            <Typography variant="h3">21</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Card>
    );
}

export default RecentActivity;
