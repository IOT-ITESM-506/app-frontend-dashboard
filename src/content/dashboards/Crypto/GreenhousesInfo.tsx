import React, { useState } from 'react';
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

const AvatarSuccess = styled(Avatar)(
    ({ theme }) => `
      background-color: ${theme.colors.success.main};
      color: ${theme.palette.success.contrastText};
      width: ${theme.spacing(8)};
      height: ${theme.spacing(8)};
      box-shadow: ${theme.colors.shadows.success};
`
);

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

// Sample data for multiple Greenhouses and SensorRecords
const greenhouseData = [
    {
        name: 'Greenhouse 1',
        location: 'Some Location 1',
        size: 100,
        description: 'Description of the greenhouse 1',
        records: [
            {
                timestamp: '2023-01-01T12:00:00',
                temperature: 25.5,
                humidity: 60,
                luminosity: 5000,
                CO2_level: 400,
                soil_moisture: 0.5,
                pH: 6.5,
                nutrient_level: 200,
            },
            // Add more records as needed
        ],
    },
    {
        name: 'Greenhouse 2',
        location: 'Some Location 2',
        size: 150,
        description: 'Description of the greenhouse 2',
        records: [
            {
                timestamp: '2023-01-02T14:30:00',
                temperature: 24.0,
                humidity: 55,
                luminosity: 4800,
                CO2_level: 410,
                soil_moisture: 0.6,
                pH: 6.8,
                nutrient_level: 180,
            },
            // Add more records as needed
        ],
    },
    // Add more greenhouses as needed
];

function GreenhousesInfo() {
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
                                    {greenhouseData.map((greenhouse) => (
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
