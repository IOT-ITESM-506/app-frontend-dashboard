import React, { useContext, useState } from 'react';
import {
    Box,
    Card,
    Grid,
    Typography,
    styled,
    Avatar,
    Collapse,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Paper,
} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { AuthContext } from 'src/contexts/AuthContext';

const GreenCard = styled(Card)(
    ({ theme }) => `
      box-shadow: 0 0 0px 0px ${theme.colors.success.main};
`
);

function createData(
    name: string,
    location: string,
    size: number,
    description: string,
    records: any[]
) {
    return {
        name,
        location,
        size,
        description,
        records,
    };
}

function Row(props: { row: ReturnType<typeof createData> }) {
    const { row } = props;
    const [open, setOpen] = useState(false);

    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell align="right">{row.location}</TableCell>
                <TableCell align="right">{row.size}</TableCell>
                <TableCell align="right">{row.description}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Sensor Records
                            </Typography>
                            <Table size="small" aria-label="records">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Timestamp</TableCell>
                                        <TableCell>Temperature</TableCell>
                                        <TableCell>Humidity</TableCell>
                                        <TableCell>Luminosity</TableCell>
                                        <TableCell>CO2 Level</TableCell>
                                        <TableCell>Soil Moisture</TableCell>
                                        <TableCell>pH</TableCell>
                                        <TableCell>Nutrient Level</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.records.map((record: any) => (
                                        <TableRow key={record.timestamp}>
                                            <TableCell>{record.timestamp}</TableCell>
                                            <TableCell>{record.temperature}</TableCell>
                                            <TableCell>{record.humidity}</TableCell>
                                            <TableCell>{record.luminosity}</TableCell>
                                            <TableCell>{record.CO2_level}</TableCell>
                                            <TableCell>{record.soil_moisture}</TableCell>
                                            <TableCell>{record.pH || '-'}</TableCell>
                                            <TableCell>{record.nutrient_level || '-'}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}

function GreenhousesInfo() {
    const { greenhouses } = useContext(AuthContext)
 
    return (
        <GreenCard>
            <Card>
                <Grid>
                    <Box p={4}>
                        <Typography variant="h3" mb={2}>
                            Greenhouses Information.
                        </Typography>
                        <TableContainer component={Paper}>
                            <Table aria-label="collapsible table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell />
                                        <TableCell>Greenhouse Name</TableCell>
                                        <TableCell align="right">Location</TableCell>
                                        <TableCell align="right">Size (sqm)</TableCell>
                                        <TableCell align="right">Description</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {greenhouses.map((greenhouse) => (
                                        <Row key={greenhouse.name} row={greenhouse} />
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Grid>
            </Card>
        </GreenCard>
    );
}

export default GreenhousesInfo;
